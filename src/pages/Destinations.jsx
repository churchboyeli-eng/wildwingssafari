import {
  ArrowRight,
  BedDouble,
  Binoculars,
  CalendarDays,
  Check,
  Compass,
  Map,
  Mountain,
  Palmtree,
  Route,
  Trees,
  Waves,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCompassGuidesForSection } from '../data/compassGuides';

const compassChoices = [
  {
    title: 'I want the classic first safari',
    label: 'Wildlife first',
    copy: 'Start with Serengeti, Ngorongoro and Tarangire when you want big wildlife, varied country and a first Tanzania safari with enough time in each park.',
    bestFor: 'First-time safari, families, photographers',
    route: 'Arusha · Tarangire · Serengeti · Ngorongoro',
    icon: Binoculars,
    to: '/itineraries/safaris',
  },
  {
    title: 'I want safari, then the ocean',
    label: 'Bush and beach',
    copy: 'Let the safari carry the adventure, then use Zanzibar for slower days. The sequence matters, so flights, transfers and beach time are planned as one route.',
    bestFor: 'Honeymoons, celebrations, slow endings',
    route: 'Northern parks or Nyerere · Zanzibar',
    icon: Waves,
    to: '/itineraries/zanzibar',
  },
  {
    title: 'I want space away from the crowds',
    label: 'Quiet south',
    copy: 'Mikumi and Nyerere bring a different Tanzania: river country, open savannah and more room around each wildlife moment.',
    bestFor: 'Repeat safari travellers, coast pairings',
    route: 'Dar es Salaam · Mikumi · Nyerere · Zanzibar',
    icon: Trees,
    to: '/itineraries/safaris',
  },
  {
    title: 'I want a summit in the story',
    label: 'Mountain chapter',
    copy: 'Kilimanjaro needs its own pace. Choose the route, allow time to acclimatise, then plan recovery after the descent and a gentler finish.',
    bestFor: 'Active travellers and small groups',
    route: 'Moshi climb · safari or Zanzibar recovery',
    icon: Mountain,
    to: '/itineraries/kilimanjaro',
  },
];

const planningSteps = [
  { label: 'North', value: 'Serengeti, crater, Tarangire and Lake Manyara' },
  { label: 'South', value: 'Nyerere, Mikumi, Rufiji River and quieter circuits' },
  { label: 'Coast', value: 'Stone Town, spice culture, reefs and beach recovery' },
  { label: 'Summit', value: 'Kilimanjaro routes with acclimatisation built in' },
];

const routeStories = [
  {
    title: 'The north carries the classic safari promise.',
    tone: 'Migration, crater, baobabs',
    copy: 'Serengeti gives the open ecosystem, Ngorongoro adds geological and human-history depth, Tarangire brings elephant-and-baobab country, and Lake Manyara changes the texture with forest, escarpment and lake.',
    points: ['Best first safari', 'Strong history layer', 'Easy Arusha start'],
  },
  {
    title: 'The south has its own reason to go.',
    tone: 'River, miombo, room to breathe',
    copy: 'Nyerere and Mikumi make sense when the guest wants Rufiji water safaris, walking options, big skies, Dar es Salaam access and a route that can connect cleanly to Zanzibar.',
    points: ['Nyerere and Mikumi', 'Strong coast pairing', 'Less crowded rhythm'],
  },
  {
    title: 'The coast has its own story.',
    tone: 'Swahili heritage and sea days',
    copy: 'Zanzibar is stronger when it is planned as culture, spice history, marine life, reef days or real rest. Stone Town gives context; the beaches give the body time to land after safari.',
    points: ['Stone Town', 'Spice and food', 'Marine activities'],
  },
  {
    title: 'The mountain changes the whole calendar.',
    tone: 'Altitude, weather, recovery',
    copy: 'Kilimanjaro needs acclimatisation, guided climb logistics, descent recovery and a softer safari or coast finish. It changes the rhythm of the entire itinerary.',
    points: ['Acclimatisation', 'Summit support', 'Recovery days'],
  },
];

const referenceSections = [
  {
    id: 'parks',
    title: 'National parks',
    icon: Trees,
    description: 'History, habitat and route-use notes for the parks clients ask about first.',
  },
  {
    id: 'activities',
    title: 'Activities',
    icon: Map,
    description: 'How each activity changes the itinerary and where it fits.',
  },
  {
    id: 'islands',
    title: 'Coast and islands',
    icon: Palmtree,
    description: 'Zanzibar context, beach recovery and when the coast should enter the route.',
  },
  {
    id: 'stays',
    title: 'Stays',
    icon: BedDouble,
    description: 'How accommodation style affects pace, comfort and field time.',
  },
];

