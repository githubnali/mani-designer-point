import { Check, Sparkles } from 'lucide-react'
import { CategoryCard } from '../components/cards/CategoryCard'
import { ProductCard } from '../components/cards/ProductCard'
import { ButtonLink } from '../components/common/Button'
import { CTABanner } from '../components/common/CTABanner'
import { PageHero } from '../components/common/PageHero'
import { PageMeta } from '../components/common/PageMeta'
import { SectionHeading } from '../components/common/SectionHeading'
import { getCategory, productCategories } from '../data/categories'
import { getProductsByCategory } from '../data/products'
import type { CategorySlug } from '../types'

type ProductCategoryPageProps = {
  slug: CategorySlug
}

const customisationOptions = [
  {
    title: 'Names & lettering',
    description: 'A person, a place, a date or a short message, set in a style that suits the piece.',
  },
  {
    title: 'Logos & branding',
    description: 'Your mark adapted for the material, with a finish that keeps it legible.',
  },
  {
    title: 'Photos & artwork',
    description: 'Send an image or illustration and we will advise on how it will translate.',
  },
  {
    title: 'Colour & finish',
    description: 'Clear, coloured, natural or painted — we will help you choose a direction.',
  },
]

export function ProductCategoryPage({ slug }: ProductCategoryPageProps) {
  const category = getCategory(slug)
  if (!category) return null

  const categoryProducts = getProductsByCategory(slug)
  const relatedCategories = productCategories.filter((item) => item.slug !== slug)

  return (
    <>
      <PageMeta path={`/products/${slug}`} />

      <PageHero
        eyebrow={category.filterLabel}
        title={category.name}
        description={category.longDescription}
        breadcrumbs={[{ label: 'Products', href: '/products' }, { label: category.name }]}
        image={category.image}
        imageAlt={category.image.alt}
        imageSizes="(min-width: 1024px) 46vw, 100vw"
      >
        <ButtonLink to={`/contact-us?interest=${encodeURIComponent(category.name)}`} size="lg" arrow="up-right">
          Enquire about {category.filterLabel}
        </ButtonLink>
        <ButtonLink to="/products" size="lg" variant="outline" arrow="right">
          All products
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="The range"
            title={`${category.name} we can make for you`}
            description="Every piece starts with your wording, artwork or occasion. Use these as a guide, then tell us what you have in mind."
          />

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Make it yours"
              title="What we can adapt"
              description="A few of the details we can adjust. If you have a different idea, that is worth a conversation too."
            />
            <div className="mt-6 rounded-2xl border border-brand-blue/15 bg-brand-blue-soft p-5">
              <p className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-blue">
                <Sparkles size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Share any reference images, brand files or rough sketches you have. They help us
                  give you a more useful response.
                </span>
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {customisationOptions.map((option) => (
              <div key={option.title} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-red/10 text-brand-red-strong">
                  <Check size={15} aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-navy">{option.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Keep exploring"
            title="Other directions you might like"
            action={
              <ButtonLink to="/products" variant="outline" arrow="right">
                View all products
              </ButtonLink>
            }
          />

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCategories.map((related) => (
              <CategoryCard key={related.slug} category={related} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to start your project?"
        description="Tell us what you need, how many you are planning for and when you need it. We will confirm the details that matter before work begins."
        buttonLabel="Send an enquiry"
        image={category.image}
      />
    </>
  )
}

export default ProductCategoryPage
