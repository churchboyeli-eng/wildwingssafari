import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, Route } from 'lucide-react';
import { getPackageStartingPrice } from '../data/content';
import { getPackageMedia } from '../data/media';
import { itineraryPath } from '../lib/routes';

export default function PackageGrid({ packages, featured = false }) {
  return (
    <div className={`package-grid package-grid-count-${packages.length} ${featured ? 'package-grid-featured' : ''}`}>
      {packages.map((p, index) => {
        const startingPrice = getPackageStartingPrice(p);
        const priceLabel = startingPrice || p.priceLabel;
        const media = getPackageMedia(p.key);
        return (
          <article key={p.key} className={`tour-package-card ${media ? 'has-photo' : ''}`}>
            {media && (
              <div className="tour-package-photo">
                <img src={media.src} alt={media.alt} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />
              </div>
            )}
            <header className="tour-package-topline">
              <span className="tour-package-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="tour-package-duration"><CalendarDays aria-hidden="true" size={13} strokeWidth={2} />{p.duration}</span>
              {p.popular && <span className="tour-package-popular">Traveller favourite</span>}
            </header>
            <div className="tour-package-copy">
              <div className="tour-package-category"><span>{p.tag}</span></div>
              <h3>{p.name}</h3>
              <p>{p.copy}</p>
              <div className="tour-package-route"><Route aria-hidden="true" size={15} /><span>{p.route}</span></div>
              {priceLabel && (
                <div className="tour-package-price">
                  <span>{startingPrice ? 'Starts from' : 'Pricing'}</span>
                  <strong>{priceLabel} {startingPrice && <small>{p.pricing?.unitLabel || 'per person'}</small>}</strong>
                </div>
              )}
              <dl className="tour-package-details"><div><dt>Best for</dt><dd>{p.bestFor}</dd></div><div><dt>Included</dt><dd>{p.includes}</dd></div></dl>
              <div className="tour-package-footer">
                <span><Check aria-hidden="true" size={14} /> Private route</span>
                <Link to={itineraryPath(p.key)} className="tour-package-action">View trip <ArrowRight aria-hidden="true" size={15} strokeWidth={2} /></Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
