import { waHref } from '../data/content';
import { MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  return (
    <div
      style={{
        position: 'fixed',
        right: 'clamp(14px,3vw,26px)',
        bottom: 'clamp(14px,3vw,26px)',
        zIndex: 55,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Wild Wings on WhatsApp"
        title="Chat with Wild Wings on WhatsApp"
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'var(--whatsapp)',
          color: '#0b3d21',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 700,
          boxShadow: '0 6px 18px rgba(0,0,0,.22)',
        }}
      >
        <MessageCircle aria-hidden="true" size={22} strokeWidth={2} />
      </a>
    </div>
  );
}
