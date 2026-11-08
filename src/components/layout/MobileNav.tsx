import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Mail, Phone } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { navigation, quoteHref, site } from '../../data/site'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useScrollLock } from '../../hooks/useScrollLock'
import { cn } from '../../utils/cn'
import { ButtonLink } from '../common/Button'

type MobileNavProps = {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useScrollLock(open)
  useFocusTrap(open, panelRef, onClose)

  useEffect(() => {
    setExpanded(null)
  }, [location.pathname])

  return (
    <div className="lg:hidden">
      <div
        className={cn(
          'fixed inset-0 z-[55] bg-navy/45 backdrop-blur-sm transition-opacity duration-300 ease-out',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role={open ? 'dialog' : undefined}
        aria-modal={open ? 'true' : undefined}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          'fixed inset-x-0 bottom-0 top-16 z-[60] overflow-y-auto border-t border-line bg-white px-5 pb-8 pt-4 shadow-2xl transition-[opacity,transform] duration-300 ease-out will-change-transform',
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
        )}
      >
        <nav aria-label="Mobile primary navigation">
          <ul className="divide-y divide-line">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between py-3.5 text-[0.95rem] font-bold transition',
                        isActive ? 'text-brand-red-strong' : 'text-ink hover:text-brand-red-strong',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              }

              const isExpanded = expanded === item.label
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpanded(isExpanded ? null : item.label)}
                    className="flex w-full items-center justify-between py-3.5 text-left text-[0.95rem] font-bold text-ink transition hover:text-brand-red-strong"
                  >
                    {item.label}
                    <ChevronDown
                      size={17}
                      aria-hidden="true"
                      className={cn('transition-transform duration-200', isExpanded && 'rotate-180')}
                    />
                  </button>
                  {isExpanded && (
                    <ul className="mb-3 space-y-1 rounded-2xl bg-surface p-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            to={child.href}
                            onClick={onClose}
                            className={cn(
                              'block rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                              location.pathname === child.href
                                ? 'bg-white text-brand-blue shadow-sm'
                                : 'text-muted hover:bg-white hover:text-brand-red-strong',
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mt-6 space-y-3">
          <ButtonLink to={quoteHref} size="lg" className="w-full" arrow="right" >
            Get a Quote
          </ButtonLink>
          <div className="rounded-2xl border border-line bg-surface p-4 text-sm">
            <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2 font-semibold text-ink">
              <Phone size={15} className="text-brand-red-strong" aria-hidden="true" />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="mt-2 flex items-center gap-2 font-semibold text-ink">
              <Mail size={15} className="text-brand-red-strong" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
