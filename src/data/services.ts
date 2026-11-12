import type { Service } from '../types'
import { img } from './images'

export const services: Service[] = [
  {
    slug: 'printing-services',
    name: 'Printing Services',
    path: '/services/printing-services',
    description: 'Paper printing and personalised T-shirt, mug and cap printing.',
    longDescription:
      'From visiting cards, bill books and catalogues to menus, labels and printed gifts, explore our paper and personalised printing range.',
    image: img.printingPress,
    features: ['Business stationery', 'Marketing print', 'Display & labels', 'T-shirts, mugs & caps'],
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

