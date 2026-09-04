# Wild Wings Travel & Tours

React and Vite site for Wild Wings, a Tanzania safari and Kilimanjaro operator.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and configure the public values used by the site:

```dotenv
VITE_SITE_URL=https://www.example.com
VITE_WHATSAPP_NUMBER=+255...
VITE_BOOKING_EMAIL=hello@example.com
VITE_OFFICE_LOCATION=Arusha, Tanzania
VITE_ZENBLOG_BLOG_ID=
```

If `VITE_SITE_URL` is not set on Vercel, the build uses `VERCEL_PROJECT_PRODUCTION_URL` for canonical URLs, Open Graph URLs, `robots.txt`, and the sitemap.

## Production build

```bash
npm run build
npm run verify:seo
```

The build creates the client bundle, server-renders every public route into `dist/*.html`, writes `dist/404.html`, and generates `sitemap.xml` and `robots.txt`. Vercel serves the generated files with clean URLs and permanent redirects for legacy paths.

The blog is excluded from the sitemap and marked `noindex` until `VITE_ZENBLOG_BLOG_ID` is configured.

## Quality checks

```bash
npm run lint
npm run build
npm run verify:seo
```
