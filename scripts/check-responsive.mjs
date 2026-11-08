import puppeteer from 'puppeteer-core'

/**
 * Layout audit across the supported 320–1440px range.
 *
 * Checks every route for horizontal overflow, broken images, a single <h1>,
 * and page errors. Run against `npm run preview` (or set BASE_URL).
 */

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

const widths = [320, 360, 375, 414, 768, 1024, 1280, 1440]

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
})

const issues = []

for (const width of widths) {
  const page = await browser.newPage()
  await page.setViewport({ width, height: 900 })
  page.on('pageerror', (error) => issues.push(`[${width}] pageerror ${error.message}`))

  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 45000 })
    await page.waitForSelector('main h1')
    await page.evaluate(async () => {
      const step = 700
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((resolve) => setTimeout(resolve, 20))
      }
      window.scrollTo(0, 0)
    })
    await new Promise((resolve) => setTimeout(resolve, 250))

    const audit = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth
      const offenders = [...document.querySelectorAll('body *')]
        .filter((element) => {
          const rect = element.getBoundingClientRect()
          return rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1)
        })
        .slice(0, 5)
        .map((element) => `${element.tagName.toLowerCase()}.${String(element.className).slice(0, 60)}`)
      return {
        overflow,
        offenders,
        broken: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
        h1: document.querySelectorAll('h1').length,
      }
    })

    if (audit.overflow > 1) {
      issues.push(`[${width}] ${route}: overflow ${audit.overflow}px — ${audit.offenders.join(' | ')}`)
    }
    if (audit.broken > 0) issues.push(`[${width}] ${route}: ${audit.broken} broken images`)
    if (audit.h1 !== 1) issues.push(`[${width}] ${route}: ${audit.h1} h1 elements`)
  }

  await page.close()
  console.log(`audited width ${width}`)
}

await browser.close()

if (issues.length > 0) {
  console.error(`\n${issues.length} issue(s) found:`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`\nAll ${routes.length} routes passed layout checks at ${widths.join(', ')}px.`)
