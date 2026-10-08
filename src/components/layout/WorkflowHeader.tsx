import { useLocation } from 'react-router-dom'
import { routes, texts } from '../../lib/config'
import sereneLakeside from '../../assets/serene-lakeside.png'

export function WorkflowHeader() {
  const { pathname } = useLocation()
  const activeStep = pathname === routes.profile ? 2 : pathname === routes.team ? 1 : 0
  const copy = texts.dashboard
  return (
    <section className="relative overflow-hidden rounded-t-3xl px-5 pt-8 pb-6 sm:px-8">
      <img src={sereneLakeside} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_60%]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas/95 via-canvas/85 to-canvas/40" />
      <div className="relative max-w-4xl">
        <h1 className="mt-0 mb-3 text-[clamp(26px,3vw,42px)] leading-tight font-bold tracking-tight uppercase">{copy.titles[activeStep]}</h1>
        <p className="mt-0 mb-6 text-sm sm:text-base">{copy.descriptions[activeStep]}</p>
        <ol aria-label={copy.stepsLabel} className="flex max-w-3xl">
          {copy.steps.map((step, index) => (
            <li key={step} aria-current={activeStep === index ? 'step' : undefined} className="relative flex flex-1 flex-col items-center gap-2 text-center">
              {index < 2 && <span className={`absolute top-4.5 left-[calc(50%+24px)] h-px w-[calc(100%-48px)] ${index < activeStep ? 'bg-brand' : 'bg-input-border/40'}`} />}
              <span className={`relative flex size-9 items-center justify-center rounded-full border text-sm font-bold ${index === activeStep ? 'border-accent bg-accent text-accent-ink shadow-md shadow-accent/20' : 'border-line bg-surface text-muted'}`}>{index + 1}</span>
              <span className={`text-xs font-semibold sm:text-sm ${index === activeStep ? 'text-brand' : 'text-muted'}`}>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
