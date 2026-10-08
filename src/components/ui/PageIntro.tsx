import { texts } from '../../lib/config'

interface PageIntroProps {
  title: string
  description: string
}

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <section className="page-card">
      <span className="badge">{texts.common.pending}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}
