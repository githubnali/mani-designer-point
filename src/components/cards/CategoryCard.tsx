import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ProductCategory } from '../../types'
import { ResponsiveImage } from '../common/ResponsiveImage'

type CategoryCardProps = {
  category: ProductCategory
  sizes?: string
  priority?: boolean
}

export function CategoryCard({
  category,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 92vw',
  priority = false,
}: CategoryCardProps) {
  return (
    <Link
      to={`/products/${category.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
      aria-label={`${category.name} — view products`}
    >
      <ResponsiveImage
        image={category.image}
        alt={category.image.alt}
        sizes={sizes}
        priority={priority}
        className="aspect-[4/3]"
        imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.08rem] font-bold leading-snug text-navy">{category.name}</h3>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface text-brand-blue transition duration-300 group-hover:bg-brand-red-strong group-hover:text-white">
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{category.description}</p>
      </div>
    </Link>
  )
}
