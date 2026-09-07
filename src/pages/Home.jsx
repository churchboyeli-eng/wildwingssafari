import { useState } from 'react';
import { ArrowRight, Check, Clock3, MapPin, MessageCircle, Minus, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PackageGrid from '../components/PackageGrid';
import { itineraryPath } from '../lib/routes';
import {
  featuredTourPackageKeys,
  getPackageStartingPrice,
  homeOfferPackageKeys,
  why,
  topPackages,
  testimonials,
  trustBadges,
  homeFaqs,
  specialistPoints,
  waHref,
} from '../data/content';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(-1);
  const featuredPackages = topPackages.filter((tourPackage) => featuredTourPackageKeys.includes(tourPackage.key));
  const whatWeOfferCards = homeOfferPackageKeys
    .map((key) => topPackages.find((tourPackage) => tourPackage.key === key))
    .filter(Boolean);

  return (
    <div className="home-page page-enter">
      <section className="home-report-hero" aria-labelledby="home-title">
        <video className="home-hero-video" autoPlay loop muted playsInline preload="metadata" poster="/media/wildwings-hero-poster.jpg" aria-hidden="true">
          <source src="/media/wildwings-hero.mp4" type="video/mp4" />
        </video>
        <div className="home-report-hero-shade" aria-hidden="true" />
        <div className="home-report-wrap home-report-hero-content">
          <div className="home-report-hero-copy">
            <p className="home-report-kicker">Tanzania, planned locally</p>
            <h1 id="home-title">Your gateway to the wilderness.</h1>
            <p className="home-report-lede">We plan the details so you can stay present in Tanzania.</p>
            <div className="home-report-actions">
              <Link to="/enquire" className="btn">Plan your trip</Link>
              <Link to="/itineraries/safaris" className="btn-outline">See safaris</Link>
            </div>
          </div>
          <dl className="home-report-hero-facts">
            <div><dt>Tailor-made</dt><dd>Every safari is shaped around your dates and pace.</dd></div>
            <div><dt>Based in Tanzania</dt><dd>Local safari specialists from the first message onward.</dd></div>
          </dl>
        </div>
      </section>

      <section className="home-report-routes" aria-labelledby="offerings-heading">
        <div className="home-report-wrap">
          <header className="home-report-section-heading">
            <div>
              <p className="home-report-kicker">Start with a route</p>
              <h2 id="offerings-heading">Choose your safari starting point.</h2>
            </div>
            <div>
              <p>Start with a sample route. Each page sets out the daily plan, what is included and a clear price guide.</p>
              <Link to="/itineraries" className="home-report-text-link">View all trips <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
          </header>
          <div className="home-report-card-grid">
            {whatWeOfferCards.map((offer) => {
              const startingPrice = getPackageStartingPrice(offer);
              const priceLabel = startingPrice || offer.priceLabel;
              return (
                <article className="home-report-route-card" key={offer.key}>
                  <div className="home-report-card-topline"><span>{offer.num}</span><p>{offer.tag}</p></div>
                  <h3>{offer.name}</h3>
                  <p className="home-report-card-copy">{offer.copy}</p>
                  <div className="home-report-card-meta" aria-label={`${offer.name} quick facts`}>
                    <span><Clock3 aria-hidden="true" size={14} /> {offer.duration}</span>
                    <span><MapPin aria-hidden="true" size={14} /> {offer.route}</span>
                  </div>
                  <footer>
                    {priceLabel && <p className="home-report-card-price"><span>{startingPrice ? 'From' : 'Pricing'}</span><strong>{priceLabel}</strong>{startingPrice && <small>{offer.pricing?.unitShortLabel || 'USD pp'}</small>}</p>}
                    <Link to={itineraryPath(offer.key)} className="home-report-card-action">Full itinerary <ArrowRight aria-hidden="true" size={15} /></Link>
                  </footer>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-report-reasons" aria-labelledby="planning-heading">
        <div className="home-report-wrap home-report-split">
          <header>
            <p className="home-report-kicker">Why travel with us</p>
            <h2 id="planning-heading">We make the planning part clear.</h2>
            <p className="home-report-lede">See the route, price and practical details before you decide. Our team is based in Tanzania and stays close to the trip from the first message onward.</p>
            <Link to="/enquire" className="btn-dark">Start planning with us</Link>
          </header>
          <div className="home-report-reason-list">
            {why.map((item) => (
              <article key={item.num}>
                <p className="home-report-reason-number">{item.num}</p>
                <div><h3>{item.title}</h3><p className="home-report-reason-lead">{item.lead}</p><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-report-packages" aria-labelledby="packages-heading">
        <div className="home-report-wrap">
          <header className="home-report-section-heading">
            <div><p className="home-report-kicker">Routes guests ask for most</p><h2 id="packages-heading">Most requested safaris</h2></div>
            <div><p>Six starting points for short fly-in safaris, Northern Circuit classics and migration weeks. We tailor the final route around your dates.</p><Link to="/itineraries" className="home-report-text-link">View all packages <ArrowRight aria-hidden="true" size={16} /></Link></div>
          </header>
          <PackageGrid packages={featuredPackages} featured />
        </div>
      </section>

      <section className="home-report-guest-notes" aria-labelledby="guest-notes-heading">
        <div className="home-report-wrap">
          <header className="home-report-section-heading home-report-centered-heading">
            <div><p className="home-report-kicker">Guest notes</p><h2 id="guest-notes-heading">What travellers say after the trip</h2></div>
            <div><span className="review-stars" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" size={17} fill="currentColor" strokeWidth={1.8} />)}</span><p>Reviews on TripAdvisor, SafariBookings and Google.</p></div>
          </header>
          <div className="home-report-testimonials">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.key}>
                <blockquote>“{testimonial.quote}”</blockquote>
                <figcaption><span>{testimonial.initials}</span><div><strong>{testimonial.name}</strong><small>{testimonial.country} · {testimonial.source}</small></div></figcaption>
              </figure>
            ))}
          </div>
          <div className="home-report-trust-badges">{trustBadges.map((badge) => <span key={badge}>{badge}</span>)}</div>
        </div>
      </section>

      <section className="home-report-faq" aria-labelledby="faq-heading">
        <div className="home-report-wrap home-report-split">
          <header>
            <p className="home-report-kicker">Questions</p>
            <h2 id="faq-heading">Tanzania safari, answered.</h2>
            <p className="home-report-lede">Answers to the questions we hear most. If yours is missing, send us a message.</p>
            {waHref ? <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-dark"><MessageCircle aria-hidden="true" size={17} /> Ask on WhatsApp</a> : <Link to="/enquire" className="btn">Ask about your trip</Link>}
          </header>
          <div className="home-report-faq-list">
            {homeFaqs.map((item, index) => {
              const open = openFaq === index;
              return <article key={item.q} className={open ? 'is-open' : ''}>
                <button id={`home-faq-trigger-${index}`} type="button" onClick={() => setOpenFaq(open ? -1 : index)} aria-expanded={open} aria-controls={`home-faq-${index}`}>
                  <span>{item.q}</span>{open ? <Minus aria-hidden="true" size={18} /> : <Plus aria-hidden="true" size={18} />}
                </button>
                {open && (
                  <div id={`home-faq-${index}`} className="home-report-faq-answer" role="region" aria-labelledby={`home-faq-trigger-${index}`}>
                    <p>{item.a}</p>
                  </div>
                )}
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="home-report-specialist" aria-labelledby="specialist-heading">
        <div className="home-report-wrap home-report-specialist-grid">
          <div className="home-report-specialist-image"><ImagePlaceholder label="Guide with guests / private safari vehicle" /><p><strong>100%</strong>Specialised in Tanzania</p></div>
          <div>
            <p className="home-report-kicker">Built around Tanzania</p>
            <h2 id="specialist-heading">Why travellers choose Wild Wings</h2>
            <p className="home-report-lede">Private guides, comfortable vehicles and flexible days. We prepare the route with you, then stay available while you travel.</p>
            <ul>{specialistPoints.map((point) => <li key={point}><Check aria-hidden="true" size={16} />{point}</li>)}</ul>
            <div className="home-report-actions"><Link to="/enquire" className="btn">Request a proposal</Link><Link to="/itineraries" className="btn-outline">View itineraries</Link></div>
          </div>
        </div>
      </section>
    </div>
  );
}
