import { useState } from 'react';
import { ArrowRight, CalendarDays, Check, ChevronDown, Mail, MapPin, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { contact, enquireFaqs, topPackages, waHref } from '../data/content';

const itineraryOptions = [
  "I'm not sure yet",
  ...topPackages.slice(0, 6).map((tourPackage) => tourPackage.name),
  'Kilimanjaro climb',
  'Zanzibar beach stay',
  'Custom route',
];

const bookingSteps = [
  ['01', 'Send the essentials', 'Dates, group size and the kind of Tanzania you want to see.'],
  ['02', 'Review your proposal', 'We reply with a route, stays, inclusions and a clear quote.'],
  ['03', 'Confirm with confidence', 'Once everything feels right, we secure the arrangements.'],
];

export default function Enquire() {
  const location = useLocation();
  const prefill = location.state?.prefill || '';
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

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
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="booking-form-grid">
                <label>Full name<input required name="name" autoComplete="name" placeholder="Your name" /></label>
                <label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label>
              </div>
              <div className="booking-form-grid">
                <label>WhatsApp number <span className="booking-optional">optional</span><input name="whatsapp" type="tel" autoComplete="tel" placeholder="+255 …" /></label>
                <label>Number of travellers<input required name="travellers" type="number" min="1" max="20" inputMode="numeric" placeholder="e.g. 2" /></label>
              </div>
              <label>Safari or journey<select name="itinerary" defaultValue={itineraryOptions[0]}>{itineraryOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
              <div className="booking-form-grid">
                <label>Preferred dates <span className="booking-optional">flexible is fine</span><input required name="dates" placeholder="e.g. 12–20 July 2027" /></label>
                <label>Starting point<select name="startingPoint" defaultValue="Arusha or Zanzibar"><option>Arusha or Zanzibar</option><option>Arusha</option><option>Dar es Salaam</option><option>Zanzibar</option><option>Moshi</option></select></label>
              </div>
              <div className="booking-form-grid">
                <label>Accommodation<select name="accommodation" defaultValue="Comfortable mid-range"><option>Comfortable mid-range</option><option>Simple and great value</option><option>Upper mid-range</option><option>Luxury lodges and camps</option><option>Help me choose</option></select></label>
                <label>Travel style<select name="travelStyle" defaultValue="Private safari"><option>Private safari</option><option>Safari + Zanzibar</option><option>Kilimanjaro + safari</option><option>Family-friendly pace</option><option>Honeymoon or celebration</option></select></label>
              </div>
              <label>Anything you want us to plan<textarea name="message" rows="5" defaultValue={prefill} placeholder="Wildlife priorities, celebrations, dietary needs or anything that would make this trip feel like yours." /></label>
              <Button type="submit" className="booking-submit" size="lg">Send safari request <ArrowRight aria-hidden="true" size={16} /></Button>
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
