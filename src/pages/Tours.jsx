import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Check, Route } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getPackageStartingPrice, itineraryCategories, topPackages } from '../data/content';

const pageCopy = {
  all: {
    eyebrow: 'Itineraries',
    title: 'Tanzania itineraries',
    lead: 'Choose from private safari, Kilimanjaro and Zanzibar starting points. Every route is flexible, then planned around your dates, pace and the parts of Tanzania you most want to experience.',
    listTitle: 'Sample Tanzania itineraries',
    afterTitle: 'A trip that fits the whole journey.',
    afterCopy: 'Start with a proven route, then make it specific. We adjust the order of parks, number of nights, accommodation style and connections before you commit.',
  },
  safaris: {
    eyebrow: 'Safaris',
    title: 'Tanzania safari itineraries',
    lead: 'From the classic Northern Circuit to the quieter south, our private safari routes put wildlife time first. We match the parks, overnight rhythm and guide to your dates and priorities.',
    listTitle: 'Sample safari itineraries',
    afterTitle: 'A safari should have time to breathe.',
    afterCopy: 'A good route is about more than ticking off parks. We protect game-viewing time, choose a sensible driving rhythm and recommend the right safari region for the season.',
  },
  kilimanjaro: {
    eyebrow: 'Kilimanjaro',
    title: 'Kilimanjaro climbing itineraries',
    lead: 'A successful climb begins with the right route, a patient acclimatisation plan and an experienced mountain crew. These are private starting points to build around your preparation and time.',
    listTitle: 'Sample Kilimanjaro itineraries',
    afterTitle: 'The right climb begins before the mountain.',
    afterCopy: 'We help you decide on a route, prepare properly and understand the day-to-day rhythm before you arrive in Moshi. A safari or Zanzibar stay can follow when it suits your plans.',
  },
  zanzibar: {
    eyebrow: 'Zanzibar',
    title: 'Zanzibar holiday itineraries',
    lead: 'Make the coast a real part of the journey. Choose slow beach days, Stone Town or a seamless safari-and-island combination with all domestic connections considered together.',
    listTitle: 'Sample Zanzibar itineraries',
    afterTitle: 'The coast deserves its own time.',
    afterCopy: 'Zanzibar works best when it is planned as more than a final stop. We give the island enough room to slow down, then connect it naturally to your safari or onward travel.',
  },
};

const durationFilters = [
  { key: 'all', label: 'Any length' },
  { key: 'short', label: 'Up to 6 days' },
  { key: 'week', label: '7–8 days' },
  { key: 'long', label: '9+ days' },
];

const matchesDuration = (tourPackage, filter) => {
  const days = Number.parseInt(tourPackage.duration, 10);
  if (filter === 'short') return days <= 6;
  if (filter === 'week') return days >= 7 && days <= 8;
  if (filter === 'long') return days >= 9;
  return true;
};

