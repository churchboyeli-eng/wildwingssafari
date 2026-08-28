export const contact = {
  whatsappNumber: '+255 000 000 000',
  bookingEmail: 'hello@wildwings.example',
  officeLocation: 'Arusha, Tanzania',
};

export const waHref = `https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, '') || '255000000000'}`;

export const destinations = [
  { key: 'northern', num: '01', name: 'Northern Circuit Safaris', tag: 'Serengeti · Ngorongoro · Tarangire', copy: 'Tanzania’s classic safari: big landscapes, varied wildlife and a route that gives first-time visitors the country’s defining parks.', highlights: ['Classic first safari', 'Big wildlife landscapes', 'Flexible 5–9 day routes'] },
  { key: 'southern', num: '02', name: 'Nyerere & Mikumi Escapes', tag: 'Southern Tanzania · river & savannah', copy: 'Trade the busier north for a more intimate southern rhythm: wide-open Mikumi plains paired with Nyerere’s river country and boat-safari potential.', highlights: ['Quieter safari rhythm', 'River and savannah contrast', 'Easy coast pairing'] },
  { key: 'zanzibar', num: '03', name: 'Zanzibar: Beach, Culture & Sea', tag: 'Stone Town · coast · island days', copy: 'Stay long enough to do Zanzibar properly: the character of Stone Town, slow beach days and island experiences that fit your pace.', highlights: ['Beach time with substance', 'Stone Town and spice', 'Perfect safari finish'] },
  { key: 'safari-zanzibar', num: '04', name: 'Safari & Zanzibar Journeys', tag: 'Bush to beach · one itinerary', copy: 'A wildlife chapter followed by the Indian Ocean, planned as one journey with the connections, stays and down-time already considered.', highlights: ['One connected trip', 'North or south safari', 'Seamless beach finish'] },
  { key: 'kilimanjaro', num: '05', name: 'Kilimanjaro & Mount Meru', tag: 'Trekking · fully supported', copy: 'Choose a mountain challenge with a thoughtful acclimatisation rhythm, experienced support and a route matched to your confidence.', highlights: ['Supported mountain days', 'Scenic route choices', 'Add a safari or beach'] },
  { key: 'private-trips', num: '06', name: 'Private Family & Celebration Trips', tag: 'Honeymoon · family · friends', copy: 'Take the places you care about and make them your own, with a private vehicle, an easier pace and stays that suit your group.', highlights: ['Private from the outset', 'Your pace, your people', 'Built around the occasion'] },
];

export const why = [
  { num: '01', title: 'Local Expertise', lead: 'We live here', copy: 'Born and raised in Tanzania, we know which camps, seasons and routes actually deliver — so your days are spent on the moments that matter, not the guesswork.' },
  { num: '02', title: 'Professional & Passionate Team', lead: 'Guides who care', copy: 'Experienced, English-speaking guides who treat your trip like their own — reading the bush, finding the wildlife, and looking after every detail.' },
  { num: '03', title: 'Seamless Planning', lead: 'Zero stress', copy: 'From your first message to your flight home, every transfer, permit and lodge is handled for you. You just show up and experience it.' },
  { num: '04', title: 'Transparent Pricing', lead: 'No surprises', copy: 'One clear quote, no hidden costs. You always know exactly what you’re paying for — and exactly what it’s worth.' },
  { num: '05', title: 'Customer-Centred', lead: 'Built around you', copy: 'Every itinerary is shaped to your pace, budget and dreams. Your satisfaction isn’t the goal — an unforgettable journey is.' },
];

export const specialistPoints = [
  '100% specialised in Tanzania',
  'Private safaris with dedicated vehicles and guides',
  'Travel advisors who live in Tanzania',
  'Guaranteed for an amazing safari experience',
  'Personalised service, from booking to on-site support',
  'Approachable, with quick responses',
];

export const tourDifferentiators = [
  { pillar: 'Before you commit', icon: 'receipt', title: 'Your quote, line by line', copy: 'See what is included, what changes with the season and what remains optional before you choose.' },
  { pillar: 'Before you commit', icon: 'calendar', title: 'Your month shapes the route', copy: 'Your dates and wildlife priorities guide the recommendation, not a generic safari calendar.' },
  { pillar: 'Before you commit', icon: 'route', title: 'Not just days—an honest pace', copy: 'We explain the route rhythm, transfer days and where the time is truly spent.' },
  { pillar: 'Before you commit', icon: 'bed', title: 'The camp, or an explained alternative', copy: 'Accommodation is chosen with context, not hidden behind a vague “or similar”.' },
  { pillar: 'Before you commit', icon: 'plane', title: 'Safari and sea, one journey', copy: 'Safari, Zanzibar flights, handovers and beach time are planned as a connected experience.' },
  { pillar: 'Before you commit', icon: 'compass', title: 'Advice that points to the source', copy: 'Important planning guidance is made clear, with live authority information where it matters.' },
  { pillar: 'On your terms', icon: 'car', title: 'Private by design', copy: 'Your vehicle and guide are part of your own trip, not an unexpected shared departure.' },
  { pillar: 'On your terms', icon: 'user', title: 'A named guide, a prepared vehicle', copy: 'A good safari starts before the first game drive: with a clear handover and a ready vehicle.' },
  { pillar: 'On your terms', icon: 'shield', title: 'A real plan B behind every day', copy: 'Routes can respond to weather, road conditions and changing wildlife without losing the heart of the trip.' },
  { pillar: 'On your terms', icon: 'utensils', title: 'Needs noted before you land', copy: 'Room setup, dietary notes and the small practical details are part of the planning conversation.' },
  { pillar: 'On your terms', icon: 'heart', title: 'Culture with context', copy: 'When a cultural moment is part of the route, it should feel considered—not like a checkbox.' },
  { pillar: 'On your terms', icon: 'message', title: 'Every question gets a usable answer', copy: 'Ask for a comparison, a change or a simpler explanation before you make a decision.' },
  { pillar: 'More from every day', icon: 'binoculars', title: 'Migration, never a chase', copy: 'Wildlife sets the moment. The right viewing experience puts patience and park guidance first.' },
  { pillar: 'More from every day', icon: 'sunrise', title: 'Wildlife gets the right of way', copy: 'A strong sighting is respectful: no rushing, no crowding and no turning an animal into a schedule.' },
  { pillar: 'More from every day', icon: 'camera', title: 'A quieter way to watch', copy: 'More calm around wildlife means more space to notice the moment, hear the landscape and make images.' },
  { pillar: 'More from every day', icon: 'footprints', title: 'No shortcuts through the wild', copy: 'A great route respects the parks it passes through, keeping the experience grounded in the place.' },
  { pillar: 'More from every day', icon: 'map', title: 'Time in the right places', copy: 'The itinerary protects game-viewing time instead of treating every park as a quick stop.' },
  { pillar: 'More from every day', icon: 'palmtree', title: 'A softer landing at the coast', copy: 'When Zanzibar is part of the journey, we leave room to slow down rather than rush straight home.' },
];

export const homeOfferPackageKeys = ['tarangire-day-trip', 'explore-serengeti', 'serengeti-ngorongoro', 'tarangire-ngorongoro-arusha', 'tanzania-mid-range', 'tanzania-migration-safari'];

export const getPackageStartingPrice = (tourPackage) => {
  const values = tourPackage?.pricing?.rows
    ?.flatMap((row) => row.prices || [])
    .map((price) => Number(String(price.amount).replace(/[^0-9.]/g, '')))
    .filter((amount) => Number.isFinite(amount));

  if (!values?.length) return null;

  return `$${Math.min(...values).toLocaleString('en-US')}`;
};

