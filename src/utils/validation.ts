export type ContactFormValues = {
  name: string
  email: string
  phone: string
  interest: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  const name = values.name.trim()
  if (name.length < 2) errors.name = 'Please enter your full name.'
  else if (name.length > 80) errors.name = 'Please keep your name under 80 characters.'

  const email = values.email.trim()
  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.'
  else if (email.length > 120) errors.email = 'Please keep your email under 120 characters.'

  const phone = values.phone.trim()
  const digits = phone.replace(/\D/g, '')
  if (!phone) errors.phone = 'Please enter your phone number.'
  else if (!/^\+?[\d\s()-]{10,18}$/.test(phone) || digits.length < 10 || digits.length > 15) {
    errors.phone = 'Please enter a valid phone number (10–15 digits).'
  }

  if (!values.interest) errors.interest = 'Please choose a product or service.'

  const message = values.message.trim()
  if (message.length < 10) errors.message = 'Please tell us a little more (at least 10 characters).'
  else if (message.length > 2000) errors.message = 'Please keep your message under 2,000 characters.'

  return errors
}
