import type { ProductCategory } from '../types'
import { img } from './images'

export const productCategories: ProductCategory[] = [
  {
    slug: 'acrylic-products',
    name: 'Acrylic Products',
    filterLabel: 'Acrylic',
    description: 'Name plates, QR stands, badges and awards with a clean, modern finish.',
    longDescription:
      'Clear and coloured acrylic products for desks, reception areas, events and gifting. Each piece is cut, engraved and finished to suit your design.',
    image: img.acrylicStand,
  },
  {
    slug: 'mdf-wooden-products',
    name: 'MDF & Wooden Products',
    filterLabel: 'MDF & Wooden',
    description: 'Warm, natural pieces for gifting, interiors and everyday use.',
    longDescription:
      'From engraved keychains to wall art and desk organisers, our wooden range pairs natural textures with precise laser detailing.',
    image: img.woodworking,
  },
  {
    slug: 'corporate-gifting',
    name: 'Corporate Gifting',
    filterLabel: 'Corporate Gifting',
    description: 'Thoughtful branded gifts for teams, clients and events.',
    longDescription:
      'Build a gift set around your brand with drinkware, diaries, pens, keychains and desk accessories. Suitable for individual and bulk requirements.',
    image: img.giftHand,
  },
  {
    slug: 'customised-gifts',
    name: 'Customised Gifts',
    filterLabel: 'Customised Gifts',
    description: 'Personal gifts for birthdays, weddings, anniversaries and return gifts.',
    longDescription:
      'Add a name, date, photo or message to create a gift that feels truly personal. Choose from acrylic, wood, print and keepsake options.',
    image: img.giftRedFlatlay,
  },
]

export function getCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug)
}
