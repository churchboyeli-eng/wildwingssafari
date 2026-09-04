import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, CalendarDays, ChevronDown, CircleDollarSign, Clock3, Globe2, Heart, MapPin, Menu, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { waHref } from '../data/content';

const safariTypes = [
  { key: 'zanzibar', name: 'Safari from Zanzibar', detail: 'Serengeti · Ngorongoro · Tarangire', days: '1–5 days', price: 'From $660', note: 'Fly in from the coast and be on safari by lunchtime.' },
  { key: 'tanzania', name: 'Tanzania Safari', detail: 'Best selling · all levels', days: '5–10 days', price: 'From $1,480', note: 'A classic route through the Northern Circuit.' },
  { key: 'migration', name: 'Serengeti Migration Safaris', detail: 'Serengeti · Jun–Oct', days: '6–9 days', price: 'From $2,210', note: 'Follow the herds through the Serengeti.' },
  { key: 'family', name: 'Family Safaris', detail: 'Child-friendly itineraries', days: '5–8 days', price: 'From $1,720', note: 'Flexible pacing and private vehicles.' },
  { key: 'kilimanjaro', name: 'Kilimanjaro Trekking', detail: 'Roof of Africa · 5,895 m', days: '7–9 days', price: 'From $2,060', note: 'Guided climbs on Tanzania scenic routes.' },
];

const destinations = [
  { label: 'Most visited', name: 'Serengeti', detail: 'Big Five · Great Migration', code: 'S' },
  { label: 'UNESCO', name: 'Ngorongoro Crater', detail: '600m deep · dense wildlife', code: 'N' },
  { label: 'Hidden gem', name: 'Tarangire', detail: 'Largest elephant herds', code: 'T' },
  { label: 'Beach + safari', name: 'Zanzibar', detail: 'Stone Town · coral reefs', code: 'Z' },
];

const packages = [
  ['Tanzania Safari from Zanzibar', 'Tanzania', '5 days', '$1,240', 'Beach + safari'],
  ['Safari from Zanzibar to the Serengeti', 'Tanzania', '4 days', '$1,080', 'Best seller'],
  ['The Serengeti Safari from Zanzibar', 'Tanzania', '3 days', '$890', 'Short escape'],
  ['Safari from Zanzibar: Tarangire & Ngorongoro', 'Tanzania', '3 days', '$760', 'Private safari'],
  ['Tanzania Safari: Serengeti & Ngorongoro', 'Tanzania', '6 days', '$1,860', 'Big Five'],
  ['The best Tanzania safari from Zanzibar', 'Tanzania', '5 days', '$1,440', 'Popular'],
  ['Zanzibar to Mikumi National Park', 'Tanzania', '2 days', '$570', 'Weekend safari'],
  ['Family safari in Northern Tanzania', 'Tanzania', '7 days', '$2,160', 'Family'],
  ['Great Migration safari', 'Tanzania', '7 days', '$2,480', 'Seasonal'],
  ['Kilimanjaro and safari escape', 'Tanzania', '9 days', '$2,730', 'Adventure'],
  ['Ngorongoro Crater private safari', 'Tanzania', '4 days', '$1,350', 'Private safari'],
  ['Kenya and Tanzania highlights', 'Kenya', '10 days', '$3,120', 'Two countries'],
];

