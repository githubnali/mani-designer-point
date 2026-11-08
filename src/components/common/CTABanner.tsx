import type { ImageAsset } from '../../types'
import { img } from '../../data/images'
import { ButtonLink } from './Button'
import { ResponsiveImage } from './ResponsiveImage'

type CTABannerProps = {
  title: string
  description: string
  buttonLabel?: string
  buttonHref?: string
  image?: ImageAsset
}

export function CTABanner({
  title,
  description,
  buttonLabel = 'Contact Us',
  buttonHref = '/contact-us',
  image = img.giftRedFlatlay,
}: CTABannerProps) {
  return (
    <section className="pb-16 sm:pb-20 lg:pb-24">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[1.8rem] bg-brand-blue sm:rounded-[2.2rem]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.18),transparent_45%)]"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-14 lg:py-14">
            <div>
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-blue-100">
                Start a conversation
              </p>
              <h2 className="mt-3 text-[1.85rem] font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100 sm:text-base">{description}</p>
              <ButtonLink to={buttonHref} variant="primary" size="lg" arrow="right" className="mt-7">
                {buttonLabel}
              </ButtonLink>
            </div>
            <div className="hidden sm:block">
              <div className="relative ml-auto max-w-md overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
                <ResponsiveImage
                  image={image}
                  sizes="(min-width: 1024px) 32vw, 40vw"
                  className="aspect-[4/3]"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