export default function Tours() {
  const { categoryKey } = useParams();
  const [durationFilter, setDurationFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('recommended');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeCategory = categoryKey ? itineraryCategories.find((category) => category.key === categoryKey) : null;
  const copy = pageCopy[activeCategory?.key || 'all'];
  const availablePackages = useMemo(
    () => (activeCategory
      ? activeCategory.packageKeys.map((key) => topPackages.find((tourPackage) => tourPackage.key === key)).filter(Boolean)
      : topPackages),
    [activeCategory],
  );
  const matchingPackages = useMemo(() => {
    const filtered = availablePackages.filter((tourPackage) => matchesDuration(tourPackage, durationFilter));
    if (sortOrder === 'shortest') return [...filtered].sort((a, b) => Number.parseInt(a.duration, 10) - Number.parseInt(b.duration, 10));
    if (sortOrder === 'longest') return [...filtered].sort((a, b) => Number.parseInt(b.duration, 10) - Number.parseInt(a.duration, 10));
    return filtered;
  }, [availablePackages, durationFilter, sortOrder]);

  useEffect(() => {
    setDurationFilter('all');
    setFiltersOpen(false);
  }, [categoryKey]);

  if (categoryKey && !activeCategory) return <Navigate to="/itineraries" replace />;

  const activeDurationLabel = durationFilters.find((filter) => filter.key === durationFilter)?.label;
  const resultCount = `${matchingPackages.length} ${matchingPackages.length === 1 ? 'sample itinerary' : 'sample itineraries'}`;

  return (
    <div className="page-enter itinerary-listing-page">
      <section className="itinerary-listing-hero" aria-labelledby="itinerary-listing-heading">
        <div className="itinerary-listing-hero-inner">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 id="itinerary-listing-heading">{copy.title}</h1>
            <p>{copy.lead}</p>
            <Link to="/enquire" className="itinerary-listing-hero-action">Ask for a tailored itinerary <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
          <div className="itinerary-listing-proof" aria-label="Wild Wings planning principles">
            <p>Private travel, properly planned</p>
            <span><Check aria-hidden="true" size={15} />Customised around your dates</span>
            <span><Check aria-hidden="true" size={15} />Dedicated guide or mountain team</span>
            <span><Check aria-hidden="true" size={15} />Clear proposal before booking</span>
          </div>
        </div>
      </section>

      <section className="itinerary-listing-content" aria-labelledby="itinerary-list-heading">
        <button type="button" className="itinerary-mobile-filter-toggle" aria-expanded={filtersOpen} aria-controls="itinerary-filters" onClick={() => setFiltersOpen((open) => !open)}>
          {filtersOpen ? 'Close filters' : 'Filter itineraries'} <span>{activeDurationLabel}</span>
        </button>
        <aside id="itinerary-filters" className={`itinerary-filter-rail ${filtersOpen ? 'is-open' : ''}`} aria-label="Filter itineraries">
          <div className="itinerary-filter-group">
            <p>Type</p>
            <nav>
              <Link to="/itineraries" className={!activeCategory ? 'is-active' : ''} aria-current={!activeCategory ? 'page' : undefined}>All itineraries <span>{topPackages.length}</span></Link>
              {itineraryCategories.map((category) => (
                <Link key={category.key} to={`/itineraries/${category.key}`} className={category.key === activeCategory?.key ? 'is-active' : ''} aria-current={category.key === activeCategory?.key ? 'page' : undefined}>{category.name} <span>{category.packageKeys.length}</span></Link>
              ))}
            </nav>
          </div>
          <div className="itinerary-filter-group">
            <p>Travel time</p>
            <div className="itinerary-duration-filters">
              {durationFilters.map((filter) => (
                <button type="button" key={filter.key} className={durationFilter === filter.key ? 'is-active' : ''} aria-pressed={durationFilter === filter.key} onClick={() => setDurationFilter(filter.key)}>{filter.label}</button>
              ))}
            </div>
          </div>
        </aside>

        <div className="itinerary-list-area">
          <div className="itinerary-list-banner">
            <p><strong>These are sample itineraries.</strong> We adjust the route, number of nights and accommodation to fit your dates, interests and travel style.</p>
          </div>
          <header className="itinerary-list-heading">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 id="itinerary-list-heading">{copy.listTitle}</h2>
              <p className="itinerary-result-count" role="status">Showing {resultCount}{durationFilter !== 'all' ? ` for ${activeDurationLabel.toLowerCase()}` : ''}</p>
            </div>
            <label className="itinerary-sort-control">Sort by
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="shortest">Shortest duration</option>
                <option value="longest">Longest duration</option>
              </select>
            </label>
          </header>

          <div className="itinerary-list-cards">
            {matchingPackages.map((tourPackage, index) => {
              const startingPrice = getPackageStartingPrice(tourPackage);
              return (
                <article className="itinerary-list-card" key={tourPackage.key}>
                  <div className="itinerary-list-route-panel">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{tourPackage.tag}</p>
                    <div><Route aria-hidden="true" size={16} strokeWidth={1.8} /><small>{tourPackage.route}</small></div>
                  </div>
                  <div className="itinerary-list-card-main">
                    <div className="itinerary-list-card-meta"><span>{tourPackage.popular ? 'Traveller favourite' : 'Private itinerary'}</span><span><CalendarDays aria-hidden="true" size={14} />{tourPackage.duration}</span></div>
                    <h3>{tourPackage.name}</h3>
                    <p>{tourPackage.copy}</p>
                    <ul>
                      <li><Check aria-hidden="true" size={14} />{tourPackage.bestFor}</li>
                      <li><Check aria-hidden="true" size={14} />{tourPackage.includes}</li>
                    </ul>
                    {startingPrice && (
                      <div className="itinerary-list-card-price">
                        <span>Price starts from</span>
                        <strong>{startingPrice} <small>USD pp</small></strong>
                      </div>
                    )}
                    <Link to={`/tours/${tourPackage.key}`} className="itinerary-list-card-action">View this itinerary <ArrowRight aria-hidden="true" size={16} /></Link>
                  </div>
                </article>
              );
            })}
          </div>

          {matchingPackages.length === 0 && (
            <div className="itinerary-empty">
              <p>No routes match that travel time yet. Try another length, or ask us to design one for you.</p>
              <button type="button" onClick={() => setDurationFilter('all')}>Show all itineraries</button>
            </div>
          )}
        </div>
      </section>

      <section className="itinerary-listing-after">
        <div><p className="eyebrow">Beyond the sample route</p><h2>{copy.afterTitle}</h2></div>
        <p>{copy.afterCopy}</p>
        <Link to="/enquire" className="btn-dark">Start planning <ArrowRight aria-hidden="true" size={16} /></Link>
      </section>
    </div>
  );
}
