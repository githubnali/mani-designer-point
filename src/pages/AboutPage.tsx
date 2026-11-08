import { Check, Quote } from 'lucide-react'
import { ButtonLink } from '../components/common/Button'
import { CTABanner } from '../components/common/CTABanner'
import { PageHero } from '../components/common/PageHero'
import { PageMeta } from '../components/common/PageMeta'
import { ResponsiveImage } from '../components/common/ResponsiveImage'
import { SectionHeading } from '../components/common/SectionHeading'
import { businessValues, capabilities } from '../data/features'
import { img } from '../data/images'

const principles = [
  {
    title: 'Listen first',
    description:
      'The best starting point is usually a conversation. We ask what the piece needs to do before we talk about how it should look.',
  },
  {
    title: 'Let the material speak',
    description:
      'Acrylic, MDF, wood and paper each have a character. We choose and finish them with that in mind.',
  },
  {
    title: 'Treat the finish as part of the design',
    description:
      'Clean edges, considered spacing and a tidy handover are not extras — they are what make a piece feel complete.',
  },
]

export function AboutPage() {
  return (
    <>
      <PageMeta path="/about-us" />

      <PageHero
        eyebrow="About us"
        title={
          <>
            A studio built around <span className="text-brand-red">making</span>
          </>
        }
        description="Mani Designer Point works across design, print and fabrication — creating customised pieces for people, businesses and occasions."
        breadcrumbs={[{ label: 'About Us' }]}
        image={img.craftWorkshop}
        imageAlt={img.craftWorkshop.alt}
        imageSizes="(min-width: 1024px) 46vw, 100vw"
      >
        <ButtonLink to="/contact-us" size="lg" arrow="up-right">
          Work with us
        </ButtonLink>
        <ButtonLink to="/gallery" size="lg" variant="outline" arrow="right">
          See our work
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Our approach"
              title="Ideas are only the beginning"
              description="A good piece is the result of lots of small decisions: the material, the weight of a line, the way a name sits on a surface. We enjoy that part."
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <p>
                We work with individuals, teams and businesses on pieces that need to feel personal —
                a name plate for a desk, a gift for a milestone, a set of branded gifts, or print that
                carries a brand into the world.
              </p>
              <p>
                Because design, print and laser work sit together in one studio, we can move from an
                idea to a finished object with fewer handovers and more consistent results. It also
                means we can tell you honestly what will work well in a given material.
              </p>
              <p>
                Every brief starts the same way: we listen, ask a few practical questions and suggest
                a direction. From there, you decide how far you want to take it.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/products" arrow="right">
                Explore products
              </ButtonLink>
              <ButtonLink to="/services" variant="outline" arrow="right">
                Our services
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[1.8rem] border border-white bg-white shadow-card">
              <ResponsiveImage
                image={img.craftHands}
                alt={img.craftHands.alt}
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="aspect-[4/3]"
                imgClassName="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-3 hidden max-w-[15rem] rounded-2xl border border-line bg-white p-4 shadow-xl sm:block lg:-left-6">
              <Quote size={20} className="text-brand-red" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold leading-snug text-navy">
                “Make it useful. Then make it feel like it was made for one person.”
              </p>
              <p className="mt-2 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-muted">
                Our studio principle
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we value"
            title="Four things we try to get right"
            description="They are simple, but they shape how we approach every brief."
            align="center"
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {businessValues.map((value, index) => (
              <article key={value.title} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <span className="font-script text-4xl leading-none text-brand-red">0{index + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <ResponsiveImage
                  image={img.engravingHands}
                  alt={img.engravingHands.alt}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="aspect-[3/4]"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <ResponsiveImage
                  image={img.printingScreen}
                  alt={img.printingScreen.alt}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="aspect-[3/4]"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="What we can do"
              title="Design, print and fabrication together"
              description="A practical set of capabilities, kept deliberately focused so we can do each one properly."
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <div key={capability.title} className="rounded-xl border border-line bg-white p-4">
                  <p className="flex items-start gap-2 text-sm font-bold text-navy">
                    <Check size={15} className="mt-0.5 shrink-0 text-brand-red-strong" aria-hidden="true" />
                    {capability.title}
                  </p>
                  <p className="mt-1.5 pl-6 text-xs leading-relaxed text-muted">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="How we think"
            title="Three principles behind the work"
            description="They guide the questions we ask and the suggestions we make."
          />

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Check size={18} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Let's talk about what you have in mind"
        description="Whether it is a single personal gift or a set for a team, we are happy to look at the brief and tell you what is possible."
        buttonLabel="Contact the studio"
        image={img.craftWorkshop}
      />
    </>
  )
}

export default AboutPage