const suppliedSafariPackages = [
  {
    key: 'tarangire-day-trip',
    types: ['safaris', 'zanzibar', 'tanzania'],
    num: '01',
    tag: 'Tarangire day trip',
    name: '1-Day Elephant Safari',
    duration: '1 day',
    route: 'Zanzibar · Arusha · Tarangire',
    stops: ['Zanzibar', 'Arusha', 'Tarangire National Park', 'Zanzibar'],
    bestFor: 'Zanzibar guests with one spare day',
    includes: 'Return flights, private 4×4, lunch and park fees',
    copy: 'A same-day fly-in safari from Zanzibar into Tarangire’s elephant country, built for travellers who want one powerful wildlife day without changing hotels.',
    homeHighlights: ['Return Zanzibar flights', 'Private pop-up 4×4', 'Lunch inside Tarangire'],
    popular: false,
    overview: 'This day trip is designed for guests already staying in Zanzibar who want a real mainland safari without adding overnight logistics. You fly to Arusha, meet your private driver-guide and continue straight into Tarangire National Park for baobabs, open savannah and excellent elephant viewing before flying back to the island the same evening.',
    suitability: 'Best for travellers short on time, beach guests who want a mainland wildlife chapter, or couples and families who want a private safari add-on from Zanzibar.',
    facts: [['Safari style', 'Private day trip safari'], ['Starts / ends', 'Zanzibar'], ['Destination', 'Tarangire National Park'], ['Meals', 'Lunch']],
    days: [
      {
        label: 'Day trip',
        title: 'Zanzibar flight, Tarangire game drive and return',
        location: 'Zanzibar → Arusha → Tarangire',
        stay: 'No overnight stay',
        meals: 'Lunch',
        note: 'Flight timing and transfers are confirmed before booking',
        copy: 'Begin with hotel pickup in Zanzibar and a scheduled flight to Arusha. Your driver-guide meets you on arrival and drives through Maasai landscapes to Tarangire National Park. Spend the day game driving among baobabs, elephant herds, lions, buffalo, giraffes, zebras, wildebeest and rich birdlife, with a picnic lunch served inside the park. In the late afternoon, return to Arusha or Kilimanjaro Airport for the flight back to Zanzibar and a hotel transfer on arrival.',
      },
    ],
    inclusions: ['Return domestic flights: Zanzibar → Arusha and Arusha/Kilimanjaro → Zanzibar', 'All Tarangire National Park entry fees', 'Private 4×4 safari vehicle with pop-up roof', 'Professional English-speaking driver-guide', 'Picnic lunch and bottled drinking water during the game drive', 'Airport and hotel transfers in Zanzibar and Arusha', 'Government taxes and statutory charges'],
    exclusions: ['International flights', 'Tanzania visa fees', 'Travel and medical insurance', 'Soft drinks and alcoholic beverages', 'Tips and gratuities for driver-guide and staff', 'Personal expenses such as souvenirs, laundry and phone calls', 'Optional activities not mentioned in the itinerary'],
    pricing: {
      label: '2026 USD private rate',
      title: 'Private day-trip safari package',
      note: '*Indicative cost per person in USD, excluding international airline tickets. Final quote depends on confirmed travel date, flight timing and availability.',
      rows: [
        {
          label: 'Private Day-Trip Rate',
          prices: [
            { persons: '2 adults', room: '1 double room', amount: '746' },
            { persons: '4 adults', room: '4 double rooms', amount: '645' },
            { persons: '6 adults', room: '3 double rooms', amount: '612' },
          ],
        },
      ],
    },
  },
  {
    key: 'explore-serengeti',
    types: ['safaris', 'zanzibar', 'tanzania'],
    num: '02',
    tag: 'Fly-in Serengeti',
    name: '2-Day Explore Serengeti',
    duration: '2 days / 1 night',
    route: 'Zanzibar · Central Serengeti · Zanzibar',
    stops: ['Zanzibar', 'Seronera Airstrip', 'Central Serengeti', 'Zanzibar'],
    bestFor: 'A short Serengeti escape from Zanzibar',
    includes: 'Return Serengeti flights, Golden Safari Camp and game drives',
    copy: 'A compact fly-in/fly-out Serengeti safari that skips the long road transfer and puts guests into the Seronera Valley fast.',
    homeHighlights: ['Seronera Airstrip access', 'Golden Safari Camp', 'Two game-drive chapters'],
    popular: true,
    overview: 'This two-day itinerary is built to maximise time in the wilderness for travellers starting from Zanzibar. Fly into the Serengeti, land close to the Central Serengeti’s wildlife-rich Seronera area and begin game viewing almost immediately. It gives guests an afternoon and evening game drive on Day 1, then a fuller Central Serengeti game-drive day before flying back to the coast.',
    suitability: 'Best for Zanzibar-based travellers who want the Serengeti experience but do not have enough time for a longer northern-circuit safari.',
    facts: [['Safari style', 'Private fly-in safari'], ['Starts / ends', 'Zanzibar'], ['Destination', 'Central Serengeti National Park'], ['Accommodation', 'Golden Safari Camp']],
    days: [
      {
        label: 'Day 1',
        title: 'Fly from Zanzibar to Central Serengeti',
        location: 'Zanzibar → Seronera',
        stay: 'Golden Safari Camp',
        meals: 'Lunch & dinner',
        note: 'Your safari starts almost immediately after landing',
        copy: 'Transfer from your Zanzibar hotel to Abeid Amani Karume International Airport for the scheduled flight to the Serengeti. On arrival at Seronera Airstrip, meet your professional safari driver-guide and begin your first game drive through the Seronera Valley and surrounding plains. Search for lions, leopards, cheetahs, elephants, giraffes, buffalo, zebras and wildebeest, with migration sightings possible by season. Continue into the afternoon and evening before checking in at Golden Safari Camp for dinner under the Serengeti sky.',
      },
      {
        label: 'Day 2',
        title: 'Full-day Central Serengeti game drive and fly back',
        location: 'Central Serengeti → Zanzibar',
        stay: 'No accommodation — end of safari',
        meals: 'Breakfast & lunch',
        note: 'Game drive timing works around the return flight',
        copy: 'Wake early for breakfast and head back into Central Serengeti while predators are active and the plains are cool. Your guide explores the Seronera Valley and nearby wildlife areas, using permanent water sources and current sightings to shape the day. Enjoy a picnic lunch in the park, continue with more wildlife viewing, then return to Seronera Airstrip for the afternoon flight to Zanzibar and hotel transfer.',
      },
    ],
    inclusions: ['Return domestic flights Zanzibar → Serengeti → Zanzibar', 'Airport transfers in Zanzibar and private airstrip transfers', 'Private 4×4 safari vehicle with pop-up roof', 'Professional English-speaking safari driver-guide', '1 night accommodation at Golden Safari Camp', 'All meals indicated in the itinerary', 'All Serengeti National Park entrance and conservation fees', 'Afternoon/evening game drive on Day 1 and full-day game drive on Day 2', 'Bottled drinking water, picnic lunch, vehicle fuel and operational costs', '24/7 ground support throughout the safari'],
    exclusions: ['International flights', 'Tanzania visa fees', 'Travel and medical insurance', 'Alcoholic beverages and soft drinks', 'Tips and gratuities for safari guide and lodge staff', 'Laundry, telephone and internet charges', 'Personal shopping and souvenirs', 'Hot-air balloon safari', 'Maasai village or cultural visits', 'Additional accommodation in Zanzibar before or after the safari'],
    pricing: {
      label: '2026 USD private rate',
      title: 'Fly-in Serengeti safari package',
      note: '*Indicative cost per person in USD, excluding international airline tickets. Final quote depends on confirmed travel date, flight timing, rooming and lodge availability.',
      rows: [
        {
          label: 'Private Fly-In Safari Rate',
          prices: [
            { persons: '2 adults', room: '1 double room', amount: '1,640' },
            { persons: '4 adults', room: '4 double rooms', amount: '1,390' },
            { persons: '6 adults', room: '3 double rooms', amount: '1,304' },
          ],
        },
      ],
    },
  },
  {
    key: 'serengeti-ngorongoro',
    types: ['safaris', 'zanzibar', 'tanzania'],
    num: '03',
    tag: 'Serengeti + Crater',
    name: '3-Day Serengeti & Ngorongoro',
    duration: '3 days / 2 nights',
    route: 'Zanzibar · Arusha · Serengeti · Ngorongoro',
    stops: ['Zanzibar', 'Arusha', 'Central Serengeti', 'Ngorongoro Crater', 'Zanzibar'],
    bestFor: 'Big icons in a short northern safari',
    includes: 'Serengeti, Ngorongoro, camp stay and park fees',
    copy: 'A short but serious northern-circuit safari with two Serengeti nights and a Ngorongoro Crater finish.',
    homeHighlights: ['Central Serengeti big cats', 'Ngorongoro Crater descent', 'Sightseeing Luxury Tented Camp'],
    popular: false,
    overview: 'This safari combines the endless plains of Central Serengeti with the world-famous Ngorongoro Crater. It is designed for travellers who want the two headline wildlife areas in a short route: a scenic transfer from Arusha into Serengeti, one full day in the Seronera region, then a crater descent before returning toward Arusha and Zanzibar.',
    suitability: 'Best for guests who want a compact northern safari from Zanzibar with real Serengeti time and a Ngorongoro Crater day.',
    facts: [['Safari style', 'Private safari'], ['Starts / ends', 'Zanzibar'], ['Destinations', 'Serengeti and Ngorongoro Crater'], ['Accommodation', 'Sightseeing Luxury Tented Camp']],
    days: [
      {
        label: 'Day 1',
        title: 'Fly to Arusha and drive into Central Serengeti',
        location: 'Zanzibar → Arusha → Central Serengeti',
        stay: 'Sightseeing Luxury Tented Camp',
        meals: 'Lunch & dinner',
        note: 'Possible Ngorongoro viewpoint stop depends on timing',
        copy: 'Take a scheduled morning flight from Zanzibar to Arusha Airport and meet your driver-guide for a short safari briefing. Travel across the Great Rift Valley and Karatu highlands toward Serengeti National Park, with a possible Ngorongoro Crater viewpoint stop for photos. Enter the Serengeti with an en-route game drive, looking for elephants, giraffes, buffalo and big cats before arriving at camp in the late afternoon.',
      },
      {
        label: 'Day 2',
        title: 'Full-day game drive in Central Serengeti',
        location: 'Central Serengeti',
        stay: 'Sightseeing Luxury Tented Camp',
        meals: 'Breakfast, lunch & dinner',
        note: 'The Seronera region is strong for resident wildlife',
        copy: 'Spend the full day in the Seronera region, one of the Serengeti’s most productive wildlife areas. Your guide looks for lions, cheetahs, leopards, buffalo, wildebeest and gazelles while adapting the route to sightings and light. Return to camp for dinner and a quiet night surrounded by the sounds of the Serengeti.',
      },
      {
        label: 'Day 3',
        title: 'Ngorongoro Crater tour and return to Zanzibar',
        location: 'Serengeti → Ngorongoro → Arusha → Zanzibar',
        stay: 'No accommodation — end of safari',
        meals: 'Breakfast & lunch',
        note: 'Crater descent and return flight timing are coordinated together',
        copy: 'After early breakfast, drive toward the Ngorongoro Conservation Area with a packed lunch and descend 600 metres into the crater. Explore open grasslands, acacia forest and soda-lake habitats where lions, elephants, buffalo, zebras, hippos and rare black rhino may be seen. After lunch, ascend to the rim and continue to Arusha or Kilimanjaro International Airport for the scheduled flight back to Zanzibar and hotel transfer.',
      },
    ],
    inclusions: ['All Serengeti and Ngorongoro park and conservation entry fees', '4×4 safari vehicle with pop-up roof, charging ports and fridge', 'Professional English-speaking driver-guide', 'Private safari experience', 'Accommodation in the listed midrange camp', 'All meals during safari as per meal plan', 'Drinking water during game drives'],
    exclusions: ['International flights not listed in the itinerary', 'Visa fees for Tanzania', 'Travel and medical insurance', 'Drinks at lodges and camps', 'Tips for safari guide, driver and lodge staff', 'Personal expenses such as souvenirs, laundry or phone calls', 'Optional cultural visits such as Maasai village', 'Hot-air balloon safari'],
    pricing: {
      label: '2026 USD private rate',
      title: 'Private northern safari package',
      note: '*Indicative cost per person in USD, excluding international airline tickets. Final quote depends on confirmed travel date, flight timing, rooming and lodge availability.',
      rows: [
        {
          label: 'Private Northern Safari Rate',
          prices: [
            { persons: '2 adults', room: '1 double room', amount: '1,973' },
            { persons: '4 adults', room: '4 double rooms', amount: '1,633' },
            { persons: '6 adults', room: '3 double rooms', amount: '1,520' },
          ],
        },
      ],
    },
  },
  {
    key: 'tarangire-ngorongoro-arusha',
    types: ['safaris', 'tanzania'],
    num: '04',
    tag: 'Three-park safari',
    name: '3-Day Tarangire, Ngorongoro & Arusha',
    duration: '3 days / 2 nights',
    route: 'Arusha · Tarangire · Ngorongoro · Arusha NP',
    stops: ['Arusha', 'Tarangire National Park', 'Mto wa Mbu', 'Ngorongoro Crater', 'Arusha National Park'],
    bestFor: 'A short northern safari with three different landscapes',
    includes: 'Tarangire, Ngorongoro, Arusha National Park, lodges and park fees',
    copy: 'A compact northern-circuit safari with elephant country, a crater descent and a Mount Meru-side finale in only three days.',
    homeHighlights: ['Tarangire elephant country', 'Ngorongoro Crater descent', 'Arusha National Park finale'],
    popular: false,
    overview: 'This three-day safari is built for travellers who want a short route with real variety. Begin in Tarangire among baobabs, elephants and the Tarangire River, descend into the wildlife-rich Ngorongoro Crater, then finish with Arusha National Park’s forests, Momella Lakes, giraffes, birdlife and Mount Meru scenery before departure.',
    suitability: 'Best for guests with limited time who still want more than one ecosystem, comfortable overnights and a safari finale close to Arusha or Kilimanjaro Airport.',
    facts: [['Safari style', 'Private northern safari'], ['Starts / ends', 'Arusha'], ['Destinations', 'Tarangire, Ngorongoro and Arusha National Park'], ['Accommodation', 'Ikumbi Safari Lodge and Njiro Legacy']],
    days: [
      {
        label: 'Day 1',
        title: 'Arusha to Tarangire National Park',
        location: 'Arusha → Tarangire → Mto wa Mbu',
        stay: 'Ikumbi Safari Lodge',
        meals: 'Lunch & dinner',
        note: 'Elephant herds, baobabs and the Tarangire River set the opening day',
        copy: 'After breakfast, leave Arusha and travel through Maasai steppe and traditional villages toward Tarangire National Park. Game drive through baobab-studded landscapes where elephants, buffalo, zebras, wildebeest, giraffes and predators may be seen. Enjoy a picnic lunch inside the park, continue the afternoon game drive, then exit toward Mto wa Mbu for dinner and overnight at Ikumbi Safari Lodge.',
      },
      {
        label: 'Day 2',
        title: 'Ngorongoro Crater game drive and Arusha overnight',
        location: 'Mto wa Mbu → Ngorongoro Crater → Arusha',
        stay: 'Njiro Legacy',
        meals: 'Breakfast, lunch & dinner',
        note: 'A full crater-floor wildlife day with a picnic lunch near the hippo pool',
        copy: 'After breakfast, descend 600 metres into the Ngorongoro Crater, a UNESCO World Heritage Site and one of Tanzania’s most wildlife-dense landscapes. Spend the day exploring grassland, forest and lake habitats for lions, elephants, buffalo, hyenas, hippos, zebras and, with luck, black rhino. After lunch, ascend from the crater and return to Arusha for check-in, relaxation and dinner.',
      },
      {
        label: 'Day 3',
        title: 'Arusha National Park and departure',
        location: 'Arusha → Arusha National Park → Airport',
        stay: 'No accommodation — end of tour',
        meals: 'Breakfast & lunch',
        note: 'A scenic final safari day close to Arusha and Kilimanjaro Airport',
        copy: 'After an early breakfast, drive to Arusha National Park for a final game drive across montane forest, open savannah and the Momella Lakes beneath Mount Meru. Look for giraffes, buffalo, zebras, warthogs, waterbucks and rich birdlife. Time permitting, a ranger-led walking safari can be arranged at extra cost. Later, return to Arusha or transfer to the airport for your onward flight.',
      },
    ],
    inclusions: ['All park and conservation entry fees for Tarangire, Ngorongoro and Arusha National Park', 'Private 4×4 safari vehicle with pop-up roof, charging ports and fridge', 'Professional English-speaking driver-guide', 'Accommodation as listed in the itinerary', 'All meals during safari as per meal plan', 'Drinking water during game drives', 'Airport or Arusha transfer for departure'],
    exclusions: ['International and local flights not listed in the itinerary', 'Visa fees for Tanzania', 'Travel and medical insurance', 'Soft drinks and alcoholic beverages at lodges', 'Tips for safari guide, driver and lodge staff', 'Personal expenses such as souvenirs, laundry or phone calls', 'Walking safari and boat safari in Arusha National Park', 'Optional cultural visits such as a Maasai village'],
    pricing: {
      label: '2026 USD private rate',
      title: 'Short northern safari package',
      note: '*Indicative cost per person in USD, excluding international airline tickets. Final quote depends on confirmed travel date, rooming and lodge availability.',
      rows: [
        {
          label: 'Private Three-Park Safari Rate',
          period: '2026 · USD per person',
          prices: [
            { persons: '2 adults', room: '1 double room', amount: '1,055' },
            { persons: '4 adults', room: '4 double rooms', amount: '760' },
            { persons: '6 adults', room: '3 double rooms', amount: '658' },
          ],
        },
      ],
    },
  },
  {
    key: 'tanzania-mid-range',
    types: ['safaris', 'tanzania'],
    num: '05',
    tag: 'Mid-range safari',
    name: '4-Day Tanzania Mid-Range Safari',
    duration: '4 days / 3 nights',
    route: 'Arusha · Tarangire · Serengeti · Ngorongoro',
    stops: ['Arusha', 'Tarangire National Park', 'Mto wa Mbu', 'Central Serengeti', 'Ngorongoro'],
    bestFor: 'A fuller short safari with varied landscapes',
    includes: 'Airport transfers, lodges, private 4×4 and park fees',
    copy: 'A four-day northern safari through Tarangire, Central Serengeti and Ngorongoro, with more time for landscape variety and proper game drives.',
    homeHighlights: ['Tarangire elephants and baobabs', 'Full Serengeti day', 'Ngorongoro finish'],
    popular: false,
    overview: 'This four-day safari gives the northern circuit a fuller rhythm. Start with Tarangire’s baobabs and elephant herds, continue through the Ngorongoro highlands into Central Serengeti for resident wildlife and predator viewing, then close the journey via Ngorongoro and onward departure toward Arusha or Kilimanjaro.',
    suitability: 'Best for travellers who want a short safari that still feels complete, with varied parks, a full Serengeti day and a comfortable mid-range camp/lodge setup.',
    facts: [['Safari style', 'Private 4×4 safari'], ['Starts', 'Arusha Airport'], ['Ends', 'Arusha or Kilimanjaro Airport'], ['Accommodation', 'Ikumbi Safari Lodge and Sightseeing Luxury Camp']],
    days: [
      {
        label: 'Day 1',
        title: 'Arusha to Tarangire National Park and Mto wa Mbu',
        location: 'Arusha → Tarangire → Mto wa Mbu',
        stay: 'Ikumbi Safari Lodge',
        meals: 'Lunch & dinner',
        note: 'First wildlife day focuses on elephants, baobabs and the Tarangire River',
        copy: 'Meet your safari guide at Arusha Airport and drive to Tarangire National Park. Explore ancient baobab landscapes, elephant herds and wildlife such as lions, leopards, buffalo, giraffes and abundant birdlife. After a game drive along the Tarangire River, continue to Mto wa Mbu at the base of the Great Rift Valley escarpment for dinner and overnight.',
      },
      {
        label: 'Day 2',
        title: 'Karatu highlands to Central Serengeti',
        location: 'Karatu → Central Serengeti',
        stay: 'Sightseeing Luxury Camp',
        meals: 'Breakfast, lunch & dinner',
        note: 'Packed lunch and game drive en route into the Serengeti',
        copy: 'After breakfast, depart with packed lunch toward the Serengeti via the scenic Ngorongoro highlands. Enter Central Serengeti and game drive en route through the Seronera area, known for resident wildlife, open plains and strong predator sightings.',
      },
      {
        label: 'Day 3',
        title: 'Full day exploring the Serengeti',
        location: 'Central Serengeti',
        stay: 'Sightseeing Luxury Camp',
        meals: 'Breakfast, lunch & dinner',
        note: 'A full day protects prime wildlife-viewing time',
        copy: 'Spend the day immersed in Central Serengeti. Begin early when predators are most active and the savannah glows in soft light. Look for lions on kopjes, cheetahs on the grasslands, giraffes browsing acacia and elephants along the Seronera River. After a picnic lunch, continue the afternoon game drive for hippos, zebras, wildebeest and birdlife before returning to camp.',
      },
      {
        label: 'Day 4',
        title: 'Serengeti to Ngorongoro and onward departure',
        location: 'Serengeti → Ngorongoro → Arusha / Kilimanjaro',
        stay: 'No accommodation — end of tour',
        meals: 'Breakfast & lunch',
        note: 'Drop-off is arranged for onward travel',
        copy: 'After early breakfast, leave the Serengeti with a final en-route game drive and continue toward the Ngorongoro Conservation Area through scenic highland landscapes. By early afternoon, proceed to Arusha or Kilimanjaro International Airport for your onward flight, bringing the safari to a close.',
      },
    ],
    inclusions: ['All airport transfers for pick-up and drop-off', 'Accommodation as per itinerary', 'Meals as indicated in the itinerary', 'Private 4×4 safari vehicle with pop-up roof', 'Professional English-speaking safari driver-guide', 'Unlimited game drives in all national parks', 'All park fees and conservation fees', 'Ngorongoro crater descent fee', '1.5 litres bottled drinking water per person per day'],
    exclusions: ['International and domestic flights', 'Travel insurance', 'Visa fees for Tanzania', 'Optional activities such as balloon safari, Maasai village visit and walking safari', 'Drinks at lodges', 'Personal expenses such as tips, laundry and telephone costs', 'Accommodation before or after safari unless mentioned'],
    pricing: {
      label: '2026 USD private rate',
      title: 'Mid-range private safari package',
      note: '*Indicative cost per person in USD, excluding international airline tickets. Final quote depends on confirmed travel date, rooming and lodge availability.',
      rows: [
        {
          label: 'Private Mid-Range Safari Rate',
          prices: [
            { persons: '2 adults', room: '1 double room', amount: '1,790' },
            { persons: '4 adults', room: '4 double rooms', amount: '1,425' },
            { persons: '6 adults', room: '3 double rooms', amount: '1,305' },
          ],
        },
      ],
    },
  },
  {
    key: 'tanzania-migration-safari',
    types: ['safaris', 'migration', 'tanzania'],
    num: '06',
    tag: 'Migration focus',
    name: '5-Day Tanzania Migration Safari',
    duration: '5 days / 4 nights',
    route: 'Central Serengeti · Northern Serengeti · Ngorongoro',
    stops: ['Arusha', 'Central Serengeti', 'Northern Serengeti', 'Central Serengeti', 'Ngorongoro Crater'],
    bestFor: 'Migration-season travellers who want serious Serengeti time',
    includes: 'Central/North Serengeti, Ngorongoro, mid-range camps and park fees',
    copy: 'A focused Serengeti migration route with time in both Central and Northern Serengeti, finishing with Ngorongoro Crater.',
    homeHighlights: ['Central and North Serengeti', 'Mara River migration focus', 'Ngorongoro Crater finish'],
    popular: true,
    overview: 'This five-day safari is designed around the drama of the Serengeti during migration season. Start in Central Serengeti for resident wildlife and predator viewing, continue north toward the Mara River region for migration possibilities, then return through Central Serengeti before ending with a Ngorongoro Crater game drive and onward transfer.',
    suitability: 'Best for wildlife-focused travellers who want more Serengeti time than a short fly-in safari and who understand that migration sightings depend on season, weather and herd movement.',
    facts: [['Safari style', 'Private migration-focused safari'], ['Starts / ends', 'Arusha'], ['Destinations', 'Central Serengeti, Northern Serengeti and Ngorongoro'], ['Accommodation', 'Tukaone Serengeti Camp and Sero Tented Camp']],
    days: [
      {
        label: 'Day 1',
        title: 'Arusha to Central Serengeti',
        location: 'Arusha → Central Serengeti',
        stay: 'Tukaone Serengeti Camp',
        meals: 'Lunch & dinner',
        note: 'Scenic transfer through Karatu highlands with game drive on arrival',
        copy: 'After breakfast, meet your driver-guide in Arusha or at Arusha Airport for a safari briefing. Travel through the Great Rift Valley and Karatu highlands, with a possible Ngorongoro viewpoint stop depending on timing. Enter Serengeti National Park and begin an en-route game drive through the Seronera region, known for strong resident wildlife, big cats and leopard sightings along the riverine areas.',
      },
      {
        label: 'Day 2',
        title: 'Central Serengeti to Northern Serengeti',
        location: 'Central Serengeti → Northern Serengeti',
        stay: 'Sero Tented Camp',
        meals: 'Breakfast, lunch & dinner',
        note: 'A full transfer day that stays productive with game viewing en route',
        copy: 'Leave Central Serengeti after breakfast and drive north through changing Serengeti landscapes. Game view en route as you search for elephants, giraffes, lions, zebras and wildebeest herds moving through the plains. Arrive in Northern Serengeti for an afternoon game-drive chapter before settling into camp for dinner and overnight.',
      },
      {
        label: 'Day 3',
        title: 'Full-day game drive in Northern Serengeti',
        location: 'Northern Serengeti',
        stay: 'Sero Tented Camp',
        meals: 'Breakfast, lunch & dinner',
        note: 'The day focuses on migration movement and Mara River-area wildlife',
        copy: 'Spend the day exploring Northern Serengeti’s remote plains, riverbanks and rolling hills. This region is especially known for Mara River crossing possibilities during the right season, while also offering excellent resident wildlife. Your guide balances patience near promising areas with broader game viewing for predators, elephants, buffalo and antelope species.',
      },
      {
        label: 'Day 4',
        title: 'Northern Serengeti back to Central Serengeti',
        location: 'Northern Serengeti → Central Serengeti',
        stay: 'Tukaone Serengeti Camp',
        meals: 'Breakfast, lunch & dinner',
        note: 'Return south with an en-route game drive across the plains',
        copy: 'After breakfast, begin the journey back toward Central Serengeti with game viewing along the way. The drive keeps the day flexible for sightings and scenery, returning you to the Seronera area for a final Central Serengeti evening.',
      },
      {
        label: 'Day 5',
        title: 'Ngorongoro Crater tour and onward transfer',
        location: 'Central Serengeti → Ngorongoro Crater → Arusha / Kilimanjaro',
        stay: 'No accommodation — end of safari',
        meals: 'Breakfast & lunch',
        note: 'Crater descent and onward airport timing are coordinated together',
        copy: 'Leave Central Serengeti early with a packed lunch and continue toward the Ngorongoro Conservation Area. Descend 600 metres into the crater for a concentrated wildlife drive across grasslands, forests and lake edges, looking for lions, elephants, buffalo, zebras, hippos and possible black rhino. After lunch, ascend to the rim and continue to Arusha or Kilimanjaro International Airport.',
      },
    ],
    inclusions: ['All park and conservation entry fees for Serengeti and Ngorongoro Crater', 'Private 4×4 safari vehicle with pop-up roof, charging ports and fridge', 'Professional English-speaking driver-guide', 'Accommodation in the listed mid-range camps', 'All meals during safari as per meal plan', 'Drinking water during game drives', 'Airport or Arusha transfer at the end of safari'],
    exclusions: ['International flights not listed in the itinerary', 'Visa fees for Tanzania', 'Travel and medical insurance', 'Soft drinks and alcoholic beverages at lodges or camps', 'Tips for safari guide, driver and lodge staff', 'Personal expenses such as souvenirs, laundry or phone calls', 'Optional cultural visits such as a Maasai village'],
    pricing: {
      label: '2026 USD private rate',
      title: 'Migration-season Serengeti package',
      note: '*Indicative cost per person in USD, excluding international airline tickets. Final quote depends on confirmed travel date, rooming, migration location and lodge availability.',
      rows: [
        {
          label: 'Migration Safari Rate',
          period: '2026 · USD per person',
          prices: [
            { persons: '2 adults', room: '1 double room', amount: '2,380' },
            { persons: '4 adults', room: '4 double rooms', amount: '1,960' },
            { persons: '6 adults', room: '3 double rooms', amount: '1,821' },
          ],
        },
      ],
    },
  },
];

