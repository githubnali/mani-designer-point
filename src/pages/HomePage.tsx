import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CategoryCard } from '../components/cards/CategoryCard'
import { ProductCard } from '../components/cards/ProductCard'
import { ServiceCard } from '../components/cards/ServiceCard'
import { ButtonLink } from '../components/common/Button'
import { CTABanner } from '../components/common/CTABanner'
import { FeatureCard } from '../components/common/FeatureCard'
import { PageMeta } from '../components/common/PageMeta'
import { ResponsiveImage } from '../components/common/ResponsiveImage'
import { SectionHeading } from '../components/common/SectionHeading'
import { productCategories } from '../data/categories'
import { capabilities, valueHighlights } from '../data/features'
import { homeGalleryItems } from '../data/gallery'
import { img } from '../data/images'
import { occasions } from '../data/occasions'
import { featuredProducts, products } from '../data/products'
import { services } from '../data/services'

const homeProducts = [
  ...featuredProducts,
  ...products.filter((product) => product.popular && !product.featured),
].slice(0, 8)

const processSteps = [
  {
    number: '01',
    title: 'Share your brief',
    description: 'Tell us what you have in mind, who it is for and any reference you already have.',
  },
  {
    number: '02',
    title: 'We design & make',
    description: 'We shape the layout, material and finish, then cut, print or engrave your piece.',
  },
  {
    number: '03',
    title: 'Handover, arranged',
    description: 'We confirm the collection or handover details with you before the order is complete.',
  },
]

