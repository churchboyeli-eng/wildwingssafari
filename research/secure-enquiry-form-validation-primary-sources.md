# Secure, user-friendly enquiry form validation

Research date: 2026-09-06

Purpose: define an implementation-ready validation contract for the Wild Wings public safari enquiry form. This note uses primary sources only and separates browser usability from server-enforced security. Application code is being changed separately; this document does not modify it.

## Executive recommendation

Use two native calendar controls, one for arrival and one for departure, instead of a free-text date field. Set the arrival control's `min` to today's Tanzania date, then set the departure control's `min` to the selected arrival date. Keep the current traveller policy of 1–20 people, but require whole decimal numbers and enforce the same rule in the API. Present WhatsApp as an international telephone control with a country selector, accept readable formatting while the visitor types, and normalize valid values to E.164 on the server with libphonenumber metadata.

Every browser rule must have an equivalent server rule. Browser validation improves speed and clarity but can be altered or bypassed; MDN explicitly warns that client-side validation is not a substitute for server validation, and OWASP says validation must occur as early as possible in the data flow and must cover semantic as well as syntactic correctness. [MDN: `<input type="date">` validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date#validation) · [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)

## Project-facing validation contract

| Field | Browser behavior | Server authority | Suggested project bound |
| --- | --- | --- | --- |
| Full name | Required text input with visible instructions and `maxlength` | Trim surrounding whitespace; reject rather than silently truncate if outside the accepted range | 2–100 characters |
| Email | `type="email"`, `autocomplete="email"`, required, `maxlength` | Normalize only safe presentation differences, validate format and length, and reject invalid input | Maximum 254 characters as a project interoperability policy |
| WhatsApp | Optional `type="tel"` with country selector, `autocomplete="tel"`, mobile keypad, and an example | Blank is valid; otherwise parse with country context, validate with libphonenumber, and store/send canonical E.164 | E.164-compatible number; do not store as a numeric type |
| Travellers | Required `type="number"`, `min="1"`, `max="20"`, `step="1"` | Accept only a canonical whole-decimal representation and then enforce integer 1–20 | 1–20; direct larger groups to contact the team |
| Arrival date | Required `type="date"`; `min` is today's Tanzania date | Strictly parse the normalized date, reject nonexistent or past dates using the business timezone | Today or later |
| Departure date | Required `type="date"`; `min` follows arrival | Require departure on or after arrival; apply a maximum duration only if it is a real sales policy | Arrival or later |
| Journey, starting point, accommodation, travel style | Native selects | Require membership in the exact server allowlist; never trust the submitted option text | Values exported from one shared schema where practical |
| Planning notes | Textarea with visible character guidance and `maxlength` | Enforce maximum bytes/characters and output-encode for its destination | Keep the existing 3,000-character policy unless the business needs more |
| Request body | No user-facing control | Continue requiring JSON and reject oversized bodies before expensive work | Keep the existing 20,000-byte cap unless measured needs change |

The exact numerical bounds above are product policies, not universal web standards. OWASP's requirement is to define and enforce minimum/maximum lengths, numerical ranges, accepted types, and fixed option sets appropriate to the business. Positive allowlists are preferred over trying to enumerate every bad input. [OWASP Input Validation Cheat Sheet: implementing input validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#implementing-input-validation) · [OWASP REST Security Cheat Sheet: input validation](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html#input-validation)

## Dates and calendar controls

### Native date inputs

`<input type="date">` gives users a browser/OS date interface and submits a normalized `yyyy-mm-dd` value regardless of how the date is displayed in the visitor's locale. Its `min` and `max` attributes participate in constraint validation, so a date before `min` or after `max` is invalid. [WHATWG HTML: Date state](https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date)) · [MDN: `<input type="date">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date)

Recommended structure:

```html
<input type="date" name="startDate" required min="YYYY-MM-DD">
<input type="date" name="endDate" required min="YYYY-MM-DD">
```

- Compute the initial minimum from the current calendar day in `Africa/Dar_es_Salaam`, not from a UTC date string that can show the wrong day around midnight.
- When arrival changes, update the departure minimum to the arrival value. If an existing departure is now earlier, do not silently change it; describe the error and ask the visitor to correct it. WCAG requires an automatically detected error to be identified and described in text. [W3C WCAG 2.2, Success Criterion 3.3.1](https://www.w3.org/TR/WCAG22/#error-identification)
- On the server, require strict `YYYY-MM-DD` syntax, verify that the components form a real calendar date, compare arrival against the current Tanzania date, and require `endDate >= startDate`.
- Do not impose an arbitrary short maximum range if customers may enquire far ahead. If the business chooses a booking horizon or maximum trip length, show that instruction beside the controls and enforce the same values on the server.
- If flexibility is important, add a separate “My dates are flexible” checkbox. Keep the selected arrival/departure dates as the planning anchor rather than reverting to unvalidated prose.

The browser's `min` control is a usability guard, not the security boundary. A caller can send `2024-01-01` or malformed JSON directly to `/api/enquire`, so the API must independently reject past, impossible, and reversed dates. [MDN: client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation#what_is_form_validation)

## Traveller count

The HTML number state supports `min`, `max`, and `step`; values outside those constraints fail browser constraint validation. The `step` value should be `1` because a traveller count is discrete. [WHATWG HTML: Number state](https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)) · [MDN: `min`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/min) · [MDN: `max`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/max)

Recommended browser rule: required, minimum 1, maximum 20, step 1. Recommended server rule: first require canonical decimal digits, then convert and require an integer from 1 through 20. This avoids permissive language coercions accepting representations such as scientific notation when the business means a simple headcount. Invalid values should be rejected with a field-specific message; they should not be ignored or silently replaced because that would send an inaccurate quote request.

If Wild Wings accepts parties above 20, make “21+ / group enquiry” an explicit option or route those visitors to direct contact. Do not weaken the finite API bound.

## International WhatsApp/telephone input

HTML `type="tel"` helps mobile browsers present a telephone keypad, but the browser does not validate one universal telephone format because international formats vary. [WHATWG HTML: Telephone state](https://html.spec.whatwg.org/multipage/input.html#telephone-state-(type=tel)) · [MDN: `<input type="tel">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/tel)

Use a country selector paired with the national number input, or one accessible combined component that exposes both controls and their labels. Do not require visitors to understand Tanzania's country code; the selected country supplies parsing context. Support pasted international numbers beginning with `+`, spaces, hyphens, and parentheses while typing, then normalize after parsing.

Google's libphonenumber project provides parsing, as-you-type formatting, possibility checks, and region-aware validation. Its documentation distinguishes `isPossibleNumber`, which mainly checks length, from fuller validity checks, and warns that a structurally valid range does not prove the number is assigned to or reachable by that visitor. Ownership requires an SMS/call verification step; that would usually be unnecessary friction for an optional enquiry contact. [Google libphonenumber README](https://github.com/google/libphonenumber#highlights-of-functionality) · [Google libphonenumber FAQ: what “valid” means](https://github.com/google/libphonenumber/blob/master/FAQ.md#what-does-it-mean-for-a-phone-number-to-be-valid)

Store and transmit telephone values as strings. Google's project notes that leading zeroes can be significant, the plus sign is part of the international representation, and telephone numbers are not numbers on which arithmetic is performed. [Google libphonenumber: Falsehoods Programmers Believe About Phone Numbers](https://github.com/google/libphonenumber/blob/master/FALSEHOODS.md)

Recommended behavior for this optional field:

1. Empty is accepted.
2. A nonempty value is parsed with the explicitly selected country or as an international `+` number.
3. An impossible/invalid value is rejected with “Enter a complete WhatsApp number, including the country code.”
4. A valid value is normalized to E.164 for the enquiry email/API record while a friendly international format remains visible to the visitor.
5. Use `autocomplete="tel"`; if controls are split, HTML also defines contact-field autocomplete tokens including `tel-country-code` and `tel-national`. [WHATWG HTML: autofill field names](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-field)

## Duplicate validation on the server

Client validation is for immediate feedback. Server validation is the authority because HTML attributes and JavaScript can be changed, disabled, or bypassed by sending an HTTP request directly. [MDN: `<input type="date">` validation warning](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date#validation)

For `/api/enquire`, validate the complete object before calling Resend:

- Reject arrays, missing fields, unexpected data types, and unsupported content types.
- Reject invalid input rather than repairing meaning-changing mistakes or silently truncating them.
- Apply syntactic validation first: type, normalized shape, length, and date/telephone syntax.
- Apply semantic validation next: dates are not past or reversed, traveller count is within policy, and select values belong to the allowed sets.
- Keep the body-size limit before parsing or provider calls.
- Escape/encode all accepted text for the output context. Validation does not replace output encoding; the existing email HTML and plain-text generation should continue treating enquiry content as data. [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) · [OWASP Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

One shared validation schema or shared constants can reduce browser/API drift, but the API must still execute validation itself. Select options deserve allowlists even though the browser renders a dropdown, because a direct caller can submit any string.

## Length limits and allowlists

OWASP recommends minimum and maximum lengths for strings, minimum and maximum values for numbers and dates, regular expressions for well-structured strings, and allowlists for discrete options. Denylists are a supplemental warning signal, not the main control. [OWASP Input Validation Cheat Sheet: allowlist vs denylist](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#allowlist-vs-denylist)

Apply the same bounds in HTML where the platform supports them and in the API for every request. Make limits visible when they affect normal writing. For prose such as names and planning notes, allow Unicode letters, punctuation, and whitespace rather than an ASCII-only character list; OWASP specifically cautions that free-form Unicode text needs normalization and careful handling instead of a narrow generic pattern. [OWASP Input Validation Cheat Sheet: validating free-form Unicode text](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#validating-free-form-unicode-text)

For overlong input, return a field-specific validation error. Silent slicing can change a traveller's message while making the submission appear successful. Normalization may collapse accidental surrounding whitespace, but it should not invent or alter trip facts.

## CSRF relevance to this public JSON endpoint

Classic CSRF abuses credentials that a browser automatically sends, such as a logged-in session cookie, to perform an action with the victim's authority. The current enquiry endpoint is public and unauthenticated, so there is no victim account privilege to steal; its primary cross-site risk is unwanted email/spam and resource consumption, not account-level CSRF. [OWASP Cross-Site Request Forgery Prevention Cheat Sheet: introduction](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#introduction)

The existing requirement for `Content-Type: application/json` is useful defense in depth. OWASP explains that ordinary cross-origin HTML forms can send only “simple” content types such as form-urlencoded, multipart, or text/plain; requiring JSON and not enabling permissive CORS prevents that simple form path. [OWASP CSRF Cheat Sheet: disallowing simple content types](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#disallowing-simple-content-types)

Recommended current policy:

- Continue accepting only `POST` with `application/json` and do not add wildcard CORS.
- Optionally reject an explicit foreign `Origin` or `Sec-Fetch-Site: cross-site`, with careful logging/rollout and a compatible fallback. OWASP documents Fetch Metadata and origin verification as defense-in-depth patterns. [OWASP CSRF Cheat Sheet: Fetch Metadata request headers](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#use-fetch-metadata-headers-to-verify-nature-of-the-request)
- Do not add a stateful CSRF-token flow merely to solve spam on this unauthenticated form. It does not replace rate limiting or bot controls.
- If the endpoint later uses authenticated cookies or performs an action with user privileges, reassess the threat model and add a framework-supported CSRF defense.

## Rate limiting and spam controls

An endpoint that sends email is both a mailbox-flooding and resource-consumption target. OWASP explicitly identifies web forms that send email as a functionality-abuse example and recommends layered anti-automation controls. [OWASP Denial of Service Cheat Sheet: user interaction](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html#user-interaction) · [OWASP Bot Management and Anti-Automation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Bot_Management_and_Anti-Automation_Cheat_Sheet.html)

Recommended layers, in order:

1. Retain the honeypot as a low-friction signal, but do not rely on it alone.
2. Add an endpoint-specific sliding-window or token-bucket limit in a shared/durable store suitable for serverless execution. Use more than one key where privacy and infrastructure allow it: coarse IP, short-lived anonymous session, and a normalized email/telephone hash. OWASP warns that IP-only controls can be bypassed and recommends multiple rate-limit keys. [OWASP Bot Management Cheat Sheet: rate limiting and quotas](https://cheatsheetseries.owasp.org/cheatsheets/Bot_Management_and_Anti-Automation_Cheat_Sheet.html#rate-limiting-and-quotas)
3. Return HTTP `429 Too Many Requests` and a useful retry period when a limit is exceeded. OWASP's REST guidance identifies 429 as the response for rate limiting. [OWASP REST Security Cheat Sheet: HTTP return code](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html#http-return-code)
4. Log aggregate validation failures, provider failures, honeypot hits, and throttles without logging full private enquiry data. Alert on sudden volume or cost changes.
5. Add a privacy-conscious challenge only after suspicious behavior or repeated attempts. CAPTCHA is a friction-heavy secondary control and should not be the only defense.
6. Preserve idempotency so retries from a real visitor do not create duplicate email. Idempotency does not limit many distinct malicious requests, so it complements rather than replaces throttling.

Example policy to validate under production traffic, not a universal constant: allow a small burst such as three accepted enquiries per ten minutes per coarse source, then a low sustained rate, while separately limiting repeated submissions to the same contact value. Monitor before tightening so shared hotel/mobile networks do not block legitimate families.

## Accessible validation errors

WCAG requires automatically detected errors to identify the field and describe the problem in text. Instructions or expected formats must be visible when users need them, and color alone cannot identify an error. [WCAG 2.2, 3.3.1 Error Identification](https://www.w3.org/TR/WCAG22/#error-identification) · [WCAG 2.2, 3.3.2 Labels or Instructions](https://www.w3.org/TR/WCAG22/#labels-or-instructions) · [W3C Understanding 3.3.1](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html)

For this form:

- Keep a visible label for every input and mark required fields in text.
- Put a concise error beside each invalid field, set `aria-invalid="true"`, and associate the message with `aria-describedby`.
- Add a summary at the top after a failed submit. Give it `role="alert"`, list and link to each invalid field, and move focus to the summary or first invalid field so keyboard and screen-reader users immediately encounter it.
- Say what is wrong and how to fix it: “Choose an arrival date from 6 September 2026 onward,” “Departure must be on or after arrival,” or “Enter a whole number from 1 to 20.”
- Preserve all valid values after a failed browser or API validation.
- Avoid announcing errors on every keystroke. Validate on submit or after leaving a completed field; WAI notes that typing-time validation is unsuitable for formats such as dates.
- Use text plus visual treatment, never red borders alone.
- Keep the success confirmation programmatically announced.

WAI's forms tutorial recommends clear overall feedback, a linked error list, inline messages associated with controls using `aria-describedby`, focus on the first invalid control when useful, and `role="alert"` for dynamically inserted AJAX error summaries. [W3C WAI Forms Tutorial: User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)

## Recommended implementation order

1. Define and test one server validation contract for start date, end date, traveller count, telephone, strings, and select allowlists.
2. Replace the free-text dates control with arrival/departure native date inputs and mirror the server constraints in HTML.
3. Add an accessible country-code telephone control backed by maintained libphonenumber metadata; keep the field optional unless the business explicitly requires WhatsApp contact.
4. Return structured field errors from the API and connect them to an accessible browser error summary and inline messages.
5. Add durable endpoint-level rate limiting, 429 responses, privacy-minimized monitoring, and an adaptive challenge only when abuse signals justify it.
6. Regression-test direct API bypasses as well as browser behavior: malformed/nonexistent/past/reversed dates; `0`, negative, fractional, scientific-notation, and over-limit travellers; invalid international phones; oversized text; modified select values; foreign content types/origins; honeypot requests; duplicate retries; and throttle boundaries.

## Primary sources

- [WHATWG HTML Standard: input types and form control infrastructure](https://html.spec.whatwg.org/multipage/input.html)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- [OWASP Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP Bot Management and Anti-Automation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Bot_Management_and_Anti-Automation_Cheat_Sheet.html)
- [OWASP Denial of Service Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html)
- [Google libphonenumber repository and documentation](https://github.com/google/libphonenumber)
- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C WAI Forms Tutorial: User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
