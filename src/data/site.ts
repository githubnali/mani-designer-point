import type { NavItem, SocialLink } from '../types'

/**
 * Central business configuration.
 *
 * Remaining launch configuration includes the domain, email, hours and social profile URLs.
 */
export const site = {
  name: 'Mani Designer Point',
  tagline: 'Design | Print | Service',
  legalName: 'Mani Designer Point',
  shortDescription:
    'Customised products, corporate gifting, printing and laser cutting & engraving.',
  description:
    'Mani Designer Point creates customised acrylic and wooden products, corporate gifts, printing and precision laser cutting and engraving for individuals, businesses and events.',
  domain: 'https://manidesignerpoint.com',
  email: 'hello@manidesignerpoint.com',
  phone: '+91 96422 94416',
  phoneHref: '+919642294416',
  whatsapp: null,
  address: {
    line1: 'Shop No. 5-21, Opp. UCO Bank, Near Pillar No. 1540',
    line2: 'Durga Nagar, Krishna Nagar, Dilsukhnagar, Hyderabad, Telangana 500060',
    locality: 'Hyderabad',
    region: 'Telangana',
    postalCode: '500060',
    country: 'IN',
  },
  hours: 'Mon – Sat, 10:00\u00A0AM\u00A0to\u00A07:00\u00A0PM',
  mapsQuery:
    'MANI DESIGNER POINT, Shop No. 5-21, Opp. UCO Bank, Near Pillar No. 1540, Durga Nagar, Krishna Nagar, Dilsukhnagar, Hyderabad, Telangana 500060',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=MANI+DESIGNER+POINT%2C+Shop+No.+5-21%2C+Opp.+UCO+Bank%2C+Near+Pillar+No.+1540%2C+Durga+Nagar%2C+Krishna+Nagar%2C+Dilsukhnagar%2C+Hyderabad%2C+Telangana+500060',
} as const

export const socialLinks: SocialLink[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/' },
  { name: 'Facebook', href: 'https://www.facebook.com/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { name: 'YouTube', href: 'https://www.youtube.com/' },
]

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'All Products', href: '/products' },
      { label: 'Acrylic Products', href: '/products/acrylic-products' },
      { label: 'MDF & Wooden Products', href: '/products/mdf-wooden-products' },
      { label: 'Corporate Gifting', href: '/products/corporate-gifting' },
      { label: 'Customised Gifts', href: '/products/customised-gifts' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Printing Services', href: '/services/printing-services' },
      { label: 'Laser Cutting & Engraving', href: '/services/laser-cutting-engraving' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
]

export const contactInterests = [
  'Acrylic Products',
  'MDF & Wooden Products',
  'Corporate Gifting',
  'Customised Gifts',
  'Printing Services',
  'Laser Cutting & Engraving',
  'Something else',
] as const

export const quoteHref = '/contact-us'
