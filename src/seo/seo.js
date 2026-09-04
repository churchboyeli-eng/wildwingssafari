import { compassGuideItems } from '../data/compassGuides';
import { contact, itineraryCategories, topPackages } from '../data/content';
import { getPackageMedia, kilimanjaroMedia } from '../data/media';
import { kilimanjaroRoutes } from '../pages/Kilimanjaro';

const SITE_NAME = 'Wild Wings Travel & Tours';
const DEFAULT_IMAGE = '/media/wildwings-hero-poster.jpg';
const LOCAL_SITE_ORIGIN = 'http://localhost:4173';

const staticPages = {
  '/': {
    title: 'Tanzania Safaris & Kilimanjaro Tours | Wild Wings',
    description: 'Plan a private Tanzania safari, Kilimanjaro climb or Zanzibar holiday with a locally owned team based in Arusha.',
  },
  '/itineraries': {
    title: 'Tanzania Safari Itineraries | Wild Wings',
    description: 'Explore private Tanzania safari, Kilimanjaro and Zanzibar itineraries shaped around your dates, pace and travel style.',
    breadcrumb: ['Itineraries'],
  },
  '/itineraries/kilimanjaro': {
    title: 'Kilimanjaro Routes & Climbing Itineraries | Wild Wings',
    description: 'Compare seven Kilimanjaro climbing routes, including Machame, Lemosho, Marangu and Northern Circuit, with practical route advice.',
    image: kilimanjaroMedia.highlandRidge.src,
    breadcrumb: ['Itineraries', 'Kilimanjaro'],
  },
  '/tanzania-travel-guide': {
    title: 'Tanzania Travel Guide: Parks, Activities & Stays | Wild Wings',
    description: 'Plan your Tanzania route with practical guides to national parks, safari activities, Kilimanjaro, Zanzibar and places to stay.',
    breadcrumb: ['Tanzania travel guide'],
  },
  '/plan-a-journey': {
    title: 'Build Your Tanzania Safari Itinerary | Wild Wings',
    description: 'Choose your travel dates, group size and priorities to start a tailored Tanzania safari, Kilimanjaro or Zanzibar itinerary.',
    breadcrumb: ['Plan a journey'],
  },
  '/gallery': {
    title: 'Tanzania Safari & Kilimanjaro Gallery | Wild Wings',
    description: 'See wildlife, landscapes and mountain moments from Tanzania, including the Serengeti, Ngorongoro, Tarangire and Kilimanjaro.',
    image: '/media/safari/serengeti-cheetah-family.jpg',
    breadcrumb: ['Gallery'],
  },
  '/blog': {
    title: 'Tanzania Safari Planning Blog | Wild Wings',
    description: 'Read practical field notes about Tanzania safari seasons, parks, Kilimanjaro routes and Zanzibar travel planning.',
    breadcrumb: ['Blog'],
  },
  '/about': {
    title: 'About Wild Wings | Local Tanzania Safari Experts',
    description: 'Meet Wild Wings, a locally owned Tanzania travel company based in Arusha and focused on private, clearly planned journeys.',
    breadcrumb: ['About'],
  },
  '/enquire': {
    title: 'Plan Your Tanzania Trip | Contact Wild Wings',
    description: 'Tell Wild Wings your dates, group size and travel priorities to request a tailored Tanzania itinerary and clear quote.',
    breadcrumb: ['Enquire'],
    indexable: false,
  },
};

const normalizePathname = (pathname = '/') => {
  const path = pathname.split(/[?#]/, 1)[0] || '/';
  return path === '/' ? path : path.replace(/\/+$/, '');
};

const sentenceDescription = (value, maximumLength = 160) => {
  const normalized = String(value || '').replace(/\s+/g, ' ').trim();
  if (normalized.length <= maximumLength) return normalized;
  const shortened = normalized.slice(0, maximumLength - 1);
  return `${shortened.slice(0, shortened.lastIndexOf(' ')).replace(/[.,;:]$/, '')}…`;
};

export const normalizeSiteOrigin = (value) => {
  const candidate = String(value || '').trim();
  if (!candidate) return '';

  try {
    const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
    return new URL(withProtocol).origin;
  } catch {
    return '';
  }
};

export const getClientSiteOrigin = () => {
  const configured = import.meta.env.VITE_SITE_URL || import.meta.env.VERCEL_PROJECT_PRODUCTION_URL;
  return normalizeSiteOrigin(configured)
    || (typeof window !== 'undefined' ? window.location.origin : LOCAL_SITE_ORIGIN);
};

const absoluteUrl = (siteOrigin, path) => new URL(path, `${siteOrigin}/`).href;

const makeBreadcrumbSchema = (siteOrigin, items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(siteOrigin, item.path),
  })),
});

