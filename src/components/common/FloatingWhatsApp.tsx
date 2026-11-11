import { quoteHref } from '../../data/site'
import { WhatsAppIcon } from './WhatsAppIcon'

export function FloatingWhatsApp() {
  return (
    <a
      href={quoteHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mani Designer Point on WhatsApp (opens in a new tab)"
      title="Chat on WhatsApp"
      className="fixed right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#128C7E] text-white shadow-lg transition-colors hover:bg-[#075E54] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#128C7E] sm:right-6"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