export const topPackages = [
  ...suppliedSafariPackages,
  {
    key: 'serengeti7', types: ['tanzania', 'migration', 'family'], tag: 'Northern Circuit', name: '7-Day Serengeti & Ngorongoro', duration: '7 days', route: 'Tarangire · Serengeti · Ngorongoro', stops: ['Arusha', 'Tarangire', 'Serengeti', 'Ngorongoro'], bestFor: 'A first Tanzania safari', includes: 'Private 4×4 and guide', copy: 'The classic Northern safari through Tanzania’s best-known parks, shaped around the best game-viewing hours.', popular: true,
    overview: 'This is the classic first Tanzania safari, paced to give each major park room to breathe. It pairs elephant-rich Tarangire, long game drives in the Serengeti and the concentrated wildlife of the Ngorongoro Crater, with the order and overnight stops adapted to your flight times.',
    suitability: 'A strong fit for first-time safari travellers who want the Northern Circuit’s highlights without rushing through a new park every night.',
    facts: [['Trip style', 'Private guided safari'], ['Starts / ends', 'Arusha'], ['Drive rhythm', 'Unhurried, with game drives'], ['Best time', 'Year-round, tailored to wildlife']],
    days: [
      { label: 'Day 1', title: 'Arrive in Arusha', location: 'Arusha', stay: 'Town or lodge stay', copy: 'Arrive, settle in and meet the team. Your guide checks the route, timing and any last details before the safari begins.' },
      { label: 'Day 2', title: 'Tarangire’s baobabs and elephants', location: 'Tarangire National Park', stay: 'Safari camp or lodge', copy: 'Travel to Tarangire for a first game drive. The day is shaped around wildlife movement and ends with a relaxed arrival at your overnight stay.' },
      { label: 'Days 3–5', title: 'Long days in the Serengeti', location: 'Serengeti National Park', stay: 'Serengeti camp or lodge', copy: 'Move into the Serengeti and explore at the best light of the day. Your guide adjusts each drive to sightings, season and the pace you enjoy.' },
      { label: 'Day 6', title: 'Ngorongoro Crater game drive', location: 'Ngorongoro Conservation Area', stay: 'Crater rim or Karatu stay', copy: 'Descend into the crater for a full game-viewing day in one of Tanzania’s most wildlife-dense landscapes, then return to your accommodation.' },
      { label: 'Day 7', title: 'Return to Arusha', location: 'Arusha', stay: 'Departure', copy: 'Enjoy a final morning at your chosen pace, then travel back to Arusha or connect to your onward plans.' },
    ],
    inclusions: ['Private 4×4 safari vehicle and professional guide', 'Airport transfers and route planning', 'Park and conservation-area fees as quoted', 'Accommodation and meals shown in your confirmed proposal'],
    exclusions: ['International flights and visa costs', 'Travel insurance and personal purchases', 'Optional activities not listed in your confirmed proposal'],
  },
  {
    key: 'southern', types: ['tanzania', 'zanzibar'], tag: 'Southern Tanzania', name: 'Nyerere & Mikumi Escape', duration: '6 days', route: 'Mikumi · Nyerere · Rufiji River', stops: ['Dar es Salaam', 'Mikumi', 'Nyerere', 'Rufiji River'], bestFor: 'A quieter safari with a coast pairing', includes: 'Private 4×4 and river safari', copy: 'A southern Tanzania route that pairs Mikumi’s open savannah with Nyerere’s river life—ideal on its own or as the safari chapter of a Zanzibar holiday.', popular: false,
    overview: 'This route gives the south the attention it deserves. Begin in Mikumi for wide plains and classic game drives, then continue to Nyerere for a different rhythm around the Rufiji River. It is a strong choice for travellers who want a more spacious safari experience and an easy connection to Zanzibar.',
    suitability: 'For travellers who prefer a less hurried southern safari, or who want to combine river country and Zanzibar without repeating the classic Northern Circuit.',
    facts: [['Trip style', 'Private southern safari'], ['Starts / ends', 'Dar es Salaam or Zanzibar'], ['Drive rhythm', 'Balanced, with river time'], ['Best for', 'Safari + coast combinations']],
    days: [
      { label: 'Day 1', title: 'Arrive in Dar es Salaam', location: 'Dar es Salaam', stay: 'Town or airport stay', copy: 'Arrive and settle in, with your onward timing confirmed before the safari starts. This first night can be adapted around your international or island connection.' },
      { label: 'Days 2–3', title: 'Mikumi’s open plains', location: 'Mikumi National Park', stay: 'Safari lodge or camp', copy: 'Head into Mikumi for game drives across its open savannah. These days are deliberately unhurried, giving your guide time to respond to wildlife rather than follow a rushed transfer plan.' },
      { label: 'Days 4–5', title: 'Nyerere and the Rufiji River', location: 'Nyerere National Park', stay: 'River lodge or camp', copy: 'Continue to Nyerere for a change of pace. Pair vehicle time with a river-focused safari experience where conditions and the confirmed lodge programme allow.' },
      { label: 'Day 6', title: 'Connect to Zanzibar or onward travel', location: 'Dar es Salaam or Zanzibar', stay: 'Departure or beach extension', copy: 'Travel onward to Zanzibar or your departure point. The southern route makes a memorable safari chapter before a few slower island days.' },
    ],
    inclusions: ['Private 4×4 safari vehicle and professional guide', 'Accommodation and meals shown in your confirmed proposal', 'Park fees and transfers as quoted', 'River safari experience where included in your selected programme'],
    exclusions: ['International flights, visa and travel insurance', 'Optional Zanzibar extension and activities', 'Personal purchases and gratuities'],
  },
  {
    key: 'kili', types: ['kilimanjaro'], tag: 'Kilimanjaro', name: 'Kilimanjaro: Machame Route', duration: '8 days', route: 'Machame Route · 5,895 m summit', stops: ['Machame Gate', 'Shira Plateau', 'Barafu Camp', 'Uhuru Peak'], bestFor: 'Trek-first travellers', includes: 'Full mountain support crew', copy: 'A supported climb on the scenic Machame route, with experienced summit guides beside you throughout.', popular: false,
    overview: 'The Machame Route takes a gradual, scenic line across Kilimanjaro’s changing climate zones. This plan builds in acclimatisation, a well-supported camp rhythm and an experienced mountain crew, so summit night is approached with preparation rather than haste.',
    suitability: 'For travellers who want a challenging, fully supported mountain experience and are prepared to train before travel.',
    facts: [['Trip style', 'Guided mountain trek'], ['Starts / ends', 'Moshi'], ['Physical level', 'Demanding, acclimatisation-led'], ['Summit target', 'Uhuru Peak · 5,895 m']],
    days: [
      { label: 'Day 1', title: 'Briefing and equipment check', location: 'Moshi', stay: 'Town hotel', copy: 'Meet your mountain team, review your gear and talk through the climb. This is the time to settle questions before entering the park.' },
      { label: 'Day 2', title: 'Machame Gate to forest camp', location: 'Machame Route', stay: 'Mountain camp', copy: 'Begin through the forest zone at a deliberate pace. The crew establishes the camp rhythm and monitors how everyone is feeling.' },
      { label: 'Days 3–4', title: 'Shira Plateau and Barranco', location: 'High-altitude moorland', stay: 'Mountain camp', copy: 'Gain altitude across open terrain, then use the route’s up-and-down profile to support acclimatisation before the higher camps.' },
      { label: 'Day 5', title: 'Karanga to Barafu', location: 'High camp', stay: 'Barafu Camp', copy: 'A short, intentional day brings you to the final camp. Rest, hydrate and prepare for the overnight summit attempt.' },
      { label: 'Days 6–7', title: 'Summit night and descent', location: 'Uhuru Peak · Mweka', stay: 'Mountain camp then Moshi', copy: 'Set out before dawn for Uhuru Peak, then descend below the high zone for recovery. The following day completes the trek and returns you to Moshi.' },
    ],
    inclusions: ['Qualified mountain guides, cook and porter team', 'Park fees and camping arrangements as quoted', 'Mountain meals and shared safety equipment', 'Transfers between Moshi and the trailhead'],
    exclusions: ['International flights, visa and travel insurance', 'Personal climbing gear and sleeping bag', 'Tips for the mountain crew'],
  },
  {
    key: 'safarizanz', types: ['zanzibar', 'tanzania'], tag: 'Safari & Beach', name: 'Safari & Zanzibar Escape', duration: '10 days', route: 'Serengeti · Ngorongoro · Zanzibar', stops: ['Zanzibar', 'Tarangire', 'Ngorongoro', 'Serengeti'], bestFor: 'Safari with time to slow down', includes: 'Safari, flights and beach stay', copy: 'A Northern Circuit safari followed by time on Zanzibar’s coast, with the pace set around your dates.', popular: false,
    overview: 'A safari-and-sea itinerary for travellers who want a genuine wildlife chapter without giving up slow time on Zanzibar. We sequence the domestic connections, park days and beach stay around your arrival point, so the transitions feel like part of the trip rather than lost days.',
    suitability: 'Ideal for a first Tanzania trip, a celebration or anyone splitting their time between the coast and Northern Circuit parks.',
    facts: [['Trip style', 'Private safari + island stay'], ['Starts / ends', 'Zanzibar'], ['Connections', 'Domestic flight coordinated'], ['Pace', 'Active safari, then slow coast']],
    days: [
      { label: 'Day 1', title: 'Arrive in Zanzibar', location: 'Zanzibar', stay: 'Beach hotel', copy: 'Arrive on the island and settle into your first stay. Your detailed travel notes make the handover into the safari portion straightforward.' },
      { label: 'Days 2–3', title: 'Fly in for Tarangire and Ngorongoro', location: 'Northern Tanzania', stay: 'Safari lodge or camp', copy: 'Travel from the coast to the mainland and begin game drives in Tarangire, followed by the Ngorongoro Conservation Area.' },
      { label: 'Days 4–6', title: 'Serengeti game drives', location: 'Serengeti National Park', stay: 'Serengeti camp or lodge', copy: 'Spend several nights in the Serengeti so drives can follow early-morning and late-afternoon wildlife activity rather than a transfer timetable.' },
      { label: 'Day 7', title: 'Return to the island', location: 'Zanzibar', stay: 'Beach hotel', copy: 'Connect back to Zanzibar, with the flight and transfer placed around your chosen safari exit point.' },
      { label: 'Days 8–10', title: 'Beach days at your own pace', location: 'Zanzibar', stay: 'Beach hotel', copy: 'Keep these days intentionally open: rest, explore the coast or add a low-key island activity. Your departure transfer completes the journey.' },
    ],
    inclusions: ['Private safari vehicle and guiding on the mainland', 'Domestic connections and airport transfers as quoted', 'Safari and beach accommodation in your selected category', 'Park fees and meals shown in your confirmed proposal'],
    exclusions: ['International flights and visa costs', 'Optional Zanzibar excursions', 'Travel insurance and personal purchases'],
  },
  {
    key: 'migration', types: ['tanzania', 'migration'], tag: 'Great Migration', name: 'Migration Chasing Safari', duration: '6 days', route: 'Northern Serengeti · Mara River', stops: ['Arusha', 'Central Serengeti', 'Northern Serengeti', 'Mara River'], bestFor: 'Seasonal wildlife viewing', includes: 'Routes timed to the herds', copy: 'A focused Serengeti itinerary built around the migration’s movements and the strongest wildlife viewing.', popular: false,
    overview: 'This is a focused Serengeti plan built around the annual movement of the herds, not a fixed promise of a single sighting. Before confirming, we match your dates to the most likely area and leave enough time in the field for your guide to respond to conditions each day.',
    suitability: 'For wildlife-focused travellers with flexible expectations who want to prioritise time in the migration landscape.',
    facts: [['Trip style', 'Private wildlife-focused safari'], ['Starts / ends', 'Arusha or safari airstrip'], ['Best window', 'Matched to your travel month'], ['Game-drive rhythm', 'Responsive to daily sightings']],
    days: [
      { label: 'Day 1', title: 'Arrive and plan the field days', location: 'Arusha', stay: 'Town or lodge stay', copy: 'Arrive and review the current migration update with the team. The confirmed plan is matched to the season, rather than forcing a fixed route.' },
      { label: 'Day 2', title: 'Into the Serengeti', location: 'Central or Northern Serengeti', stay: 'Safari camp', copy: 'Travel to the most appropriate Serengeti entry point for your dates, then begin game viewing as the drive unfolds.' },
      { label: 'Days 3–5', title: 'Follow the signs of the herds', location: 'Northern Serengeti · Mara River area', stay: 'Safari camp', copy: 'Spend full days exploring likely herd areas with your guide. The route stays flexible for wildlife movement, weather and local information.' },
      { label: 'Day 6', title: 'Final game drive and onward travel', location: 'Serengeti', stay: 'Departure', copy: 'Take a final drive if timing allows, then connect to Arusha or your next destination according to the confirmed travel plan.' },
    ],
    inclusions: ['Private 4×4 and specialist safari guide', 'Route planning based on your travel period', 'Park fees, transfers and accommodation as quoted', 'Meals shown in your confirmed proposal'],
    exclusions: ['Guaranteed river crossings or a specific wildlife sighting', 'International flights, visa and insurance', 'Optional activities not included in your proposal'],
  },
  {
    key: 'honeymoon', types: ['zanzibar', 'family'], tag: 'Honeymoon', name: 'Honeymoon Safari & Beach', duration: '9 days', route: 'Serengeti · Ngorongoro · Zanzibar', stops: ['Arusha', 'Serengeti', 'Ngorongoro', 'Zanzibar'], bestFor: 'A private trip for two', includes: 'Flexible lodge choices', copy: 'Private game drives, considered lodge stays and relaxed beach days, planned around the two of you.', popular: false,
    overview: 'A private safari-and-beach journey designed with fewer handovers and more room to be together. The safari days focus on intimate camp rhythms and time in the field, then the island portion opens up for rest, a celebration or simply nothing on the schedule.',
    suitability: 'For couples looking for a private trip that balances standout safari moments with calm, well-planned downtime.',
    facts: [['Trip style', 'Private journey for two'], ['Starts / ends', 'Arusha / Zanzibar'], ['Accommodation', 'Chosen around your style'], ['Pace', 'Thoughtful and unhurried']],
    days: [
      { label: 'Day 1', title: 'Welcome to Arusha', location: 'Arusha', stay: 'Boutique town or lodge stay', copy: 'Arrive and settle in before the safari. We keep the first evening light so the journey begins comfortably.' },
      { label: 'Days 2–4', title: 'Private Serengeti days', location: 'Serengeti National Park', stay: 'Safari camp or lodge', copy: 'Explore with a private guide and vehicle, leaving time for the wildlife moments that matter to you rather than a group schedule.' },
      { label: 'Day 5', title: 'Ngorongoro’s crater floor', location: 'Ngorongoro Conservation Area', stay: 'Crater rim or Karatu stay', copy: 'A full game-viewing chapter in the crater, then a final mainland evening before the beach portion begins.' },
      { label: 'Day 6', title: 'Fly to Zanzibar', location: 'Zanzibar', stay: 'Beach hotel', copy: 'Transfer and fly to the island, where a beach stay chosen around your preferred atmosphere takes over.' },
      { label: 'Days 7–9', title: 'Time for the two of you', location: 'Zanzibar', stay: 'Beach hotel', copy: 'Keep the final days open for the coast, an optional private experience or complete rest before your departure.' },
    ],
    inclusions: ['Private safari vehicle, guide and tailored route', 'Selected safari and beach accommodation', 'Transfers and domestic connection as quoted', 'Park fees and meals shown in your confirmed proposal'],
    exclusions: ['International flights, visa and travel insurance', 'Optional private dining or island activities', 'Personal purchases and gratuities'],
  },
  {
    key: 'family', types: ['tanzania', 'family'], tag: 'Family', name: 'Family Adventure Safari', duration: '7 days', route: 'Tarangire · Serengeti · Ngorongoro', stops: ['Arusha', 'Tarangire', 'Serengeti', 'Ngorongoro'], bestFor: 'Families who want a flexible pace', includes: 'Private vehicle and family stays', copy: 'A family-focused safari with sensible drive times, comfortable stays and a route that works for every age.', popular: false,
    overview: 'A Northern Circuit safari designed around real family travel: private vehicle space, considered drive times and stays that allow everyone to reset. We shape the pace around your children’s ages, interests and comfort, while preserving the game-viewing time that makes Tanzania special.',
    suitability: 'For families seeking a private, flexible safari with a balance of wildlife, comfort and enough time out of the vehicle.',
    facts: [['Trip style', 'Private family safari'], ['Starts / ends', 'Arusha'], ['Pace', 'Flexible around your family'], ['Accommodation', 'Family-suitable stays']],
    days: [
      { label: 'Day 1', title: 'Arrive and settle in', location: 'Arusha', stay: 'Family-friendly lodge stay', copy: 'Arrive, reset and meet the team. The first evening gives everyone time to ease into the safari schedule.' },
      { label: 'Day 2', title: 'Tarangire discovery day', location: 'Tarangire National Park', stay: 'Safari lodge or camp', copy: 'Begin with an approachable first park day. Your guide can build in stops and breaks while keeping an eye on the wildlife.' },
      { label: 'Days 3–5', title: 'Serengeti at your family’s pace', location: 'Serengeti National Park', stay: 'Family-suitable camp or lodge', copy: 'Spend several nights in the Serengeti, allowing drives to be tailored around energy levels, sightings and time back at camp.' },
      { label: 'Day 6', title: 'Ngorongoro Crater', location: 'Ngorongoro Conservation Area', stay: 'Crater rim or Karatu stay', copy: 'Explore the crater floor on a well-paced game drive, with the day structured around your family’s comfort and interests.' },
      { label: 'Day 7', title: 'Back to Arusha', location: 'Arusha', stay: 'Departure', copy: 'Return to Arusha with time arranged around your departure or next adventure.' },
    ],
    inclusions: ['Private vehicle and guide for your family', 'Family-suitable accommodation options', 'Transfers, park fees and meals as quoted', 'A pace planned around your group'],
    exclusions: ['International flights, visa and travel insurance', 'Optional activities outside the confirmed itinerary', 'Personal purchases and gratuities'],
  },
];

