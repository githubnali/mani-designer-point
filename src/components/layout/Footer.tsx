import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navigation, quoteHref, site, socialLinks } from '../../data/site'
import { Logo } from '../common/Logo'
import { WhatsAppIcon } from '../common/WhatsAppIcon'

const socialIcons = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube,
}

const productLinks = [
  { label: 'All Products', href: '/products' },
  { label: 'Acrylic Products', href: '/products/acrylic-products' },
  { label: 'MDF & Wooden Products', href: '/products/mdf-wooden-products' },
  { label: 'Corporate Gifting', href: '/products/corporate-gifting' },
  { label: 'Customised Gifts', href: '/products/customised-gifts' },
]

const serviceLinks = [
  { label: 'All Services', href: '/services' },
  { label: 'Printing Services', href: '/services/printing-services' },
  { label: 'Laser Cutting & Engraving', href: '/services/laser-cutting-engraving' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-blue-100">
      <div className="container-site py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-blue-100/90">
              Customised products, corporate gifting, printing and laser cutting & engraving — made around
              your idea, brand or occasion.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const SocialIcon = socialIcons[social.name]
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${site.name} on ${social.name}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-blue-100 transition hover:border-brand-red hover:bg-brand-red hover:text-white focus-visible:outline-white"
                  >
                    <SocialIcon size={17} aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">Quick Links</h2>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-blue-100/85 transition hover:text-white focus-visible:outline-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">Our Products</h2>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-blue-100/85 transition hover:text-white focus-visible:outline-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">Services</h2>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-blue-100/85 transition hover:text-white focus-visible:outline-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-white">Contact</h2>
            <ul className="mt-4 space-y-3 text-[0.82rem]">
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-start gap-2.5 text-blue-100/85 transition hover:text-white focus-visible:outline-white"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" />
                  <span>{site.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-2.5 break-words text-blue-100/85 transition hover:text-white focus-visible:outline-white"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" />
                  <span>{site.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-blue-100/85">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-blue-100/85">
                <Clock size={15} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" />
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-blue-100/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold uppercase tracking-[0.16em]">Design | Print | Service</span>
            <a
              href={quoteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-white transition hover:text-brand-red focus-visible:outline-white"
            >
              <WhatsAppIcon size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
