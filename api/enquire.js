import { Resend } from 'resend';

const MAX_BODY_BYTES = 20_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_ID_PATTERN = /^[a-zA-Z0-9-]{8,100}$/;

const responseHeaders = {
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
};

const jsonResponse = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { ...responseHeaders, ...headers },
});

const cleanLine = (value, maximumLength) => String(value || '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, maximumLength);

const cleanMessage = (value, maximumLength) => String(value || '')
  .replace(/\r\n?/g, '\n')
  .trim()
  .slice(0, maximumLength);

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const normalizeEnquiry = (payload) => ({
  name: cleanLine(payload.name, 100),
  email: cleanLine(payload.email, 254).toLowerCase(),
  whatsapp: cleanLine(payload.whatsapp, 50),
  travellers: Number(payload.travellers),
  itinerary: cleanLine(payload.itinerary, 120),
  dates: cleanLine(payload.dates, 120),
  startingPoint: cleanLine(payload.startingPoint, 100),
  accommodation: cleanLine(payload.accommodation, 100),
  travelStyle: cleanLine(payload.travelStyle, 100),
  message: cleanMessage(payload.message, 3_000),
  company: cleanLine(payload.company, 200),
  requestId: cleanLine(payload.requestId, 100),
});

const isValidEnquiry = (enquiry) => (
  enquiry.name.length >= 2
  && EMAIL_PATTERN.test(enquiry.email)
  && Number.isInteger(enquiry.travellers)
  && enquiry.travellers >= 1
  && enquiry.travellers <= 20
  && enquiry.itinerary.length >= 2
  && enquiry.dates.length >= 2
  && enquiry.startingPoint.length >= 2
  && enquiry.accommodation.length >= 2
  && enquiry.travelStyle.length >= 2
  && REQUEST_ID_PATTERN.test(enquiry.requestId)
);

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
    ['Journey', enquiry.itinerary],
    ['Dates', enquiry.dates],
    ['Starting point', enquiry.startingPoint],
    ['Accommodation', enquiry.accommodation],
    ['Travel style', enquiry.travelStyle],
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
  sendEmail,
  logError = (message, error) => console.error(message, error),
} = {}) => async (request) => {
  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, message: 'Method not allowed.' }, 405, { allow: 'POST' });
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
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

  const enquiry = normalizeEnquiry(payload);
  if (enquiry.company) return jsonResponse({ ok: true });

  if (!isValidEnquiry(enquiry)) {
    return jsonResponse({ ok: false, message: 'Please check the required trip details and try again.' }, 400);
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