export const featuredTourPackageKeys = ['tarangire-day-trip', 'explore-serengeti', 'serengeti-ngorongoro', 'tarangire-ngorongoro-arusha', 'tanzania-mid-range', 'tanzania-migration-safari'];

export const tourPlanningQuestions = [
  { question: 'Can this route be changed?', answer: 'Yes. These are well-tested starting points, not fixed departures. We can adjust nights, lodge style, internal flights and the order of parks around your dates and priorities.' },
  { question: 'When should I travel?', answer: 'Every route has a different seasonal sweet spot. Tell us the month you have available and the wildlife moments you care about, and we will shape the route accordingly.' },
  { question: 'What will I receive before booking?', answer: 'You will receive a tailored proposal that makes the route, accommodation, transfers, included meals and quote easy to review before you commit.' },
];

export const testimonials = [
  { key: 't1', initials: 'PM', name: 'Pascal M.', country: 'France', source: 'TripAdvisor', sourceColor: '#2E7D46', sourceBg: '#e6f4ea', quote: 'What a pleasure to share my unforgettable safari experience! An exceptional safari with an outstanding guide — we have just returned and already want to go back.' },
  { key: 't2', initials: 'LG', name: 'Laura G.', country: 'Germany', source: 'SafariBookings', sourceColor: '#C0512A', sourceBg: '#fbe9e1', quote: 'Wild Wings allowed us an unforgettable adventure to the Serengeti and Ngorongoro Crater. They planned patiently and with great care for every detail.' },
  { key: 't3', initials: 'ET', name: 'Emma T.', country: 'United Kingdom', source: 'Google', sourceColor: '#2b6cb0', sourceBg: '#e6effb', quote: 'Absolutely brilliant experience from start to finish. The team was professional, the vehicle was comfortable, and the wildlife viewing was beyond our dreams.' },
  { key: 't4', initials: 'SG', name: 'Sergej G.', country: 'Germany', source: 'TripAdvisor', sourceColor: '#2E7D46', sourceBg: '#e6f4ea', quote: 'A safari experience for life. We had a great time and everything was well organised. Our guide was wonderful and explained so much along the way.' },
];

