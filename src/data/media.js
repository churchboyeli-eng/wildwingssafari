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
    src: '/media/kilimanjaro/highland-ridge.jpg',
    alt: 'Highland vegetation and a ridge on Kilimanjaro.',
  },
  rongai: {
    src: '/media/kilimanjaro/alpine-moorland.jpg',
    alt: 'Misty alpine moorland on Kilimanjaro.',
  },
  'northern-circuit': {
    src: '/media/kilimanjaro/highland-ridge.jpg',
    alt: 'Open highland terrain on Kilimanjaro.',
  },
  umbwe: {
    src: '/media/kilimanjaro/rainforest-trail.jpg',
    alt: 'The forest trail at the start of a Kilimanjaro climb.',
  },
  shira: {
    src: '/media/kilimanjaro/summit-dawn.jpg',
    alt: 'Sunrise over a high mountain ridge.',
  },
};

const packageMedia = {
  'tarangire-day-trip': safariMedia.tarangire,
  'explore-serengeti': safariMedia.serengeti,
  'serengeti-ngorongoro': safariMedia.ngorongoro,
  'tarangire-ngorongoro-arusha': safariMedia.lions,
  'tanzania-mid-range': safariMedia.wildDogs,
  'tanzania-migration-safari': safariMedia.serengeti,
  serengeti7: safariMedia.serengeti,
  southern: safariMedia.elephants,
  migration: safariMedia.serengeti,
  family: safariMedia.ngorongoro,
  'safari-5-day-classic': safariMedia.tarangire,
  'safari-6-day-southern-river': safariMedia.elephants,
  'safari-7-day-signature': safariMedia.lions,
  'safari-10-day-serengeti-depth': safariMedia.serengeti,
  'safari-8-day-southern-wild-rivers': safariMedia.wildDogs,
};

export const getPackageMedia = (key) => packageMedia[key] || null;
