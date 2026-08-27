import { useState } from 'react';
import { ArrowRight, Mail, MapPin, MessageCircle, Minus, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { contact, enquireFaqs, tripOptions, waHref } from '../data/content';

export default function Enquire() {
  const location = useLocation();
  const prefill = location.state?.prefill || '';
  const [openFaq, setOpenFaq] = useState(-1);
  const [sent, setSent] = useState(false);

  const toggleFaq = (i) => setOpenFaq((cur) => (cur === i ? -1 : i));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page-enter" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,330px),1fr))' }}>
      <div style={{ padding: 'clamp(44px,6vw,84px) clamp(28px,5vw,64px)', background: 'var(--bg-paper)' }}>
        <div style={{ fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 14 }}>Plan your trip</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px,4.2vw,52px)', lineHeight: 1.02, margin: 0 }}>
          Tell us about your dream trip.
        </h1>
        <p style={{ fontSize: 16, color: 'var(--body)', maxWidth: '40ch', margin: '18px 0 28px', lineHeight: 1.6 }}>
          Share a few details and we'll craft a personalised itinerary and quote. Prefer to talk now? Reach us directly.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15 }}>
          <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--ink)' }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--whatsapp)', color: '#0b3d21', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>
              <MessageCircle aria-hidden="true" size={16} strokeWidth={2} />
            </span>
            {contact.whatsappNumber}
          </a>
          <a href={`mailto:${contact.bookingEmail}`} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--ink)' }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--gold)', color: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
              <Mail aria-hidden="true" size={16} strokeWidth={2} />
            </span>
            {contact.bookingEmail}
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--body)' }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #b9b09c', color: 'var(--faint)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
              <MapPin aria-hidden="true" size={16} strokeWidth={2} />
            </span>
            {contact.officeLocation}
          </div>
        </div>

        <div style={{ marginTop: 40, borderTop: '1px solid #e0d6c0', paddingTop: 26 }}>
          <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 12 }}>
            Good to know
          </div>
          {enquireFaqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} style={{ borderBottom: '1px solid var(--border)' }}>
                <button
                  onClick={() => toggleFaq(i)}
                  className="accordion-trigger"
                  aria-expanded={open}
                  aria-controls={`enquire-faq-${i}`}
                  style={{
                    boxSizing: 'border-box',
                    gap: 14,
                    padding: '13px 0',
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  <span>{f.q}</span>
                  <span style={{ color: open ? 'var(--terracotta)' : 'var(--faint)', display: 'inline-flex' }}>
                    {open ? <Minus aria-hidden="true" size={18} strokeWidth={2} /> : <Plus aria-hidden="true" size={18} strokeWidth={2} />}
                  </span>
                </button>
                {open && (
                  <p id={`enquire-faq-${i}`} style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--body)', margin: 0, padding: '0 0 16px', maxWidth: '46ch' }}>
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: 'clamp(44px,6vw,84px) clamp(28px,5vw,64px)', display: 'flex', alignItems: 'center' }}>
        {sent ? (
          <div role="status" style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4vw,44px)', color: 'var(--terracotta)', marginBottom: 12 }}>
              Asante sana!
            </div>
            <p style={{ fontSize: 16, color: 'var(--body)', maxWidth: '36ch', margin: '0 auto 24px' }}>
              Thank you — your enquiry is in. Our team will reply within 24 hours to start planning your journey.
            </p>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--terracotta)', fontWeight: 600, borderBottom: '1px solid var(--gold)', paddingBottom: 3 }}>
              Back to home <ArrowRight aria-hidden="true" size={14} strokeWidth={2} />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 16 }}>
              <label style={fieldLabelStyle}>
                Name
                <input required name="name" autoComplete="name" placeholder="Your name" style={fieldInputStyle} />
              </label>
              <label style={fieldLabelStyle}>
                Email / WhatsApp
                <input required name="contact" autoComplete="email" placeholder="you@example.com or +255…" style={fieldInputStyle} />
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 16 }}>
              <label style={fieldLabelStyle}>
                Interested in
                <select name="trip" style={fieldInputStyle} defaultValue={tripOptions[0]}>
                  {tripOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                  <option>Custom / not sure yet</option>
                </select>
              </label>
              <label style={fieldLabelStyle}>
                Travellers
                <input name="travellers" inputMode="numeric" placeholder="e.g. 2 adults" style={fieldInputStyle} />
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 16 }}>
              <label style={fieldLabelStyle}>
                Approx. dates
                <input name="dates" placeholder="Month / flexible" style={fieldInputStyle} />
              </label>
              <label style={fieldLabelStyle}>
                Budget (optional)
                <input name="budget" placeholder="Per person / total" style={fieldInputStyle} />
              </label>
            </div>
            <label style={fieldLabelStyle}>
              Tell us more
              <textarea
                rows={3}
                name="message"
                defaultValue={prefill}
                placeholder="What would make this trip unforgettable?"
                style={{ ...fieldInputStyle, resize: 'vertical' }}
              />
            </label>
            <button type="submit" className="btn-dark" style={{ marginTop: 6, width: '100%', padding: 15 }}>
              Send enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const fieldLabelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  fontSize: 11,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: 'var(--faint)',
};

const fieldInputStyle = {
  background: 'var(--bg-paper)',
  border: '1px solid #e0d6c0',
  borderRadius: 4,
  color: 'var(--ink)',
  padding: '11px 12px',
  fontSize: 16,
  fontFamily: 'var(--sans)',
};
