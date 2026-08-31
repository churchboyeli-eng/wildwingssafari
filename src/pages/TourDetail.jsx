import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  CircleHelp,
  Clock3,
  Compass,
  MapPin,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Sun,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getPackageStartingPrice, topPackages, tourPlanningQuestions, waHref } from '../data/content';

const itineraryHighlights = [
  'Private guiding and a route shaped around your dates',
  'Accommodation choices matched to your preferred comfort level',
  'Clear planning before you commit to a trip',
];

export default function TourDetail() {
  const { tourId } = useParams();
  const tour = topPackages.find((tourPackage) => tourPackage.key === tourId);
  const [openDay, setOpenDay] = useState(0);
  const [allOpen, setAllOpen] = useState(false);

  if (!tour) return <Navigate to="/itineraries" replace />;

  const prefill = `I'm interested in the ${tour.name} itinerary. Please tell me about dates, availability and options.`;
  const hasPricing = Boolean(tour.pricing?.rows?.length);
  const startingPrice = getPackageStartingPrice(tour);
  const openAllDays = () => {
    setAllOpen((current) => !current);
    setOpenDay(-1);
  };

  return (
    <div className="page-enter tour-detail-page">
      <section className="tour-detail-hero">
        <div className="tour-detail-hero-inner">
          <div className="tour-detail-hero-copy">
            <Link className="detail-back-link" to="/itineraries"><ArrowLeft aria-hidden="true" size={16} /> All itineraries</Link>
            <p className="eyebrow">{tour.tag} · Sample itinerary</p>
            <h1>{tour.name}</h1>
            <p className="tour-detail-lead">{tour.copy}</p>
            <div className="tour-detail-actions">
              <Link to="/booking" state={{ prefill }} className="btn-primary">Book now <ArrowRight aria-hidden="true" size={16} /></Link>
              <a href="#day-by-day" className="btn-quiet">Read the day-by-day <ChevronDown aria-hidden="true" size={16} /></a>
            </div>
          </div>

          <div className="tour-route-art" aria-label={`Route: ${tour.route}`}>
              <div className="tour-route-art-glow" aria-hidden="true" />
            <p>Route at a glance</p>
            <ol>
              {tour.stops.map((stop, index) => (
                <li key={`${stop}-${index}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{stop}</strong>
                </li>
              ))}
            </ol>
            <small>Every departure is tailored around your dates.</small>
            {startingPrice && (
              <div className="tour-hero-price">
                <span>Price starts from</span>
                <strong>{startingPrice}</strong>
                <small>USD per person</small>
                <a href="#pricing">View prices <ArrowRight aria-hidden="true" size={14} /></a>
              </div>
            )}
          </div>
        </div>
      </section>

      <nav className="tour-detail-nav" aria-label="Itinerary sections">
        <div>
          <a href="#overview">Overview</a>
          {hasPricing && <a href="#pricing">Price</a>}
          <a href="#day-by-day">Day by day</a>
          <a href="#included">What's included</a>
          <a href="#planning">Planning</a>
          <Link to="/booking" state={{ prefill }} className="tour-detail-nav-cta">Book now</Link>
        </div>
      </nav>

      <section className="tour-facts-band" aria-label="Trip facts">
        <div className="tour-facts-grid">
          <div><CalendarDays aria-hidden="true" size={18} /><span>Duration</span><strong>{tour.duration}</strong></div>
          <div><Route aria-hidden="true" size={18} /><span>Route</span><strong>{tour.route}</strong></div>
          <div><Compass aria-hidden="true" size={18} /><span>Best for</span><strong>{tour.bestFor}</strong></div>
          <div><ShieldCheck aria-hidden="true" size={18} /><span>Format</span><strong>Private & custom</strong></div>
        </div>
      </section>

      <section id="overview" className="tour-detail-section overview-section">
        <div className="tour-detail-layout">
          <div>
            <p className="eyebrow">The shape of the trip</p>
            <h2>A complete route, with room for your own pace.</h2>
            <p className="section-lead">{tour.overview}</p>
          </div>
          <aside className="detail-fit-card">
            <div className="detail-fit-icon"><Sparkles aria-hidden="true" size={18} /></div>
            <p className="eyebrow">Is this trip for you?</p>
            <p>{tour.suitability}</p>
            <ul>
              {itineraryHighlights.map((highlight) => <li key={highlight}><Check aria-hidden="true" size={15} />{highlight}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      {hasPricing && (
        <section id="pricing" className="tour-detail-section tour-price-section">
          <div className="tour-price-shell">
            <div className="detail-section-heading tour-price-heading">
              <div>
                <p className="eyebrow">Price guide</p>
                <h2>Tour price</h2>
              </div>
              <p>Per-person USD rates by group size. The final quote confirms dates, rooms and availability.</p>
            </div>

            <div className="tour-simple-price-list">
              {tour.pricing.rows.map((row) => (
                <article className="tour-simple-price-card" aria-label={`${row.label} for ${tour.name}`} key={row.label}>
                  <div className="tour-simple-price-head">
                    <div className="tour-simple-price-title">
                      <Sun aria-hidden="true" size={31} strokeWidth={1.8} />
                      <h3>{row.label}</h3>
                    </div>
                    <span className="tour-simple-price-period">{row.period || '2026 · USD per person'}</span>
                    <CircleHelp className="tour-simple-price-help" aria-hidden="true" size={22} strokeWidth={1.8} />
                  </div>
                  <div className="tour-simple-price-grid">
                    {row.prices.map((price) => (
                      <div className="tour-simple-price-cell" key={`${price.persons}-${price.amount}`}>
                        <span>{price.persons}</span>
                        <strong>${price.amount}</strong>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <p className="tour-simple-price-note">{tour.pricing.note}</p>
          </div>
        </section>
      )}

      <section id="day-by-day" className="tour-detail-section itinerary-section">
        <div className="detail-section-heading itinerary-heading">
          <div><p className="eyebrow">Your day-by-day programme</p><h2>See how each day unfolds.</h2></div>
          <div className="itinerary-heading-actions"><p>This route is a starting point. We will confirm timings and stays for your departure.</p><button type="button" onClick={openAllDays}>{allOpen ? 'Close all days' : 'Open all days'}</button></div>
        </div>
        <div className="day-list">
          {tour.days.map((day, index) => {
            const isOpen = allOpen || openDay === index;
            return (
              <article className={`day-panel ${isOpen ? 'is-open' : ''}`} key={day.label}>
                <button
                  type="button"
                  className="day-panel-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`day-${tour.key}-${index}`}
                  onClick={() => { setAllOpen(false); setOpenDay((current) => (current === index ? -1 : index)); }}
                >
                  <span className="day-number">{day.label}</span>
                  <span className="day-panel-title"><small><MapPin aria-hidden="true" size={14} /> {day.location}</small><strong>{day.title}</strong></span>
                  <ChevronDown aria-hidden="true" size={20} className="day-chevron" />
                </button>
                {isOpen && (
                  <div id={`day-${tour.key}-${index}`} className="day-panel-content">
                    <p>{day.copy}</p>
                    <div className="day-detail-row">
                      <span><BedDouble aria-hidden="true" size={16} /><b>Stay</b> {day.stay}</span>
                      <span><UtensilsCrossed aria-hidden="true" size={16} /><b>Meals</b> {day.meals || 'As confirmed in your proposal'}</span>
                      <span><Clock3 aria-hidden="true" size={16} /><b>Planning note</b> {day.note || 'Timings adapt to conditions'}</span>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <div className="route-adjust-callout">
          <div><p className="eyebrow">Want to change the rhythm?</p><h3>We can add nights, switch stays or reshape the route.</h3></div>
          <Link to="/enquire" state={{ prefill }} className="text-action">Adjust this route <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
      </section>

      <section id="included" className="tour-detail-section included-section">
        <div className="detail-section-heading">
          <div><p className="eyebrow">Clear before you book</p><h2>What your proposal will cover.</h2></div>
          <p>We make the quote specific to your route, accommodation choice and travel dates. Nothing important should be left to guesswork.</p>
        </div>
        <div className="included-grid">
          <div className="included-card is-included"><div className="included-title"><CircleCheck aria-hidden="true" size={21} /><h3>Included in your tailored proposal</h3></div><ul>{tour.inclusions.map((item) => <li key={item}><Check aria-hidden="true" size={15} />{item}</li>)}</ul></div>
          <div className="included-card"><div className="included-title"><X aria-hidden="true" size={21} /><h3>Plan for yourself</h3></div><ul>{tour.exclusions.map((item) => <li key={item}><span aria-hidden="true">•</span>{item}</li>)}</ul></div>
        </div>
        <div className="detail-note"><MessageCircle aria-hidden="true" size={18} /><p><strong>Good to know:</strong> We will explain the accommodation level, room setup, luggage considerations and transfer timing before you book.</p></div>
      </section>

      <section id="planning" className="tour-detail-section planning-section">
        <div className="planning-copy"><p className="eyebrow">Dates & availability</p><h2>Designed for your dates and group.</h2><p>We confirm the route after we know your travel window, party size and preferred comfort level. That keeps the proposal honest about seasonal availability and what is actually included.</p><Link to="/enquire" state={{ prefill }} className="btn-primary">Ask for dates and availability <ArrowRight aria-hidden="true" size={16} /></Link></div>
        <div className="planning-questions">
          {tourPlanningQuestions.map((item, index) => <div key={item.question}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.question}</h3><p>{item.answer}</p></div>)}
        </div>
      </section>

      <section className="tour-detail-closing">
        <div><p className="eyebrow">Ready when you are</p><h2>Let's make this route yours.</h2><p>Tell us the dates you have in mind, who is travelling and what you want to experience. We will shape the details from there.</p></div>
        <div className="closing-actions"><Link to="/booking" state={{ prefill }} className="btn-primary">Book now <ArrowRight aria-hidden="true" size={16} /></Link><a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><MessageCircle aria-hidden="true" size={17} /> WhatsApp us</a></div>
      </section>
    </div>
  );
}
