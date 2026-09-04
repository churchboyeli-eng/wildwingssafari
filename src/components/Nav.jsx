import { useRef, useState } from 'react';
import {
  ArrowRight,
  BedDouble,
  Binoculars,
  BookOpen,
  ChevronDown,
  Globe2,
  Map,
  Menu,
  MessageCircle,
  Sparkles,
  Star,
  Trees,
  Waves,
  X,
} from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { itineraryCategories, waHref } from '../data/content';

const links = [
  { to: '/blog', label: 'Journal' },
  { to: '/plan-a-journey', label: 'Plan your trip' },
  { to: '/about', label: 'About' },
];

const discoverLinks = [
  { to: '/tanzania-travel-guide', title: 'Inside Tanzania', sub: 'Region notes, park history and source-linked field notes.', icon: Map },
  { to: '/tanzania-travel-guide#parks', title: 'Park field notes', sub: 'Serengeti, crater, elephants, river country and space.', icon: Trees },
  { to: '/tanzania-travel-guide#islands', title: 'Zanzibar and coast', sub: 'Stone Town, spice culture, reef days and recovery.', icon: Waves },
  { to: '/tanzania-travel-guide#stays', title: 'Where to stay', sub: 'How comfort, location and pace change the route.', icon: BedDouble },
  { to: '/tanzania-travel-guide#activities', title: 'Activities by route', sub: 'Drive, float, walk, learn, climb and recover.', icon: Binoculars },
  { to: '/itineraries/safaris', title: 'Migration timing', sub: 'Month-led Serengeti route ideas.', icon: Star },
  { to: '/booking', title: 'Booking steps', sub: 'What to send, how quotes work and how to confirm.', icon: BookOpen },
  { to: '/enquire', title: 'Request a route', sub: 'Send dates and receive a private proposal.', icon: Sparkles },
];

const routeMoods = [
  'Wildlife first',
  'Safari plus coast',
  'Quiet southern route',
  'Summit and recovery',
  'Family pace',
];

