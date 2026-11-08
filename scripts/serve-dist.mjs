import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const port = Number(process.env.PORT || 4173)

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
}

function safePath(pathname) {
  const decoded = decodeURIComponent(pathname)
  const resolved = path.resolve(rootDir, `.${decoded}`)
  return resolved.startsWith(rootDir) ? resolved : null
}

async function fileFor(pathname) {
  const target = safePath(pathname)
  if (!target) return null

  try {
    const info = await stat(target)
    if (info.isDirectory()) {
      const indexFile = path.join(target, 'index.html')
      await stat(indexFile)
      return indexFile
    }
    return target
  } catch {
    if (path.extname(pathname)) return null
    const indexPath = path.join(target, 'index.html')
    try {
      await stat(indexPath)
      return indexPath
    } catch {
      // Client-side fallback. The app renders NotFound for unknown URLs.
      return path.join(rootDir, 'index.html')
    }
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://localhost:${port}`)
  const file = await fileFor(url.pathname)

  if (!file) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
    return
  }

  try {
    const body = await readFile(file)
    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    })
    response.end(body)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
  }
})

server.listen(port, () => {
  console.log(`Serving dist at http://localhost:${port}`)
})