export default function SafariPackages() {
  const [activeType, setActiveType] = useState('zanzibar');
  const [country, setCountry] = useState('All');
  const [days, setDays] = useState(14);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const activeSafari = safariTypes.find((type) => type.key === activeType) ?? safariTypes[0];
  const visiblePackages = useMemo(() => packages.filter((item) => country === 'All' || item[1] === country).slice(0, days > 7 ? packages.length : 6), [country, days]);

  return (
    <div className="safari-site">
      <a className="skip-link" href="#packages">Skip to safari packages</a>
      <header className="safari-header">
        <a className="safari-brand" href="#top" aria-label="Wild Wings Safari home"><span className="brand-mark">W</span><span><strong>Wild Wings Safari</strong><small>Local experts in Tanzania</small></span></a>
        <nav className={`safari-nav ${menuOpen ? 'is-open' : ''}`} id="main-nav" aria-label="Primary navigation"><a href="#top">Home</a><a className="is-active" href="#packages">Tours <ChevronDown aria-hidden="true" size={14} /></a><a href="#destinations">Destinations <ChevronDown aria-hidden="true" size={14} /></a><a href="#journal">Blog <ChevronDown aria-hidden="true" size={14} /></a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        <div className="header-actions"><button type="button" className="language-button"><Globe2 aria-hidden="true" size={17} /> EN <ChevronDown aria-hidden="true" size={13} /></button>{waHref && <a className="whatsapp-link" href={waHref} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" size={18} /> WhatsApp</a>}<button type="button" className="mobile-menu" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen((open) => !open)}><Menu aria-hidden="true" size={21} /></button></div>
      </header>
      <main id="top">
        <section className="safari-types-section" aria-labelledby="safari-types-heading">
          <div className="types-list"><p className="section-kicker" id="safari-types-heading">Safari types</p><div className="type-buttons">{safariTypes.map((type, index) => { const selected = type.key === activeType; return <button type="button" className={`safari-type ${selected ? 'selected' : ''}`} key={type.key} onClick={() => setActiveType(type.key)} aria-pressed={selected}><span className={`type-monogram type-${index + 1}`} aria-hidden="true">{type.name.slice(0, 1)}</span><span className="type-copy"><strong>{type.name}</strong><small>{type.detail}</small></span>{selected && <ArrowRight aria-hidden="true" size={16} />}</button>; })}</div><a className="text-link" href="#packages">View all safaris <ArrowRight aria-hidden="true" size={16} /></a></div>
          <article className={`featured-safari feature-${activeSafari.key}`} aria-live="polite"><div className="feature-orb feature-orb-one" aria-hidden="true" /><div className="feature-orb feature-orb-two" aria-hidden="true" /><div className="feature-content"><span className="feature-label">Featured route</span><h1>{activeSafari.name}</h1><p>{activeSafari.detail}</p><div className="feature-meta"><span><Clock3 aria-hidden="true" size={15} /> {activeSafari.days}</span><strong>{activeSafari.price}</strong></div><a href="#packages" className="feature-link">Explore this safari <ArrowRight aria-hidden="true" size={16} /></a></div></article>
        </section>
        <section className="zanzibar-hero" aria-labelledby="zanzibar-heading"><div className="hero-grid" aria-hidden="true"><span /><span /><span /><span /><span /></div><div className="hero-copy"><p className="section-kicker">From Zanzibar to the wilderness</p><h2 id="zanzibar-heading">Tanzania safari<br />from Zanzibar</h2><p>Discover Serengeti, Ngorongoro Crater, Tarangire and more with a direct safari connection from the coast.</p><div className="hero-actions"><a href="#contact" className="quote-button">Get a free quote <ArrowRight aria-hidden="true" size={17} /></a>{waHref && <a href={waHref} target="_blank" rel="noopener noreferrer" className="hero-whatsapp"><MessageCircle aria-hidden="true" size={18} /> WhatsApp us</a>}</div></div><a className="scroll-cue" href="#destinations" aria-label="Scroll to destinations"><ArrowDown aria-hidden="true" size={19} /></a></section>
        <section className="destinations-section" id="destinations" aria-labelledby="destinations-heading"><div className="section-intro"><div><p className="section-kicker">Destinations</p><h2 id="destinations-heading">Tanzania, mapped<br />by how you travel.</h2></div></div><div className="destination-grid">{destinations.map((destination) => <article className="destination-card" key={destination.name}><span className="destination-code" aria-hidden="true">{destination.code}</span><p>{destination.label}</p><h3>{destination.name}</h3><span>{destination.detail}</span><a href="#packages">Explore {destination.name} <ArrowRight aria-hidden="true" size={15} /></a></article>)}</div></section>
        <section className="packages-section" id="packages" aria-labelledby="packages-heading"><div className="packages-heading"><div><p className="section-kicker">Explore our safaris</p><h2 id="packages-heading">Tanzania safari packages</h2><p>Private routes through the Serengeti, Ngorongoro, Tarangire and Zanzibar.</p></div><button type="button" className="filter-toggle" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((open) => !open)}><SlidersHorizontal aria-hidden="true" size={17} /> Filters</button></div><div className="packages-layout"><aside className={`filters ${filtersOpen ? 'is-open' : ''}`} aria-label="Safari package filters"><div className="filter-heading"><span>Active filters</span><button type="button" onClick={() => { setCountry('All'); setDays(14); }}>Clear all</button></div><fieldset><legend>Where do you want to go?</legend>{['All', 'Tanzania', 'Kenya'].map((option) => <label key={option}><input type="radio" name="country" checked={country === option} onChange={() => setCountry(option)} /> {option}</label>)}</fieldset><fieldset><legend>Number of days</legend><input type="range" min="3" max="14" value={days} onChange={(event) => setDays(Number(event.target.value))} /><div className="range-labels"><span>3 days</span><strong>{days}+ days</strong></div></fieldset><fieldset><legend>Price range</legend><label><input type="checkbox" /> Under $1,000</label><label><input type="checkbox" /> $1,000 – $2,500</label><label><input type="checkbox" /> $2,500+</label></fieldset><fieldset><legend>National parks</legend><label><input type="checkbox" /> Serengeti</label><label><input type="checkbox" /> Ngorongoro Crater</label><label><input type="checkbox" /> Tarangire</label></fieldset></aside><div className="package-results"><div className="results-toolbar"><span>{visiblePackages.length} safari packages found</span><button type="button"><Heart aria-hidden="true" size={16} /> Favourites</button></div><div className="package-grid">{visiblePackages.map(([name, packageCountry, duration, price, badge], index) => <article className="package-card" key={name}><div className={`package-visual visual-${(index % 6) + 1}`} aria-hidden="true"><span>{badge}</span><MapPin size={18} /></div><div className="package-card-copy"><p>{packageCountry} <span>·</span> {duration}</p><h3>{name}</h3><div><strong>From {price}</strong><a href="#contact">View safari <ArrowRight aria-hidden="true" size={15} /></a></div></div></article>)}</div></div></div></section>
        <section className="contact-section" id="contact"><div><p className="section-kicker">Plan your Tanzania safari</p><h2>Tell us where you want to go. We will shape the route around you.</h2><ul><li><CalendarDays aria-hidden="true" size={17} /> Tailored routes for your dates</li><li><CircleDollarSign aria-hidden="true" size={17} /> Clear pricing before you book</li><li><MessageCircle aria-hidden="true" size={17} /> Local support from first message</li></ul></div><form className="quote-form" onSubmit={(event) => { event.preventDefault(); setQuoteSent(true); }}><label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label><label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><label>Tell us about your trip<textarea name="message" rows="3" placeholder="Dates, travellers and places you want to see" /></label><button type="submit">Request a quote <ArrowRight aria-hidden="true" size={16} /></button>{quoteSent && <p className="form-status" role="status">Thanks. We will reply with a tailored route and quote.</p>}</form></section>
      </main>
      <footer className="safari-footer" id="about"><span>© 2026 Wild Wings Safari</span><span>Locally owned in Tanzania</span><a href="#top">Back to top <ArrowDown aria-hidden="true" size={14} /></a></footer>
    </div>
  );
}
