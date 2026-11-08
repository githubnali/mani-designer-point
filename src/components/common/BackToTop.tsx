import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  const handleClick = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-5 right-5 z-30 grid h-11 w-11 place-items-center rounded-full bg-brand-red-strong text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-red-dark sm:bottom-6 sm:right-6"
    >
      <ArrowUp size={19} aria-hidden="true" />
    </button>
  )
}
