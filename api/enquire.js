import { Resend } from 'resend';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';
import {
  accommodationOptions,
  itineraryOptions,
  startingPointOptions,
  travelStyleOptions,
} from '../src/lib/enquiry-options.js';

const MAX_BODY_BYTES = 20_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const REQUEST_ID_PATTERN = /^[a-zA-Z0-9-]{8,100}$/;
const optionMap = (options) => new Map(options.map(({ value, label }) => [value, label]));
const ITINERARIES = optionMap(itineraryOptions);
const STARTING_POINTS = optionMap(startingPointOptions);
const ACCOMMODATION_OPTIONS = optionMap(accommodationOptions);
const TRAVEL_STYLES = optionMap(travelStyleOptions);
const REQUIRED_STRING_FIELDS = [
  'name',
  'email',
  'travellers',
  'itinerary',
  'startDate',
  'endDate',
  'startingPoint',
  'accommodation',
  'travelStyle',
  'requestId',
];
const OPTIONAL_STRING_FIELDS = ['whatsapp', 'message', 'company'];

const responseHeaders = {
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
};

const jsonResponse = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { ...responseHeaders, ...headers },
});

const cleanLine = (value) => String(value || '')
  .replace(/\s+/g, ' ')
  .trim();

const cleanMessage = (value) => String(value || '')
  .replace(/\r\n?/g, '\n')
  .trim();

const cleanTravellerCount = (value) => {
  const cleaned = cleanLine(value);
  return /^(?:[1-9]|1\d|20)$/.test(cleaned) ? Number(cleaned) : Number.NaN;
};

