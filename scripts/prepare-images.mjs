import { mkdir, readFile, writeFile, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const cacheDir = path.join(root, '.image-cache')
const outDir = path.join(root, 'public', 'images')
const force = process.argv.includes('--force')

const sources = JSON.parse(await readFile(path.join(root, 'scripts', 'image-sources.json'), 'utf8'))

await mkdir(cacheDir, { recursive: true })
await mkdir(outDir, { recursive: true })

async function exists(file) {
  try {
    await access(file, constants.F_OK)
    return true
  } catch {
    return false
  }
}

async function download(item) {
  if (item.local) return path.join(root, 'scripts', 'local-images', item.local)

  const cachePath = path.join(cacheDir, `${item.pexelsId}.jpg`)
  if (!force && (await exists(cachePath))) return cachePath

  const url = `https://images.pexels.com/photos/${item.pexelsId}/pexels-photo-${item.pexelsId}.jpeg?auto=compress&cs=tinysrgb&w=2000`
  const response = await fetch(url, {
    headers: { 'User-Agent': 'ManiDesignerPoint/1.0 (image preparation)' },
  })
  if (!response.ok) throw new Error(`Failed to download ${item.name} (${item.pexelsId}): ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  await writeFile(cachePath, buffer)
  return cachePath
}

function aspectSize(aspect, width) {
  const [w, h] = aspect.split(':').map(Number)
  return { width, height: Math.round((width * h) / w) }
}

const widths = [640, 1280]

for (const item of sources) {
  const input = await download(item)
  let source = sharp(input)

  if (item.cropBottom) {
    const metadata = await source.metadata()
    if (metadata.width && metadata.height) {
      source = source.extract({
        left: 0,
        top: 0,
        width: metadata.width,
        height: Math.max(1, metadata.height - item.cropBottom),
      })
    }
  }

  for (const width of widths) {
    const { height } = aspectSize(item.aspect, width)
    const base = source.clone().resize(width, height, {
      fit: 'cover',
      position: sharp.strategy.attention,
    })

    const webpPath = path.join(outDir, `${item.name}-${width}.webp`)
    const avifPath = path.join(outDir, `${item.name}-${width}.avif`)

    if (force || !(await exists(webpPath))) {
      await base.clone().webp({ quality: 80, effort: 5 }).toFile(webpPath)
    }
    if (force || !(await exists(avifPath))) {
      await base.clone().avif({ quality: 52, effort: 4 }).toFile(avifPath)
    }
  }
  console.log(`✓ ${item.name}`)
}

// Branded Open Graph image
const ogSource = path.join(cacheDir, '6832992.jpg')
const ogOverlay = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#082C5A" stop-opacity="0.96"/>
      <stop offset="62%" stop-color="#082C5A" stop-opacity="0.86"/>
      <stop offset="100%" stop-color="#082C5A" stop-opacity="0.55"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <rect x="0" y="0" width="10" height="630" fill="#F12C2C"/>
  <text x="80" y="230" fill="#FFFFFF" font-family="Segoe UI, Arial, sans-serif" font-size="66" font-weight="700">Mani Designer Point</text>
  <text x="80" y="296" fill="#FF5A5A" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="5">DESIGN  |  PRINT  |  SERVICE</text>
  <text x="80" y="400" fill="#FFFFFF" opacity="0.9" font-family="Segoe UI, Arial, sans-serif" font-size="34">Your Ideas, Our Creativity</text>
  <rect x="80" y="438" width="110" height="5" fill="#F12C2C"/>
  <text x="80" y="520" fill="#BFD3EA" font-family="Segoe UI, Arial, sans-serif" font-size="23">Customised products · Corporate gifting · Printing · Laser engraving</text>
</svg>`)

await sharp(ogSource)
  .resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention })
  .composite([{ input: ogOverlay }])
  .jpeg({ quality: 86 })
  .toFile(path.join(outDir, 'og-image.jpg'))

// Social / PWA icon
await sharp(path.join(root, 'public', 'favicon.svg'))
  .resize(512, 512)
  .png()
  .toFile(path.join(root, 'public', 'apple-touch-icon.png'))

console.log('\nImages ready in public/images')
