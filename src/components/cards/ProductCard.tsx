import { ArrowUpRight, QrCode, Trophy, Award, KeyRound, ContactRound, RectangleHorizontal, Type, Lamp, Shirt, Coffee, Gift, type LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { productCategories } from '../../data/categories'
import type { Product } from '../../types'
import { ResponsiveImage } from '../common/ResponsiveImage'

function PinBadgeIcon({ size = 24, ...props }: LucideProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="10" r="7" />
      <path d="m12 6 1.2 2.4 2.6.4-1.9 1.8.5 2.7-2.4-1.2-2.4 1.2.5-2.7L7.2 8.8l2.6-.4L12 6Z" />
      <path d="m9 17-3 4m8-4-2 3H8" />
    </svg>
  )
}

function MagneticBadgeIcon({ size = 24, ...props }: LucideProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="16" height="10" rx="2" />
      <path d="M6 7h8M6 10h5M14 15v3a4 4 0 0 0 8 0v-3h-3v3a1 1 0 0 1-2 0v-3h-3ZM14 17h3m2 0h3" />
    </svg>
  )
}

function CapIcon({ size = 24, ...props }: LucideProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 15v-3a7 7 0 0 1 14 0v3M3 15c4 2 9 2 14 0l5 2c-3 4-11 3-15 1l-4-3ZM10 5c3 2 4 5 4 10M9 4h2" />
      <path d="M7 10h3v3H7z" />
    </svg>
  )
}

const productIcons: Record<string, ComponentType<LucideProps>> = { qr: QrCode, trophy: Trophy, award: Award, key: KeyRound, 'pin-badge': PinBadgeIcon, 'magnetic-badge': MagneticBadgeIcon, id: ContactRound, name: RectangleHorizontal, logo: Type, lamp: Lamp, shirt: Shirt, mug: Coffee, cap: CapIcon }

type ProductCardProps = {
  product: Product
  sizes?: string
  priority?: boolean
}

export function ProductCard({
  product,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 92vw',
  priority = false,
}: ProductCardProps) {
  const category = productCategories.find((item) => item.slug === product.category)
  const interest = encodeURIComponent(category?.name ?? 'Something else')
  const ProductIcon = productIcons[product.icon ?? ''] ?? Gift

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative overflow-hidden bg-surface">
        {product.image ? <ResponsiveImage
          image={product.image}
          alt={product.image.alt}
          sizes={sizes}
          priority={priority}
          className="aspect-[4/3]"
          imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        /> : (
          <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-brand-blue-soft" aria-hidden="true">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-brand-blue/10" />
            <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-white/50" />
            <ProductIcon size={64} strokeWidth={1.25} className="relative text-brand-blue transition duration-300 group-hover:scale-110" />
            <span className="absolute bottom-4 text-[0.6rem] font-extrabold uppercase tracking-[0.22em] text-brand-blue/70">Made for you</span>
          </div>
        )}
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-brand-blue shadow-sm backdrop-blur">
            {category.filterLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-[1.02rem] font-bold leading-snug text-navy">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>
        <Link
          to={`/contact-us?interest=${interest}&product=${encodeURIComponent(product.name)}`}
          className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full pt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-blue transition hover:text-brand-red-strong"
          aria-label={`Enquire about ${product.name}`}
        >
          Enquire
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
