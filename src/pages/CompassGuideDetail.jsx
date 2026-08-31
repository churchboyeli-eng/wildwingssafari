import { ArrowLeft, ArrowRight, Check, ExternalLink, MapPin } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getCompassGuide } from '../data/compassGuides';

export default function CompassGuideDetail() {
  const { guideSlug } = useParams();
  const guide = getCompassGuide(guideSlug);

  if (!guide) return <Navigate to="/tanzania-travel-guide" replace />;

  const isInternalSource = guide.sourceUrl.startsWith('/');

  return (
    <div className="page-enter compass-detail-page">
      <section className="compass-detail-hero">
        <Link to="/tanzania-travel-guide" className="compass-detail-back"><ArrowLeft aria-hidden="true" size={15} /> Back to Inside Tanzania</Link>
        <div className="compass-detail-hero-grid">
          <div>
            <p className="eyebrow">{guide.category}</p>
            <h1>{guide.name}</h1>
            <p>{guide.intro}</p>
          </div>
          <aside className="compass-detail-summary" aria-label={`${guide.name} summary`}>
            <MapPin aria-hidden="true" size={22} />
            <p>{guide.label}</p>
            <strong>{guide.bestFor}</strong>
          </aside>
        </div>
        <div className="compass-detail-facts">
          {guide.facts.map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
      </section>

      <section className="compass-detail-layout">
        <aside className="compass-source-card">
          <p className="eyebrow">Source note</p>
          <h2>Facts first, then route advice.</h2>
          <p>We use the park's own information for facts, then add practical advice for your route.</p>
          <p><strong>Source:</strong> {guide.sourceName}</p>
          {isInternalSource ? (
            <Link to={guide.sourceUrl}>Ask us about this <ArrowRight aria-hidden="true" size={14} /></Link>
          ) : (
            <a href={guide.sourceUrl} target="_blank" rel="noopener noreferrer">Open official source <ExternalLink aria-hidden="true" size={14} /></a>
          )}
        </aside>

        <article className="compass-detail-article">
          <section>
            <p className="eyebrow">History and context</p>
            <h2>Why this matters</h2>
            <p>{guide.history}</p>
          </section>

          <section>
            <p className="eyebrow">Wild Wings route logic</p>
            <h2>How we use it in an itinerary</h2>
            <p>{guide.routeLogic}</p>
          </section>

          <section>
            <p className="eyebrow">Planning fit</p>
            <h2>When it belongs in the route</h2>
            <p>{guide.whenToUse}</p>
          </section>

          <section>
            <p className="eyebrow">Useful details</p>
            <h2>What to know before you go</h2>
            <ul>
              {guide.details.map((detail) => <li key={detail}><Check aria-hidden="true" size={15} />{detail}</li>)}
            </ul>
          </section>
        </article>
      </section>

      <section className="compass-detail-closing">
        <div>
          <p className="eyebrow">Build around this</p>
          <h2>Want to include this in your route?</h2>
          <p>Send your dates, travel style and must-see places. We will tell you where this fits, how long to allow and what to combine it with.</p>
        </div>
        <Link to="/enquire" className="btn-primary">Request a route proposal <ArrowRight aria-hidden="true" size={16} /></Link>
      </section>
    </div>
  );
}
