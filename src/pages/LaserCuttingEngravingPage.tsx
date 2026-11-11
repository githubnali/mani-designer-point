import { Check, Layers, Ruler, ScanLine } from 'lucide-react'
import { ButtonLink } from '../components/common/Button'
import { EnquirySection } from '../components/common/EnquirySection'
import { PageHero } from '../components/common/PageHero'
import { PageMeta } from '../components/common/PageMeta'
import { ResponsiveImage } from '../components/common/ResponsiveImage'
import { SectionHeading } from '../components/common/SectionHeading'
import { img } from '../data/images'
import { services } from '../data/services'

const laserServices = services.filter(
  (service) => service.slug === 'laser-cutting' || service.slug === 'laser-engraving',
)

const materials = [
  {
    name: 'Acrylic',
    description: 'Clean edges and polished faces for stands, signage, awards and layered designs.',
    image: img.acrylicTrophy,
  },
  {
    name: 'MDF',
    description: 'A smooth, stable surface for painted panels, props and detailed cut shapes.',
    image: img.woodenWallArt,
  },
  {
    name: 'Wood',
    description: 'Natural grain and warmth for engraved gifts, décor and tactile pieces.',
    image: img.woodCarving,
  },
]

const applications = [
  'Name plates and desk signage',
  'Awards, plaques and trophies',
  'Personalised gifts and keepsakes',
  'Decorative panels and wall art',
  'Event props and display pieces',
  'Custom components and inserts',
]

const artworkNotes = [
  {
    icon: Ruler,
    title: 'Scale matters',
    description: 'Share the finished size you need so we can check how the detail will translate.',
  },
  {
    icon: Layers,
    title: 'Material changes the line',
    description: 'The same artwork behaves differently on acrylic, MDF and wood. We will advise on the fit.',
  },
  {
    icon: ScanLine,
    title: 'Vector artwork helps',
    description: 'A vector file is ideal for cutting. If you only have an image, send it and we will take a look.',
  },
]

export function LaserCuttingEngravingPage() {
  return (
    <>
      <PageMeta path="/services/laser-cutting-engraving" />

      <PageHero
        eyebrow="Laser cutting & engraving"
        title={
          <>
            Cut clean. Engrave <span className="text-brand-red">deep.</span>
          </>
        }
        description="Precision cutting and permanent engraving in acrylic, MDF and wood — for signage, gifting, décor and custom components."
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: 'Laser Cutting & Engraving' },
        ]}
        image={img.laserMachine}
        imageAlt={img.laserMachine.alt}
        imageSizes="(min-width: 1024px) 46vw, 100vw"
      >
        <ButtonLink
          to="/contact-us?interest=Laser%20Cutting%20%26%20Engraving"
          size="lg"
          arrow="up-right"
        >
          Discuss a laser project
        </ButtonLink>
        <ButtonLink to="/services" size="lg" variant="outline" arrow="right">
          All services
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-site space-y-14 lg:space-y-20">
          {laserServices.map((service, index) => (
            <div
              key={service.slug}
              className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                <div className="overflow-hidden rounded-[1.8rem] border border-line bg-white shadow-card">
                  <ResponsiveImage
                    image={service.image}
                    alt={service.image.alt}
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="aspect-[4/3]"
                    imgClassName="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : undefined}>
                <p className="eyebrow">{index === 0 ? 'Precision cutting' : 'Permanent detail'}</p>
                <h2 className="mt-3 text-[1.85rem] font-extrabold leading-tight tracking-[-0.02em] text-navy sm:text-4xl">
                  {service.name}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">{service.longDescription}</p>

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm font-semibold text-ink">
                      <Check size={15} className="mt-0.5 shrink-0 text-brand-red-strong" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  to={`/contact-us?interest=${encodeURIComponent('Laser Cutting & Engraving')}`}
                  variant="outline"
                  className="mt-6"
                  arrow="right"
                >
                  Enquire about {service.name.toLowerCase()}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Materials"
            title="Three materials, different characters"
            description="We will help you choose based on how the piece will be used, handled and displayed."
          />

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {materials.map((material) => (
              <article
                key={material.name}
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
              >
                <ResponsiveImage
                  image={material.image}
                  sizes="(min-width: 768px) 32vw, 92vw"
                  className="aspect-[4/3]"
                  imgClassName="h-full w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-base font-bold text-navy">{material.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{material.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Applications"
              title="What we can cut and engrave"
              description="If it can be drawn, it can usually be cut or engraved. These are some of the pieces we are asked for most."
            />
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {applications.map((application) => (
                <li
                  key={application}
                  className="flex items-start gap-2 rounded-xl border border-line bg-white p-3.5 text-sm font-semibold text-ink"
                >
                  <Check size={15} className="mt-0.5 shrink-0 text-brand-red-strong" aria-hidden="true" />
                  {application}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.8rem] bg-brand-blue p-6 text-white sm:p-8">
            <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-blue-100">
              Preparing your artwork
            </p>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight text-white">
              A little preparation goes a long way
            </h2>
            <div className="mt-6 space-y-4">
              {artworkNotes.map((note) => {
                const NoteIcon = note.icon
                return (
                  <div key={note.title} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-white">
                      <NoteIcon size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{note.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-blue-100">{note.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="mt-6 rounded-xl bg-white/10 p-3.5 text-xs leading-relaxed text-blue-50">
              Not sure whether your file is suitable? Send it with a note and we will tell you what we
              can do with it.
            </p>
          </div>
        </div>
      </section>

      <EnquirySection
        title="Let's make the cut"
        description="Tell us the material, size and artwork you have in mind. We will confirm the approach and the practical details."
        interest="Laser Cutting & Engraving"
      />
    </>
  )
}

export default LaserCuttingEngravingPage
