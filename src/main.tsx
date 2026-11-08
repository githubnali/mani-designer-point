import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { normalizePath } from './data/seo'
import { preloadRoute } from './routes'
import './styles/index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element #root was not found.')
}

const root = container

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

/**
 * Only hydrate when the prerendered HTML was generated for this exact route.
 * Unknown URLs (and misconfigured static hosts that fall back to the home
 * page) get a clean client render instead of a hydration mismatch.
 */
function prerenderedForCurrentPath() {
  const marker = document.head.querySelector<HTMLMetaElement>('meta[name="route-path"]')
  return marker?.content === normalizePath(window.location.pathname)
}

async function start() {
  const shouldHydrate = prerenderedForCurrentPath() && root.hasChildNodes()

  if (shouldHydrate) {
    // Load the current route before hydrating so the prerendered HTML is reused.
    await preloadRoute(window.location.pathname).catch(() => undefined)
    hydrateRoot(root, tree)
    return
  }

  root.replaceChildren()
  createRoot(root).render(tree)
}

void start()