export const trustBadges = ['Tripadvisor', 'SafariBookings.com', 'TANAPA', 'TATO', 'ATTA'];

export const safariTypes = [
  { key: 'zanzibar', name: 'Safari from Zanzibar', sub: 'Fly-in · beach & bush', badge: 'Beach & bush', slotHint: 'Zanzibar beach at sunset', blurb: 'Already on the island? Fly in for a compact safari and be tracking lions by lunchtime — the perfect add-on to your beach holiday.', highlights: ['Fly-in convenience', 'Short & flexible', 'Beach + wildlife'] },
  { key: 'tanzania', name: 'Tanzania Safari', sub: 'Best selling · all levels', badge: 'Best seller', slotHint: 'Serengeti plains at golden hour', blurb: 'Our signature journey through the Northern Circuit — Serengeti, Ngorongoro and Tarangire — crafted for first-timers and seasoned travellers alike.', highlights: ['Big Five', 'Ngorongoro Crater', 'Expert guides'] },
  { key: 'migration', name: 'Serengeti Migration Safaris', sub: 'Serengeti · Jun–Oct', badge: 'Seasonal spectacle', slotHint: 'Wildebeest river crossing', blurb: 'Timed to the herds — witness dramatic river crossings and endless plains alive with over a million animals on the move.', highlights: ['River crossings', 'Peak game viewing', 'Guided timing'] },
  { key: 'family', name: 'Family Safaris', sub: 'Child-friendly itineraries', badge: 'For all ages', slotHint: 'Family watching wildlife from vehicle', blurb: 'Safe, comfortable and flexible adventures with shorter drives and lodges the whole family will love — memories that span generations.', highlights: ['Kid-friendly lodges', 'Shorter drives', 'Flexible pace'] },
  { key: 'kilimanjaro', name: 'Kilimanjaro Trekking', sub: 'Roof of Africa · 5,895 m', badge: 'Adventure', slotHint: 'Trekkers on Kilimanjaro', blurb: 'Stand on the roof of Africa. Fully supported climbs on the most scenic routes, led by experienced summit guides.', highlights: ['Machame & Lemosho', 'Full support crew', 'Summit guides'] },
];

