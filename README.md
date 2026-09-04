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

The enquiry API also needs server-only email settings. Resend can be installed from the Vercel Marketplace with `vercel integration add resend`, which provisions `RESEND_API_KEY`:

```dotenv
RESEND_API_KEY=re_...
BOOKING_EMAIL=bookings@example.com
ENQUIRY_FROM_EMAIL="Wild Wings Enquiries <enquiries@example.com>"
```

`ENQUIRY_FROM_EMAIL` must use a sending domain verified in Resend. Keep `RESEND_API_KEY` server-side; never prefix it with `VITE_`.

If `VITE_SITE_URL` is not set on Vercel, the build uses `VERCEL_PROJECT_PRODUCTION_URL` for canonical URLs, Open Graph URLs, `robots.txt`, and the sitemap.
Production Vercel builds also require at least one working contact channel: `VITE_BOOKING_EMAIL` or `VITE_WHATSAPP_NUMBER`.

## Production build

```bash
npm run build
npm run verify:seo
```

The build creates split client bundles, server-renders every public route into `dist/*.html`, writes `dist/404.html`, and generates `sitemap.xml` and `robots.txt`. Vercel serves the generated files with clean URLs and permanent redirects for legacy paths. The `/api/enquire` Vercel Function validates form submissions and delivers them through Resend.

The blog is excluded from the sitemap and marked `noindex` until `VITE_ZENBLOG_BLOG_ID` is configured. Once configured, the build fetches published posts, prerenders each article with its own metadata and structured data, and adds it to the sitemap.

## Quality checks

```bash
npm run lint
npm test
npm run build
npm run verify:seo
```
