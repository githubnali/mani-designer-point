import { useMemo, useState } from 'react'
import { quoteHref } from '../data/site'
import { SlidersHorizontal, Sparkles } from 'lucide-react'
import { CategoryCard } from '../components/cards/CategoryCard'
import { ProductCard } from '../components/cards/ProductCard'
import { ButtonLink } from '../components/common/Button'
import { CTABanner } from '../components/common/CTABanner'
import { PageHero } from '../components/common/PageHero'
import { PageMeta } from '../components/common/PageMeta'
import { SectionHeading } from '../components/common/SectionHeading'
import { productCategories } from '../data/categories'
import { img } from '../data/images'
import { isProductInCategory, products } from '../data/products'
import type { CategorySlug } from '../types'
import { cn } from '../utils/cn'

type Filter = 'all' | CategorySlug

export function ProductsPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const visibleProducts = useMemo(
    () => (filter === 'all' ? products : products.filter((product) => isProductInCategory(product, filter))),
    [filter],
  )

  const filters: Array<{ value: Filter; label: string; count: number }> = [
    { value: 'all', label: 'All Products', count: products.length },
    ...productCategories.map((category) => ({
      value: category.slug as Filter,
      label: category.filterLabel,
      count: products.filter((product) => isProductInCategory(product, category.slug)).length,
    })),
  ]

  return (
    <>
      <PageMeta path="/products" />

      <PageHero
        eyebrow="Our products"
        title={
          <>
            Made for your name, brand or <span className="text-brand-red">big day</span>
          </>
        }
        description="Explore acrylic, wooden, corporate and personalised pieces. Every product can be adapted with your wording, logo, photo or colour direction."
        breadcrumbs={[{ label: 'Products' }]}
        image={img.acrylicDisplay}
        imageAlt={img.acrylicDisplay.alt}
        imageSizes="(min-width: 1024px) 46vw, 100vw"
      >
        <ButtonLink to="/contact-us" size="lg" arrow="up-right">
          Start an enquiry
        </ButtonLink>
        <ButtonLink to="/services" size="lg" variant="outline" arrow="right">
          Our services
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Browse by category"
            title="Find the right starting point"
            description="Not sure which material suits your idea? Send us a note and we will talk through the options."
          />

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="The full range"
            title="Products we can customise"
            description="Choose a category to narrow the range, or browse everything and enquire about the piece that fits."
          />

          <div className="mt-8 rounded-2xl border border-line bg-white p-3 shadow-card sm:p-4">
            <div className="flex items-center gap-2 px-1 pb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-muted">
              <SlidersHorizontal size={14} aria-hidden="true" />
              Filter by category
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products by category">
              {filters.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  aria-pressed={filter === item.value}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition',
                    filter === item.value
                      ? 'border-brand-red-strong bg-brand-red-strong text-white shadow-sm'
                      : 'border-line bg-white text-ink hover:border-brand-red hover:text-brand-red-strong',
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[0.62rem] tabular-nums',
                      filter === item.value ? 'bg-white/20 text-white' : 'bg-surface text-muted',
                    )}
                  >
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-5 text-sm font-semibold text-muted" aria-live="polite">
            Showing {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}
            {filter !== 'all' && (
              <>
                {' '}
                in {filters.find((item) => item.value === filter)?.label}
              </>
            )}
            .
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="grid gap-8 rounded-[1.8rem] border border-line bg-white p-6 shadow-card sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Sparkles size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-navy sm:text-2xl">Don&apos;t see quite the right thing?</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  These pieces are a starting point. Share your idea, size, wording or artwork and we
                  can discuss a custom direction that fits your brief.
                </p>
              </div>
            </div>
            <ButtonLink to="/contact-us" size="lg" arrow="right" className="justify-self-start lg:justify-self-end">
              Tell us your idea
            </ButtonLink>
          </div>
        </div>
      </section>

      <CTABanner
        title="Planning a set for a team or event?"
        description="Tell us the quantity, occasion and timeline you are working with. We will confirm what is practical before you commit."
        buttonLabel="Chat on WhatsApp"
        buttonHref={quoteHref}
        image={img.giftHand}
      />
    </>
  )
}

export default ProductsPage
