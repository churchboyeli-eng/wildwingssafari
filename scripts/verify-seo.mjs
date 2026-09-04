import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('dist');

const walk = async (directory) => (await Promise.all(
  (await readdir(directory, { withFileTypes: true })).map((entry) => (
    entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)
  )),
)).flat();

const getMatch = (html, pattern) => html.match(pattern)?.[1] || '';
const htmlFiles = (await walk(outputDirectory)).filter((file) => file.endsWith('.html'));
assert.ok(htmlFiles.length >= 60, `Expected at least 60 prerendered HTML files, found ${htmlFiles.length}.`);

const pages = [];
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relativePath = path.relative(outputDirectory, file);
  const page = {
    file: relativePath,
    html,
    title: getMatch(html, /<title[^>]*>(.*?)<\/title>/),
    description: getMatch(html, /name="description" content="([^"]+)"/),
    canonical: getMatch(html, /rel="canonical" href="([^"]+)"/),
    robots: getMatch(html, /name="robots" content="([^"]+)"/),
    h1Count: (html.match(/<h1\b/g) || []).length,
  };

  assert.ok(page.title, `${relativePath} is missing a title.`);
  assert.ok(page.description, `${relativePath} is missing a meta description.`);
  assert.ok(page.canonical, `${relativePath} is missing a canonical URL.`);
  assert.equal(page.h1Count, 1, `${relativePath} should contain exactly one H1.`);
  assert.ok(!html.includes('<div id="root"></div>'), `${relativePath} was not prerendered.`);
  assert.ok(!/wildwings\.example|255 000 000 000|255000000000/.test(html), `${relativePath} contains placeholder contact details.`);
  pages.push(page);
}

const duplicateTitles = Object.entries(Object.groupBy(pages, (page) => page.title))
  .filter(([, matches]) => matches.length > 1);
assert.deepEqual(duplicateTitles, [], 'Prerendered pages contain duplicate titles.');

const duplicateCanonicals = Object.entries(Object.groupBy(pages, (page) => page.canonical))
  .filter(([, matches]) => matches.length > 1);
assert.deepEqual(duplicateCanonicals, [], 'Prerendered pages contain duplicate canonical URLs.');

const notFound = pages.find((page) => page.file === '404.html');
const enquiry = pages.find((page) => page.file === 'enquire.html');
const blog = pages.find((page) => page.file === 'blog.html');
assert.match(notFound?.robots || '', /noindex/, '404.html must be noindex.');
assert.match(enquiry?.robots || '', /noindex/, 'enquire.html must be noindex.');
if (!process.env.VITE_ZENBLOG_BLOG_ID?.trim()) {
  assert.match(blog?.robots || '', /noindex/, 'The unconfigured blog must be noindex.');
}

const home = pages.find((page) => page.file === 'index.html');
assert.match(home?.html || '', /"@type":"TravelAgency"/, 'The homepage is missing TravelAgency structured data.');

const sitemap = await readFile(path.join(outputDirectory, 'sitemap.xml'), 'utf8');
const sitemapLocations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const indexableCanonicals = pages
  .filter((page) => page.file !== '404.html' && !page.robots.includes('noindex'))
  .map((page) => page.canonical)
  .sort();
assert.deepEqual(sitemapLocations.sort(), indexableCanonicals, 'The sitemap must contain every indexable canonical URL once.');

const robots = await readFile(path.join(outputDirectory, 'robots.txt'), 'utf8');
assert.match(robots, /^User-agent: \*$/m, 'robots.txt is missing the wildcard user agent.');
assert.match(robots, /^Sitemap: https?:\/\//m, 'robots.txt is missing an absolute sitemap URL.');

console.log(`Verified SEO output for ${pages.length - 1} pages plus the custom 404.`);