const experienceLanes = [
  {
    num: '01',
    title: 'Drive',
    label: 'Game-drive rhythm',
    copy: 'Use long, protected field windows. Serengeti, Tarangire, Mikumi and Nyerere each need a different drive rhythm.',
    points: ['Morning and late light', 'Guide-led patience', 'Respectful sightings'],
    to: '/tanzania-travel-guide/game-drives',
  },
  {
    num: '02',
    title: 'Float',
    label: 'Rufiji River perspective',
    copy: 'Nyerere becomes memorable when the river is part of the plan: channels, hippos, crocodiles, birds and a slower water-level view.',
    points: ['Boat safari potential', 'Southern Tanzania feel', 'Sunset river light'],
    to: '/tanzania-travel-guide/boat-safaris-rufiji',
  },
  {
    num: '03',
    title: 'Walk',
    label: 'Tracks and interpretation',
    copy: 'Walking belongs where guides, permits and lodge programmes support a safe, detailed bush interpretation.',
    points: ['Tracks and plants', 'Approved areas', 'Ranger-led where required'],
    to: '/tanzania-travel-guide/walking-safaris',
  },
  {
    num: '04',
    title: 'Learn',
    label: 'Culture and heritage',
    copy: 'Olduvai, Laetoli, Ngorongoro and Stone Town connect the route to archaeology, geology and living culture as well as wildlife.',
    points: ['Human-history context', 'Swahili coast', 'Geology and archaeology'],
    to: '/tanzania-travel-guide/cultural-heritage-days',
  },
  {
    num: '05',
    title: 'Climb',
    label: 'Summit planning',
    copy: 'Kilimanjaro changes the body of the trip. Route choice, acclimatisation and recovery days should lead the plan.',
    points: ['Licensed guiding', 'Acclimatisation days', 'Recovery after descent'],
    to: '/tanzania-travel-guide/kilimanjaro-climbing',
  },
  {
    num: '06',
    title: 'Recover',
    label: 'Coast with purpose',
    copy: 'Zanzibar should have a job: rest, culture, reef days, honeymoon privacy or family ease after dusty safari days.',
    points: ['Stone Town context', 'Beach pace', 'Reef and sea days'],
    to: '/tanzania-travel-guide/zanzibar-coast',
  },
];

