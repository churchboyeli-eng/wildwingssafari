import { ArrowRight, Check, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinations } from '../data/content';

export default function Destinations() {
  return (
    <div className="page-enter destinations-page">
      <section className="destinations-hero">
        <div>
          <p className="eyebrow">Explore Tanzania</p>
          <h1>Six ways to make Tanzania your own.</h1>
        </div>
        <p>Choose a classic safari, a quieter southern escape, the island, the mountain—or combine them into one private journey. Each route is a starting point, shaped around your time and travel style.</p>
      </section>

      <section className="destination-routes" aria-labelledby="destination-routes-heading">
        <header className="destination-routes-heading">
          <div><p className="eyebrow">Start with a travel style</p><h2 id="destination-routes-heading">Six distinct reasons to go.</h2></div>
          <p>The line-up puts the right choices upfront: the Northern Circuit, a quieter Mikumi and Nyerere pairing, Zanzibar, and the journeys that bring them together.</p>
        </header>
        <div className="destination-route-grid">
          {destinations.map((destination) => (
            <article id={destination.key} className="destination-route-card" key={destination.key}>
              <div className="destination-route-topline"><span>{destination.num}</span><p>{destination.tag}</p></div>
              <h2>{destination.name}</h2>
              <p className="destination-route-copy">{destination.copy}</p>
              <ul>
                {destination.highlights.map((highlight) => <li key={highlight}><Check aria-hidden="true" size={14} />{highlight}</li>)}
              </ul>
              <div className="destination-route-footer"><span><MapPin aria-hidden="true" size={14} /> Tanzania, tailored to you</span><Link to="/enquire" state={{ prefill: `I'm interested in ${destination.name}. Please help me shape the right route.` }}>Plan this trip <ArrowRight aria-hidden="true" size={15} /></Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="destinations-custom-cta">
        <div><p className="eyebrow">Want to combine two?</p><h2>We’ll connect the country for you.</h2><p>Pair Nyerere with Zanzibar, add a few beach days after the Serengeti or shape a trip around a special occasion. One itinerary, one team and a clear plan.</p></div>
        <Link to="/plan-a-journey" className="btn-primary">Build my trip <ArrowRight aria-hidden="true" size={16} /></Link>
      </section>
    </div>
  );
}
