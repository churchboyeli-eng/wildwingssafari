import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(projectRoot, 'dist');
const serverOutputDirectory = path.join(projectRoot, 'dist-ssr');
const serverEntryPath = path.join(serverOutputDirectory, 'entry-server.js');

const normalizeSiteOrigin = (value) => {
  const candidate = String(value || '').trim();
  if (!candidate) return '';
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  return new URL(withProtocol).origin;
};

const siteOrigin = normalizeSiteOrigin(
  process.env.VITE_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL,
) || 'http://localhost:4173';
const blogConfigured = Boolean(process.env.VITE_ZENBLOG_BLOG_ID?.trim());

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

const makeDocument = (template, appHtml, seo) => template
  .replace('<!--app-head-->', renderHead(seo))
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

const outputPathForRoute = (route) => (
  route === '/' ? path.join(outputDirectory, 'index.html') : path.join(outputDirectory, `${route.slice(1)}.html`)
);

const xmlEscape = (value) => escapeHtml(value).replaceAll("'", '&apos;');

const { getPrerenderRoutes, getSitemapRoutes, renderPage } = await import(pathToFileURL(serverEntryPath));
const template = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
const renderOptions = { siteOrigin, blogConfigured };

for (const route of getPrerenderRoutes()) {
  const { appHtml, seo } = renderPage(route, renderOptions);
  const outputPath = outputPathForRoute(route);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, makeDocument(template, appHtml, seo));
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

console.log(`Prerendered ${getPrerenderRoutes().length} routes for ${siteOrigin}`);