const makeTravelAgencySchema = (siteOrigin) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${siteOrigin}/#organization`,
    name: SITE_NAME,
    url: siteOrigin,
    description: 'A locally owned Tanzania travel company planning private safaris, Kilimanjaro climbs and Zanzibar holidays.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Arusha',
      addressCountry: 'TZ',
    },
  };

  if (contact.bookingEmail) schema.email = contact.bookingEmail;
  if (contact.whatsappNumber) schema.telephone = contact.whatsappNumber;
  return schema;
};

const getDynamicPage = (pathname) => {
  const categoryMatch = pathname.match(/^\/itineraries\/([^/]+)$/);
  if (categoryMatch) {
    const category = itineraryCategories.find((item) => item.key === categoryMatch[1]);
    const tourPackage = topPackages.find((item) => item.key === categoryMatch[1]);

    if (category) {
      return {
        title: `${category.name} Itineraries in Tanzania | Wild Wings`,
        description: sentenceDescription(category.blurb),
        breadcrumb: ['Itineraries', category.name],
      };
    }

    if (tourPackage) {
      return {
        title: `${tourPackage.name} | Tanzania Itinerary`,
        description: sentenceDescription(tourPackage.overview || tourPackage.copy),
        image: getPackageMedia(tourPackage.key)?.src,
        breadcrumb: ['Itineraries', tourPackage.name],
      };
    }
  }

  const kilimanjaroMatch = pathname.match(/^\/itineraries\/kilimanjaro\/([^/]+)$/);
  if (kilimanjaroMatch) {
    const route = kilimanjaroRoutes.find((item) => item.key === kilimanjaroMatch[1]);
    if (route) {
      return {
        title: `${route.name} Route Kilimanjaro Itinerary | Wild Wings`,
        description: sentenceDescription(`${route.copy} ${route.duration}; ${route.bestFor.toLowerCase()}.`),
        image: kilimanjaroMedia[route.key]?.src,
        breadcrumb: ['Itineraries', 'Kilimanjaro', `${route.name} route`],
      };
    }
  }

  const guideMatch = pathname.match(/^\/tanzania-travel-guide\/([^/]+)$/);
  if (guideMatch) {
    const guide = compassGuideItems.find((item) => item.slug === guideMatch[1]);
    if (guide) {
      return {
        title: `${guide.name} Travel Guide | Wild Wings`,
        description: sentenceDescription(guide.intro),
        type: 'article',
        breadcrumb: ['Tanzania travel guide', guide.name],
      };
    }
  }

  return null;
};

const getBreadcrumbItems = (labels, pathname) => {
  if (!labels?.length) return [];
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ name: 'Home', path: '/' }];

  labels.forEach((name, index) => {
    const segmentCount = Math.max(1, segments.length - labels.length + index + 1);
    items.push({ name, path: `/${segments.slice(0, segmentCount).join('/')}` });
  });

  return items;
};

export const getSeoForPath = (pathname, options = {}) => {
  const path = normalizePathname(pathname);
  const siteOrigin = normalizeSiteOrigin(options.siteOrigin) || LOCAL_SITE_ORIGIN;
  const page = staticPages[path] || getDynamicPage(path);
  const isBlogUnavailable = path.startsWith('/blog') && !options.blogConfigured;

  if (!page) {
    return {
      title: `Page Not Found | ${SITE_NAME}`,
      description: 'The requested page could not be found.',
      canonical: absoluteUrl(siteOrigin, path),
      image: absoluteUrl(siteOrigin, DEFAULT_IMAGE),
      robots: 'noindex, nofollow',
      type: 'website',
      schema: [],
      indexable: false,
    };
  }

  const indexable = page.indexable !== false && !isBlogUnavailable;
  const breadcrumbItems = getBreadcrumbItems(page.breadcrumb, path);
  const schema = [];
  if (path === '/') schema.push(makeTravelAgencySchema(siteOrigin));
  if (breadcrumbItems.length > 1) schema.push(makeBreadcrumbSchema(siteOrigin, breadcrumbItems));

  return {
    title: page.title,
    description: page.description,
    canonical: absoluteUrl(siteOrigin, path),
    image: absoluteUrl(siteOrigin, page.image || DEFAULT_IMAGE),
    robots: indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    type: page.type || 'website',
    schema,
    indexable,
  };
};

export const getPrerenderRoutes = () => {
  const routes = [
    ...Object.keys(staticPages),
    ...itineraryCategories.map((category) => `/itineraries/${category.key}`),
    ...topPackages.map((tourPackage) => `/itineraries/${tourPackage.key}`),
    ...kilimanjaroRoutes.map((route) => `/itineraries/kilimanjaro/${route.key}`),
    ...compassGuideItems.map((guide) => `/tanzania-travel-guide/${guide.slug}`),
  ];

  return [...new Set(routes)].sort((a, b) => a.localeCompare(b));
};

export const getSitemapRoutes = (options = {}) => getPrerenderRoutes().filter((path) => (
  getSeoForPath(path, options).indexable
));

