import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const screensDir = path.join(rootDir, '.screens')
const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4173'
const chromePath =
  process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const routes = [
  '/',
  '/products',
  '/products/acrylic-products',
  '/products/mdf-wooden-products',
  '/products/corporate-gifting',
  '/products/customised-gifts',
  '/services',
  '/services/printing-services',
  '/services/laser-cutting-engraving',
  '/gallery',
  '/about-us',
  '/contact-us',
]

const viewports = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1024', width: 1024, height: 768 },
  { name: '768', width: 768, height: 1024 },
  { name: '375', width: 375, height: 812 },
]

await mkdir(screensDir, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
})

const issues = []

async function preparePage(viewport) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      const text = message.text()
      if (!text.includes('favicon')) issues.push(`[console:${message.type()}] ${text}`)
    }
  })
  page.on('pageerror', (error) => issues.push(`[pageerror] ${error.message}`))
  page.on('requestfailed', (request) => {
    issues.push(`[requestfailed] ${request.url()} — ${request.failure()?.errorText}`)
  })
  return page
}

async function loadRoute(page, route) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 45000 })
  await page.waitForSelector('main h1', { timeout: 15000 })
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    const step = 700
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 35))
    }
    window.scrollTo(0, 0)
  })
  await new Promise((resolve) => setTimeout(resolve, 500))
}

for (const viewport of viewports) {
  const page = await preparePage(viewport)
  const routesForViewport = viewport.name === '1440' || viewport.name === '375' ? routes : ['/', '/products', '/gallery', '/contact-us']

  for (const route of routesForViewport) {
    await loadRoute(page, route)

    const audit = await page.evaluate(() => {
      const h1s = [...document.querySelectorAll('h1')].map((element) =>
        (element.textContent || '').replace(/\s+/g, ' ').trim(),
      )
      const brokenImages = [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src)
      const marker = document.querySelector('meta[name="route-path"]')?.getAttribute('content')

      return {
        title: document.title,
        marker,
        h1s,
        brokenImages,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        bodyTextLength: document.body.innerText.length,
      }
    })

    const prefix = `${viewport.name} ${route}`
    if (audit.h1s.length !== 1) issues.push(`${prefix}: ${audit.h1s.length} h1 elements — ${audit.h1s.join(' | ')}`)
    if (audit.marker !== route) issues.push(`${prefix}: route marker is ${audit.marker}`)
    if (audit.overflow > 1) issues.push(`${prefix}: horizontal overflow of ${audit.overflow}px`)
    if (audit.brokenImages.length > 0) issues.push(`${prefix}: broken images — ${audit.brokenImages.join(', ')}`)
    if (audit.bodyTextLength < 300) issues.push(`${prefix}: page text looks empty`)

    const fileName = `${viewport.name}${route === '/' ? '-home' : route.replaceAll('/', '-')}.jpg`
    await page.screenshot({
      path: path.join(screensDir, fileName),
      fullPage: true,
      type: 'jpeg',
      quality: 72,
    })

    console.log(`${prefix} — ${audit.title}`)
  }

  await page.close()
}

// Interaction checks
const page = await preparePage({ width: 1440, height: 900 })

await loadRoute(page, '/')
await page.click('main a[href="/products"]')
await page.waitForFunction(() => window.location.pathname === '/products')
await page.waitForSelector('main button[aria-pressed]', { timeout: 15000 })
await page.waitForFunction(() => document.title.includes('Our Products'))
const navTitle = await page.title()
console.log(`navigation / -> /products — ${navTitle}`)

await page.click('button[aria-pressed="false"]')
await new Promise((resolve) => setTimeout(resolve, 250))
const filterCount = await page.evaluate(
  () => document.querySelectorAll('main article').length,
)
console.log(`product filter — ${filterCount} cards visible`)

await page.goto(`${baseUrl}/gallery`, { waitUntil: 'networkidle0' })
await page.waitForSelector('main h1')
await page.click('main button[aria-label^="View larger image"]')
await page.waitForSelector('[role="dialog"][aria-modal="true"]')
const dialogOpen = await page.evaluate(() => Boolean(document.querySelector('[role="dialog"][aria-modal="true"]')))
await page.keyboard.press('ArrowRight')
await page.keyboard.press('Escape')
await new Promise((resolve) => setTimeout(resolve, 250))
const dialogClosed = await page.evaluate(() => !document.querySelector('[role="dialog"][aria-modal="true"]'))
console.log(`gallery lightbox — open: ${dialogOpen}, closes on Escape: ${dialogClosed}`)

await page.goto(`${baseUrl}/contact-us`, { waitUntil: 'networkidle0' })
await page.waitForSelector('form[name="contact"]')
await page.click('form[name="contact"] button[type="submit"]')
await new Promise((resolve) => setTimeout(resolve, 250))
const validationErrors = await page.evaluate(
  () => document.querySelectorAll('form[name="contact"] [aria-invalid="true"]').length,
)
console.log(`contact validation — ${validationErrors} invalid fields marked`)

await page.type('#contact-name', 'Test Enquiry')
await page.type('#contact-email', 'test@example.com')
await page.type('#contact-phone', '9876543210')
await page.select('#contact-interest', 'Acrylic Products')
await page.type('#contact-message', 'This is a local preview check for the enquiry form.')
await page.click('form[name="contact"] button[type="submit"]')
await new Promise((resolve) => setTimeout(resolve, 350))
const localNotice = await page.evaluate(() =>
  document.body.innerText.includes('This form is not connected in local preview'),
)
console.log(`contact local-preview notice — ${localNotice}`)

// Mobile navigation
await page.setViewport({ width: 375, height: 812 })
await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle0' })
await page.click('button[aria-controls="mobile-navigation"]')
await page.waitForSelector('#mobile-navigation [role="dialog"]')
const mobileOpen = await page.evaluate(() =>
  Boolean(document.querySelector('#mobile-navigation [role="dialog"]')),
)
await page.keyboard.press('Escape')
await new Promise((resolve) => setTimeout(resolve, 250))
const mobileClosed = await page.evaluate(() =>
  !document.querySelector('#mobile-navigation [role="dialog"]'),
)
console.log(`mobile menu — open: ${mobileOpen}, closes on Escape: ${mobileClosed}`)

await page.close()
await browser.close()

if (issues.length > 0) {
  console.error(`\n${issues.length} issue(s) found:`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log('\nVisual and interaction checks passed with no console or layout issues.')
