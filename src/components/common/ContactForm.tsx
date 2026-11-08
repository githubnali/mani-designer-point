import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Send } from 'lucide-react'
import { contactInterests, site } from '../../data/site'
import {
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../../utils/validation'
import { cn } from '../../utils/cn'
import { Button } from './Button'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'local'

const emptyValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
}

const fieldIds: Record<keyof ContactFormValues, string> = {
  name: 'contact-name',
  email: 'contact-email',
  phone: 'contact-phone',
  interest: 'contact-interest',
  message: 'contact-message',
}

/**
 * The enquiry form is delivered by Netlify Forms in production.
 *
 * Netlify only processes the POST on a deployed site. Local previews
 * (localhost or a LAN IP) therefore show an explicit "not delivered" notice
 * instead of a simulated success state.
 */
function isLocalPreview() {
  if (typeof window === 'undefined') return true
  const host = window.location.hostname
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '::1' ||
    host.endsWith('.local') ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(host)
  )
}

export function ContactForm() {
  const [searchParams] = useSearchParams()
  const requestedInterest = searchParams.get('interest') ?? ''
  const initialInterest = (contactInterests as readonly string[]).includes(requestedInterest)
    ? requestedInterest
    : ''

  const [values, setValues] = useState<ContactFormValues>({
    ...emptyValues,
    interest: initialInterest,
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    if (status === 'local' || status === 'error') setStatus('idle')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)

    const errorKeys = Object.keys(nextErrors) as Array<keyof ContactFormValues>
    if (errorKeys.length > 0) {
      document.getElementById(fieldIds[errorKeys[0]])?.focus()
      return
    }

    if (isLocalPreview()) {
      setStatus('local')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        interest: values.interest,
        message: values.message.trim(),
      })

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })

      if (!response.ok) {
        throw new Error(`The form service responded with status ${response.status}.`)
      }

      setStatus('success')
      setValues(emptyValues)
      setErrors({})
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'The enquiry could not be sent. Please try again or email us directly.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white">
          <CheckCircle2 size={24} aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-navy">Thank you — your enquiry has been sent.</h3>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900">
          We have received your details and will get back to you using the email address or phone
          number you provided.
        </p>
        <Button
          variant="outline"
          className="mt-5"
          onClick={() => {
            setStatus('idle')
            setValues({ ...emptyValues, interest: initialInterest })
          }}
        >
          Send another enquiry
        </Button>
      </div>
    )
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      noValidate
      className="min-w-0 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden" aria-hidden="true">
        <label>
          Do not fill this out if you are human:
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy sm:text-2xl">Send an enquiry</h2>
          <p className="mt-1 text-sm text-muted">
            Share a few details and we will get back to you with the next steps.
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-brand-red/10 px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-brand-red-strong sm:inline">
          No obligation
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldIds.name} className="mb-1.5 block text-sm font-bold text-ink">
            Name <span className="text-brand-red-strong">*</span>
          </label>
          <input
            id={fieldIds.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${fieldIds.name}-error` : undefined}
            value={values.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={cn('field-base', errors.name && 'field-error')}
          />
          {errors.name && (
            <p id={`${fieldIds.name}-error`} className="mt-1.5 text-xs font-semibold text-brand-red-strong">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fieldIds.email} className="mb-1.5 block text-sm font-bold text-ink">
            Email <span className="text-brand-red-strong">*</span>
          </label>
          <input
            id={fieldIds.email}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${fieldIds.email}-error` : undefined}
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={cn('field-base', errors.email && 'field-error')}
          />
          {errors.email && (
            <p id={`${fieldIds.email}-error`} className="mt-1.5 text-xs font-semibold text-brand-red-strong">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fieldIds.phone} className="mb-1.5 block text-sm font-bold text-ink">
            Phone <span className="text-brand-red-strong">*</span>
          </label>
          <input
            id={fieldIds.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${fieldIds.phone}-error` : undefined}
            value={values.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            className={cn('field-base', errors.phone && 'field-error')}
          />
          {errors.phone && (
            <p id={`${fieldIds.phone}-error`} className="mt-1.5 text-xs font-semibold text-brand-red-strong">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fieldIds.interest} className="mb-1.5 block text-sm font-bold text-ink">
            I&apos;m interested in <span className="text-brand-red-strong">*</span>
          </label>
          <select
            id={fieldIds.interest}
            name="interest"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.interest)}
            aria-describedby={errors.interest ? `${fieldIds.interest}-error` : undefined}
            value={values.interest}
            onChange={handleChange}
            className={cn('field-base', errors.interest && 'field-error')}
          >
            <option value="">Select a product or service</option>
            {contactInterests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
          {errors.interest && (
            <p
              id={`${fieldIds.interest}-error`}
              className="mt-1.5 text-xs font-semibold text-brand-red-strong"
            >
              {errors.interest}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={fieldIds.message} className="mb-1.5 block text-sm font-bold text-ink">
            Message <span className="text-brand-red-strong">*</span>
          </label>
          <textarea
            id={fieldIds.message}
            name="message"
            rows={5}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${fieldIds.message}-error` : `${fieldIds.message}-hint`}
            value={values.message}
            onChange={handleChange}
            placeholder="Tell us what you would like to make, the quantity you have in mind and any dates."
            className={cn('field-base resize-y', errors.message && 'field-error')}
          />
          <div className="mt-1.5 flex items-start justify-between gap-3">
            {errors.message ? (
              <p
                id={`${fieldIds.message}-error`}
                className="text-xs font-semibold text-brand-red-strong"
              >
                {errors.message}
              </p>
            ) : (
              <p id={`${fieldIds.message}-hint`} className="text-xs text-muted">
                Include a name, logo, photo or message if you have one in mind.
              </p>
            )}
            <span className="shrink-0 text-xs tabular-nums text-muted/80">
              {values.message.length}/2000
            </span>
          </div>
        </div>
      </div>

      {status === 'local' && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
        >
          <p className="flex items-start gap-2 font-bold">
            <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            This form is not connected in local preview.
          </p>
          <p className="mt-1.5 leading-relaxed">
            Nothing was sent. Enquiry delivery is only active on the deployed Netlify site. For now,
            please email{' '}
            <a className="font-bold underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>{' '}
            or call{' '}
            <a className="font-bold underline" href={`tel:${site.phoneHref}`}>
              {site.phone}
            </a>
            .
          </p>
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-950"
        >
          <p className="flex items-start gap-2 font-bold">
            <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            Your enquiry could not be sent.
          </p>
          <p className="mt-1.5 leading-relaxed">
            {errorMessage} Please try again, or contact us directly at{' '}
            <a className="font-bold underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full sm:w-auto">
          {status === 'submitting' ? (
            <>
              <Loader2 size={17} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <Send size={16} aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="text-xs leading-relaxed text-muted">
          Prefer to talk?{' '}
          <a href={`tel:${site.phoneHref}`} className="inline-flex items-center gap-1 font-bold text-brand-blue hover:text-brand-red-strong">
            <Phone size={12} aria-hidden="true" /> Call us
          </a>{' '}
          or{' '}
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1 font-bold text-brand-blue hover:text-brand-red-strong">
            <Mail size={12} aria-hidden="true" /> email
          </a>
          .
        </p>
      </div>

      <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-muted">
        We use the details you share only to respond to this enquiry. Fields marked with an asterisk
        are required.
      </p>
    </form>
  )
}
