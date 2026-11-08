import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  action?: ReactNode
  className?: string
  titleClassName?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        centered ? 'mx-auto max-w-3xl items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn(centered ? 'max-w-2xl' : 'max-w-2xl')}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2
          className={cn(
            'mt-3 text-[1.9rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-navy sm:text-4xl lg:text-[2.7rem]',
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn('mt-4 text-base leading-relaxed text-muted sm:text-[1.05rem]', centered && 'mx-auto')}>
            {description}
          </p>
        )}
      </div>
      {action && <div className={cn('shrink-0', centered && 'flex justify-center')}>{action}</div>}
    </div>
  )
}
