import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Service } from '../../types'
import { ResponsiveImage } from '../common/ResponsiveImage'

type ServiceCardProps = {
  service: Service
  sizes?: string
  priority?: boolean
}

export function ServiceCard({
  service,
  sizes = '(min-width: 1024px) 32vw, 92vw',
  priority = false,
}: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <ResponsiveImage
        image={service.image}
        alt={service.image.alt}
        sizes={sizes}
        priority={priority}
        className="aspect-[16/10]"
        imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-bold leading-snug text-navy">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-[0.82rem] font-semibold text-ink">
              <Check size={14} className="mt-0.5 shrink-0 text-brand-red-strong" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          to={service.path}
          className="mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-blue transition hover:text-brand-red-strong"
          aria-label={`Learn more about ${service.name}`}
        >
          Learn more
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
