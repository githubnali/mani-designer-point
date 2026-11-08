import type { ReactNode } from 'react'
import type { ImageAsset } from '../../types'
import { cn } from '../../utils/cn'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { ResponsiveImage } from './ResponsiveImage'

type PageHeroProps = {
  eyebrow?: string
  title: ReactNode
  description?: string
  breadcrumbs?: Crumb[]
  image?: ImageAsset
  imageAlt?: string
  imageSizes?: string
  align?: 'left' | 'center'
  children?: ReactNode
  className?: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  imageAlt,
  imageSizes = '(min-width: 1024px) 46vw, 100vw',
  align = 'left',
  children,
  className,
}: PageHeroProps) {
  const centered = align === 'center' && !image

  return (
    <section className={cn('relative overflow-hidden bg-surface', className)}>
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className={cn(
          'container-site relative grid gap-10 pb-14 pt-9 sm:pt-12 lg:pb-20 lg:pt-14',
          image ? 'lg:grid-cols-[1.05fr_0.95fr] lg:items-center' : 'max-w-4xl',
          centered && 'mx-auto justify-items-center text-center',
        )}
      >
        <div className={cn(centered && 'max-w-3xl')}>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-6" />}
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1
            className={cn(
              'mt-3 text-[2.15rem] font-extrabold leading-[1.06] tracking-[-0.035em] text-navy sm:text-5xl lg:text-[3.4rem]',
              centered && 'mx-auto',
            )}
          >
            {title}
          </h1>
          {description && (
            <p className={cn('mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg', centered && 'mx-auto')}>
              {description}
            </p>
          )}
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>

        {image && (
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-[2.4rem] bg-gradient-to-tr from-brand-red/10 via-white to-brand-blue/10 blur-xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/70 bg-white shadow-[0_30px_70px_-32px_rgba(8,44,90,0.35)]">
              <ResponsiveImage
                image={image}
                alt={imageAlt}
                priority
                sizes={imageSizes}
                className="aspect-[4/3]"
                imgClassName="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 shadow-lg sm:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-red" aria-hidden="true" />
              <span className="text-xs font-bold text-navy">Made to order</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
