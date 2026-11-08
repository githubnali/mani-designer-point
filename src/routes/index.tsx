import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import { normalizePath } from '../data/seo'

type PageModule = { default: ComponentType }

const loaders = {
  '/': () => import('../pages/HomePage'),
  '/products': () => import('../pages/ProductsPage'),
  '/products/acrylic-products': () => import('../pages/categories/AcrylicProductsPage'),
  '/products/mdf-wooden-products': () => import('../pages/categories/MdfWoodenProductsPage'),
  '/products/corporate-gifting': () => import('../pages/categories/CorporateGiftingPage'),
  '/products/customised-gifts': () => import('../pages/categories/CustomisedGiftsPage'),
  '/services': () => import('../pages/ServicesPage'),
  '/services/printing-services': () => import('../pages/PrintingServicesPage'),
  '/services/laser-cutting-engraving': () => import('../pages/LaserCuttingEngravingPage'),
  '/gallery': () => import('../pages/GalleryPage'),
  '/about-us': () => import('../pages/AboutPage'),
  '/contact-us': () => import('../pages/ContactPage'),
} satisfies Record<string, () => Promise<PageModule>>

export type PageRoute = {
  path: string
  load: () => Promise<PageModule>
  Lazy: LazyExoticComponent<ComponentType>
}

export const pageRoutes: PageRoute[] = Object.entries(loaders).map(([path, load]) => ({
  path,
  load,
  Lazy: lazy(load),
}))

/**
 * Route components resolved before hydration. Rendering the already-loaded
 * component for the current URL keeps the prerendered markup and the first
 * client render identical, avoiding a Suspense fallback flash.
 */
const resolvedComponents = new Map<string, ComponentType>()

export async function preloadRoute(pathname: string) {
  const path = normalizePath(pathname)
  if (resolvedComponents.has(path)) return

  const route = pageRoutes.find((item) => item.path === path)
  if (!route) return

  const module = await route.load()
  resolvedComponents.set(path, module.default)
}

export function getResolvedComponent(pathname: string) {
  return resolvedComponents.get(normalizePath(pathname))
}
