import { useEffect } from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import { ButtonLink } from '../components/common/Button'
import { canonicalUrl } from '../data/seo'
import { site } from '../data/site'

export function NotFoundPage() {
  useEffect(() => {
    document.title = `Page not found | ${site.name}`

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = 'noindex,follow'

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl('/404')
  }, [])

  return (
    <section className="bg-surface">
      <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-script text-7xl leading-none text-brand-red sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">
          This page has wandered off.
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
          The page you were looking for is not here. It may have moved, or the link may be out of
          date.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/" size="lg">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to home
          </ButtonLink>
          <ButtonLink to="/products" size="lg" variant="outline" arrow="right">
            Browse products
          </ButtonLink>
          <ButtonLink to="/contact-us" size="lg" variant="outline" arrow="up-right">
            Contact us
          </ButtonLink>
        </div>

        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-muted">
          <Search size={14} aria-hidden="true" />
          Looking for something specific? Email {site.email}
        </p>
      </div>
    </section>
  )
}
