import type { ReactNode } from 'react'
import { BackToTop } from '../common/BackToTop'
import { FloatingWhatsApp } from '../common/FloatingWhatsApp'
import { Footer } from './Footer'
import { Header } from './Header'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  )
}
