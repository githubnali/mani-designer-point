# Placeholders and launch checklist

Everything below is intentionally generic or unverified. Replace or confirm it before the site goes
live. Nothing here should be presented to the client as final business information.

## 1. Business details

All of these live in `src/data/site.ts`.

| Item | Current value | Action |
| --- | --- | --- |
| Phone | `+91 96422 94416` (`+919642294416`) | Confirm this is the monitored business number |
| Email | `hello@manidesignerpoint.com` | Replace with the monitored inbox |
| Address line 1 | `Shop No. 5-21, Opp. UCO Bank, Near Pillar No. 1540` | Confirm the shop and landmark wording |
| Address line 2 | `Durga Nagar, Krishna Nagar, Dilsukhnagar, Hyderabad, Telangana 500060` | Confirm locality and postal code |
| Opening hours | `Mon – Sat, 10:00 AM – 7:00 PM` | Confirm actual hours, including closures |
| Map link | Supplied Hyderabad address search | Replace with the studio’s exact Google Maps place link when available |
| Legal/business name | `Mani Designer Point` | Confirm the registered name if it differs |

The supplied address is now visible in the footer and on the contact page.

## 2. Domain and SEO

| Item | Current value | Action |
| --- | --- | --- |
| Canonical domain | `https://manidesignerpoint.com` | Confirm the final domain; update `site.domain` in `src/data/site.ts` |
| Sitemap URL | `https://manidesignerpoint.com/sitemap.xml` | Update `public/robots.txt` if the domain changes |
| OG image | `public/images/og-image.jpg` | Replace with a branded 1200×630 image |
| Social preview text | Generated from each page’s metadata | Review titles/descriptions in `src/data/seo.ts` |
| JSON-LD | `LocalBusiness`, `WebSite`, `WebPage`, `BreadcrumbList` | Re-check after address/phone changes; add legal name or geo coordinates only if real |

The domain is assumed. If it changes, run `npm run build` so canonical URLs, Open Graph URLs,
JSON-LD and `sitemap.xml` are regenerated.

## 3. Social profiles

`socialLinks` in `src/data/site.ts` currently points to the platform home pages:

- `https://www.instagram.com/`
- `https://www.facebook.com/`
- `https://www.linkedin.com/`
- `https://www.youtube.com/`

The footer and contact page render these as icons. Replace each `href` with the studio’s real
profile, or remove the entry (the UI renders whatever is in the array). Do not invent profile URLs.

## 4. Imagery

All 31 images are placeholders. See `ASSETS.md` for the full inventory and sources.

Highest priority:

- Acrylic products: `acrylic-stand`, `acrylic-display`, `acrylic-frame`, `acrylic-trophy`
- Hero: `hero-gift-box`
- Open Graph image: `og-image.jpg`

Several acrylic product cards currently use generic props (plants, glasses, blank cards) that do not
show the product being sold. Replace these before launch. Update alt text in `src/data/images.ts` to
match the real photographs.

## 5. Contact form and deployment

- The form is wired for **Netlify Forms** (`contact`) via the React form and
  `public/__forms.html`.
- Local previews deliberately show “This form is not connected in local preview” instead of a fake
  success message.
- **Live submission has not been verified.** After the first Netlify deploy:
  1. Open the deployed contact page.
  2. Submit a real test enquiry.
  3. Confirm it appears under **Forms → contact** in Netlify.
  4. Configure a form notification email in Netlify (none is set in code).
  5. Delete the test submission.
- If the site is not hosted on Netlify, replace the form handler and update the privacy wording.

## 6. Operational copy to confirm

The copy makes practical, non-numeric claims that the studio should confirm:

- Bulk orders, corporate gifting and return gifts are accepted.
- Design support and artwork adaptation are included in an enquiry.
- Proofs are provided “where a layout needs approval”.
- Collection or handover details are arranged per order.
- Timelines and pricing are quoted per brief.

These are deliberately non-committal, but the client should still approve them. No prices, minimum
order quantities, delivery guarantees, founding dates, review scores or customer counts are
published anywhere.

## 7. Legal and policy pages

The 12-route scope does not include a privacy policy. Because the enquiry form collects a name,
email, phone number and message, add a privacy policy before launch and link it in the footer. Also
confirm the data retention and contact wording with the client.

## 8. Content approval

- Studio principle quote on the About page (“Make it useful…”) is editorial copy, not a customer
  testimonial. Approve or replace it.
- Gallery captions describe the placeholder imagery and may not match the real work.
- Product descriptions are generic category copy, not confirmed specifications.
- FAQ answers describe typical practice; confirm each answer with the studio.

## Launch checklist

- [x] Real phone and address in `src/data/site.ts`
- [ ] Monitored email in `src/data/site.ts`
- [ ] Confirmed opening hours and map link
- [ ] Real social profile URLs (or icons removed)
- [ ] Final domain in `site.ts` and `public/robots.txt`
- [ ] Real photography and OG image, with accurate alt text
- [ ] Privacy policy added and linked
- [ ] Test Netlify form submission on the deployed site
- [ ] Netlify form notification email configured
- [ ] Client approval of operational copy and FAQs
- [ ] `npm run build`, `npm run test:routes`, `npm run test:responsive` re-run
- [ ] Final visual review on a real phone
