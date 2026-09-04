import { Link } from 'react-router-dom';
import { contact, waHref } from '../data/content';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-paper)',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(40px,6vw,70px) clamp(28px,6vw,90px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))',
        gap: 34,
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 600, color: 'var(--forest)' }}>Wild Wings</div>
        <div style={{ fontSize: 9, letterSpacing: '.36em', textTransform: 'uppercase', color: 'var(--terracotta)', margin: '4px 0 14px' }}>
          Travel &amp; Tours
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: '32ch', lineHeight: 1.6, margin: 0 }}>
          Your gateway to the wilderness. Locally owned, nationwide across Tanzania.
        </p>
      </div>
      <div>
        <div style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 14 }}>
          Explore
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14 }}>
          <Link to="/tanzania-travel-guide" style={{ color: 'var(--ink-soft)' }}>Inside Tanzania</Link>
          <Link to="/blog" style={{ color: 'var(--ink-soft)' }}>Blog</Link>
          <Link to="/gallery" style={{ color: 'var(--ink-soft)' }}>Gallery</Link>
          <Link to="/about" style={{ color: 'var(--ink-soft)' }}>About</Link>
          <Link to="/enquire" style={{ color: 'var(--ink-soft)' }}>Enquire</Link>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 14 }}>
          Contact
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14, color: 'var(--ink-soft)' }}>
          {waHref && <a href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp · {contact.whatsappNumber}</a>}
          {contact.bookingEmail && <a href={`mailto:${contact.bookingEmail}`}>{contact.bookingEmail}</a>}
          <span style={{ color: 'var(--muted)' }}>{contact.officeLocation}</span>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 14 }}>
          Itineraries
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14, color: 'var(--muted)' }}>
          <Link to="/itineraries/safaris">Tanzania safaris</Link>
          <Link to="/itineraries/kilimanjaro">Kilimanjaro routes</Link>
          <Link to="/itineraries/zanzibar">Zanzibar itineraries</Link>
          <Link to="/itineraries">View all itineraries</Link>
        </div>
      </div>
    </footer>
  );
}
