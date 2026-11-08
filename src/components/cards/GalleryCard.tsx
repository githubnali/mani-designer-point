import { Maximize2 } from 'lucide-react'
import type { GalleryItem } from '../../types'
import { ResponsiveImage } from '../common/ResponsiveImage'

type GalleryCardProps = {
  item: GalleryItem
  onOpen: () => void
  sizes?: string
  priority?: boolean
}

export function GalleryCard({ item, onOpen, sizes = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw', priority = false }: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-offset-4"
      aria-label={`View larger image: ${item.title}`}
    >
      <ResponsiveImage
        image={item.image}
        alt={item.image.alt}
        sizes={sizes}
        priority={priority}
        className="aspect-[4/3]"
        imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
      />
      <span
        className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-80 transition duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <span>
          <span className="block text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-blue-100">
            {item.category}
          </span>
          <span className="mt-1 block text-sm font-bold text-white sm:text-[0.95rem]">{item.title}</span>
        </span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur transition duration-300 group-hover:bg-brand-red group-hover:border-brand-red">
          <Maximize2 size={15} aria-hidden="true" />
        </span>
      </span>
    </button>
  )
}