export const itineraryCategories = [
  {
    key: 'safaris',
    name: 'Safaris',
    sub: 'Wildlife, wide horizons and private guiding',
    blurb: 'From the Serengeti and Ngorongoro to the spacious south, choose the wildlife rhythm that feels right for you.',
    points: ['Classic Northern Circuit', 'Southern Tanzania escapes', 'Migration-led routing'],
    packageKeys: ['tarangire-day-trip', 'explore-serengeti', 'serengeti-ngorongoro', 'tarangire-ngorongoro-arusha', 'tanzania-mid-range', 'tanzania-migration-safari', 'serengeti7', 'southern', 'migration', 'family'],
  },
  {
    key: 'kilimanjaro',
    name: 'Kilimanjaro',
    sub: 'A considered route to the summit',
    blurb: 'A fully supported mountain experience with a route, acclimatisation plan and crew chosen for the way you want to climb.',
    points: ['Scenic Machame Route', 'Experienced mountain crew', 'Acclimatisation-led pace'],
    packageKeys: ['kili'],
  },
  {
    key: 'zanzibar',
    name: 'Zanzibar',
    sub: 'Beach time that belongs in the journey',
    blurb: 'Build in the Indian Ocean properly—on its own, after a safari, or paired with the quieter parks of the south.',
    points: ['Safari and coast together', 'Island stays with time to slow down', 'Easy southern safari pairing'],
    packageKeys: ['tarangire-day-trip', 'explore-serengeti', 'serengeti-ngorongoro', 'safarizanz', 'honeymoon', 'southern'],
  },
];

