import type { ImageAsset } from '../types'

function asset(base: string, alt: string, width: number, height: number): ImageAsset {
  return { base: `/images/${base}`, alt, width, height }
}

/**
 * Every image is a representative placeholder until the client supplies their
 * own project photography. Source images are free-to-use Pexels photographs;
 * see ASSETS.md for the replacement checklist.
 */
export const img = {
  heroGiftBox: asset(
    'hero-gift-box',
    'Deep red gift box tied with an ivory ribbon on a warm wooden table',
    1280,
    1600,
  ),
  acrylicFrame: asset(
    'acrylic-frame',
    'Clear acrylic photo block and a blank card styled on a white surface',
    1280,
    1280,
  ),
  acrylicStand: asset('acrylic-stand', 'Minimal clear acrylic display stand on a light surface', 1280, 960),
  acrylicDisplay: asset(
    'acrylic-display',
    'Clear acrylic display stand holding a blank card in a bright studio',
    1280,
    960,
  ),
  woodworking: asset(
    'woodworking',
    'Craftsperson hand-planing a piece of light wood at a workbench',
    1280,
    960,
  ),
  woodCarving: asset(
    'wood-carving',
    'Close-up of intricately carved warm wood with leaf and scroll details',
    1280,
    960,
  ),
  woodFrames: asset('wood-frames', 'Gallery wall of wooden picture frames in a warmly lit room', 1280, 960),
  giftHand: asset(
    'gift-hand',
    'Hands presenting a kraft gift box finished with a brown satin ribbon',
    1280,
    960,
  ),
  giftRedFlatlay: asset(
    'gift-red-flatlay',
    'Red gift boxes with delicate ribbon bows arranged on a soft pink background',
    1280,
    960,
  ),
  printingPress: asset(
    'printing-press',
    'Offset printing press in a print studio with stacks of coloured paper',
    1280,
    960,
  ),
  printingCards: asset('printing-cards', 'Blank business cards arranged in a clean minimal layout', 1280, 960),
  printingScreen: asset(
    'printing-screen',
    'Screen printing press producing printed stationery in a workshop',
    1280,
    960,
  ),
  laserMachine: asset(
    'laser-machine',
    'Laser engraving machine cutting a fine pattern with a bright beam',
    1280,
    960,
  ),
  cncMachine: asset('cnc-machine', 'Close-up of a CNC cutting machine shaping a material', 1280, 960),
  engravingHands: asset(
    'engraving-hands',
    'Craftsperson carefully hand-finishing a detailed engraved piece',
    1280,
    960,
  ),
  tumblers: asset('tumblers', 'Two orange insulated tumblers with printed branding on a light surface', 1280, 960),
  notebook: asset('notebook', 'Handmade notebook with a natural paper cover and exposed binding', 1280, 960),
  pen: asset('pen', 'Fountain pen resting on a clean neutral surface', 1280, 960),
  keychain: asset('keychain', 'Metal keyring and keys styled on a dark leather surface', 1280, 960),
  keys: asset('keys', 'Set of keys with coloured tags arranged on a dark desk', 1280, 960),
  deskAccessories: asset(
    'desk-accessories',
    'Minimal desk accessories in warm orange and neutral tones',
    1280,
    960,
  ),
  framedPortrait: asset(
    'framed-portrait',
    'Wooden photo frame holding a framed portrait on a sideboard',
    1280,
    960,
  ),
  mug: asset('mug', 'Personalised ceramic mug with a printed design on a light table', 1280, 960),
  craftWorkshop: asset(
    'craft-workshop',
    'Warm craft workshop with wooden tools and handmade pieces on workbenches',
    1280,
    960,
  ),
  craftHands: asset('craft-hands', 'Hands assembling a handmade craft piece on a work table', 1280, 960),
  bottles: asset('bottles', 'Two reusable insulated bottles in red and teal', 1280, 960),
  magazine: asset(
    'magazine',
    'Stack of printed magazines and brochures with crisp paper edges',
    1280,
    960,
  ),
  woodenClock: asset(
    'wooden-clock',
    'Round wooden wall clock with a delicate engraved botanical pattern',
    1280,
    960,
  ),
  woodenWallArt: asset(
    'wooden-wall-art',
    'Framed laser-cut wooden wall art panel with a geometric mountain design',
    1280,
    960,
  ),
  deskOrganizer: asset(
    'desk-organizer',
    'Wooden desk organiser with trays for stationery and everyday essentials',
    1280,
    960,
  ),
  acrylicTrophy: asset(
    'acrylic-trophy',
    'Two faceted clear acrylic award trophies on a bright pedestal',
    1280,
    960,
  ),
} satisfies Record<string, ImageAsset>