const cleanPhoneNumber = (value) => {
  const cleaned = cleanLine(value);
  if (!cleaned) return '';
  if (cleaned.length > 50) return null;
  const phoneNumber = parsePhoneNumberFromString(cleaned);
  return phoneNumber?.isValid() ? phoneNumber.number : null;
};

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const isRealIsoDate = (value) => {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const tanzaniaIsoDate = (value) => {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Africa/Dar_es_Salaam',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value);
  const part = (type) => parts.find((item) => item.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
};

const normalizeEnquiry = (payload) => ({
  name: cleanLine(payload.name),
  email: cleanLine(payload.email).toLowerCase(),
  whatsapp: cleanPhoneNumber(payload.whatsapp),
  travellers: cleanTravellerCount(payload.travellers),
  itinerary: cleanLine(payload.itinerary),
  startDate: cleanLine(payload.startDate),
  endDate: cleanLine(payload.endDate),
  startingPoint: cleanLine(payload.startingPoint),
  accommodation: cleanLine(payload.accommodation),
  travelStyle: cleanLine(payload.travelStyle),
  message: cleanMessage(payload.message),
  company: cleanLine(payload.company),
  requestId: cleanLine(payload.requestId),
});

const hasExpectedFieldTypes = (payload) => (
  REQUIRED_STRING_FIELDS.every((field) => typeof payload[field] === 'string')
  && OPTIONAL_STRING_FIELDS.every((field) => payload[field] === undefined || typeof payload[field] === 'string')
);

const validateEnquiry = (enquiry, today) => {
  const errors = {};
  if (enquiry.name.length < 2 || enquiry.name.length > 100) errors.name = 'Enter a name between 2 and 100 characters.';
  if (enquiry.email.length > 254 || !EMAIL_PATTERN.test(enquiry.email)) errors.email = 'Enter a valid email address.';
  if (enquiry.whatsapp === null) errors.whatsapp = 'Enter a valid international WhatsApp number or leave it blank.';
  if (!Number.isInteger(enquiry.travellers) || enquiry.travellers < 1 || enquiry.travellers > 20) errors.travellers = 'Choose between 1 and 20 travellers.';
  if (!ITINERARIES.has(enquiry.itinerary)) errors.itinerary = 'Choose a listed safari or journey.';
  if (!isRealIsoDate(enquiry.startDate) || enquiry.startDate < today) errors.startDate = `Choose an arrival date on or after ${today}.`;
  if (!isRealIsoDate(enquiry.endDate) || (isRealIsoDate(enquiry.startDate) && enquiry.endDate < enquiry.startDate)) errors.endDate = 'Choose a departure date on or after the arrival date.';
  if (!STARTING_POINTS.has(enquiry.startingPoint)) errors.startingPoint = 'Choose a listed starting point.';
  if (!ACCOMMODATION_OPTIONS.has(enquiry.accommodation)) errors.accommodation = 'Choose a listed accommodation preference.';
  if (!TRAVEL_STYLES.has(enquiry.travelStyle)) errors.travelStyle = 'Choose a listed travel style.';
  if (enquiry.message.length > 3_000) errors.message = 'Keep planning notes to 3,000 characters or fewer.';
  if (!REQUEST_ID_PATTERN.test(enquiry.requestId)) errors.form = 'Refresh the page and try again.';
  return errors;
};

const emailField = (label, value) => `
  <tr>
    <th align="left" style="padding:8px 12px 8px 0;vertical-align:top;color:#5d6658;font-weight:600">${escapeHtml(label)}</th>
    <td style="padding:8px 0;vertical-align:top;color:#14120e">${escapeHtml(value || 'Not provided')}</td>
  </tr>`;

export const makeEnquiryEmail = (enquiry, env) => {
  const messageHtml = escapeHtml(enquiry.message || 'No additional notes provided.').replaceAll('\n', '<br>');
  const fields = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['WhatsApp', enquiry.whatsapp],
    ['Travellers', String(enquiry.travellers)],
    ['Journey', ITINERARIES.get(enquiry.itinerary)],
    ['Arrival date', enquiry.startDate],
    ['Departure date', enquiry.endDate],
    ['Starting point', STARTING_POINTS.get(enquiry.startingPoint)],
    ['Accommodation', ACCOMMODATION_OPTIONS.get(enquiry.accommodation)],
    ['Travel style', TRAVEL_STYLES.get(enquiry.travelStyle)],
  ];

  return {
    from: env.ENQUIRY_FROM_EMAIL,
    to: env.BOOKING_EMAIL || env.VITE_BOOKING_EMAIL,
    replyTo: enquiry.email,
    subject: `New Tanzania trip enquiry — ${enquiry.name}`,
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f6f3eb;font-family:Arial,sans-serif;color:#14120e">
    <div style="max-width:680px;margin:0 auto;padding:32px 20px">
      <div style="background:#ffffff;border:1px solid #ded8ca;border-radius:12px;padding:28px">
        <p style="margin:0 0 8px;color:#6a745f;font-size:12px;letter-spacing:.08em;text-transform:uppercase">Wild Wings website</p>
        <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:28px">New Tanzania trip enquiry</h1>
        <table role="presentation" style="width:100%;border-collapse:collapse">${fields.map(([label, value]) => emailField(label, value)).join('')}
        </table>
        <div style="margin-top:20px;padding:18px;background:#f6f3eb;border-radius:8px">
          <strong style="display:block;margin-bottom:8px">Planning notes</strong>
          <div style="line-height:1.6">${messageHtml}</div>
        </div>
      </div>
    </div>
  </body>
</html>`,
    text: [
      'New Tanzania trip enquiry',
      '',
      ...fields.map(([label, value]) => `${label}: ${value || 'Not provided'}`),
      '',
      'Planning notes:',
      enquiry.message || 'No additional notes provided.',
    ].join('\n'),
  };
};

const getEnvironment = (env) => (typeof env === 'function' ? env() : env);

export const createEnquiryHandler = ({
  env = () => process.env,
  now = () => new Date(),
  sendEmail,
  logError = (message, error) => console.error(message, error),
} = {}) => async (request) => {
  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, message: 'Method not allowed.' }, 405, { allow: 'POST' });
  }

  const mediaType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
  if (mediaType !== 'application/json') {
    return jsonResponse({ ok: false, message: 'Expected a JSON request.' }, 415);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, message: 'Your request is too large.' }, 413);
  }

  let body;
  try {
    body = await request.text();
  } catch {
    return jsonResponse({ ok: false, message: 'The request body could not be read.' }, 400);
  }

  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, message: 'Your request is too large.' }, 413);
  }

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return jsonResponse({ ok: false, message: 'The request body is not valid JSON.' }, 400);
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return jsonResponse({ ok: false, message: 'The request body is invalid.' }, 400);
  }

  if (typeof payload.company === 'string' && cleanLine(payload.company)) return jsonResponse({ ok: true });

  if (!hasExpectedFieldTypes(payload)) {
    return jsonResponse({ ok: false, message: 'The request fields are invalid.' }, 400);
  }

  const enquiry = normalizeEnquiry(payload);
  const fieldErrors = validateEnquiry(enquiry, tanzaniaIsoDate(now()));
  if (Object.keys(fieldErrors).length) {
    return jsonResponse({
      ok: false,
      message: 'Please check the highlighted trip details and try again.',
      fieldErrors,
    }, 400);
  }

  const environment = getEnvironment(env) || {};
  const recipient = environment.BOOKING_EMAIL || environment.VITE_BOOKING_EMAIL;
  if (!environment.RESEND_API_KEY || !environment.ENQUIRY_FROM_EMAIL || !recipient || typeof sendEmail !== 'function') {
    return jsonResponse({
      ok: false,
      message: 'Online enquiries are temporarily unavailable. Please contact us directly.',
    }, 503);
  }

  try {
    const result = await sendEmail(
      makeEnquiryEmail(enquiry, environment),
      { idempotencyKey: `enquiry-${enquiry.requestId}` },
    );

    if (result?.error || !result?.data?.id) {
      logError('Resend rejected an enquiry email.', result?.error || new Error('Missing email ID.'));
      return jsonResponse({
        ok: false,
        message: 'We could not send your request. Please try again or contact us directly.',
      }, 502);
    }
  } catch (error) {
    logError('Resend failed to deliver an enquiry email.', error);
    return jsonResponse({
      ok: false,
      message: 'We could not send your request. Please try again or contact us directly.',
    }, 502);
  }

  return jsonResponse({ ok: true });
};

const sendWithResend = (message, options) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  return resend.emails.send(message, options);
};

export default {
  fetch: createEnquiryHandler({ sendEmail: sendWithResend }),
};
