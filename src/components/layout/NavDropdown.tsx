import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import type { NavItem } from '../../types'
import { cn } from '../../utils/cn'

type NavDropdownProps = {
  item: NavItem
  onNavigate?: () => void
}

export function NavDropdown({ item, onNavigate }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const location = useLocation()
  const active = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-3 py-2 text-[0.82rem] font-bold transition',
          active ? 'text-brand-red-strong' : 'text-ink hover:text-brand-red-strong',
        )}
      >
        {item.label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute left-0 top-full z-50 w-64 pt-2"
      >
        <div className="rounded-2xl border border-line bg-white p-2 shadow-[0_24px_60px_-24px_rgba(8,44,90,0.35)]">
          <ul className="space-y-0.5">
            {item.children?.map((child) => {
              const childActive = location.pathname === child.href
              return (
                <li key={child.href}>
                  <Link
                    to={child.href}
                    onClick={() => {
                      setOpen(false)
                      onNavigate?.()
                    }}
                    className={cn(
                      'flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                      childActive
                        ? 'bg-brand-blue-soft text-brand-blue'
                        : 'text-ink hover:bg-surface hover:text-brand-red-strong',
                    )}
                  >
                    {child.label}
                    <ArrowUpRight size={14} aria-hidden="true" className="opacity-40" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
