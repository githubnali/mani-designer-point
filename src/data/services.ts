import type { Service } from '../types'
import { img } from './images'

export const services: Service[] = [
  {
    slug: 'printing-services',
    name: 'Printing Services',
    path: '/services/printing-services',
    description: 'High-quality printing for business, events and everyday brand needs.',
    longDescription:
      'From visiting cards and brochures to banners, stickers and promotional material, we help you print the pieces your business or occasion needs.',
    image: img.printingPress,
    features: ['Visiting cards', 'Banners & posters', 'Stickers & labels', 'Brochures & flyers'],
  },
  {
    slug: 'laser-cutting',
    name: 'Laser Cutting',
    path: '/services/laser-cutting-engraving',
    description: 'Precision cutting for acrylic, MDF and wood.',
    longDescription:
      'Clean shapes, lettering and intricate cut-outs in acrylic, MDF and wood — ideal for signage, décor, gifts and product components.',
    image: img.laserMachine,
    features: ['Acrylic cutting', 'MDF & wood cutting', 'Custom shapes', 'Lettering & motifs'],
  },
  {
    slug: 'laser-engraving',
    name: 'Laser Engraving',
    path: '/services/laser-cutting-engraving',
    description: 'Detailed engraving that adds a lasting personal touch.',
    longDescription:
      'Add names, dates, logos and artwork to acrylic, MDF and wood with crisp, permanent engraving that suits both gifting and branding.',
    image: img.engravingHands,
    features: ['Names & dates', 'Logos & branding', 'Photo engraving', 'Decorative patterns'],
  },
]

