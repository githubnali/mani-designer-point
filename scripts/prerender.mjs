import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const templatePath = path.join(distDir, 'index.html')

const { render, pageMetaList, pageMeta, canonicalUrl, site } = await import(
  pathToFileURL(path.join(rootDir, '.prerender', 'entry-server.js')).href
)

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function breadcrumbItems(routePath) {
  const items = [{ name: 'Home', url: `${site.domain}/` }]

  if (routePath === '/') return items

  if (routePath.startsWith('/products')) {
    items.push({ name: 'Products', url: `${site.domain}/products` })
  } else if (routePath.startsWith('/services')) {
    items.push({ name: 'Services', url: `${site.domain}/services` })
  }

  const isHub = routePath === '/products' || routePath === '/services'
  if (!isHub) {
    const label = pageMeta[routePath]?.title.split('|')[0].trim() ?? routePath
    items.push({ name: label, url: canonicalUrl(routePath) })
  }

  return items
}

function buildSchema(meta) {
  const url = canonicalUrl(meta.path)
  const crumbs = breadcrumbItems(meta.path)

  const graph = [
    {
      '@type': 'LocalBusiness',
      '@id': `${site.domain}/#business`,
      name: site.name,
      url: `${site.domain}/`,
      image: `${site.domain}/images/og-image.jpg`,
      description: site.description,
      email: site.email,
      telephone: site.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.line1,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      areaServed: 'Bengaluru, Karnataka',
      knowsAbout: [
        'Customised acrylic products',
        'MDF and wooden products',
        'Corporate gifting',
        'Printing services',
        'Laser cutting',
        'Laser engraving',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${site.domain}/#website`,
      url: `${site.domain}/`,
      name: site.name,
      publisher: { '@id': `${site.domain}/#business` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      isPartOf: { '@id': `${site.domain}/#website` },
      about: { '@id': `${site.domain}/#business` },
      inLanguage: 'en-IN',
      ...(meta.path === '/'
        ? {}
        : { breadcrumb: { '@id': `${url}#breadcrumb` } }),
    },
  ]

  if (meta.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

function buildSeo(meta) {
  const url = canonicalUrl(meta.path)
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="route-path" content="${meta.path}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index,follow" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site.domain}/images/og-image.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${site.domain}/images/og-image.jpg" />`,
  ].join('\n    ')
}

function buildSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10)

  const priorityFor = (routePath) => {
    if (routePath === '/') return '1.0'
    if (routePath === '/products' || routePath === '/services') return '0.9'
    if (routePath.startsWith('/products/') || routePath.startsWith('/services/')) return '0.8'
    if (routePath === '/contact-us') return '0.8'
    return '0.7'
  }

  const entries = pageMetaList
    .map(
      (meta) => `  <url>
    <loc>${canonicalUrl(meta.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priorityFor(meta.path)}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`
}

const template = await readFile(templatePath, 'utf8')

if (!template.includes('<!--seo:start-->') || !template.includes('<!--schema:start-->')) {
  throw new Error('SEO/schema markers are missing from dist/index.html — check index.html.')
}

if (!template.includes('<div id="root"></div>')) {
  throw new Error('The empty root element was not found in dist/index.html.')
}

for (const meta of pageMetaList) {
  const markup = await render(meta.path)
  const seo = buildSeo(meta)
  const schema = JSON.stringify(buildSchema(meta)).replaceAll('<', '\\u003c')

  const html = template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, seo)
    .replace(
      /<!--schema:start-->[\s\S]*?<!--schema:end-->/,
      `<script type="application/ld+json">${schema}</script>`,
    )
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)

  const outputPath =
    meta.path === '/'
      ? templatePath
      : path.join(distDir, meta.path.replace(/^\//, ''), 'index.html')

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, html, 'utf8')
  console.log(`prerendered ${meta.path} -> ${path.relative(rootDir, outputPath)}`)
}

await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(), 'utf8')
console.log(`sitemap written with ${pageMetaList.length} routes`)
