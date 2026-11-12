import type { CategorySlug, Product } from '../types'

// One record per product; collections let it appear in multiple relevant categories.
export const products: Product[] = [
  {
    "slug": "qr-code-stand",
    "name": "QR Stands",
    "category": "acrylic-products",
    "collections": [
      "corporate-gifting"
    ],
    "description": "Custom QR stands for payment links, menus and business information.",
    "icon": "qr",
    "featured": true
  },
  {
    "slug": "trophies",
    "name": "Trophies",
    "category": "acrylic-products",
    "collections": [
      "corporate-gifting"
    ],
    "description": "Trophies for competitions, celebrations and recognition. Ask us about material and finish options.",
    "icon": "trophy",
    "featured": true
  },
  {
    "slug": "awards",
    "name": "Awards",
    "category": "acrylic-products",
    "collections": [
      "corporate-gifting"
    ],
    "description": "Personalised awards with names, event details or company branding. Material and finish are confirmed with your quote.",
    "icon": "award",
    "featured": false
  },
  {
    "slug": "acrylic-keychains",
    "name": "Acrylic Keychains",
    "category": "acrylic-products",
    "collections": [
      "customised-gifts",
      "corporate-gifting"
    ],
    "description": "Acrylic keychains personalised with names, logos or a design for your occasion.",
    "icon": "key",
    "featured": true
  },
  {
    "slug": "pin-badges",
    "name": "Pin Badges",
    "category": "acrylic-products",
    "collections": [
      "corporate-gifting"
    ],
    "description": "Custom pin badges for teams, events and promotions. Share your design and preferred size.",
    "icon": "pin-badge",
    "featured": false
  },
  {
    "slug": "magnetic-badges",
    "name": "Magnetic Badges",
    "category": "acrylic-products",
    "collections": [
      "corporate-gifting"
    ],
    "description": "Magnetic badges for staff names, branding and event identification.",
    "icon": "magnetic-badge",
    "featured": false
  },
  {
    "slug": "acrylic-id-cards",
    "name": "Acrylic ID Cards",
    "category": "acrylic-products",
    "collections": [
      "corporate-gifting"
    ],
    "description": "Acrylic identification cards customised with your organisation and individual details.",
    "icon": "id",
    "featured": false
  },
  {
    "slug": "acrylic-name-plate",
    "name": "Name Plates",
    "category": "acrylic-products",
    "collections": [],
    "description": "Personalised name plates for desks, doors and reception areas. Discuss the material and layout with us.",
    "image": { base: "/images/name-plate", alt: "Sample clear acrylic desk name plate with YOUR NAME lettering on a navy base", width: 1280, height: 960 },
    "featured": true
  },
  {
    "slug": "acrylic-name-logos",
    "name": "Acrylic Name Logos",
    "category": "acrylic-products",
    "collections": [
      "corporate-gifting"
    ],
    "description": "Custom acrylic names and logos for business displays, interiors and occasions.",
    "icon": "logo",
    "featured": false
  },
  {
    "slug": "wooden-keychain",
    "name": "Wooden Keychains",
    "category": "mdf-wooden-products",
    "collections": [
      "customised-gifts",
      "corporate-gifting"
    ],
    "description": "Wooden keychains customised with names, initials or branding for personal and bulk gifting.",
    "icon": "key",
    "featured": true
  },
  {
    "slug": "wooden-led-lamp",
    "name": "Wooden LED Lamp",
    "category": "mdf-wooden-products",
    "collections": [
      "customised-gifts"
    ],
    "description": "A wooden LED lamp for a thoughtful gift or a personal corner. Ask us about available designs and customisation.",
    "icon": "lamp",
    "featured": true
  },
  {
    "slug": "metal-keychains",
    "name": "Metal Keychains",
    "category": "corporate-gifting",
    "collections": [
      "customised-gifts"
    ],
    "description": "Metal keychains for everyday use, team gifts and branded giveaways.",
    "icon": "key",
    "featured": false
  },
  {
    "slug": "t-shirt-printing",
    "name": "T-shirt Printing",
    "category": "customised-gifts",
    "collections": [
      "corporate-gifting"
    ],
    "description": "Print your artwork, message or logo on T-shirts for individuals, teams and events.",
    "icon": "shirt",
    "featured": true
  },
  {
    "slug": "mug-printing",
    "name": "Mug Printing",
    "category": "customised-gifts",
    "collections": [
      "corporate-gifting"
    ],
    "description": "Personalised mugs with names, photos, messages or company branding.",
    "icon": "mug",
    "featured": true
  },
  {
    "slug": "cap-printing",
    "name": "Cap Printing",
    "category": "customised-gifts",
    "collections": [
      "corporate-gifting"
    ],
    "description": "Custom printed caps for teams, promotions, events and personal gifting.",
    "icon": "cap",
    "featured": false
  }
]

export const featuredProducts = products.filter((product) => product.featured)

export function isProductInCategory(product: Product, category: CategorySlug): boolean {
  return product.category === category || Boolean(product.collections?.includes(category))
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((product) => isProductInCategory(product, category))
}
