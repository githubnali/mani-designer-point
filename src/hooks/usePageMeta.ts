import { useEffect } from 'react'
import { canonicalUrl, getPageMeta, normalizePath, pageMeta } from '../data/seo'

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export function usePageMeta(pathname: string) {
  useEffect(() => {
    const path = normalizePath(pathname)
    const meta = getPageMeta(path)
    const isKnown = Boolean(pageMeta[path])

    document.title = meta.title
    setMeta('name', 'description', meta.description)
    setMeta('name', 'robots', isKnown ? 'index,follow' : 'noindex,follow')
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', canonicalUrl(path))
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl(path)
  }, [pathname])
}
