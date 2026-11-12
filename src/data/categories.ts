import type { ProductCategory } from '../types'
import { img } from './images'

export const productCategories: ProductCategory[] = [
  {
    slug: 'acrylic-products',
    name: 'Acrylic Products',
    filterLabel: 'Acrylic',
    description: 'Acrylic keychains, QR stands, ID cards and logos, plus name plates, badges, trophies and awards.',
    longDescription:
      'Explore acrylic keychains, QR stands, ID cards and name logos alongside our name plates, badges, trophies and awards. We confirm materials and finishes with your enquiry.',
    image: img.acrylicStand,
  },
  {
    slug: 'mdf-wooden-products',
    name: 'MDF & Wooden Products',
    filterLabel: 'MDF & Wooden',
    description: 'Wooden keychains and LED lamps for personal gifts and everyday use.',
    longDescription:
      'Personalise a wooden keychain or explore a wooden LED lamp for your space or a special occasion. Share your design, quantity and preferred finish.',
    image: img.woodworking,
  },
  {
    slug: 'corporate-gifting',
    name: 'Corporate Gifting',
    filterLabel: 'Corporate Gifting',
    description: 'Thoughtful branded gifts for teams, clients and events.',
    longDescription:
      'Bring your brand to keychains, awards, mugs, T-shirts and caps. Explore practical gifts and recognition pieces for teams, clients and events.',
    image: img.giftHand,
  },
  {
    slug: 'customised-gifts',
    name: 'Customised Gifts',
    filterLabel: 'Customised Gifts',
    description: 'Personal gifts for birthdays, weddings, anniversaries and return gifts.',
    longDescription:
      'Personalise wooden, metal and acrylic keychains, printed mugs, T-shirts and caps, or a wooden LED lamp. Add your name, artwork or message to suit the occasion.',
    image: img.giftRedFlatlay,
  },
]

export function getCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug)
}
