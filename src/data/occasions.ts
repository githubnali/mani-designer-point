import type { ImageAsset } from '../types'
import { img } from './images'

export type Occasion = {
  name: string
  description: string
  image: ImageAsset
}

export const occasions: Occasion[] = [
  {
    name: 'Birthday Gifts',
    description: 'Personalised mugs, keychains and wooden LED lamps for a thoughtful birthday surprise.',
    image: img.mug,
  },
  {
    name: 'Wedding Gifts',
    description: 'Personalised keychains and printed gifts for the couple and their guests.',
    image: img.framedPortrait,
  },
  {
    name: 'Anniversary Gifts',
    description: 'Celebrate milestones with a name, date or message made to last.',
    image: img.giftRedFlatlay,
  },
  {
    name: 'Return Gifts',
    description: 'Small, useful gifts for guests, teams and celebrations — made in quantity.',
    image: img.giftHand,
  },
]
