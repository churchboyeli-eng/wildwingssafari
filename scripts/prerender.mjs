import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';
import { fetchZenblogPosts } from '../src/lib/zenblog.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(projectRoot, 'dist');
const serverOutputDirectory = path.join(projectRoot, 'dist-ssr');
const serverEntryPath = path.join(serverOutputDirectory, 'entry-server.js');
const loadedEnv = loadEnv(process.env.NODE_ENV || 'production', projectRoot, '');
const buildEnv = { ...loadedEnv, ...process.env };

const normalizeSiteOrigin = (value) => {
  const candidate = String(value || '').trim();
  if (!candidate) return '';
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  return new URL(withProtocol).origin;
};

const configuredSiteOrigin = normalizeSiteOrigin(
  buildEnv.VITE_SITE_URL || buildEnv.VERCEL_PROJECT_PRODUCTION_URL,
);
if (buildEnv.VERCEL_ENV === 'production' && !configuredSiteOrigin) {
  throw new Error('Production builds require VITE_SITE_URL or VERCEL_PROJECT_PRODUCTION_URL.');
}
if (buildEnv.VERCEL_ENV === 'production' && !buildEnv.VITE_BOOKING_EMAIL?.trim() && !buildEnv.VITE_WHATSAPP_NUMBER?.trim()) {
  throw new Error('Production builds require VITE_BOOKING_EMAIL or VITE_WHATSAPP_NUMBER so visitors can contact Wild Wings.');
}
if (buildEnv.VERCEL_ENV === 'production' && !buildEnv.RESEND_API_KEY?.trim()) {
  throw new Error('Production builds require RESEND_API_KEY for the enquiry form.');
}
if (buildEnv.VERCEL_ENV === 'production' && !buildEnv.ENQUIRY_FROM_EMAIL?.trim()) {
  throw new Error('Production builds require ENQUIRY_FROM_EMAIL from a verified sending domain.');
}
if (buildEnv.VERCEL_ENV === 'production' && !buildEnv.BOOKING_EMAIL?.trim() && !buildEnv.VITE_BOOKING_EMAIL?.trim()) {
  throw new Error('Production builds require BOOKING_EMAIL or VITE_BOOKING_EMAIL as the enquiry recipient.');
}

const siteOrigin = configuredSiteOrigin || 'http://localhost:4173';
const blogId = buildEnv.VITE_ZENBLOG_BLOG_ID?.trim() || '';
const blogConfigured = Boolean(blogId);
const blogResult = blogConfigured
  ? await fetchZenblogPosts({ blogId, limit: 100 })
  : { posts: [], total: 0 };
const blogPosts = blogResult.posts;
if (blogResult.total > blogPosts.length) {
  throw new Error(`Zenblog returned ${blogPosts.length} of ${blogResult.total} posts; raise the build limit before deploying.`);
}

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const safeJson = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

const renderHead = (seo) => [
  `<title data-wild-wings-seo>${escapeHtml(seo.title)}</title>`,
  `<meta data-wild-wings-seo name="description" content="${escapeHtml(seo.description)}">`,
  `<meta data-wild-wings-seo name="robots" content="${escapeHtml(seo.robots)}">`,
  `<link data-wild-wings-seo rel="canonical" href="${escapeHtml(seo.canonical)}">`,
  '<meta data-wild-wings-seo property="og:site_name" content="Wild Wings Travel & Tours">',
  `<meta data-wild-wings-seo property="og:type" content="${escapeHtml(seo.type)}">`,
  `<meta data-wild-wings-seo property="og:title" content="${escapeHtml(seo.title)}">`,
  `<meta data-wild-wings-seo property="og:description" content="${escapeHtml(seo.description)}">`,
  `<meta data-wild-wings-seo property="og:url" content="${escapeHtml(seo.canonical)}">`,
  `<meta data-wild-wings-seo property="og:image" content="${escapeHtml(seo.image)}">`,
  '<meta data-wild-wings-seo name="twitter:card" content="summary_large_image">',
  `<meta data-wild-wings-seo name="twitter:title" content="${escapeHtml(seo.title)}">`,
  `<meta data-wild-wings-seo name="twitter:description" content="${escapeHtml(seo.description)}">`,
  `<meta data-wild-wings-seo name="twitter:image" content="${escapeHtml(seo.image)}">`,
  ...seo.schema.map((schema) => `<script data-wild-wings-seo type="application/ld+json">${safeJson(schema)}</script>`),
].join('\n    ');

const makeDocument = (template, appHtml, seo, initialData = null) => template
  .replace('<!--app-head-->', renderHead(seo))
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  .replace('</head>', `${initialData ? `  <script id="wild-wings-data" type="application/json">${safeJson(initialData)}</script>\n` : ''}</head>`);

const outputPathForRoute = (route) => (
  route === '/' ? path.join(outputDirectory, 'index.html') : path.join(outputDirectory, `${route.slice(1)}.html`)
);

const xmlEscape = (value) => escapeHtml(value).replaceAll("'", '&apos;');

const { getPrerenderRoutes, getSitemapRoutes, renderPage } = await import(pathToFileURL(serverEntryPath));
const template = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('The client HTML template has already been prerendered. Run `npm run build` to regenerate it before rendering pages.');
}
const renderOptions = { siteOrigin, blogConfigured, blogPosts };

const makePostSummary = (post) => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  tags: post.tags,
  authors: post.authors,
  publishedAt: post.publishedAt,
  imageUrl: post.imageUrl,
  readTime: post.readTime,
});

const getInitialData = (route) => {
  if (route === '/blog') {
    return { kind: 'blog-index', configured: blogConfigured, posts: blogPosts.map(makePostSummary) };
  }

  if (route.startsWith('/blog/')) {
    const slug = decodeURIComponent(route.slice('/blog/'.length));
    const post = blogPosts.find((item) => item.slug === slug);
    return post ? { kind: 'blog-post', post: { ...makePostSummary(post), htmlContent: post.htmlContent } } : null;
  }

  return null;
};

for (const route of getPrerenderRoutes(renderOptions)) {
  const initialData = getInitialData(route);
  const { appHtml, seo } = renderPage(route, { ...renderOptions, initialData });
  const outputPath = outputPathForRoute(route);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, makeDocument(template, appHtml, seo, initialData));
}

const notFound = renderPage('/404', renderOptions);
await writeFile(path.join(outputDirectory, '404.html'), makeDocument(template, notFound.appHtml, notFound.seo));

const sitemapEntries = getSitemapRoutes(renderOptions)
  .map((route) => `  <url><loc>${xmlEscape(new URL(route, `${siteOrigin}/`).href)}</loc></url>`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
await writeFile(path.join(outputDirectory, 'sitemap.xml'), sitemap);

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`;
await writeFile(path.join(outputDirectory, 'robots.txt'), robots);
await rm(serverOutputDirectory, { recursive: true, force: true });

console.log(`Prerendered ${getPrerenderRoutes(renderOptions).length} routes for ${siteOrigin}`);
