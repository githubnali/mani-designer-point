import { StrictMode } from 'react'
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

export { canonicalUrl, getPageMeta, pageMeta, pageMetaList } from './data/seo'
export { site } from './data/site'

class HtmlCollector extends Writable {
  private chunks: Buffer[] = []

  _write(
    chunk: Buffer,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ) {
    this.chunks.push(Buffer.from(chunk))
    callback()
  }

  html() {
    return Buffer.concat(this.chunks).toString('utf8')
  }
}

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let settled = false
    const collector = new HtmlCollector()

    collector.on('finish', () => {
      if (settled) return
      settled = true
      resolve(collector.html())
    })

    const stream = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady() {
          if (settled) return
          stream.pipe(collector)
        },
        onError(error) {
          if (settled) return
          settled = true
          reject(error)
        },
      },
    )
  })
}
