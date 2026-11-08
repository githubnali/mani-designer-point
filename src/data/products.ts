import type { CategorySlug, Product } from '../types'
import { img } from './images'

export const products: Product[] = [
  // Acrylic
  {
    slug: 'acrylic-name-plate',
    name: 'Acrylic Name Plate',
    category: 'acrylic-products',
    description: 'Crisp, freestanding name plates for desks, reception counters and cabins.',
    image: img.acrylicStand,
    featured: true,
    popular: true,
  },
  {
    slug: 'qr-code-stand',
    name: 'QR Code Stand',
    category: 'acrylic-products',
    description: 'A clear acrylic stand that puts your QR code, menu or payment link within easy reach.',
    image: img.acrylicFrame,
    featured: true,
    popular: true,
  },
  {
    slug: 'acrylic-badge',
    name: 'Acrylic Badge',
    category: 'acrylic-products',
    description: 'Lightweight custom badges for events, teams and visitor identification.',
    image: img.printingCards,
  },
  {
    slug: 'acrylic-photo-frame',
    name: 'Acrylic Photo Frame',
    category: 'acrylic-products',
    description: 'A modern way to display favourite photos, certificates and keepsakes.',
    image: img.acrylicFrame,
    popular: true,
  },
  {
    slug: 'acrylic-display-stand',
    name: 'Acrylic Display Stand',
    category: 'acrylic-products',
    description: 'Minimal stands for showcasing products, notices and table cards.',
    image: img.acrylicDisplay,
    popular: true,
  },
  {
    slug: 'acrylic-trophy',
    name: 'Acrylic Trophy',
    category: 'acrylic-products',
    description: 'Custom awards for recognition moments, designed to suit your event.',
    image: img.acrylicTrophy,
  },

  // MDF & Wooden
  {
    slug: 'wooden-keychain',
    name: 'Wooden Keychain',
    category: 'mdf-wooden-products',
    description: 'Laser-engraved keychains in warm wood tones, ideal for gifting.',
    image: img.keys,
    featured: true,
    popular: true,
  },
  {
    slug: 'wooden-wall-art',
    name: 'Wooden Wall Art',
    category: 'mdf-wooden-products',
    description: 'Layered and engraved wall pieces that add character to a room.',
    image: img.woodenWallArt,
  },
  {
    slug: 'wooden-clock',
    name: 'Wooden Clock',
    category: 'mdf-wooden-products',
    description: 'Custom wall and desk clocks with engraved botanical and geometric details.',
    image: img.woodenClock,
  },
  {
    slug: 'wooden-photo-frame',
    name: 'Wooden Photo Frame',
    category: 'mdf-wooden-products',
    description: 'Natural wood frames for photos, quotes and small keepsakes.',
    image: img.framedPortrait,
  },
  {
    slug: 'decorative-panel',
    name: 'Decorative Panel',
    category: 'mdf-wooden-products',
    description: 'Intricate cut and engraved panels for interiors and gifting.',
    image: img.woodCarving,
  },
  {
    slug: 'desk-organiser',
    name: 'Desk Organiser',
    category: 'mdf-wooden-products',
    description: 'Practical wooden organisers for pens, cards and everyday essentials.',
    image: img.deskOrganizer,
  },

  // Corporate Gifting
  {
    slug: 'branded-bottles',
    name: 'Branded Bottles',
    category: 'corporate-gifting',
    description: 'Reusable bottles finished with your company name or logo.',
    image: img.bottles,
    featured: true,
  },
  {
    slug: 'corporate-diaries',
    name: 'Corporate Diaries',
    category: 'corporate-gifting',
    description: 'Premium notebooks and diaries for teams, clients and events.',
    image: img.notebook,
  },
  {
    slug: 'premium-pens',
    name: 'Premium Pens',
    category: 'corporate-gifting',
    description: 'Elegant pens that make a practical, memorable corporate gift.',
    image: img.pen,
  },
  {
    slug: 'metal-keychains',
    name: 'Metal Keychains',
    category: 'corporate-gifting',
    description: 'Durable keychains with clean branding for everyday use.',
    image: img.keychain,
  },
  {
    slug: 'corporate-gift-set',
    name: 'Corporate Gift Set',
    category: 'corporate-gifting',
    description: 'Curated sets combining desk, drinkware and stationery essentials.',
    image: img.giftHand,
    featured: true,
  },
  {
    slug: 'desk-accessories',
    name: 'Desk Accessories',
    category: 'corporate-gifting',
    description: 'Useful desk pieces that keep your brand close at hand.',
    image: img.deskAccessories,
  },

  // Customised Gifts
  {
    slug: 'personalised-photo-frame',
    name: 'Personalised Photo Frame',
    category: 'customised-gifts',
    description: 'Photo frames made personal with names, dates and engraved messages.',
    image: img.framedPortrait,
    featured: true,
  },
  {
    slug: 'engraved-keychain',
    name: 'Engraved Keychain',
    category: 'customised-gifts',
    description: 'A small, thoughtful gift with names, initials or a special date.',
    image: img.keys,
  },
  {
    slug: 'custom-mugs',
    name: 'Custom Mugs',
    category: 'customised-gifts',
    description: 'Printed mugs for birthdays, teams, announcements and everyday cheer.',
    image: img.mug,
    featured: true,
  },
  {
    slug: 'wooden-plaque',
    name: 'Wooden Plaque',
    category: 'customised-gifts',
    description: 'Engraved plaques for milestones, thank-yous and recognition.',
    image: img.woodCarving,
  },
  {
    slug: 'acrylic-standee',
    name: 'Acrylic Standee',
    category: 'customised-gifts',
    description: 'A clear, freestanding keepsake for desks, events and gifting.',
    image: img.acrylicDisplay,
  },
  {
    slug: 'gift-boxes',
    name: 'Gift Boxes',
    category: 'customised-gifts',
    description: 'Thoughtfully packaged gift boxes ready for your occasion.',
    image: img.heroGiftBox,
  },
]

export const featuredProducts = products.filter((product) => product.featured)

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((product) => product.category === category)
}

