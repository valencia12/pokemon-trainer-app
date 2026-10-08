import { texts } from '../../lib/config'

interface PageIntroProps {
  title: string
  description: string
}

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-[clamp(24px,6vw,64px)]">
      <span className="inline-block rounded-full bg-brand-soft px-3.5 py-2 text-sm text-brand">{texts.common.pending}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}
