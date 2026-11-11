import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { navigation, quoteHref } from '../../data/site'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../utils/cn'
import { ButtonLink } from '../common/Button'
import { Logo } from '../common/Logo'
import { WhatsAppIcon } from '../common/WhatsAppIcon'
import { MobileNav } from './MobileNav'
import { NavDropdown } from './NavDropdown'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolled()
  const location = useLocation()

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-[70] border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85',
          mobileOpen && 'bg-white shadow-header',
          scrolled && 'shadow-header',
        )}
      >
        <div className="container-site flex h-16 items-center justify-between gap-2 lg:h-[76px] lg:gap-6">
          <Logo onClick={() => setMobileOpen(false)} />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => {
            const isActive = item.children
              ? location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
              : location.pathname === item.href

            if (item.children) {
              return <NavDropdown key={item.href} item={item} />
            }

            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'rounded-full px-3 py-2 text-[0.82rem] font-bold transition',
                  isActive ? 'text-brand-red-strong' : 'text-ink hover:text-brand-red-strong',
                )}
              >
                {item.label}
              </Link>
            )
          })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ButtonLink to={quoteHref} size="sm" arrow="up-right">
              WhatsApp Us
            </ButtonLink>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <a
              href={quoteHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp (opens in a new tab)"
              title="Chat on WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full bg-[#128C7E] text-white transition-colors hover:bg-[#075E54]"
            >
              <WhatsAppIcon size={22} />
            </a>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-navy transition hover:border-brand-red hover:text-brand-red-strong lg:hidden"
          >
            {mobileOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
          </div>
        </div>
      </header>

      <div id="mobile-navigation">
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </>
  )
}
