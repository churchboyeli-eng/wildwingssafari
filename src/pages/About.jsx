import { ArrowRight, Check, Compass, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { why } from '../data/content';

const principles = [
  {
    icon: Compass,
    label: 'Local point of view',
    title: 'Advice that starts on the ground.',
    copy: 'We live close to the routes we sell. That means your plan is shaped by real drive times, seasonal movement and the places worth slowing down for.',
  },
  {
    icon: HeartHandshake,
    label: 'Private by design',
    title: 'Your group gets the attention.',
    copy: 'A dedicated guide, a private vehicle and a route built around your pace make room for the moments that never fit a group schedule.',
  },
  {
    icon: ShieldCheck,
    label: 'Clear before you commit',
    title: 'No vague promises in the quote.',
    copy: 'You see the route, stays, inclusions and price logic before you book. We explain the choices so you can decide with confidence.',
  },
];

export default function About() {
  return (
    <div className="page-enter about-page">
      <section className="about-hero" aria-labelledby="about-heading">
        <div className="about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow">Wild Wings Safari · About us</p>
            <h1 id="about-heading">Tanzania, known properly.</h1>
            <p>
              We are a locally owned safari company based in Arusha, building private journeys across Tanzania with the care of people who know the landscape personally.
            </p>
            <div className="about-hero-actions">
              <Link to="/plan-a-journey" className="about-primary-action">Plan your trip <ArrowRight aria-hidden="true" size={16} /></Link>
              <Link to="/itineraries" className="about-quiet-action">Explore itineraries <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
          </div>

          <aside className="about-hero-card" aria-label="Wild Wings at a glance">
            <p>At a glance</p>
            <div className="about-hero-stat"><strong>01</strong><span>One country, deeply understood</span></div>
            <div className="about-hero-stat"><strong>02</strong><span>Private routes from coast to crater</span></div>
            <div className="about-hero-stat"><strong>03</strong><span>One team from first message to final transfer</span></div>
            <div className="about-hero-card-foot"><span className="about-hero-dot" aria-hidden="true" /> Based in Arusha · operating nationwide</div>
          </aside>
        </div>
      </section>

      <section className="about-story" aria-labelledby="about-story-heading">
        <div className="about-story-intro">
          <p className="eyebrow">Our point of view</p>
          <h2 id="about-story-heading">Local by origin. Precise by design.</h2>
          <p>
            Wild Wings was founded by Jackob Mushi, a professional travel consultant born and raised in Meru, Arusha. That personal connection is the starting point for every route we build.
          </p>
          <p>
            A good safari has the right rhythm, guide and place to stay, with enough room for the unexpected to become part of the story you take home.
          </p>
          <div className="about-story-signature"><span>Jackob Mushi</span><small>Founder · Wild Wings Safari</small></div>
        </div>

        <div className="about-principles">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <article className="about-principle-card" key={principle.title}>
                <div className="about-principle-topline"><span>{String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true" size={19} strokeWidth={1.8} /></div>
                <p className="eyebrow">{principle.label}</p>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-standards" aria-labelledby="about-standards-heading">
        <div className="about-standards-inner">
          <div className="about-standards-heading">
            <p className="eyebrow">What you can expect</p>
            <h2 id="about-standards-heading">A better way to prepare for the wild.</h2>
            <p>Good planning is part of the experience. We keep the details visible, the communication human and the route flexible enough to feel like yours.</p>
          </div>
          <div className="about-standard-list">
            {why.slice(0, 4).map((item) => (
              <div className="about-standard-row" key={item.num}>
                <span>{item.num}</span>
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
                <Check aria-hidden="true" size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-closing" aria-labelledby="about-closing-heading">
        <div>
          <p className="eyebrow">Start with a conversation</p>
          <h2 id="about-closing-heading">Tell us what you want Tanzania to feel like.</h2>
          <p>Share your dates, the people travelling and the moments you care about. We will take it from there.</p>
        </div>
        <Link to="/enquire" className="about-closing-action">Book your safari <ArrowRight aria-hidden="true" size={16} /></Link>
      </section>
    </div>
  );
}
