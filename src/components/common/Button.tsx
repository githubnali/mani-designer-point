import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'white' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-bold transition duration-200 disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-red-strong text-white shadow-[0_10px_24px_-12px_rgba(214,31,31,0.85)] hover:bg-brand-red-dark hover:shadow-[0_14px_28px_-12px_rgba(185,28,28,0.9)]',
  secondary: 'bg-navy text-white hover:bg-brand-blue',
  outline: 'border border-line bg-white text-ink hover:border-brand-red hover:text-brand-red-strong',
  white: 'bg-white text-navy shadow-sm hover:bg-surface',
  ghost: 'text-brand-blue hover:text-brand-red-strong',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.95rem]',
}

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}

type ButtonLinkProps = {
  to: string
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  arrow?: 'right' | 'up-right' | false
  ariaLabel?: string
}

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  size = 'md',
  className,
  arrow = false,
  ariaLabel,
}: ButtonLinkProps) {
  return (
    <Link to={to} aria-label={ariaLabel} className={classes(variant, size, className)}>
      {children}
      {arrow === 'right' && <ArrowRight size={17} aria-hidden="true" />}
      {arrow === 'up-right' && <ArrowUpRight size={17} aria-hidden="true" />}
    </Link>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  arrow?: 'right' | 'up-right' | false
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  arrow = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, className)} {...props}>
      {children}
      {arrow === 'right' && <ArrowRight size={17} aria-hidden="true" />}
      {arrow === 'up-right' && <ArrowUpRight size={17} aria-hidden="true" />}
    </button>
  )
}
