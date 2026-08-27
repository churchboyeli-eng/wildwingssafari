import { useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Globe2, Menu, MessageCircle, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { itineraryCategories, waHref } from '../data/content';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/destinations', label: 'Destinations' },
  { to: '/plan-a-journey', label: 'Plan your trip' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Journal' },
];

export default function Nav() {
  const [toursOpen, setToursOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const toursTriggerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isTours = location.pathname.startsWith('/itineraries') || location.pathname.startsWith('/tours');

  const openTours = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setToursOpen(true);
  };
  const closeTours = () => {
    closeTimer.current = setTimeout(() => setToursOpen(false), 80);
  };

  const handleToursBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setToursOpen(false);
  };

  const handleToursKeyDown = (event) => {
    if (event.key === 'Escape') {
      setToursOpen(false);
      toursTriggerRef.current?.focus();
    }
  };

  const selectAndGo = (key) => {
    setToursOpen(false);
    setMobileOpen(false);
    navigate(`/itineraries/${key}`);
  };

  const closeMobileNav = () => setMobileOpen(false);

  return (
    <header className="site-header">
      <Link to="/" className="site-brand" onClick={closeMobileNav} aria-label="Wild Wings home">
        <span className="brand-mark" aria-hidden="true">W</span>
        <span><strong>Wild Wings Safari</strong><small>Local experts in Tanzania</small></span>
      </Link>

      <nav id="primary-navigation" className={`site-links ${mobileOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        <NavLink to="/" end className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`} onClick={closeMobileNav}>Home</NavLink>
        <div className="tour-menu" onMouseEnter={openTours} onMouseLeave={closeTours} onBlur={handleToursBlur} onKeyDown={handleToursKeyDown}>
          <div className="tour-menu-trigger">
            <NavLink to="/itineraries" className={`site-nav-link ${isTours ? 'is-active' : ''}`} onClick={closeMobileNav}>Itineraries</NavLink>
            <button ref={toursTriggerRef} type="button" className={`tour-disclosure ${toursOpen ? 'is-open' : ''}`} aria-label="Show itinerary categories" aria-expanded={toursOpen} aria-controls="safari-types-menu" onClick={() => setToursOpen((open) => !open)}><ChevronDown aria-hidden="true" size={15} /></button>
          </div>
          {toursOpen && (
            <div id="safari-types-menu" className="tour-flyout">
              <p>Explore itineraries</p>
              {itineraryCategories.map((s, index) => (
                <button type="button" key={s.key} onClick={() => selectAndGo(s.key)} className="tour-flyout-choice">
                  <span className={`tour-flyout-mark mark-${index + 1}`} aria-hidden="true">{s.name.slice(0, 1)}</span>
                  <span><strong>{s.name}</strong><small>{s.sub}</small></span>
                  <ArrowRight aria-hidden="true" size={15} />
                </button>
              ))}
              <Link to="/itineraries" onClick={() => { setToursOpen(false); closeMobileNav(); }} className="tour-flyout-all">View all itineraries <ArrowRight aria-hidden="true" size={15} /></Link>
            </div>
          )}
        </div>
        <NavLink to="/itineraries/safaris" className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`} onClick={closeMobileNav}>Safaris</NavLink>
        <NavLink to="/itineraries/kilimanjaro" className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`} onClick={closeMobileNav}>Kilimanjaro</NavLink>
        <NavLink to="/itineraries/zanzibar" className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`} onClick={closeMobileNav}>Zanzibar</NavLink>
        {links.slice(1).map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`} onClick={closeMobileNav}>{link.label}</NavLink>)}
        <Link to="/enquire" className="mobile-enquire" onClick={closeMobileNav}>Get a quote <ArrowRight aria-hidden="true" size={15} /></Link>
      </nav>

      <div className="site-header-actions">
        <span className="language-label"><Globe2 aria-hidden="true" size={16} /> EN</span>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="site-whatsapp"><MessageCircle aria-hidden="true" size={17} /> WhatsApp</a>
        <Link to="/enquire" className="site-enquire">Get a quote <ArrowRight aria-hidden="true" size={15} /></Link>
        <button type="button" className="mobile-nav-toggle" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="primary-navigation" onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}</button>
      </div>
    </header>
  );
}
