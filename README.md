# Mani Designer Point

A production-ready marketing website for **Mani Designer Point** — customised acrylic and wooden
products, corporate gifting, printing, and laser cutting & engraving.

The site is a static React application with 12 prerendered routes. There is no cart, checkout,
account area, admin panel, database, or backend. Enquiries are handled by Netlify Forms.

---

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing | React Router DOM 6 |
| Icons | Lucide React |
| Fonts | Self-hosted Plus Jakarta Sans (variable) + Great Vibes |
| Images | Sharp pipeline → AVIF + WebP at 640 / 1280px |
| Prerender | React DOM server (`renderToPipeableStream`) + `StaticRouter` |
| Hosting | Netlify (SPA fallback, Netlify Forms) |

## Requirements

- Node.js 22 (Netlify is pinned to Node 22 in `netlify.toml`)
- npm 10+

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

To test the production build locally:

```bash
npm run build
npm run preview    # http://127.0.0.1:4173
```

`npm run preview` runs a small static server (`scripts/serve-dist.mjs`) that resolves directory
indexes such as `/products/acrylic-products/` to the prerendered HTML. Plain `vite preview` does not
serve those directory indexes correctly.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck, client build, SSR build, prerender all routes, write sitemap |
| `npm run build:client` | Client bundle only (no prerender) |
| `npm run preview` | Serve `dist/` with directory-index resolution on port 4173 |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run test:routes` | Verify all 12 prerendered routes, metadata, JSON-LD, sitemap, form file |
| `npm run test:responsive` | Layout audit at 320–1440px (run against `npm run preview`) |
| `npm run test:visual` | Puppeteer screenshots + interaction checks (run against `npm run preview`) |
| `npm run images` | Rebuild responsive image sets from `scripts/image-sources.json` |

The visual and responsive checks need Chrome. Set `CHROME_PATH` if Chrome is not at the default
Windows location, and `BASE_URL` if the preview runs on another port.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/products` | All products + category filter |
| `/products/acrylic-products` | Acrylic products |
| `/products/mdf-wooden-products` | MDF & wooden products |
| `/products/corporate-gifting` | Corporate gifting |
| `/products/customised-gifts` | Customised gifts |
| `/services` | Services overview |
| `/services/printing-services` | Printing services |
| `/services/laser-cutting-engraving` | Laser cutting & engraving |
| `/gallery` | Filterable gallery with lightbox |
| `/about-us` | About the studio |
| `/contact-us` | Enquiry form, studio details, FAQs |

`src/data/seo.ts` is the single source of truth for route metadata; `scripts/check-routes.mjs`
fails the build checks if the route list drifts from 12.

## Project structure

```text
src/
  components/
    cards/        Category, product, service and gallery cards
    common/       Buttons, images, page hero, lightbox, form, meta, etc.
    layout/       Header, dropdown, mobile nav, footer, layout shell
  data/           Site config, products, services, gallery, features, SEO
  hooks/          Focus trap, scroll lock, scroll state, page metadata
  pages/          The 12 route pages + 404
  routes/         Lazy route manifest and route preloading
  styles/         Tailwind entry, design tokens and base styles
  utils/          Class-name helper and form validation
scripts/          Prerender, route checks, responsive/visual checks, image pipeline
public/           Images, favicons, manifest, robots.txt, Netlify form definition
```

## Content editing

All repeated content lives in `src/data/`:

- `site.ts` — business name, domain, phone, email, address, hours, navigation, social links
- `products.ts` — 15 client-supplied products with shared gifting collections across 4 categories
- `printing.ts` — 19 paper-printing items in 4 groups, plus T-shirt, mug and cap printing
- `services.ts` — 3 service pages
- `gallery.ts` — 18 gallery items and the home gallery selection
- `categories.ts`, `occasions.ts`, `features.ts` — category, occasion and feature content
- `seo.ts` — title, description and canonical path per route
- `images.ts` — image keys, alt text and intrinsic dimensions

Pages read from these files; product data is not duplicated per page.

## Build and prerender

`npm run build` performs four steps:

1. `tsc --noEmit` — typecheck.
2. `vite build` — client bundle with route-level code splitting.
3. `vite build --ssr src/entry-server.tsx --outDir .prerender` — server render entry.
4. `node scripts/prerender.mjs` — render each route, inject SEO tags, Open Graph tags, JSON-LD
   (`LocalBusiness`, `WebSite`, `WebPage`, `BreadcrumbList`), and write `dist/sitemap.xml`.

Each prerendered page includes a `<meta name="route-path">` marker. `src/main.tsx` hydrates only
when that marker matches the current URL; otherwise it performs a clean client render. This avoids
hydration mismatches if a host serves the wrong fallback file.

## Contact form

- The form markup and `public/__forms.html` let Netlify detect the `contact` form at deploy time.
- On a deployed Netlify site, the form posts to `/` with `application/x-www-form-urlencoded`.
- On localhost or a LAN IP, the form deliberately shows a “not connected in local preview” notice
  instead of pretending the enquiry was delivered.
- **Live submission has not been verified.** See `PLACEHOLDERS.md` for the post-deploy test.

## SEO

- Unique title, description, canonical, Open Graph and Twitter tags per route.
- `robots.txt` references the sitemap; `sitemap.xml` lists all 12 routes.
- Semantic headings, breadcrumb navigation, descriptive alt text.
- No fabricated reviews, ratings, prices, founding dates, or business statistics in structured data.

## Accessibility and performance

- Keyboard-accessible navigation, dropdowns, mobile menu and lightbox (Escape closes overlays,
  arrow keys move through gallery images).
- Focus trapping and scroll locking for overlays; visible focus styles; skip link.
- Reduced-motion support; no motion required to use the site.
- Lazy-loaded images below the fold, responsive AVIF/WebP with explicit dimensions, hero images
  prioritised.
- Route-level code splitting; the current route is preloaded before hydration.

## Deployment

1. Push the repository to a Git provider and import it in Netlify.
2. Netlify reads `netlify.toml`: build `npm run build`, publish `dist`, Node 22.
3. Add the production domain in Netlify and update `site.domain` in `src/data/site.ts` if it differs
   from `https://manidesignerpoint.com`.
4. Deploy, then submit one test enquiry and confirm it appears under **Forms → contact** in Netlify.
5. Replace the placeholders listed in `PLACEHOLDERS.md` before launch.

The redirect rule serves prerendered files first and falls back to `index.html` for unknown paths.
`__forms.html` is excluded from indexing and is never linked in the UI.

## Documentation

- [`ASSETS.md`](./ASSETS.md) — image inventory, sources, formats and replacement guidance
- [`PLACEHOLDERS.md`](./PLACEHOLDERS.md) — everything that must be replaced or verified before launch
- [`IMPLEMENTATION.md`](./IMPLEMENTATION.md) — delivered scope, verification results and launch checklist
