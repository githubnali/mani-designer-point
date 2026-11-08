import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ServiceCard } from '../components/cards/ServiceCard'
import { ButtonLink } from '../components/common/Button'
import { CTABanner } from '../components/common/CTABanner'
import { PageHero } from '../components/common/PageHero'
import { PageMeta } from '../components/common/PageMeta'
import { SectionHeading } from '../components/common/SectionHeading'
import { ResponsiveImage } from '../components/common/ResponsiveImage'
import { img } from '../data/images'
import { services } from '../data/services'

const process = [
  {
    number: '01',
    title: 'Brief',
    description: 'We start with what you need, who it is for and any examples you like.',
  },
  {
    number: '02',
    title: 'Artwork',
    description: 'We adapt your text, logo or image into a layout that suits the process.',
  },
  {
    number: '03',
    title: 'Production',
    description: 'Your piece is printed, cut or engraved, then checked for a clean finish.',
  },
  {
    number: '04',
    title: 'Handover',
    description: 'We confirm the practical details and let you know when it is ready.',
  },
]

const materials = [
  {
    name: 'Acrylic',
    description: 'Clear, coloured and mirrored acrylic for crisp cut shapes, stands and awards.',
  },
  {
    name: 'MDF',
    description: 'Smooth, consistent board for painted pieces, panels and structural details.',
  },
  {
    name: 'Wood',
    description: 'Natural grain for warm, tactile pieces where the material is part of the design.',
  },
  {
    name: 'Paper & board',
    description: 'Card, paper and promotional stock for business print and event material.',
  },
]

const useCases = [
  'Reception and desk signage',
  'Awards and recognition pieces',
  'Event and exhibition print',
  'Business stationery',
  'Personalised gifts',
  'Decorative panels and wall pieces',
]

export function ServicesPage() {
  return (
    <>
      <PageMeta path="/services" />

      <PageHero
        eyebrow="Our services"
        title={
          <>
            Print, cut and engrave, with a <span className="text-brand-red">maker&apos;s eye</span>
          </>
        }
        description="Three capabilities that work together — so your idea can move from a file on screen to a finished piece without unnecessary handovers."
        breadcrumbs={[{ label: 'Services' }]}
        image={img.laserMachine}
        imageAlt={img.laserMachine.alt}
        imageSizes="(min-width: 1024px) 46vw, 100vw"
      >
        <ButtonLink to="/contact-us" size="lg" arrow="up-right">
          Discuss your project
        </ButtonLink>
        <ButtonLink to="/gallery" size="lg" variant="outline" arrow="right">
          See the work
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we do"
            title="Capabilities under one roof"
            description="Choose a service on its own, or combine print, cutting and engraving in a single project."
          />

          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="How it works"
            title="A clear path from idea to object"
            description="No long forms and no guesswork. A short conversation is usually enough to establish the right approach."
          />

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <div key={step.number} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <span className="font-script text-4xl leading-none text-brand-red">{step.number}</span>
                <h3 className="mt-3 text-base font-bold text-navy">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Materials"
              title="The right material changes everything"
              description="We work with a focused set of materials so we can give practical advice on how a design will behave when it is made."
            />
            <div className="mt-6 space-y-3">
              {materials.map((material) => (
                <div
                  key={material.name}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white p-4"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-red/10 text-brand-red-strong">
                    <Check size={13} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{material.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{material.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-[1.8rem] border border-line bg-white shadow-card">
              <ResponsiveImage
                image={img.printingPress}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="aspect-[4/3]"
                imgClassName="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 rounded-2xl bg-brand-blue p-6 text-white">
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-blue-100">
                Common projects
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2 text-sm text-blue-50">
                    <Check size={14} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" />
                    {useCase}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact-us"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white transition hover:text-brand-red"
              >
                Talk through your project <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="One idea, the right process"
        description="Not sure whether your project calls for print, cutting or engraving? Describe it and we will point you in the right direction."
        buttonLabel="Ask us"
        image={img.printingPress}
      />
    </>
  )
}

export default ServicesPage
