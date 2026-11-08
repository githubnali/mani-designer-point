import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')

const seoSource = await readFile(path.join(rootDir, 'src', 'data', 'seo.ts'), 'utf8')
const siteSource = await readFile(path.join(rootDir, 'src', 'data', 'site.ts'), 'utf8')

const domain = siteSource.match(/domain:\s*'([^']+)'/)?.[1]
if (!domain) throw new Error('Could not read the site domain from src/data/site.ts')

const routes = [...seoSource.matchAll(/^\s{4}path:\s*'([^']+)'/gm)].map((match) => match[1])
if (routes.length !== 12) {
  throw new Error(`Expected 12 routes in src/data/seo.ts, found ${routes.length}.`)
}

const failures = []
const titles = new Map()

function fail(message) {
  failures.push(message)
}

function outputFor(route) {
  return route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.replace(/^\//, ''), 'index.html')
}

const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8').catch(() => '')
if (!sitemap) fail('dist/sitemap.xml is missing')

const robots = await readFile(path.join(distDir, 'robots.txt'), 'utf8').catch(() => '')
if (!robots.includes('Sitemap:')) fail('dist/robots.txt does not reference a sitemap')

await access(path.join(distDir, '__forms.html')).catch(() =>
  fail('dist/__forms.html is missing — Netlify form detection will fail'),
)

for (const route of routes) {
  const file = outputFor(route)
  const html = await readFile(file, 'utf8').catch(() => null)

  if (!html) {
    fail(`${route}: prerendered file is missing (${path.relative(rootDir, file)})`)
    continue
  }

  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
  const rootMarkup = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<noscript>/)?.[1] ?? ''
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length

  if (!title) fail(`${route}: <title> is missing`)
  if (!description) fail(`${route}: meta description is missing`)
  if (!canonical) fail(`${route}: canonical link is missing`)
  if (canonical && canonical !== `${domain}${route === '/' ? '/' : route}`) {
    fail(`${route}: canonical is ${canonical}`)
  }
  if (rootMarkup.trim().length < 400) fail(`${route}: prerendered markup looks empty`)
  if (h1Count !== 1) fail(`${route}: expected exactly one <h1>, found ${h1Count}`)
  if (html.includes('<!--seo:start-->') || html.includes('<!--schema:start-->')) {
    fail(`${route}: unreplaced SEO/schema markers remain`)
  }
  if (!html.includes('application/ld+json')) fail(`${route}: JSON-LD schema is missing`)
  if (!sitemap.includes(`${domain}${route === '/' ? '/' : route}`)) {
    fail(`${route}: route is missing from sitemap.xml`)
  }

  if (title) {
    const decoded = title
      .replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
    if (titles.has(decoded)) fail(`${route}: duplicate title also used by ${titles.get(decoded)}`)
    else titles.set(decoded, route)
  }

  const internalLinks = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((match) => match[1])
  const allowedAssets = /^\/(images|assets)\//
  const allowedFiles = new Set([
    '/favicon.svg',
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/site.webmanifest',
    '/robots.txt',
    '/sitemap.xml',
    '/__forms.html',
  ])

  for (const link of new Set(internalLinks)) {
    if (allowedAssets.test(link) || allowedFiles.has(link)) continue
    if (!routes.includes(link)) fail(`${route}: internal link ${link} does not match a route`)
  }

  console.log(`ok  ${route}`)
}

if (failures.length > 0) {
  console.error(`\n${failures.length} check(s) failed:`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`\nAll ${routes.length} routes passed prerender, metadata, schema and sitemap checks.`)
