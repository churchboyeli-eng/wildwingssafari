export const safariMedia = {
  serengeti: {
    src: '/media/safari/serengeti-cheetah-family.jpg',
    alt: 'A cheetah family watching the Serengeti plains.',
  },
  ngorongoro: {
    src: '/media/safari/ngorongoro-buffalo.jpg',
    alt: 'A buffalo herd grazing in Ngorongoro.',
  },
  tarangire: {
    src: '/media/safari/tarangire-elephants.jpg',
    alt: 'Elephants moving through dry Tarangire grassland.',
  },
  lions: {
    src: '/media/safari/serengeti-lions.jpg',
    alt: 'Lionesses moving through the savannah.',
  },
  wildDogs: {
    src: '/media/safari/wild-dogs.jpg',
    alt: 'Wild dogs crossing open safari country.',
  },
  elephants: {
    src: '/media/safari/safari-elephants.jpg',
    alt: 'An elephant moving through open green woodland.',
  },
  giraffes: {
    src: '/media/safari/serengeti-giraffes.jpg',
    alt: 'Giraffes moving through Tanzania grassland.',
  },
  tarangireLions: {
    src: '/media/safari/tarangire-lions.jpg',
    alt: 'Lions resting beside water in Tarangire.',
  },
  migrationHerd: {
    src: '/media/safari/migration-herd.jpg',
    alt: 'A wildebeest standing on the migration plains.',
  },
  cheetahWalk: {
    src: '/media/safari/serengeti-cheetah-walk.jpg',
    alt: 'A cheetah moving through a wildebeest-filled savannah.',
  },
  zebras: {
    src: '/media/safari/family-zebras.jpg',
    alt: 'A zebra family moving through the grass.',
  },
  ngorongoroZebras: {
    src: '/media/safari/ngorongoro-zebras.jpg',
    alt: 'Zebras grazing in the Ngorongoro landscape.',
  },
  wetlands: {
    src: '/media/safari/southern-wetlands.jpg',
    alt: 'A crowned crane in Tanzania wetland country.',
  },
  restingLion: {
    src: '/media/safari/serengeti-lion.jpg',
    alt: 'A lion resting in the Serengeti.',
  },
  antelope: {
    src: '/media/safari/serengeti-antelope.jpg',
    alt: 'An antelope standing in the Serengeti grassland.',
  },
  buffalo: {
    src: '/media/safari/southern-buffalo.jpg',
    alt: 'An African buffalo in Tanzania woodland.',
  },
  craterView: {
    src: '/media/safari/grand-crater-view.jpg',
    alt: 'Travellers looking across a Tanzanian crater landscape.',
  },
};

export const kilimanjaroMedia = {
  marangu: {
    src: '/media/kilimanjaro/rainforest-trail.jpg',
    alt: 'Trekkers walking through Kilimanjaro rainforest.',
  },
  machame: {
    src: '/media/kilimanjaro/trekkers.jpg',
    alt: 'A mountain crew hiking beneath the Kilimanjaro skyline.',
  },
  lemosho: {
    src: '/media/kilimanjaro/lemosho-ridge.jpg',
    alt: 'Trekkers crossing a high Kilimanjaro ridge.',
  },
  rongai: {
    src: '/media/kilimanjaro/alpine-moorland.jpg',
    alt: 'Misty alpine moorland on Kilimanjaro.',
  },
  'northern-circuit': {
    src: '/media/kilimanjaro/lava-trail.jpg',
    alt: 'Trekkers crossing Kilimanjaro volcanic terrain.',
  },
  umbwe: {
    src: '/media/kilimanjaro/cloud-forest.jpg',
    alt: 'Mist moving across a Kilimanjaro forest slope.',
  },
  shira: {
    src: '/media/kilimanjaro/snow-plateau.jpg',
    alt: 'A snowy high plateau on Kilimanjaro.',
  },
  summitSnow: {
    src: '/media/kilimanjaro/summit-snow.jpg',
    alt: 'A trekker crossing Kilimanjaro summit snow.',
  },
};

const packageMedia = {
  'tarangire-day-trip': safariMedia.tarangire,
  'explore-serengeti': safariMedia.serengeti,
  'serengeti-ngorongoro': safariMedia.ngorongoro,
  'tarangire-ngorongoro-arusha': safariMedia.tarangireLions,
  'tanzania-mid-range': safariMedia.giraffes,
  'tanzania-migration-safari': safariMedia.migrationHerd,
  serengeti7: safariMedia.lions,
  southern: safariMedia.wildDogs,
  migration: safariMedia.cheetahWalk,
  family: safariMedia.zebras,
  'safari-5-day-classic': safariMedia.ngorongoroZebras,
  'safari-6-day-tanzania-classic': safariMedia.elephants,
  'safari-6-day-southern-river': safariMedia.wetlands,
  'safari-7-day-signature': safariMedia.restingLion,
  'safari-10-day-serengeti-depth': safariMedia.antelope,
  'safari-8-day-southern-wild-rivers': safariMedia.buffalo,
  'safari-21-day-grand-tanzania': safariMedia.craterView,
  kili: kilimanjaroMedia.summitSnow,
};

export const getPackageMedia = (key) => packageMedia[key] || null;
