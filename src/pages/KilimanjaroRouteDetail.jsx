import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  Mountain,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { kilimanjaroRoutes, routeDays } from './Kilimanjaro';
import { kilimanjaroMedia } from '../data/media';

const routeHighlights = [
  'A licensed mountain guide and support crew throughout the climb',
  'A pace and acclimatisation plan shaped around your group',
  'A clear pre-departure briefing, gear check and transfer plan',
];

const planningQuestions = [
  {
    question: 'Which route is best for a first summit?',
    answer: 'Lemosho or Machame usually give first-time climbers a more gradual build. The right choice still depends on your recent hiking, dates and how much time you can spend at altitude.',
  },
  {
    question: 'How fit do I need to be?',
    answer: 'You do not need technical climbing experience, but you should be comfortable walking for several hours on consecutive days. We will suggest a simple training build before departure.',
  },
  {
    question: 'What happens before we leave?',
    answer: 'We confirm your route, dates, accommodation, transfers, equipment list and emergency plan in one proposal. Your guide then checks the final conditions at the gate.',
  },
];

export default function KilimanjaroRouteDetail() {
  const { routeKey } = useParams();
  const route = kilimanjaroRoutes.find((item) => item.key === routeKey);
  const [openDay, setOpenDay] = useState(0);
  const [allOpen, setAllOpen] = useState(false);

  if (!route) return <Navigate to="/itineraries/kilimanjaro" replace />;

  const days = routeDays[route.key] || [];
  const media = kilimanjaroMedia[route.key];
  const stops = route.route.split(' · ');
  const prefill = `I'm interested in the ${route.name} Kilimanjaro route. Please advise on dates, preparation and the best duration.`;
  const openAllDays = () => {
    setAllOpen((current) => !current);
    setOpenDay(-1);
  };

  const inclusions = [
    'Licensed mountain guide and support crew',
    'Park entry, camping or hut arrangements as quoted',
    'Mountain meals, drinking water and safety briefings',
    `Transfers between Moshi and ${route.gate}`,
  ];
  const exclusions = [
    'International flights, visa and travel insurance',
    'Personal technical gear and sleeping bag',
    'Crew tips and personal purchases',
    'Any route variation not listed in the confirmed proposal',
  ];

  return (
    <div className="page-enter tour-detail-page kilimanjaro-route-detail-page">
      <section className="tour-detail-hero kilimanjaro-route-detail-hero">
        <div className="tour-detail-hero-inner">
          <div className="tour-detail-hero-copy">
            <Link className="detail-back-link" to="/itineraries/kilimanjaro"><ArrowLeft aria-hidden="true" size={16} /> All Kilimanjaro routes</Link>
            <p className="eyebrow">{route.label} · Kilimanjaro itinerary</p>
            <h1>{route.name} route</h1>
            <p className="tour-detail-lead">{route.copy}</p>
            <div className="tour-detail-actions">
              <Link to="/enquire" state={{ prefill }} className="btn-primary">Plan this climb <ArrowRight aria-hidden="true" size={16} /></Link>
              <a href="#day-by-day" className="btn-quiet">Read the day-by-day <ChevronDown aria-hidden="true" size={16} /></a>
            </div>
          </div>

          <div className="tour-route-art" aria-label={`Route: ${route.route}`}>
            {media && <img className="tour-route-art-photo" src={media.src} alt="" loading="eager" decoding="async" />}
            <div className="tour-route-art-glow" aria-hidden="true" />
            <p>Route at a glance</p>
            <ol>
              {stops.map((stop, index) => (
                <li key={`${stop}-${index}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{stop}</strong>
                </li>
              ))}
            </ol>
            <small>{route.note}</small>
          </div>
        </div>
      </section>

      <nav className="tour-detail-nav" aria-label="Itinerary sections">
        <div>
          <a href="#overview">Overview</a>
          <a href="#day-by-day">Day by day</a>
          <a href="#included">What's included</a>
          <a href="#planning">Planning</a>
        </div>
      </nav>

      <section className="tour-facts-band" aria-label="Route facts">
        <div className="tour-facts-grid">
          <div><CalendarDays aria-hidden="true" size={18} /><span>Duration</span><strong>{route.duration}</strong></div>
          <div><RouteIcon aria-hidden="true" size={18} /><span>Distance</span><strong>{route.distance}</strong></div>
          <div><MapPin aria-hidden="true" size={18} /><span>Start gate</span><strong>{route.gate}</strong></div>
          <div><BedDouble aria-hidden="true" size={18} /><span>Sleeping</span><strong>{route.sleep}</strong></div>
        </div>
      </section>

      <section id="overview" className="tour-detail-section overview-section">
        <div className="tour-detail-layout">
          <div>
            <p className="eyebrow">The shape of the climb</p>
            <h2>A complete route, with room for your own pace.</h2>
            <p className="section-lead">{route.copy} {route.note} We keep the itinerary detailed enough to understand the effort, while leaving the guide room to respond to weather, trail conditions and how your group is feeling.</p>
          </div>
          <aside className="detail-fit-card">
            <div className="detail-fit-icon"><Sparkles aria-hidden="true" size={18} /></div>
            <p className="eyebrow">Is this route for you?</p>
            <p><strong>Best for:</strong> {route.bestFor}. {route.note}</p>
            <ul>
              {routeHighlights.map((highlight) => <li key={highlight}><Check aria-hidden="true" size={15} />{highlight}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section id="day-by-day" className="tour-detail-section itinerary-section">
        <div className="detail-section-heading itinerary-heading">
          <div><p className="eyebrow">Your day-by-day programme</p><h2>See how each day unfolds.</h2></div>
          <div className="itinerary-heading-actions"><p>This route is a starting point. We confirm timings, camp allocation and the final summit plan for your departure.</p><button type="button" onClick={openAllDays}>{allOpen ? 'Close all days' : 'Open all days'}</button></div>
        </div>
        <div className="day-list">
          {days.map((day, index) => {
            const isOpen = allOpen || openDay === index;
            return (
              <article className={`day-panel ${isOpen ? 'is-open' : ''}`} key={day.label}>
                <button
                  type="button"
                  className="day-panel-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`day-${route.key}-${index}`}
                  onClick={() => { setAllOpen(false); setOpenDay((current) => (current === index ? -1 : index)); }}
                >
                  <span className="day-number">{day.label}</span>
                  <span className="day-panel-title"><small><MapPin aria-hidden="true" size={14} /> {day.location}</small><strong>{day.title}</strong></span>
                  <ChevronDown aria-hidden="true" size={20} className="day-chevron" />
                </button>
                {isOpen && (
                  <div id={`day-${route.key}-${index}`} className="day-panel-content">
                    <p>{day.detail}</p>
                    <div className="day-detail-row">
                      <span><Mountain aria-hidden="true" size={16} /><b>Altitude</b> {day.altitude}</span>
                      <span><BedDouble aria-hidden="true" size={16} /><b>Stay</b> {day.stay}</span>
                      <span><Clock3 aria-hidden="true" size={16} /><b>Trail note</b> {day.note}</span>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <div className="route-adjust-callout">
          <div><p className="eyebrow">Want to change the rhythm?</p><h3>We can add a night, switch the route or build in a recovery day.</h3></div>
          <Link to="/enquire" state={{ prefill }} className="text-action">Adjust this route <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
      </section>

      <section id="included" className="tour-detail-section included-section">
        <div className="detail-section-heading">
          <div><p className="eyebrow">Clear before you book</p><h2>What your proposal will cover.</h2></div>
          <p>We make the quote specific to your route, accommodation choice and travel dates. Nothing important should be left to guesswork.</p>
        </div>
        <div className="included-grid">
          <div className="included-card is-included"><div className="included-title"><ShieldCheck aria-hidden="true" size={21} /><h3>Included in your tailored proposal</h3></div><ul>{inclusions.map((item) => <li key={item}><Check aria-hidden="true" size={15} />{item}</li>)}</ul></div>
          <div className="included-card"><div className="included-title"><X aria-hidden="true" size={21} /><h3>Plan for yourself</h3></div><ul>{exclusions.map((item) => <li key={item}><span aria-hidden="true">•</span>{item}</li>)}</ul></div>
        </div>
      </section>

      <section id="planning" className="tour-detail-section planning-section">
        <div className="planning-copy"><p className="eyebrow">Dates & preparation</p><h2>Designed for your dates and your group.</h2><p>We confirm the route after we know your travel window, party size and recent hiking experience. That keeps the proposal honest about park rules, camp space and the support your climb needs.</p><Link to="/enquire" state={{ prefill }} className="btn-primary">Ask for dates and availability <ArrowRight aria-hidden="true" size={16} /></Link></div>
        <div className="planning-questions">
          {planningQuestions.map((item, index) => <div key={item.question}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.question}</h3><p>{item.answer}</p></div>)}
        </div>
      </section>

      <section className="tour-detail-closing">
        <div><p className="eyebrow">Ready when you are</p><h2>Let's make this route yours.</h2><p>Tell us the dates you have in mind, who is travelling and what you want from the mountain. We will shape the details from there.</p></div>
        <div className="closing-actions"><Link to="/enquire" state={{ prefill }} className="btn-primary">Plan this climb <ArrowRight aria-hidden="true" size={16} /></Link></div>
      </section>
    </div>
  );
}
