import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Check, LayoutGrid, List, Route } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { getPackageStartingPrice, itineraryCategories, topPackages } from '../data/content';
import { getPackageMedia, safariMedia } from '../data/media';

const pageCopy = {
  all: {
    eyebrow: 'Itineraries',
    title: 'Tanzania itineraries',
    lead: 'Choose a private safari, a Kilimanjaro climb or time on Zanzibar. We then set the route around your dates, pace and priorities.',
    listTitle: 'Sample Tanzania itineraries',
    afterTitle: 'A route that fits your time.',
    afterCopy: 'Use a sample route as a starting point. We can change the park order, number of nights, accommodation and connections before you book.',
  },
  safaris: {
    eyebrow: 'Safaris',
    title: 'Tanzania safari itineraries',
    lead: 'Choose the classic Northern Circuit or a quieter southern route. We match the parks, overnight rhythm and guide to your dates and what you want to see.',
    listTitle: 'Sample safari itineraries',
    afterTitle: 'Leave room for the good sightings.',
    afterCopy: 'We protect game-drive time, keep the driving rhythm sensible and point you to the region that fits your travel month.',
  },
  kilimanjaro: {
    eyebrow: 'Kilimanjaro',
    title: 'Kilimanjaro climbing itineraries',
    lead: 'A safe climb needs the right route, time to acclimatise and a trained mountain crew. Use these plans as a starting point for your preparation and available days.',
    listTitle: 'Sample Kilimanjaro itineraries',
    afterTitle: 'Your climb starts before Moshi.',
    afterCopy: 'We help you choose a route, prepare for the days on the mountain and plan the safari or Zanzibar stay that follows.',
  },
  zanzibar: {
    eyebrow: 'Zanzibar',
    title: 'Zanzibar holiday itineraries',
    lead: 'Make time for Stone Town, the beach or both. We can pair Zanzibar with a safari and plan the domestic connections as one booking.',
    listTitle: 'Sample Zanzibar itineraries',
    afterTitle: 'Give Zanzibar enough time.',
    afterCopy: 'Plan the island as part of the trip. We leave room to slow down and connect it cleanly with your safari or onward flight.',
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
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeCategory = categoryKey ? itineraryCategories.find((category) => category.key === categoryKey) : null;
  const showTypeFilter = !activeCategory;
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
      <section className={`itinerary-listing-hero ${activeCategory?.key === 'safaris' ? 'is-safari-hero' : ''}`} aria-labelledby="itinerary-listing-heading">
        {activeCategory?.key === 'safaris' && <img className="itinerary-listing-hero-image" src={safariMedia.elephants.src} alt={safariMedia.elephants.alt} fetchPriority="high" decoding="async" />}
        <div className="itinerary-listing-hero-inner">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 id="itinerary-listing-heading">{copy.title}</h1>
            <p>{copy.lead}</p>
            <Link to="/enquire" className="itinerary-listing-hero-action">Ask for your itinerary <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
          <div className="itinerary-listing-proof" aria-label="Wild Wings planning principles">
            <p>Private travel, clearly planned</p>
            <span><Check aria-hidden="true" size={15} />Customised around your dates</span>
            <span><Check aria-hidden="true" size={15} />Dedicated guide or mountain team</span>
            <span><Check aria-hidden="true" size={15} />Clear proposal before booking</span>
          </div>
        </div>
      </section>

      <section className={`itinerary-listing-content ${activeCategory ? 'is-category' : ''}`} aria-labelledby="itinerary-list-heading">
        <button type="button" className="itinerary-mobile-filter-toggle" aria-expanded={filtersOpen} aria-controls="itinerary-filters" onClick={() => setFiltersOpen((open) => !open)}>
          {filtersOpen ? 'Close filters' : 'Filter itineraries'} <span>{activeDurationLabel}</span>
        </button>
        <aside id="itinerary-filters" className={`itinerary-filter-rail ${filtersOpen ? 'is-open' : ''}`} aria-label={showTypeFilter ? 'Filter itineraries' : 'Filter itinerary length'}>
          {showTypeFilter && (
            <div className="itinerary-filter-group">
              <p>Type</p>
              <nav>
                <Link to="/itineraries" className="is-active" aria-current="page">All itineraries <span>{topPackages.length}</span></Link>
                {itineraryCategories.map((category) => (
                  <Link key={category.key} to={`/itineraries/${category.key}`}>{category.name} <span>{category.packageKeys.length}</span></Link>
                ))}
              </nav>
            </div>
          )}
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
            <div className="itinerary-list-heading-tools">
              <label className="itinerary-sort-control">Sort by
                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                  <option value="recommended">Recommended</option>
                  <option value="shortest">Shortest duration</option>
                  <option value="longest">Longest duration</option>
                </select>
              </label>
              <div className="itinerary-view-toggle" role="group" aria-label="Itinerary view">
                <button type="button" className={viewMode === 'grid' ? 'is-active' : ''} aria-pressed={viewMode === 'grid'} onClick={() => setViewMode('grid')}><LayoutGrid aria-hidden="true" size={14} /> Grid</button>
                <button type="button" className={viewMode === 'list' ? 'is-active' : ''} aria-pressed={viewMode === 'list'} onClick={() => setViewMode('list')}><List aria-hidden="true" size={14} /> List</button>
              </div>
            </div>
          </header>

          <div className={`itinerary-list-cards itinerary-catalog-${viewMode}`}>
            {matchingPackages.map((tourPackage, index) => {
              const startingPrice = getPackageStartingPrice(tourPackage);
              const media = getPackageMedia(tourPackage.key);
              return (
                <article className={`itinerary-list-card ${media ? 'has-image' : ''}`} key={tourPackage.key}>
                  <div className={`itinerary-list-route-panel ${media ? 'has-image' : ''}`}>
                    {media && <img className="itinerary-list-route-image" src={media.src} alt="" loading="lazy" decoding="async" />}
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{tourPackage.tag}</p>
                    <div><Route aria-hidden="true" size={16} strokeWidth={1.8} /><small>{tourPackage.route}</small></div>
                  </div>
                  <div className="itinerary-list-card-main">
                    <div className="itinerary-list-card-meta"><Badge variant={tourPackage.popular ? 'default' : 'outline'}>{tourPackage.popular ? 'Traveller favourite' : 'Private itinerary'}</Badge><span><CalendarDays aria-hidden="true" size={14} />{tourPackage.duration}</span></div>
                    <h3>{tourPackage.name}</h3>
                    <p>{tourPackage.copy}</p>
                    <ul>
                      <li><Check aria-hidden="true" size={14} />{tourPackage.bestFor}</li>
                      <li><Check aria-hidden="true" size={14} />{tourPackage.includes}</li>
                    </ul>
                    {startingPrice && (
                      <div className="itinerary-list-card-price">
                        <span>Starts from</span>
                        <strong>{startingPrice} <small>per person</small></strong>
                      </div>
                    )}
                    <Link to={`/tours/${tourPackage.key}`} className="itinerary-list-card-action">{viewMode === 'grid' ? 'View trip' : 'View this itinerary'} <ArrowRight aria-hidden="true" size={16} /></Link>
                  </div>
                </article>
              );
            })}
            {activeCategory && matchingPackages.length === 1 && (
              <article className="itinerary-solo-card">
                <p className="eyebrow">More ways to travel</p>
                <h3>Compare the full catalogue.</h3>
                <p>This page shows the current {activeCategory.name.toLowerCase()} route. Browse the other itineraries to compare safari, mountain and coast combinations.</p>
                <Link to="/itineraries" className="itinerary-solo-action">View all itineraries <ArrowRight aria-hidden="true" size={15} /></Link>
              </article>
            )}
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
