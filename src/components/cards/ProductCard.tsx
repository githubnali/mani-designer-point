import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { productCategories } from '../../data/categories'
import type { Product } from '../../types'
import { ResponsiveImage } from '../common/ResponsiveImage'

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

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative overflow-hidden bg-surface">
        <ResponsiveImage
          image={product.image}
          alt={product.image.alt}
          sizes={sizes}
          priority={priority}
          className="aspect-[4/3]"
          imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
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
          to={`/contact-us?interest=${interest}`}
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