export default function Nav() {
  const [toursOpen, setToursOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toursCloseTimer = useRef(null);
  const discoverCloseTimer = useRef(null);
  const toursTriggerRef = useRef(null);
  const discoverTriggerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isTours = location.pathname.startsWith('/itineraries') || location.pathname.startsWith('/tours');
  const isDiscover = location.pathname.startsWith('/tanzania-travel-guide') || location.pathname.startsWith('/tanzania-compass') || location.pathname.startsWith('/discover-tanzania') || location.pathname.startsWith('/destinations');

  const openTours = () => {
    if (mobileOpen) return;
    if (toursCloseTimer.current) clearTimeout(toursCloseTimer.current);
    setDiscoverOpen(false);
    setToursOpen(true);
  };
  const closeTours = () => {
    if (mobileOpen) return;
    toursCloseTimer.current = setTimeout(() => setToursOpen(false), 80);
  };

  const openDiscover = () => {
    if (mobileOpen) return;
    if (discoverCloseTimer.current) clearTimeout(discoverCloseTimer.current);
    setToursOpen(false);
    setDiscoverOpen(true);
  };
  const closeDiscover = () => {
    if (mobileOpen) return;
    discoverCloseTimer.current = setTimeout(() => setDiscoverOpen(false), 80);
  };

  const handleToursBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setToursOpen(false);
  };

  const handleDiscoverBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setDiscoverOpen(false);
  };

  const handleToursKeyDown = (event) => {
    if (event.key === 'Escape') {
      setToursOpen(false);
      toursTriggerRef.current?.focus();
    }
  };

  const handleDiscoverKeyDown = (event) => {
    if (event.key === 'Escape') {
      setDiscoverOpen(false);
      discoverTriggerRef.current?.focus();
    }
  };

  const selectAndGo = (key) => {
    setToursOpen(false);
    setMobileOpen(false);
    navigate(`/itineraries/${key}`);
  };

  const closeMobileNav = () => {
    setMobileOpen(false);
    setToursOpen(false);
    setDiscoverOpen(false);
  };

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
            <NavLink to="/itineraries" className={`site-nav-link itinerary-nav-link ${isTours ? 'is-active' : ''}`} onClick={closeMobileNav}>Itineraries</NavLink>
            <button ref={toursTriggerRef} type="button" className={`tour-disclosure ${toursOpen ? 'is-open' : ''}`} aria-label="Show itinerary categories" aria-expanded={toursOpen} aria-controls="safari-types-menu" onClick={() => setToursOpen((open) => !open)}><ChevronDown aria-hidden="true" size={15} /></button>
          </div>
          <div id="safari-types-menu" className={`tour-flyout ${toursOpen ? 'is-open' : ''}`} aria-hidden={!toursOpen}>
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
        </div>
        <NavLink to="/itineraries/safaris" className={({ isActive }) => `site-nav-link safari-nav-link ${isActive ? 'is-active' : ''}`} onClick={closeMobileNav}>Safaris</NavLink>
        <NavLink to="/itineraries/kilimanjaro" className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`} onClick={closeMobileNav}>Kilimanjaro</NavLink>
        <NavLink to="/itineraries/zanzibar" className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`} onClick={closeMobileNav}>Zanzibar</NavLink>
        <div className="discover-menu" onMouseEnter={openDiscover} onMouseLeave={closeDiscover} onBlur={handleDiscoverBlur} onKeyDown={handleDiscoverKeyDown}>
          <div className="tour-menu-trigger">
            <NavLink to="/tanzania-travel-guide" className={`site-nav-link ${isDiscover ? 'is-active' : ''}`} onClick={closeMobileNav}>Inside Tanzania</NavLink>
            <button ref={discoverTriggerRef} type="button" className={`tour-disclosure ${discoverOpen ? 'is-open' : ''}`} aria-label="Show Inside Tanzania menu" aria-expanded={discoverOpen} aria-controls="inside-tanzania-menu" onClick={() => { setToursOpen(false); setDiscoverOpen((open) => !open); }}><ChevronDown aria-hidden="true" size={15} /></button>
          </div>
          <div id="inside-tanzania-menu" className={`discover-flyout ${discoverOpen ? 'is-open' : ''}`} aria-hidden={!discoverOpen}>
              <div className="discover-flyout-main">
                <p>Plan by region and activity</p>
                <div className="discover-flyout-grid">
                  {discoverLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link to={item.to} key={item.title} className="discover-flyout-choice" onClick={closeMobileNav}>
                        <span><Icon aria-hidden="true" size={17} /></span>
                        <span><strong>{item.title}</strong><small>{item.sub}</small></span>
                        <ArrowRight aria-hidden="true" size={14} />
                      </Link>
                    );
                  })}
                </div>
              </div>
              <aside className="discover-flyout-side">
                <p>Start with a route idea</p>
                {routeMoods.map((place) => <Link to="/tanzania-travel-guide#tanzania-compass" key={place} onClick={closeMobileNav}>{place}</Link>)}
                <Link to="/enquire" className="discover-flyout-request" onClick={closeMobileNav}>Request a route <ArrowRight aria-hidden="true" size={14} /></Link>
              </aside>
          </div>
        </div>
        {links.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`} onClick={closeMobileNav}>{link.label}</NavLink>)}
        <Link to="/booking" className="mobile-enquire" onClick={closeMobileNav}>Book now <ArrowRight aria-hidden="true" size={15} /></Link>
      </nav>

      <div className="site-header-actions">
        <span className="language-label"><Globe2 aria-hidden="true" size={16} /> EN</span>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="site-whatsapp"><MessageCircle aria-hidden="true" size={17} /> WhatsApp</a>
        <Link to="/booking" className="site-enquire">Book now <ArrowRight aria-hidden="true" size={15} /></Link>
        <button type="button" className="mobile-nav-toggle" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="primary-navigation" onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}</button>
      </div>
    </header>
  );
}
