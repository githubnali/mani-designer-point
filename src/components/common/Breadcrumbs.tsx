import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export type Crumb = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: Crumb[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-muted sm:text-sm">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded transition hover:text-brand-red-strong"
            aria-label="Home"
          >
            <Home size={14} aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              <ChevronRight size={13} className="text-line" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link to={item.href} className="rounded transition hover:text-brand-red-strong">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-ink' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