export default function Destinations() {
  return (
    <div className="page-enter destinations-page">
      <section className="discover-hero" aria-labelledby="discover-heading">
        <div className="discover-hero-copy">
          <p className="eyebrow">Inside Tanzania</p>
          <h1 id="discover-heading">A guide to choosing your route.</h1>
          <p>Start with the story behind the place: why Serengeti needs time, how Ngorongoro connects wildlife and geology, why Nyerere changes safari pace, and where Zanzibar adds culture, sea or recovery.</p>
          <div className="discover-hero-actions">
            <a href="#tanzania-compass" className="btn-primary">Find the right route <ArrowRight aria-hidden="true" size={16} /></a>
            <a href="#field-notes" className="btn-quiet">Open field notes <ArrowRight aria-hidden="true" size={16} /></a>
          </div>
        </div>

        <aside className="discover-plan-card" aria-label="Trip planning prompt">
          <div className="discover-plan-card-top">
            <Compass aria-hidden="true" size={24} />
            <div>
              <p>Wild Wings field map</p>
              <h2>Four regions. Different routes.</h2>
            </div>
          </div>
          <div className="discover-compass-map" aria-hidden="true">
            <span>North</span>
            <span>South</span>
            <span>Coast</span>
            <span>Summit</span>
            <strong>How they connect</strong>
          </div>
          <div className="discover-plan-steps">
            {planningSteps.map((step) => (
              <div key={step.label}>
                <span>{step.label}</span>
                <strong>{step.value}</strong>
              </div>
            ))}
          </div>
          <ul className="discover-proof-list">
            <li><Check aria-hidden="true" size={15} /> Private trips shaped around your pace</li>
            <li><Check aria-hidden="true" size={15} /> Field notes for the details behind each route</li>
            <li><Check aria-hidden="true" size={15} /> Safari, Zanzibar and Kilimanjaro connected in one plan</li>
          </ul>
        </aside>
      </section>

      <section className="discover-compass" id="tanzania-compass" aria-labelledby="discover-compass-heading">
        <header className="discover-section-heading">
          <div>
            <p className="eyebrow">Choose a direction</p>
            <h2 id="discover-compass-heading">Pick the question that sounds like your trip.</h2>
          </div>
          <p>Most safari pages start with place names. We start with intent, then show which parks, coast days and activities actually support that trip.</p>
        </header>

        <div className="discover-compass-grid">
          {compassChoices.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className="discover-compass-choice" key={item.title}>
                <div className="discover-compass-choice-top">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" size={21} />
                </div>
                <p>{item.label}</p>
                <h3>{item.title}</h3>
                <p className="discover-compass-copy">{item.copy}</p>
                <dl>
                  <div><dt>Best for</dt><dd>{item.bestFor}</dd></div>
                  <div><dt>Route shape</dt><dd>{item.route}</dd></div>
                </dl>
                <Link to={item.to} className="discover-compass-action">Explore this direction <ArrowRight aria-hidden="true" size={15} /></Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="discover-unveiled" aria-labelledby="discover-unveiled-heading">
        <div className="discover-unveiled-copy">
          <p className="eyebrow">How the regions work together</p>
          <h2 id="discover-unveiled-heading">Where you go changes the whole route.</h2>
          <p>The better question is what each place does for the whole journey. Does it add wildlife density, geological history, a river activity, culture, recovery or a smarter transfer?</p>
        </div>
        <div className="discover-story-grid">
          {routeStories.map((story, index) => (
            <article className="discover-story-card" key={story.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <small>{story.tone}</small>
                <h3>{story.title}</h3>
              </div>
              <p>{story.copy}</p>
              <ul>
                {story.points.map((point) => <li key={point}><Check aria-hidden="true" size={14} />{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="discover-reference" id="field-notes" aria-labelledby="discover-reference-heading">
        <header className="discover-section-heading">
          <div>
            <p className="eyebrow">Field notes library</p>
            <h2 id="discover-reference-heading">Read the details behind the route.</h2>
          </div>
          <p>Quick orientation on the hub, then deeper guide pages for clients who want park history, activity logic, Zanzibar context and stay advice before they enquire.</p>
        </header>

        <div className="discover-reference-grid">
          {referenceSections.map((section) => {
            const Icon = section.icon;
            const guides = getCompassGuidesForSection(section.id);
            return (
              <article id={section.id} className="discover-reference-panel" key={section.id}>
                <div className="discover-reference-title">
                  <Icon aria-hidden="true" size={22} />
                  <div>
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                  </div>
                </div>
                <div className="discover-mini-list">
                  {guides.map((item) => (
                    <Link to={`/tanzania-travel-guide/${item.slug}`} key={item.slug}>
                      <strong>{item.name}</strong>
                      <p>{item.label}</p>
                      <span>Read field note <ArrowRight aria-hidden="true" size={12} /></span>
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="discover-reference discover-routes" aria-labelledby="experience-lanes-heading">
        <header className="discover-section-heading">
          <div>
            <p className="eyebrow">Activities with a reason</p>
            <h2 id="experience-lanes-heading">Choose the activity that fits the route.</h2>
          </div>
          <p>Know what the route lets you do: drive, float, walk, learn, climb and recover. Each activity changes the parks, timing and stays we recommend.</p>
        </header>

        <div className="discover-route-grid">
          {experienceLanes.map((lane) => (
            <article className="discover-route-card" key={lane.title}>
              <div className="discover-route-topline">
                <span>{lane.num}</span>
                <p>{lane.label}</p>
              </div>
              <h3>{lane.title}</h3>
              <p>{lane.copy}</p>
              <ul>
                {lane.points.map((point) => <li key={point}><Check aria-hidden="true" size={14} />{point}</li>)}
              </ul>
              <div className="discover-route-footer">
                <span><Route aria-hidden="true" size={14} /> Where it fits</span>
                <Link to={lane.to}>Read note <ArrowRight aria-hidden="true" size={14} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="discover-closing">
        <div>
          <p className="eyebrow">Make it private</p>
          <h2>Tell us the parks, pace and dates.</h2>
          <p>It could be Serengeti with enough time, Ngorongoro with archaeology, Tarangire elephants, a Rufiji boat safari, Zanzibar reef days or Kilimanjaro with room to recover. We will join the pieces into one private route.</p>
        </div>
        <div className="discover-closing-actions">
          <Link to="/enquire" className="btn-primary">Request a route proposal <ArrowRight aria-hidden="true" size={16} /></Link>
          <Link to="/plan-a-journey" className="btn-dark">Build my trip <CalendarDays aria-hidden="true" size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
