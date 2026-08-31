import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, Route } from 'lucide-react';
import { getPackageStartingPrice } from '../data/content';

export default function PackageGrid({ packages, featured = false }) {
  return (
    <div className={`package-grid package-grid-count-${packages.length} ${featured ? 'package-grid-featured' : ''}`}>
      {packages.map((p, index) => {
        const startingPrice = getPackageStartingPrice(p);
        return (
          <article key={p.key} className="tour-package-card">
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
              {startingPrice && (
                <div className="tour-package-price">
                  <span>Price starts from</span>
                  <strong>{startingPrice} <small>USD pp</small></strong>
                </div>
              )}
              <dl className="tour-package-details"><div><dt>Best for</dt><dd>{p.bestFor}</dd></div><div><dt>Included</dt><dd>{p.includes}</dd></div></dl>
              <div className="tour-package-footer">
                <span><Check aria-hidden="true" size={14} /> Private route</span>
                <Link to={`/tours/${p.key}`} className="tour-package-action">Full itinerary <ArrowRight aria-hidden="true" size={15} strokeWidth={2} /></Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
