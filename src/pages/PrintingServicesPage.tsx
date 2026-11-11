import {
  BookOpen,
  CreditCard,
  FileText,
  Image,
  Mail,
  Megaphone,
  Menu,
  Sticker,
} from 'lucide-react'
import { ButtonLink } from '../components/common/Button'
import { EnquirySection } from '../components/common/EnquirySection'
import { PageHero } from '../components/common/PageHero'
import { PageMeta } from '../components/common/PageMeta'
import { ResponsiveImage } from '../components/common/ResponsiveImage'
import { SectionHeading } from '../components/common/SectionHeading'
import { img } from '../data/images'
import { whatsappQuoteHref } from '../data/site'

const printRange = [
  {
    icon: CreditCard,
    title: 'Visiting cards',
    description: 'A first impression in miniature, printed on a stock that suits the finish.',
  },
  {
    icon: FileText,
    title: 'Brochures & flyers',
    description: 'Folded or flat print for services, offers, menus and event information.',
  },
  {
    icon: Megaphone,
    title: 'Banners & posters',
    description: 'Large-format pieces for promotions, events, interiors and announcements.',
  },
  {
    icon: Sticker,
    title: 'Stickers & labels',
    description: 'Branded stickers, product labels and packaging details in custom shapes.',
  },
  {
    icon: Mail,
    title: 'Letterheads & stationery',
    description: 'Consistent business stationery for everyday correspondence.',
  },
  {
    icon: BookOpen,
    title: 'Invitations & cards',
    description: 'Printed invitations, greeting cards and occasion stationery.',
  },
  {
    icon: Image,
    title: 'Certificates & awards',
    description: 'Recognition print for teams, events, courses and milestones.',
  },
  {
    icon: Menu,
    title: 'Menus & table cards',
    description: 'Practical print for hospitality, events and table settings.',
  },
]

const quoteChecklist = [
  {
    title: 'Artwork or reference',
    description: 'A print-ready file is ideal, but a sketch, photo or example can get us started.',
  },
  {
    title: 'Quantity',
    description: 'An approximate number helps us suggest a sensible print setup.',
  },
  {
    title: 'Size & finish',
    description: 'Tell us the format you have in mind, or ask us to recommend one.',
  },
  {
    title: 'When you need it',
    description: 'Share your date so we can confirm what is achievable before you commit.',
  },
]

const printProcess = [
  'Share the artwork, quantity and date you are working towards.',
  'We confirm the format, stock and finish that suit the job.',
  'You review the details and approve the print direction.',
  'We print, check and prepare the finished pieces for handover.',
]

export function PrintingServicesPage() {
  return (
    <>
      <PageMeta path="/services/printing-services" />

      <PageHero
        eyebrow="Printing services"
        title={
          <>
            Print that carries your brand <span className="text-brand-red">properly</span>
          </>
        }
        description="Business stationery, promotional print and occasion pieces — produced with the same care you would give the design itself."
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Printing Services' }]}
        image={img.printingPress}
        imageAlt={img.printingPress.alt}
        imageSizes="(min-width: 1024px) 46vw, 100vw"
      >
        <ButtonLink to={whatsappQuoteHref('Printing Services')} size="lg" arrow="up-right">
          Printing on WhatsApp
        </ButtonLink>
        <ButtonLink to="/services" size="lg" variant="outline" arrow="right">
          All services
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we print"
            title="Practical print, considered"
            description="A selection of the print work we can help with. If your piece is not listed, ask — it may still be a good fit."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {printRange.map((item) => {
              const ItemIcon = item.icon
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-line bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <ItemIcon size={19} aria-hidden="true" />
                  </span>
                  <h3 className="mt-3.5 text-sm font-bold text-navy">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Before we quote"
              title="A few details make the conversation easier"
              description="You do not need everything figured out. These are simply the details that help us give you a clear, useful response."
            />

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {quoteChecklist.map((item, index) => (
                <div key={item.title} className="rounded-xl border border-line bg-white p-4">
                  <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-brand-red-strong">
                    0{index + 1}
                  </span>
                  <p className="mt-1 text-sm font-bold text-navy">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[1.8rem] border border-white bg-white shadow-card">
              <ResponsiveImage
                image={img.printingCards}
                alt={img.printingCards.alt}
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="aspect-[4/3]"
                imgClassName="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <ResponsiveImage
                  image={img.magazine}
                  alt={img.magazine.alt}
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="aspect-[4/3]"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <ResponsiveImage
                  image={img.printingScreen}
                  alt={img.printingScreen.alt}
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="aspect-[4/3]"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="How we work"
            title="From file to finished print"
            description="A straightforward process, with a chance to confirm the details before anything goes to print."
          />

          <ol className="space-y-3">
            {printProcess.map((step, index) => (
              <li key={step} className="flex items-start gap-4 rounded-xl border border-line bg-white p-4 shadow-card">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-red/10 text-xs font-extrabold text-brand-red-strong">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <EnquirySection
        title="Have a print job in mind?"
        description="Send the artwork or a rough idea, the quantity and your date. We will come back with the practical next step."
        interest="Printing Services"
      />
    </>
  )
}

export default PrintingServicesPage
