import { waHref } from '../data/content';
import { MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  if (!waHref) return null;

  return (
    <div className="floating-actions">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Wild Wings on WhatsApp"
        title="Chat with Wild Wings on WhatsApp"
        className="floating-whatsapp"
      >
        <MessageCircle aria-hidden="true" size={22} strokeWidth={2} />
      </a>
    </div>
  );
}
