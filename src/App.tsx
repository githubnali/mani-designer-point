import { Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ScrollToTop } from './components/common/ScrollToTop'
import { Layout } from './components/layout/Layout'
import { NotFoundPage } from './pages/NotFoundPage'
import {
  getResolvedComponent,
  pageRoutes,
  type PageRoute,
} from './routes'

function PageFallback() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-surface"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-9 w-9 animate-spin rounded-full border-[3px] border-brand-blue/20 border-t-brand-blue"
        aria-hidden="true"
      />
      <span className="sr-only">Loading page…</span>
    </div>
  )
}

function RouteView({ route }: { route: PageRoute }) {
  const location = useLocation()
  const Resolved = getResolvedComponent(location.pathname)

  if (Resolved) return <Resolved />

  const LazyPage = route.Lazy
  return <LazyPage />
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {pageRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<RouteView route={route} />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}
