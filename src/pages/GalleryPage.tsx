import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { GalleryCard } from '../components/cards/GalleryCard'
import { ButtonLink } from '../components/common/Button'
import { CTABanner } from '../components/common/CTABanner'
import { Lightbox } from '../components/common/Lightbox'
import { PageHero } from '../components/common/PageHero'
import { PageMeta } from '../components/common/PageMeta'
import { galleryCategories, galleryItems } from '../data/gallery'
import { img } from '../data/images'
import { cn } from '../utils/cn'

type GalleryFilter = (typeof galleryCategories)[number]

export function GalleryPage() {
  const [filter, setFilter] = useState<GalleryFilter>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visibleItems = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  )

  const handleFilter = (next: GalleryFilter) => {
    setFilter(next)
    setOpenIndex(null)
  }

  return (
    <>
      <PageMeta path="/gallery" />

      <PageHero
        eyebrow="Our work"
        title={
          <>
            A closer look at what we <span className="text-brand-red">make</span>
          </>
        }
        description="Acrylic, wood, print, laser and corporate gifting — a selection of the work and processes behind the studio."
        breadcrumbs={[{ label: 'Gallery' }]}
        align="center"
      >
        <ButtonLink to="/contact-us" size="lg" arrow="up-right">
          Start a project
        </ButtonLink>
        <ButtonLink to="/products" size="lg" variant="outline" arrow="right">
          Explore products
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-site">
          <div className="rounded-2xl border border-line bg-white p-3 shadow-card sm:p-4">
            <div className="flex items-center gap-2 px-1 pb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-muted">
              <SlidersHorizontal size={14} aria-hidden="true" />
              Filter the gallery
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
              {galleryCategories.map((category) => {
                const count =
                  category === 'All'
                    ? galleryItems.length
                    : galleryItems.filter((item) => item.category === category).length
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleFilter(category)}
                    aria-pressed={filter === category}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition',
                      filter === category
                        ? 'border-brand-red-strong bg-brand-red-strong text-white shadow-sm'
                        : 'border-line bg-white text-ink hover:border-brand-red hover:text-brand-red-strong',
                    )}
                  >
                    {category}
                    <span
                      className={cn(
                        'rounded-full px-1.5 py-0.5 text-[0.62rem] tabular-nums',
                        filter === category ? 'bg-white/20 text-white' : 'bg-surface text-muted',
                      )}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <p className="mt-5 text-sm font-semibold text-muted" aria-live="polite">
            Showing {visibleItems.length} {visibleItems.length === 1 ? 'image' : 'images'}
            {filter !== 'All' && <> in {filter}</>}. Select an image to view it larger.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                onOpen={() => setOpenIndex(index)}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-surface p-6 text-center">
            <p className="text-sm leading-relaxed text-muted">
              Looking for something similar — or completely different? Share a reference and we will
              tell you how we would approach it.
            </p>
            <ButtonLink to="/contact-us" className="mt-4" arrow="right">
              Talk to the studio
            </ButtonLink>
          </div>
        </div>
      </section>

      {openIndex !== null && (
        <Lightbox
          items={visibleItems}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}

      <CTABanner
        title="Your idea could be next"
        description="Bring us a reference, a rough sketch or a clear brief. We will help you turn it into something worth photographing."
        buttonLabel="Start your enquiry"
        image={img.craftWorkshop}
      />
    </>
  )
}

export default GalleryPage