export function HomePage() {
  const [hasMounted, setHasMounted] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const heroContentAnimation = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: hasMounted ? 0 : 20 }
  const heroMediaAnimation = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: hasMounted ? 0 : 28 }

  return (
    <>
      <PageMeta path="/" />

      <section className="relative overflow-hidden bg-surface">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-site relative grid gap-10 pb-14 pt-8 sm:gap-12 sm:pb-16 sm:pt-12 lg:min-h-[calc(100svh-76px)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12 lg:py-10">
          <motion.div
            initial={false}
            animate={heroContentAnimation}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-white px-3.5 py-1.5 text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-brand-red-strong shadow-sm">
              <Sparkles size={13} aria-hidden="true" />
              Design · Print · Service
            </p>

            <h1 className="mt-5 max-w-[11ch] text-[clamp(2.35rem,5.3vw,4.15rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-navy">
              Your ideas,
              <br />
              <span className="font-script text-[1.12em] font-normal leading-none text-brand-red">
                beautifully
              </span>{' '}
              made.
            </h1>

            <p className="mt-5 max-w-xl text-[clamp(0.98rem,1.35vw,1.125rem)] leading-relaxed text-muted">
              Customised acrylic and wooden products, corporate gifts and precise print and laser
              work — created around your name, brand or occasion.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/products" size="lg" arrow="right">
                Explore products
              </ButtonLink>
              <ButtonLink to="/contact-us" size="lg" variant="outline" arrow="up-right">
                Get a quote
              </ButtonLink>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5">
              {['Made to order', 'Bulk orders supported', 'Design support included'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs font-bold text-ink sm:text-[0.82rem]">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-blue/10 text-brand-blue">
                    <Check size={12} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={false}
            animate={heroMediaAnimation}
            transition={{ duration: 0.82, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:h-[min(68svh,650px)] lg:max-w-none"
          >
            <div
              className="absolute -inset-4 rounded-[2.6rem] bg-gradient-to-tr from-brand-red/10 via-white to-brand-blue/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_36px_80px_-36px_rgba(8,44,90,0.42)]">
              <ResponsiveImage
                image={img.heroGiftBox}
                alt={img.heroGiftBox.alt}
                priority
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="aspect-[4/5] lg:h-full lg:aspect-auto"
                imgClassName="h-full w-full object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/80 via-navy/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
                <div>
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-blue-100">
                    Made around your moment
                  </p>
                  <p className="mt-1 text-lg font-bold leading-snug">Gifting, thoughtfully put together.</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-red">
                  <Sparkles size={17} aria-hidden="true" />
                </span>
              </div>
            </div>

            <div className="absolute -left-4 top-1/2 hidden w-40 -translate-y-1/2 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl sm:block lg:-left-8 lg:w-48">
              <ResponsiveImage
                image={img.acrylicFrame}
                alt={img.acrylicFrame.alt}
                priority
                sizes="12rem"
                className="aspect-square"
                imgClassName="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -right-3 -top-3 hidden rounded-2xl border border-line bg-white px-4 py-3 shadow-lg sm:block lg:-right-5">
              <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-muted">Capabilities</p>
              <p className="mt-0.5 text-sm font-bold text-navy">Acrylic · Wood · Print</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-1 pb-4 sm:-mt-6">
        <div className="container-site">
          <div className="grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-card sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
            {valueHighlights.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 rounded-xl p-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-red/10 text-brand-red-strong">
                  <Check size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.86rem] font-bold text-navy">{feature.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we make"
            title="Four ways to make it personal"
            description="Start with a material and a purpose. We will help you shape the details from there."
            action={
              <ButtonLink to="/products" variant="outline" arrow="right">
                All products
              </ButtonLink>
            }
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Selected pieces"
            title="A few of our favourites"
            description="A starting point for your own brief — every piece can be adapted with your name, logo or artwork."
            action={
              <ButtonLink to="/products" variant="outline" arrow="right">
                Browse everything
              </ButtonLink>
            }
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our services"
            title="Print, cut, engrave — under one roof"
            description="From business stationery to precision laser work, we handle the practical details that bring a design into the real world."
            action={
              <ButtonLink to="/services" variant="outline" arrow="right">
                Explore services
              </ButtonLink>
            }
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-[1.8rem] border border-white bg-white shadow-card">
              <ResponsiveImage
                image={img.craftWorkshop}
                alt={img.craftWorkshop.alt}
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="aspect-[4/3]"
                imgClassName="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-7 -right-3 hidden w-44 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl sm:block lg:-right-6 lg:w-52">
              <ResponsiveImage
                image={img.craftHands}
                alt={img.craftHands.alt}
                sizes="14rem"
                className="aspect-square"
                imgClassName="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -left-3 -top-3 hidden rounded-2xl bg-brand-blue px-4 py-3 text-white shadow-lg sm:block lg:-left-5">
              <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-blue-100">
                The studio approach
              </p>
              <p className="mt-0.5 text-sm font-bold">Designed, then made.</p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Why Mani Designer Point"
              title="A considered finish, from first sketch to final piece"
              description="We work across design, print and fabrication, which means fewer handovers and a clearer path from your idea to something you can hold."
            />

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <div key={capability.title} className="rounded-xl border border-line bg-white p-4">
                  <p className="text-sm font-bold text-navy">{capability.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{capability.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/about-us" arrow="right">
                About the studio
              </ButtonLink>
              <ButtonLink to="/gallery" variant="outline" arrow="right">
                See our work
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Gifting occasions"
            title="For the moments worth marking"
            description="A name, a date, a shared memory — small details are what make a gift feel like it was made for one person."
            align="center"
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((occasion) => (
              <Link
                key={occasion.name}
                to={`/contact-us?interest=${encodeURIComponent('Customised Gifts')}`}
                className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <ResponsiveImage
                  image={occasion.image}
                  alt={occasion.image.alt}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw"
                  className="aspect-[5/4]"
                  imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <div className="p-5">
                  <h3 className="text-base font-bold text-navy">{occasion.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{occasion.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-brand-blue transition group-hover:text-brand-red-strong">
                    Enquire <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="From brief to finished piece"
            title="A simple way to work together"
            action={
              <ButtonLink to="/gallery" variant="outline" arrow="right">
                View gallery
              </ButtonLink>
            }
          />

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.number} className="relative rounded-2xl border border-line bg-white p-6 shadow-card">
                <span className="font-script text-4xl leading-none text-brand-red">{step.number}</span>
                <h3 className="mt-3 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {homeGalleryItems.map((item) => (
              <Link
                key={item.id}
                to="/gallery"
                className="group relative overflow-hidden rounded-2xl border border-line bg-white shadow-card"
                aria-label={`${item.title} — open gallery`}
              >
                <ResponsiveImage
                  image={item.image}
                  alt={item.image.alt}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="aspect-[4/3]"
                  imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/5 to-transparent opacity-80 transition group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-blue-100">
                    {item.category}
                  </span>
                  <span className="mt-0.5 block text-sm font-bold text-white">{item.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-16 sm:pt-20 lg:pt-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Good to know"
            title="Small details, handled properly"
            description="Clear communication and a practical approach — whether you need one piece or a repeatable set."
            align="center"
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueHighlights.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      <div className="pt-16 sm:pt-20 lg:pt-24">
        <CTABanner
          title="Have something particular in mind?"
          description="Send us the idea, the occasion and any artwork you already have. We will help you work out the material, format and next step."
          buttonLabel="Start your enquiry"
        />
      </div>
    </>
  )
}

export default HomePage
