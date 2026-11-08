import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

type LogoProps = {
  variant?: 'default' | 'light'
  className?: string
  onClick?: () => void
}

export function Logo({ variant = 'default', className, onClick }: LogoProps) {
  const isLight = variant === 'light'

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Mani Designer Point — home"
      className={cn('group inline-flex shrink-0 flex-col items-center', className)}
    >
      <span className="flex items-baseline gap-1 whitespace-nowrap font-script leading-none">
        <span className="text-[1.55rem] text-brand-red sm:text-[1.8rem]">Mani</span>
        <span className={cn('text-[1.55rem] sm:text-[1.8rem]', isLight ? 'text-white' : 'text-brand-blue')}>
          Designer
        </span>
        <span className="text-[1.55rem] text-brand-red sm:text-[1.8rem]">Point</span>
      </span>
      <svg viewBox="0 0 260 10" className="mt-0.5 h-2 w-full" aria-hidden="true">
        <path
          d="M3 7.5C49 2.2 116 1.6 257 6.4"
          fill="none"
          stroke="#F12C2C"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M168 5.8c29-1.3 58-1 89 1.2"
          fill="none"
          stroke={isLight ? '#8FC2F5' : '#0754A5'}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={cn(
          'mt-1 flex items-center gap-1.5 text-[0.48rem] font-bold uppercase tracking-[0.24em] sm:text-[0.54rem]',
          isLight ? 'text-blue-100' : 'text-muted',
        )}
      >
        Design <span className="text-brand-red">|</span> Print <span className="text-brand-red">|</span> Service
      </span>
    </Link>
  )
}
