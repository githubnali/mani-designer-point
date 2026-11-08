import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '../../types'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useScrollLock } from '../../hooks/useScrollLock'
import { ResponsiveImage } from './ResponsiveImage'

type LightboxProps = {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const item = items[index]

  useScrollLock(true)
  useFocusTrap(true, dialogRef, onClose)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onIndexChange((index + 1) % items.length)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onIndexChange((index - 1 + items.length) % items.length)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [index, items.length, onIndexChange])

  if (!item) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-[100] flex flex-col bg-navy/95 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 text-white sm:px-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:border-brand-red hover:bg-brand-red focus-visible:outline-white"
          aria-label="Close image viewer"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-2 sm:px-16"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
      >
        <button
          type="button"
          onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
          className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-navy/40 text-white transition hover:border-brand-red hover:bg-brand-red focus-visible:outline-white sm:left-5 sm:h-12 sm:w-12"
          aria-label="Previous image"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>

        <figure className="flex max-h-full max-w-5xl flex-col items-center">
          <div className="flex max-h-[68vh] items-center justify-center overflow-hidden rounded-xl">
            <ResponsiveImage
              key={item.id}
              image={item.image}
              alt={item.image.alt}
              sizes="(min-width: 1024px) 70vw, 100vw"
              priority
              className="max-h-[68vh]"
              imgClassName="max-h-[68vh] w-auto max-w-full object-contain"
            />
          </div>
          <figcaption className="mt-4 text-center">
            <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-blue-200">
              {item.category}
            </p>
            <p id="lightbox-title" className="mt-1 text-base font-bold text-white sm:text-lg">
              {item.title}
            </p>
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => onIndexChange((index + 1) % items.length)}
          className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-navy/40 text-white transition hover:border-brand-red hover:bg-brand-red focus-visible:outline-white sm:right-5 sm:h-12 sm:w-12"
          aria-label="Next image"
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>

      <p className="px-4 pb-5 text-center text-[0.7rem] text-blue-100/70 sm:px-6">
        Use the arrow keys to move between images, or press Escape to close.
      </p>
    </div>
  )
}
