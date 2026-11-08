import { usePageMeta } from '../../hooks/usePageMeta'

type PageMetaProps = {
  path: string
}

/**
 * Applies the route's title, description, canonical URL and social metadata
 * on the client. The prerender script writes the same values into each
 * generated HTML file for crawlers and link previews.
 */
export function PageMeta({ path }: PageMetaProps) {
  usePageMeta(path)
  return null
}
