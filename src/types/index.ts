export type ImageAsset = {
  base: string
  alt: string
  width: number
  height: number
}

export type CategorySlug =
  | 'acrylic-products'
  | 'mdf-wooden-products'
  | 'corporate-gifting'
  | 'customised-gifts'

export type ProductCategory = {
  slug: CategorySlug
  name: string
  filterLabel: string
  description: string
  longDescription: string
  image: ImageAsset
}

export type Product = {
  slug: string
  name: string
  category: CategorySlug
  description: string
  image: ImageAsset
  featured?: boolean
  popular?: boolean
}

export type Service = {
  slug: string
  name: string
  path: string
  description: string
  longDescription: string
  image: ImageAsset
  features: string[]
}

export type GalleryCategory = 'Acrylic' | 'Wooden' | 'Printing' | 'Laser' | 'Corporate Gifting'

export type GalleryItem = {
  id: string
  title: string
  category: GalleryCategory
  image: ImageAsset
}

export type PageMeta = {
  path: string
  title: string
  description: string
}

export type SocialLink = {
  name: 'Instagram' | 'Facebook' | 'LinkedIn' | 'YouTube'
  href: string
}

export type NavChild = {
  label: string
  href: string
}

export type NavItem = {
  label: string
  href: string
  children?: NavChild[]
}
