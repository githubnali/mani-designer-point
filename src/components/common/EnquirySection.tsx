import { whatsappQuoteHref } from '../../data/site'
import { ButtonLink } from './Button'
import { ContactForm } from './ContactForm'

type EnquirySectionProps = {
  title?: string
  description?: string
  interest?: string
}

export function EnquirySection({
  title = 'Tell us what you have in mind',
  description = 'Planning a personal gift, a team order or something completely custom? Share your idea and we will help you work out the details.',
  interest = '',
}: EnquirySectionProps) {
  return (
    <section className="section-pad bg-surface" aria-label="Project enquiry">
      <div className="container-site grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="lg:pt-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-red-strong">Made around your idea</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">{title}</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">{description}</p>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">A rough quantity, preferred size and the date you need it help us give you a useful reply.</p>
          <div className="mt-8 border-t border-line pt-6">
            <p className="mb-3 text-sm font-bold text-navy">Prefer a conversation?</p>
            <ButtonLink to={whatsappQuoteHref(interest || undefined)} variant="outline">Chat on WhatsApp</ButtonLink>
            <p className="mt-3 text-xs leading-relaxed text-muted">You can share reference photos or artwork in the chat.</p>
          </div>
        </div>
        <ContactForm key={interest} defaultInterest={interest} />
      </div>
    </section>
  )
}
