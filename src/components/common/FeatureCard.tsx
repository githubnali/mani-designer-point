import type { Feature } from '../../data/features'
import { Icon } from './Icon'

type FeatureCardProps = {
  feature: Feature
  tone?: 'light' | 'surface'
}

export function FeatureCard({ feature, tone = 'light' }: FeatureCardProps) {
  return (
    <article
      className={`h-full rounded-2xl border border-line p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
        tone === 'surface' ? 'bg-white' : 'bg-white'
      }`}
    >
      <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-brand-red/10 text-brand-red-strong">
        <Icon name={feature.icon} size={21} />
      </span>
      <h3 className="mt-4 text-[1.05rem] font-bold leading-snug text-navy">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
    </article>
  )
}
