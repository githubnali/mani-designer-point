import type { GalleryCategory, GalleryItem } from '../types'
import { img } from './images'

export const galleryItems: GalleryItem[] = [
  {
    id: 'acrylic-award-display',
    title: 'Acrylic Award Display',
    category: 'Acrylic',
    image: img.acrylicTrophy,
  },
  {
    id: 'clear-acrylic-stand',
    title: 'Clear Acrylic Stand',
    category: 'Acrylic',
    image: img.acrylicStand,
  },
  {
    id: 'acrylic-photo-block',
    title: 'Acrylic Photo Block',
    category: 'Acrylic',
    image: img.acrylicFrame,
  },
  {
    id: 'custom-acrylic-display',
    title: 'Custom Acrylic Display',
    category: 'Acrylic',
    image: img.acrylicDisplay,
  },
  {
    id: 'hand-finished-wood',
    title: 'Hand-Finished Wood',
    category: 'Wooden',
    image: img.woodworking,
  },
  {
    id: 'carved-decorative-panel',
    title: 'Carved Decorative Panel',
    category: 'Wooden',
    image: img.woodCarving,
  },
  {
    id: 'wooden-frame-collection',
    title: 'Wooden Frame Collection',
    category: 'Wooden',
    image: img.woodFrames,
  },
  {
    id: 'framed-portrait-gift',
    title: 'Framed Portrait Gift',
    category: 'Wooden',
    image: img.framedPortrait,
  },
  {
    id: 'print-studio',
    title: 'Inside the Print Studio',
    category: 'Printing',
    image: img.printingPress,
  },
  {
    id: 'business-card-run',
    title: 'Business Card Run',
    category: 'Printing',
    image: img.printingCards,
  },
  {
    id: 'screen-printed-stationery',
    title: 'Screen Printed Stationery',
    category: 'Printing',
    image: img.printingScreen,
  },
  {
    id: 'printed-brochures',
    title: 'Printed Brochures',
    category: 'Printing',
    image: img.magazine,
  },
  {
    id: 'laser-engraving-detail',
    title: 'Laser Engraving Detail',
    category: 'Laser',
    image: img.laserMachine,
  },
  {
    id: 'cnc-cutting',
    title: 'CNC Cutting',
    category: 'Laser',
    image: img.cncMachine,
  },
  {
    id: 'hand-finished-engraving',
    title: 'Hand-Finished Engraving',
    category: 'Laser',
    image: img.engravingHands,
  },
  {
    id: 'corporate-gift-set',
    title: 'Corporate Gift Set',
    category: 'Corporate Gifting',
    image: img.giftHand,
  },
  {
    id: 'branded-drinkware',
    title: 'Branded Drinkware',
    category: 'Corporate Gifting',
    image: img.tumblers,
  },
  {
    id: 'desk-accessories',
    title: 'Desk Accessories',
    category: 'Corporate Gifting',
    image: img.deskAccessories,
  },
]

export const galleryCategories: Array<'All' | GalleryCategory> = [
  'All',
  'Acrylic',
  'Wooden',
  'Printing',
  'Laser',
  'Corporate Gifting',
]

export const homeGalleryItems = [
  'clear-acrylic-stand',
  'carved-decorative-panel',
  'corporate-gift-set',
  'laser-engraving-detail',
  'framed-portrait-gift',
  'business-card-run',
].map((id) => galleryItems.find((item) => item.id === id)!).filter(Boolean)
