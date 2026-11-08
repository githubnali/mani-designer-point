import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react'
import { ContactForm } from '../components/common/ContactForm'
import { PageHero } from '../components/common/PageHero'
import { PageMeta } from '../components/common/PageMeta'
import { SectionHeading } from '../components/common/SectionHeading'
import { site, socialLinks } from '../data/site'

const socialIcons = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube,
}

const faqs = [
  {
    question: 'Do you take bulk orders?',
    answer:
      'Yes. Corporate gifting, events and return gifts are a regular part of what we do. Share the quantity and the date you are working towards so we can confirm what is practical.',
  },
  {
    question: 'Can I send my own artwork?',
    answer:
      'Yes. Vector artwork is ideal for cutting, but send whatever you have — a logo file, a photo, a sketch or a reference. We will tell you how well it will translate.',
  },
  {
    question: 'How is pricing worked out?',
    answer:
      'It depends on the material, size, quantity and finish. Send us the details of what you have in mind and we will prepare a quote for that brief.',
  },
  {
    question: 'How long will my order take?',
    answer:
      'It varies with the process and the quantity involved. Once we understand the brief, we will confirm a timeline with you before you commit.',
  },
  {
    question: 'Will I see a proof before production?',
    answer:
      'Where a layout needs approval, we will confirm the design with you before production begins. Ask us about proofs when you send your enquiry.',
  },
  {
    question: 'Can I collect my order?',
    answer:
      'Collection and handover details are confirmed with each order. Let us know where you are based and we can discuss the practical options when you enquire.',
  },
]

export function ContactPage() {
  return (
    <>
      <PageMeta path="/contact-us" />

      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Tell us what you&apos;re <span className="text-brand-red">thinking</span>
          </>
        }
        description="A name, a logo, an occasion or a rough idea — send it over. We will reply with a practical next step."
        breadcrumbs={[{ label: 'Contact Us' }]}
        align="center"
      />

      <section className="section-pad">
        <div className="container-site grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <ContactForm />

          <aside className="min-w-0 space-y-5">
            <div className="rounded-2xl bg-navy p-6 text-white sm:p-7">
              <h2 className="text-lg font-bold text-white">Studio details</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-blue-100">
                The quickest way to reach us is by phone or email.
              </p>

              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="flex items-start gap-3 text-blue-50 transition hover:text-white"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-brand-red">
                      <Phone size={16} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-blue-200">
                        Phone
                      </span>
                      <span className="mt-0.5 block font-semibold">{site.phone}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-start gap-3 break-words text-blue-50 transition hover:text-white"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-brand-red">
                      <Mail size={16} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-blue-200">
                        Email
                      </span>
                      <span className="mt-0.5 block break-words font-semibold text-[0.8rem] sm:text-sm">
                        {site.email.split('@')[0]}@<wbr />
                        {site.email.split('@')[1]}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-start gap-3 text-blue-50 transition hover:text-white"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-brand-red">
                      <MapPin size={16} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-blue-200">
                        Studio
                      </span>
                      <span className="mt-0.5 block font-semibold">
                        {site.address.line1}
                        <br />
                        {site.address.line2}
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1 text-[0.7rem] font-bold text-blue-200">
                        Open in Maps <ArrowUpRight size={12} aria-hidden="true" />
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-blue-50">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-brand-red">
                    <Clock size={16} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-blue-200">
                      Hours
                    </span>
                    <span className="mt-0.5 block font-semibold">{site.hours}</span>
                  </span>
                </li>
              </ul>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-blue-200">
                  Follow the studio
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socialLinks.map((social) => {
                    const SocialIcon = socialIcons[social.name]
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${site.name} on ${social.name}`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-blue-100 transition hover:border-brand-red hover:bg-brand-red hover:text-white"
                      >
                        <SocialIcon size={15} aria-hidden="true" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-brand-red-strong">
                Before you write
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                <li>What you would like made</li>
                <li>An approximate quantity</li>
                <li>The date you are working towards</li>
                <li>Any artwork, logo or reference</li>
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                These details help us reply with something useful rather than a list of questions.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-surface section-pad">
        <div className="container-site max-w-4xl">
          <SectionHeading
            eyebrow="Common questions"
            title="A few things people ask"
            description="If your question is not here, send it with your enquiry — we are happy to answer it directly."
            align="center"
          />

          <div className="mt-9 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-line bg-white p-5 shadow-card open:shadow-card-hover"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-navy marker:hidden">
                  {faq.question}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-brand-blue transition group-open:rotate-45 group-open:border-brand-red group-open:text-brand-red-strong">
                    <span className="text-lg leading-none" aria-hidden="true">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
