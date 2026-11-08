# Implementation summary

## Delivered

A complete static marketing website for Mani Designer Point, built with React 19, Vite 7,
TypeScript, Tailwind CSS v4 and React Router.

- **12 routes**, all prerendered to static HTML with unique metadata, canonical URLs, Open Graph /
  Twitter tags and JSON-LD.
- **4 product categories**, **24 products**, **3 services**, **18 gallery items** and 4 gifting
  occasions, all driven from central data files.
- **31 responsive image sets** in AVIF and WebP at 640/1280px, plus an OG image, favicons and web
  manifest.
- Reusable layout, card, hero, CTA, form, lightbox and navigation components.
- Netlify deployment configuration with SPA fallback, cache headers and Netlify Forms.
- README, asset inventory, placeholder list and this implementation summary.

## Design system

Brand tokens are defined in `src/styles/index.css` and exposed as Tailwind utilities:

| Token | Value |
| --- | --- |
| Brand red | `#F12C2C` |
| Brand red (accessible button) | `#D61F1F` |
| Brand blue | `#0754A5` |
| Navy | `#082C5A` |
| Body text | `#172033` |
| Muted text | `#667085` |
| Surface | `#F5F8FC` |
| Border | `#E5EAF0` |

Typography uses self-hosted Plus Jakarta Sans with Great Vibes for the script logo and accents.
Sections alternate white and light-grey surfaces; primary CTAs are red, full-width CTA banners are
blue, and the footer is navy. Cards use rounded corners, thin borders and restrained shadows.

## Routes and pages

| Route | Implementation |
| --- | --- |
| `/` | Hero, value strip, categories, featured products, services, studio approach, occasions, process, gallery preview, feature grid, CTA |
| `/products` | Product grid with accessible category filter |
| `/products/acrylic-products` | Category hero, product grid, capabilities, related categories |
| `/products/mdf-wooden-products` | Category hero, product grid, capabilities, related categories |
| `/products/corporate-gifting` | Category hero, product grid, capabilities, related categories |
| `/products/customised-gifts` | Category hero, product grid, capabilities, related categories |
| `/services` | Service overview, process, materials, CTA |
| `/services/printing-services` | Print capabilities, preparation details, process, CTA |
| `/services/laser-cutting-engraving` | Cutting/engraving detail, materials, applications, artwork guidance, CTA |
| `/gallery` | Filterable gallery with keyboard-accessible lightbox |
| `/about-us` | Studio approach, values, capabilities, principles, CTA |
| `/contact-us` | Enquiry form, studio details, pre-enquiry checklist, FAQs |
| `*` | Styled 404 page |

## Key technical decisions

### Prerendering without a framework

The build renders each route with `renderToPipeableStream` and `StaticRouter`, then injects the
result into the Vite HTML template. This keeps the client bundle small and avoids adding Next.js or
another meta-framework for a 12-page static site.

### Safe hydration

Every prerendered page carries `<meta name="route-path">`. The client hydrates only when that marker
matches the current URL; otherwise it performs a clean client render. This protects against hosts
that serve `index.html` for unknown paths.

### Route-level splitting

`src/routes/index.tsx` lazy-loads every page. Before hydration the current route is preloaded and
rendered synchronously, so users do not see a Suspense fallback flash over prerendered content.

### Static preview server

`npm run preview` uses `scripts/serve-dist.mjs` instead of `vite preview`, because the latter does not
resolve prerendered directory indexes such as `/products/acrylic-products/`.

### Contact form honesty

The form validates on the client, posts to Netlify Forms in production, and shows an explicit
“not connected in local preview” notice on localhost/LAN addresses. It never simulates a successful
submission. Live delivery is pending deployment verification (see `PLACEHOLDERS.md`).

### Image handling

A Sharp pipeline crops and encodes each source into AVIF/WebP at two widths. `ResponsiveImage`
outputs a `<picture>` with explicit dimensions and lazy loading by default; hero images are
prioritised. The hero is never lazy-loaded.

## Accessibility

- Skip link, semantic landmarks and one `<h1>` per page.
- Keyboard-operable dropdowns, mobile navigation and gallery lightbox.
- Focus trapping and scroll locking in overlays; Escape closes them; arrow keys navigate the
  lightbox.
- Visible focus rings, labelled form fields, inline validation messages and `aria-invalid`.
- Reduced-motion media query; no essential information depends on animation.
- Decorative images and blobs are hidden from assistive technology.

## Performance

- Route-based code splitting.
- Lazy images below the fold, AVIF first with WebP fallback, width descriptors and intrinsic
  dimensions to prevent layout shift.
- Self-hosted fonts, no third-party font requests.
- No analytics, tracking scripts, carousels or heavy UI libraries.
- Static HTML for every route, with only the page-specific JS needed for interaction.

## Verification performed

Run locally on 8 November 2026 against the production build:

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm run build` | Passed; 12 routes prerendered and sitemap written |
| `npm run test:routes` | All 12 routes passed prerender, metadata, schema, internal-link and sitemap checks |
| `npm run test:responsive` | All 12 routes passed at 320, 360, 375, 414, 768, 1024, 1280 and 1440px with no horizontal overflow or broken images |
| `npm run test:visual` | 1440/1024/768/375 screenshots passed with no console errors, page errors or failed requests |
| Client navigation | `/` → `/products` passed and the title updated |
| Product filter | 6 acrylic cards shown |
| Gallery lightbox | Opens, arrow-key navigation, closes on Escape |
| Contact validation | 5 invalid fields marked and focused |
| Local form notice | Shown on localhost instead of a fake success |
| Mobile menu | Opens and closes on Escape |

A 5px overflow on the 320px contact page was found during the responsive audit and fixed with
`min-w-0` on the form/aside and text columns.

## Known limitations

- **Live Netlify form submission is unverified** until the site is deployed. This is deliberate:
  local previews must not claim an enquiry was delivered.
- All photography is placeholder stock/generated imagery; several acrylic cards do not depict the
  actual product.
- Business details, domain and social links are placeholders. See `PLACEHOLDERS.md`.
- No privacy policy page is included; one should be added because the form collects personal data.
- The site is static by design: no CMS, accounts, payments, cart, admin or database.
- Visual checks use desktop Chrome at emulated viewports; a final pass on a physical phone is
  recommended.

## Recommended next steps

1. Replace business details, domain, social links and imagery (`PLACEHOLDERS.md`).
2. Deploy to Netlify and verify the form end to end, including the notification email.
3. Add and link a privacy policy.
4. Re-run `npm run build`, `npm run test:routes`, `npm run test:responsive` and
   `npm run test:visual`.
5. Do a final review on a real phone and with a keyboard/screen reader.
