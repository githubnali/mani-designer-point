import type { PageMeta } from '../types'
import { site } from './site'

export const pageMetaList: PageMeta[] = [
  {
    path: '/',
    title: 'Mani Designer Point | Custom Products, Printing & Laser Engraving',
    description:
      'Customised acrylic and wooden products, corporate gifting, printing and laser cutting & engraving. Bring your idea to life with Mani Designer Point.',
  },
  {
    path: '/products',
    title: 'Our Products | Customised Acrylic, Wooden & Corporate Gifts',
    description:
      'Explore acrylic products, MDF and wooden gifts, corporate gifting and personalised gifts from Mani Designer Point. Enquire about a custom order.',
  },
  {
    path: '/products/acrylic-products',
    title: 'Acrylic Products | Keychains, QR Stands, Badges & Awards',
    description:
      'Explore acrylic keychains, QR stands, ID cards and name logos, plus badges, name plates, trophies and awards from Mani Designer Point.',
  },
  {
    path: '/products/mdf-wooden-products',
    title: 'MDF & Wooden Products | Wooden Keychains & LED Lamps',
    description:
      'Explore personalised wooden keychains and wooden LED lamps from Mani Designer Point. Enquire about designs, quantities and customisation.',
  },
  {
    path: '/products/corporate-gifting',
    title: 'Corporate Gifting | Branded Gifts & Gift Sets',
    description:
      'Branded keychains, trophies, awards, printed mugs, T-shirts and caps for teams, clients and events. Enquire with Mani Designer Point.',
  },
  {
    path: '/products/customised-gifts',
    title: 'Customised Gifts | Personalised Gifts for Every Occasion',
    description:
      'Personalised keychains, printed mugs, T-shirts, caps and wooden LED lamps for birthdays, occasions and everyday gifting.',
  },
  {
    path: '/services',
    title: 'Our Services | Printing, Laser Cutting & Engraving',
    description:
      'Explore printing services, laser cutting and laser engraving for acrylic, MDF and wood at Mani Designer Point in Hyderabad.',
  },
  {
    path: '/services/printing-services',
    title: 'Paper & Personalised Printing | Cards, Catalogues, Mugs & T-shirts',
    description:
      'Visiting cards, bill books, brochures, catalogues, menus, certificates, stickers and labels, plus T-shirt, mug and cap printing at Mani Designer Point.',
  },
  {
    path: '/services/laser-cutting-engraving',
    title: 'Laser Cutting & Engraving | Acrylic, MDF & Wood',
    description:
      'Custom laser cutting and engraving in acrylic, MDF and wood for signage, gifts, décor and product components. Enquire with Mani Designer Point.',
  },
  {
    path: '/gallery',
    title: 'Our Work | Custom Products & Printing Gallery',
    description:
      'Browse a selection of acrylic, wooden, printing, laser and corporate gifting work from Mani Designer Point.',
  },
  {
    path: '/about-us',
    title: 'About Us | Mani Designer Point',
    description:
      'Learn about Mani Designer Point, our capabilities in custom products, printing and laser work, and the way we approach every brief.',
  },
  {
    path: '/contact-us',
    title: 'Contact Us | Get a Quote | Mani Designer Point',
    description:
      'Contact Mani Designer Point for customised products, corporate gifting, printing and laser cutting or engraving. Send your enquiry online.',
  },
]

export const pageMeta: Record<string, PageMeta> = Object.fromEntries(
  pageMetaList.map((meta) => [meta.path, meta]),
)

export function normalizePath(pathname: string): string {
  const withoutQuery = pathname.split('?')[0].split('#')[0]
  if (!withoutQuery || withoutQuery === '/') return '/'
  return withoutQuery.replace(/\/+$/, '')
}

export function getPageMeta(pathname: string): PageMeta {
  return pageMeta[normalizePath(pathname)] ?? pageMeta['/']
}

export function canonicalUrl(pathname: string): string {
  const path = normalizePath(pathname)
  return `${site.domain}${path === '/' ? '/' : path}`
}
