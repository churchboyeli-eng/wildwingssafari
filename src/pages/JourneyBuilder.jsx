import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Check, Minus, Plus, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { destinations, months } from '../data/content';

const planningSteps = [
  ['01', 'Choose a direction', 'Start with safari, coast, mountain or a combination.'],
  ['02', 'Set the rhythm', 'Tell us how many days and who is travelling.'],
  ['03', 'Receive a real proposal', 'We reply with a route, stays and a clear quote.'],
];

const proofPoints = [
  { title: 'Private from the start', copy: 'Your vehicle, guide and route are reserved around your group. We flag any shared departure before you book.' },
  { title: 'Flexible where it matters', copy: 'We can change nights, comfort level, park order and coast time before you commit.' },
  { title: 'Human support throughout', copy: 'One team stays close from the first message to the final airport transfer.' },
];

export default function JourneyBuilder() {
  const navigate = useNavigate();
  const [selectedTrips, setSelectedTrips] = useState({});
  const [days, setDays] = useState(7);
  const [travellers, setTravellers] = useState(2);
  const [month, setMonth] = useState('Flexible');

  const toggleTrip = (key) => {
    setSelectedTrips((current) => ({ ...current, [key]: !current[key] }));
  };

  const changeTravellers = (delta) => {
    setTravellers((current) => Math.max(1, Math.min(20, current + delta)));
  };

  const selectedSummary = useMemo(
    () => destinations.filter((destination) => selectedTrips[destination.key]),
    [selectedTrips],
  );

  const sendToBooking = () => {
    const names = selectedSummary.map((destination) => destination.name);
    const list = names.length ? names.join(', ') : 'a custom Tanzania trip';
    const travelMonth = month !== 'Flexible' ? `, travelling in ${month}` : '';
    const prefill = `I'd like to plan: ${list}. Around ${days} days for ${travellers} traveller${travellers === 1 ? '' : 's'}${travelMonth}.`;
    navigate('/booking', { state: { prefill } });
  };

  return (
    <div className="page-enter journeys-page">
      <section className="journeys-hero" aria-labelledby="journeys-heading">
        <div className="journeys-hero-inner">
          <div className="journeys-hero-copy">
            <p className="eyebrow">Plan your trip</p>
            <h1 id="journeys-heading">Build your Tanzania route.</h1>
            <p>Start with a few choices and we will turn them into a Tanzania itinerary with the details and quote explained before you book.</p>
            <a href="#journey-builder" className="journeys-hero-action">Choose your starting point <ArrowRight aria-hidden="true" size={16} /></a>
          </div>

          <aside className="journeys-planning-card" aria-label="How trip planning works">
            <p>How it works</p>
            <ol>
              {planningSteps.map(([number, title, copy]) => (
                <li key={number}><span>{number}</span><div><strong>{title}</strong><small>{copy}</small></div></li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section id="journey-builder" className="journey-builder-section" aria-labelledby="journey-builder-heading">
        <div className="journey-builder-inner">
          <header className="journey-builder-heading">
            <div><p className="eyebrow">Your starting brief</p><h2 id="journey-builder-heading">A few choices are enough.</h2></div>
            <p>Nothing is locked in. This simply gives our team a useful starting point for the first conversation.</p>
          </header>

          <div className="journey-builder-shell">
            <div className="journey-builder-form">
              <div className="journey-step-heading"><span>01</span><div><p>Choose what to include</p><h3>Which parts of Tanzania interest you?</h3></div></div>
              <div className="journey-choice-list">
                {destinations.map((destination) => {
                  const selected = Boolean(selectedTrips[destination.key]);
                  return (
                    <button
                      type="button"
                      key={destination.key}
                      className={`journey-choice-card ${selected ? 'is-selected' : ''}`}
                      onClick={() => toggleTrip(destination.key)}
                      aria-pressed={selected}
                    >
                      <span className="journey-choice-number">{destination.num}</span>
                      <span className="journey-choice-copy"><strong>{destination.name}</strong><small>{destination.tag}</small></span>
                      <span className="journey-choice-state">{selected ? <><Check aria-hidden="true" size={15} /> Added</> : 'Add'}</span>
                    </button>
                  );
                })}
              </div>

              <div className="journey-builder-fields">
                <div className="journey-field journey-field-wide">
                  <div className="journey-step-heading"><span>02</span><div><p>Trip length</p><h3>How long can you stay?</h3></div><strong className="journey-range-value">{days} <small>days</small></strong></div>
                  <input className="journey-range" type="range" min="2" max="21" value={days} onChange={(event) => setDays(Number(event.target.value))} aria-label="Trip length in days" />
                  <div className="journey-range-labels"><span>2 days</span><span>3 weeks</span></div>
                </div>

                <div className="journey-field">
                  <div className="journey-step-heading"><span>03</span><div><p>Travellers</p><h3>Who is coming?</h3></div></div>
                  <div className="traveller-stepper">
                    <button type="button" onClick={() => changeTravellers(-1)} aria-label="Remove one traveller"><Minus aria-hidden="true" size={17} /></button>
                    <strong>{travellers}</strong>
                    <button type="button" onClick={() => changeTravellers(1)} aria-label="Add one traveller"><Plus aria-hidden="true" size={17} /></button>
                  </div>
                </div>

                <label className="journey-field journey-select-field">
                  <span className="journey-step-heading"><span>04</span><span><p>Travel month</p><strong>When would you like to go?</strong></span></span>
                  <span className="journey-select-wrap"><CalendarDays aria-hidden="true" size={16} /><select value={month} onChange={(event) => setMonth(event.target.value)} aria-label="Travel month">{months.map((item) => <option key={item} value={item}>{item}</option>)}</select></span>
                </label>
              </div>
            </div>

            <aside className="journey-summary" aria-live="polite">
              <div className="journey-summary-icon"><Sparkles aria-hidden="true" size={18} /></div>
              <p className="eyebrow">Your route so far</p>
              <h3>{selectedSummary.length ? `${selectedSummary.length} experience${selectedSummary.length === 1 ? '' : 's'} selected` : 'Choose a starting point.'}</h3>
              {!selectedSummary.length && <p className="journey-summary-copy">Choose one or more experiences and we will shape the route around them.</p>}
              {!!selectedSummary.length && (
                <ul className="journey-summary-list">{selectedSummary.map((item) => <li key={item.key}><Check aria-hidden="true" size={15} /><span>{item.name}</span></li>)}</ul>
              )}
              <dl className="journey-summary-facts"><div><dt>Length</dt><dd>{days} days</dd></div><div><dt>Travellers</dt><dd>{travellers}</dd></div><div><dt>Timing</dt><dd>{month}</dd></div></dl>
              <button type="button" className="journey-summary-action" onClick={sendToBooking}>Send this brief <ArrowRight aria-hidden="true" size={16} /></button>
              <small className="journey-summary-note">No payment now. We reply with a tailored route and quote.</small>
            </aside>
          </div>
        </div>
      </section>

      <section className="journey-proof-section" aria-labelledby="journey-proof-heading">
        <div className="journey-proof-inner">
          <div className="journey-proof-heading"><p className="eyebrow">The Wild Wings difference</p><h2 id="journey-proof-heading">Good planning makes the trip easier.</h2></div>
          <div className="journey-proof-grid">{proofPoints.map((point, index) => <article key={point.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{point.title}</h3><p>{point.copy}</p></article>)}</div>
        </div>
      </section>

      <section className="journeys-closing" aria-labelledby="journeys-closing-heading">
        <div><p className="eyebrow">Ready when you are</p><h2 id="journeys-closing-heading">Have the dates already?</h2><p>Send us the essentials and we will come back with a route that makes sense for your time, group and budget.</p></div>
        <Link to="/enquire" className="btn-dark">Book your safari <ArrowRight aria-hidden="true" size={16} /></Link>
      </section>
    </div>
  );
}
