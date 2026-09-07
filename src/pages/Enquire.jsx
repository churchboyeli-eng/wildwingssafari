import { useRef, useState } from 'react';
import { ArrowRight, CalendarDays, Check, ChevronDown, Mail, MapPin, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input/max';
import 'react-phone-number-input/style.css';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { contact, enquireFaqs, waHref } from '../data/content';
import {
  accommodationOptions,
  itineraryOptions,
  startingPointOptions,
  travelStyleOptions,
} from '../lib/enquiry-options';

const bookingSteps = [
  ['01', 'Send the essentials', 'Dates, group size and the kind of Tanzania you want to see.'],
  ['02', 'Review your proposal', 'We reply with a route, stays, inclusions and a clear quote.'],
  ['03', 'Confirm with confidence', 'Once everything feels right, we secure the arrangements.'],
];

const travellerOptions = Array.from({ length: 20 }, (_, index) => index + 1);

const tanzaniaToday = () => {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Africa/Dar_es_Salaam',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const part = (type) => parts.find((item) => item.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
};

const FIELD_MESSAGES = {
  name: 'Enter your full name.',
  email: 'Enter a valid email address.',
  whatsapp: 'Choose a country code and enter a valid WhatsApp number, or leave it empty.',
  travellers: 'Choose the number of travellers.',
  startDate: 'Choose an arrival date from today onward.',
  endDate: 'Choose a departure date on or after arrival.',
};

const FIELD_IDS = {
  name: 'booking-name',
  email: 'booking-email',
  whatsapp: 'booking-whatsapp',
  travellers: 'booking-travellers',
  itinerary: 'booking-itinerary',
  startDate: 'booking-start-date',
  endDate: 'booking-end-date',
  startingPoint: 'booking-starting-point',
  accommodation: 'booking-accommodation',
  travelStyle: 'booking-travel-style',
  message: 'booking-message',
};

const focusField = (field) => document.getElementById(FIELD_IDS[field])?.focus();

const clientFieldErrors = (form, phoneIsValid) => {
  const errors = {};
  for (const field of ['name', 'email', 'travellers', 'startDate', 'endDate']) {
    if (!form.elements.namedItem(field)?.checkValidity()) errors[field] = FIELD_MESSAGES[field];
  }
  if (!phoneIsValid) errors.whatsapp = FIELD_MESSAGES.whatsapp;
  return errors;
};

export default function Enquire() {
  const location = useLocation();
  const prefill = location.state?.prefill || '';
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [whatsapp, setWhatsapp] = useState();
  const [arrivalDate, setArrivalDate] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const requestIdRef = useRef('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const phoneIsValid = !whatsapp || isValidPhoneNumber(whatsapp);
    const nextFieldErrors = clientFieldErrors(form, phoneIsValid);
    if (Object.keys(nextFieldErrors).length) {
      setFieldErrors(nextFieldErrors);
      focusField(Object.keys(nextFieldErrors)[0]);
      return;
    }

    setFieldErrors({});
    const formData = Object.fromEntries(new FormData(form).entries());
    requestIdRef.current ||= globalThis.crypto?.randomUUID?.()
      || `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    setSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...formData, requestId: requestIdRef.current }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        if (result?.fieldErrors) {
          setFieldErrors(result.fieldErrors);
          focusField(Object.keys(result.fieldErrors)[0]);
        }
        throw new Error(result?.message || 'We could not send your request. Please try again.');
      }

      setSent(true);
      form.reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'We could not send your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const errorFor = (field) => fieldErrors[field]
    ? <span className="booking-field-error" id={`booking-${field}-error`}>{fieldErrors[field]}</span>
    : null;

  const describedBy = (field) => fieldErrors[field] ? `booking-${field}-error` : undefined;

  return (
    <div className="page-enter booking-page">
      <section className="booking-hero" aria-labelledby="booking-heading">
        <div className="booking-hero-inner">
          <div className="booking-hero-copy">
            <p className="eyebrow">Start with a conversation</p>
            <h1 id="booking-heading">Tell us about your Tanzania trip.</h1>
            <p>Share a few details and we will turn the first conversation into a clear route and quote.</p>
          </div>
          <div className="booking-steps" aria-label="Booking steps">
            {bookingSteps.map(([number, title, copy]) => <div className="booking-step" key={number}><span>{number}</span><div><strong>{title}</strong><p>{copy}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="booking-content" aria-labelledby="booking-form-heading">
        <div className="booking-form-column">
          <header className="booking-form-heading">
            <p className="eyebrow">Plan your trip</p>
            <h2 id="booking-form-heading">The details we need.</h2>
            <p>These answers help us recommend the right parks, pace and accommodation. Nothing is final until you approve the proposal.</p>
          </header>

          {prefill && <div className="booking-prefill"><Sparkles aria-hidden="true" size={16} /><span><strong>We have your starting idea.</strong> Add anything else you would like us to know below.</span></div>}

          {sent ? (
            <div className="booking-success" role="status">
              <div className="booking-success-icon"><Check aria-hidden="true" size={22} /></div>
              <p className="eyebrow">Request received</p>
              <h3>Asante sana.</h3>
              <p>Thank you. Our team will reply within 24 hours with the next step for your safari.</p>
              <Link to="/" className="booking-success-link">Back to home <ArrowRight aria-hidden="true" size={15} /></Link>
            </div>
          ) : (
            <form
              className={`booking-form${Object.keys(fieldErrors).length ? ' booking-form-validated' : ''}`}
              noValidate
              onChange={(event) => {
                const { name } = event.target;
                if (name && fieldErrors[name] && event.target.checkValidity()) {
                  setFieldErrors((current) => {
                    const next = { ...current };
                    delete next[name];
                    return next;
                  });
                }
              }}
              onSubmit={handleSubmit}
            >
              <label className="booking-honeypot" aria-hidden="true">Company<input name="company" tabIndex="-1" autoComplete="off" /></label>
              {Object.keys(fieldErrors).length > 0 && (
                <div className="booking-form-error booking-validation-summary" role="alert">
                  <strong>Please correct these details:</strong>
                  <ul>{Object.entries(fieldErrors).map(([field, message]) => (
                    <li key={field}>
                      {FIELD_IDS[field]
                        ? <a href={`#${FIELD_IDS[field]}`} onClick={(event) => { event.preventDefault(); focusField(field); }}>{message}</a>
                        : message}
                    </li>
                  ))}</ul>
                </div>
              )}
              <div className="booking-form-grid">
                <label>Full name <span className="booking-required">required</span><input id={FIELD_IDS.name} aria-describedby={describedBy('name')} aria-invalid={Boolean(fieldErrors.name)} required minLength="2" maxLength="100" name="name" autoComplete="name" placeholder="Your name" />{errorFor('name')}</label>
                <label>Email address <span className="booking-required">required</span><input id={FIELD_IDS.email} aria-describedby={describedBy('email')} aria-invalid={Boolean(fieldErrors.email)} required maxLength="254" type="email" name="email" autoComplete="email" placeholder="you@example.com" />{errorFor('email')}</label>
              </div>
              <div className="booking-form-grid">
                <div className="booking-phone-field"><span>WhatsApp number <span className="booking-optional">optional · choose country code</span></span>
                  <PhoneInput
                    id={FIELD_IDS.whatsapp}
                    aria-describedby={describedBy('whatsapp')}
                    aria-invalid={Boolean(fieldErrors.whatsapp)}
                    aria-label="WhatsApp number"
                    autoComplete="tel"
                    className="booking-phone-input"
                    countryCallingCodeEditable={false}
                    defaultCountry="TZ"
                    international
                    limitMaxLength
                    onChange={(value) => {
                      setWhatsapp(value);
                      if (fieldErrors.whatsapp && (!value || isValidPhoneNumber(value))) {
                        setFieldErrors((current) => {
                          const next = { ...current };
                          delete next.whatsapp;
                          return next;
                        });
                      }
                    }}
                    placeholder="Phone number"
                    value={whatsapp}
                  />
                  <input name="whatsapp" type="hidden" value={whatsapp || ''} />
                  {errorFor('whatsapp')}
                </div>
                <label>Number of travellers <span className="booking-required">required</span><select id={FIELD_IDS.travellers} aria-describedby={describedBy('travellers')} aria-invalid={Boolean(fieldErrors.travellers)} required name="travellers" defaultValue=""><option value="" disabled>Choose travellers</option>{travellerOptions.map((count) => <option key={count} value={count}>{count} {count === 1 ? 'traveller' : 'travellers'}</option>)}</select>{errorFor('travellers')}</label>
              </div>
              <label>Safari or journey<select id={FIELD_IDS.itinerary} aria-describedby={describedBy('itinerary')} aria-invalid={Boolean(fieldErrors.itinerary)} name="itinerary" defaultValue={itineraryOptions[0].value}>{itineraryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{errorFor('itinerary')}</label>
              <div className="booking-form-grid">
                <label>Arrival date <span className="booking-required">required · today or later</span><input id={FIELD_IDS.startDate} aria-describedby={describedBy('startDate')} aria-invalid={Boolean(fieldErrors.startDate)} required min={tanzaniaToday()} name="startDate" type="date" value={arrivalDate} onChange={(event) => setArrivalDate(event.target.value)} />{errorFor('startDate')}</label>
                <label>Departure date <span className="booking-required">required · same day or later</span><input id={FIELD_IDS.endDate} aria-describedby={describedBy('endDate')} aria-invalid={Boolean(fieldErrors.endDate)} required min={arrivalDate || tanzaniaToday()} name="endDate" type="date" />{errorFor('endDate')}</label>
              </div>
              <label>Starting point<select id={FIELD_IDS.startingPoint} aria-describedby={describedBy('startingPoint')} aria-invalid={Boolean(fieldErrors.startingPoint)} name="startingPoint" defaultValue={startingPointOptions[0].value}>{startingPointOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{errorFor('startingPoint')}</label>
              <div className="booking-form-grid">
                <label>Accommodation<select id={FIELD_IDS.accommodation} aria-describedby={describedBy('accommodation')} aria-invalid={Boolean(fieldErrors.accommodation)} name="accommodation" defaultValue={accommodationOptions[0].value}>{accommodationOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{errorFor('accommodation')}</label>
                <label>Travel style<select id={FIELD_IDS.travelStyle} aria-describedby={describedBy('travelStyle')} aria-invalid={Boolean(fieldErrors.travelStyle)} name="travelStyle" defaultValue={travelStyleOptions[0].value}>{travelStyleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{errorFor('travelStyle')}</label>
              </div>
              <label>Anything you want us to plan<textarea id={FIELD_IDS.message} aria-describedby={describedBy('message')} aria-invalid={Boolean(fieldErrors.message)} maxLength="3000" name="message" rows="5" defaultValue={prefill} placeholder="Wildlife priorities, celebrations, dietary needs or anything that would make this trip feel like yours." />{errorFor('message')}</label>
              {errorMessage && <p className="booking-form-error" role="alert">{errorMessage}</p>}
              <Button type="submit" className="booking-submit" size="lg" disabled={submitting} aria-busy={submitting}>
                {submitting ? 'Sending your request…' : 'Send safari request'}
                {!submitting && <ArrowRight aria-hidden="true" size={16} />}
              </Button>
              {submitting && <p className="booking-form-progress" role="status">Sending securely. Please keep this page open for a few seconds.</p>}
              <p className="booking-form-note"><ShieldCheck aria-hidden="true" size={15} /> No payment now. We respond with a tailored proposal and a clear price.</p>
            </form>
          )}
        </div>

        <aside className="booking-aside">
          <Card className="booking-aside-card gap-0 rounded-[10px] ring-0">
            <div className="booking-aside-icon"><CalendarDays aria-hidden="true" size={18} /></div>
            <p className="eyebrow">Private safari planning</p>
            <h2>Your trip, clearly quoted.</h2>
            <p>We show the route, accommodation, included services and the price logic before you commit.</p>
            <ul>{['A dedicated guide and private 4×4', 'A route matched to the season', 'Support from arrival to departure'].map((item) => <li key={item}><Check aria-hidden="true" size={15} />{item}</li>)}</ul>
          </Card>

          <div className="booking-contact-card">
            <p className="eyebrow">Prefer to talk first?</p>
            <h3>We are close to the details.</h3>
            {waHref && <a href={waHref} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" size={16} /> {contact.whatsappNumber}</a>}
            {contact.bookingEmail && <a href={`mailto:${contact.bookingEmail}`}><Mail aria-hidden="true" size={16} /> {contact.bookingEmail}</a>}
            <span><MapPin aria-hidden="true" size={16} /> {contact.officeLocation}</span>
          </div>

          <div className="booking-faqs">
            <p className="eyebrow">Good to know</p>
            {enquireFaqs.slice(0, 3).map((faq) => <details key={faq.q}><summary>{faq.q}<ChevronDown aria-hidden="true" size={16} /></summary><p>{faq.a}</p></details>)}
          </div>
        </aside>
      </section>
    </div>
  );
}