export const months = ['Flexible', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const enquireFaqs = [
  { q: 'How do I book a trip?', a: 'Every Wild Wings trip is custom-built, so you start with an enquiry. Tell us your dates, interests and budget, and we’ll send a personalised itinerary and quote to confirm.' },
  { q: 'Can you create a custom package?', a: 'Yes — custom is what we do. We build every package around your needs, budget and pace, combining safari, Kilimanjaro and Zanzibar however you like.' },
  { q: 'Is there English-speaking support?', a: 'Absolutely. Our team includes strong English-speaking support at every stage, so international travellers feel confident, understood and well-guided.' },
  { q: 'Where are you based?', a: 'We’re a locally owned company rooted in Northern Tanzania (Arusha) and operating nationwide — from the Serengeti to Zanzibar.' },
];

export const homeFaqs = [
  { q: 'When is the best time to visit Tanzania for a safari?', a: 'The dry season (June–October) offers the best game viewing as wildlife gathers around water. The Great Migration river crossings peak around July–September, while calving season in the southern Serengeti runs January–February. We’ll match your dates to what you most want to see.' },
  { q: 'Which national parks should I visit in Tanzania?', a: 'The Northern Circuit — Serengeti, Ngorongoro Crater, Tarangire and Lake Manyara — covers the highlights. For a more exclusive experience, the Southern Circuit (Ruaha, Nyerere/Selous) offers incredible wildlife with far fewer visitors. We help match parks to your interests and time available.' },
  { q: 'How long should a Tanzania safari be?', a: 'Most travellers spend 5–8 days on safari to comfortably enjoy the main parks. Add a Kilimanjaro climb or a few days in Zanzibar and 10–14 days is ideal. Short on time? A 3–4 day trip still delivers unforgettable game viewing.' },
  { q: 'Is Tanzania safe for safari travel?', a: 'Yes. Tanzania is one of Africa’s most stable and welcoming destinations, and safaris are conducted with experienced guides who prioritise your safety at every step. We handle logistics, park regulations and support throughout your journey.' },
  { q: 'Can children join a Tanzania safari?', a: 'Absolutely. We design family-friendly itineraries with comfortable lodges, shorter driving days, and activities that keep every age engaged. Just let us know your children’s ages and we’ll tailor the pace accordingly.' },
  { q: 'Do I need a visa to visit Tanzania?', a: 'Most visitors need a tourist visa, which can be obtained online (eVisa) before travel or on arrival at major entry points. You’ll also need a passport valid for at least six months. We’ll guide you through the current requirements for your nationality.' },
  { q: 'What should I pack for a Tanzania safari?', a: 'Neutral, lightweight clothing, a warm layer for early morning drives, sun protection, insect repellent, binoculars and a good camera. We send a full packing checklist with every confirmed itinerary.' },
];

export const galleryItems = [
  { id: 'gal-1', ratio: '4/5', caption: 'Wildlife' },
  { id: 'gal-2', ratio: '1/1', caption: 'Landscape' },
  { id: 'gal-3', ratio: '4/5', caption: 'Kilimanjaro' },
  { id: 'gal-4', ratio: '3/4', caption: 'Zanzibar' },
  { id: 'gal-5', ratio: '1/1', caption: 'Culture' },
  { id: 'gal-6', ratio: '4/5', caption: 'Sunset' },
  { id: 'gal-7', ratio: '3/4', caption: 'Wildlife 2' },
  { id: 'gal-8', ratio: '1/1', caption: 'Camp' },
  { id: 'gal-9', ratio: '4/5', caption: 'Travellers' },
];

export const tripOptions = ['Northern Circuit Safari', 'Southern Circuit Safari', 'Kilimanjaro Climb', 'Zanzibar Beach', 'Honeymoon'];
