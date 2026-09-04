import assert from 'node:assert/strict';
import test from 'node:test';
import { createEnquiryHandler } from '../api/enquire.js';

const configuredEnv = {
  BOOKING_EMAIL: 'bookings@wildwings.test',
  ENQUIRY_FROM_EMAIL: 'Wild Wings <enquiries@wildwings.test>',
  RESEND_API_KEY: 're_test_key',
};

const validPayload = {
  name: 'Amina Traveller',
  email: 'amina@example.com',
  whatsapp: '+255 700 000 000',
  travellers: '2',
  itinerary: 'Custom route',
  dates: '12–20 July 2027',
  startingPoint: 'Arusha',
  accommodation: 'Comfortable mid-range',
  travelStyle: 'Private safari',
  message: 'We would love to see elephants & lions.',
  company: '',
  requestId: 'b07b7312-fc86-47ed-a076-6b6f79a84f38',
};

const makeRequest = (body = validPayload, method = 'POST') => new Request('https://wildwings.test/api/enquire', {
  method,
  headers: { 'content-type': 'application/json' },
  body: method === 'POST' ? JSON.stringify(body) : undefined,
});

test('rejects non-POST requests', async () => {
  const handler = createEnquiryHandler({ env: configuredEnv, sendEmail: async () => ({ data: { id: 'unused' } }) });
  const response = await handler(makeRequest(undefined, 'GET'));

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'POST');
});

test('rejects invalid enquiry fields without sending email', async () => {
  let sendCount = 0;
  const handler = createEnquiryHandler({
    env: configuredEnv,
    sendEmail: async () => {
      sendCount += 1;
      return { data: { id: 'unused' } };
    },
  });
  const response = await handler(makeRequest({ ...validPayload, email: 'not-an-email', travellers: '0' }));
  const result = await response.json();

  assert.equal(response.status, 400);
  assert.equal(result.ok, false);
  assert.equal(sendCount, 0);
});

test('rejects an oversized body even without a content-length header', async () => {
  let sendCount = 0;
  const handler = createEnquiryHandler({
    env: configuredEnv,
    sendEmail: async () => {
      sendCount += 1;
      return { data: { id: 'unused' } };
    },
  });
  const request = new Request('https://wildwings.test/api/enquire', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...validPayload, message: 'a'.repeat(21_000) }),
  });
  const response = await handler(request);

  assert.equal(request.headers.get('content-length'), null);
  assert.equal(response.status, 413);
  assert.equal(sendCount, 0);
});

test('silently accepts honeypot submissions without sending email', async () => {
  let sendCount = 0;
  const handler = createEnquiryHandler({
    env: configuredEnv,
    sendEmail: async () => {
      sendCount += 1;
      return { data: { id: 'unused' } };
    },
  });
  const response = await handler(makeRequest({ ...validPayload, company: 'Spam Company' }));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(sendCount, 0);
});

test('sends a validated, escaped enquiry with a stable idempotency key', async () => {
  const calls = [];
  const handler = createEnquiryHandler({
    env: configuredEnv,
    sendEmail: async (...args) => {
      calls.push(args);
      return { data: { id: 'email_123' }, error: null };
    },
  });
  const response = await handler(makeRequest({
    ...validPayload,
    name: '<Amina & family>',
    message: '<script>alert(1)</script> Elephants please.',
  }));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 1);

  const [message, options] = calls[0];
  assert.equal(message.to, configuredEnv.BOOKING_EMAIL);
  assert.equal(message.replyTo, validPayload.email);
  assert.match(message.subject, /New Tanzania trip enquiry/);
  assert.match(message.html, /&lt;Amina &amp; family&gt;/);
  assert.doesNotMatch(message.html, /<script>/);
  assert.match(message.text, /Elephants please/);
  assert.equal(options.idempotencyKey, `enquiry-${validPayload.requestId}`);
});

test('returns a service error when delivery configuration is missing', async () => {
  const handler = createEnquiryHandler({ env: {}, sendEmail: async () => ({ data: { id: 'unused' } }) });
  const response = await handler(makeRequest());

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    ok: false,
    message: 'Online enquiries are temporarily unavailable. Please contact us directly.',
  });
});

test('returns a retryable error when the email provider fails', async () => {
  const handler = createEnquiryHandler({
    env: configuredEnv,
    sendEmail: async () => ({ data: null, error: { message: 'Provider unavailable' } }),
    logError: () => {},
  });
  const response = await handler(makeRequest());

  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), {
    ok: false,
    message: 'We could not send your request. Please try again or contact us directly.',
  });
});
