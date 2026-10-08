import { Link } from 'react-router-dom'
import { Panel } from '../components/ui/Panel'
import { Icon } from '../components/ui/Icon'
import { ConfiguredTrainerPanel } from '../features/trainer/components/ConfiguredTrainerPanel'
import { useTrainer } from '../hooks/useTrainer'
import { routes, texts } from '../lib/config'

export default function HomePage() {
  const { state } = useTrainer()
  const copy = texts.dashboard
  return (
    <div className="grid items-start gap-5 xl:grid-cols-[1.25fr_1fr]">
      <Panel title={copy.welcomeTitle} description={copy.welcomeDescription} icon="ball">
        <div className="rounded-xl bg-brand-soft/50 p-6 sm:p-8">
          <span className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-accent text-accent-ink"><Icon name="ball" className="size-9" /></span>
          <h2 className="text-2xl font-bold">{state.trainer ? copy.returnTitle : texts.home.emptyTitle}</h2>
          <p className="text-sm">{state.trainer ? copy.returnDescription : texts.home.emptyDescription}</p>
          <Link to={state.trainer ? state.team.length === 3 ? routes.profile : routes.team : routes.setup} className="mt-3 inline-flex items-center gap-3 rounded-xl bg-accent px-5 py-3 font-bold text-accent-ink hover:brightness-105"><Icon name={state.trainer ? 'play' : 'plus'} />{state.trainer ? copy.continue : texts.home.create}<Icon name="arrow" className="size-4" /></Link>
        </div>
        <p className="mb-0 flex items-center gap-2 text-xs"><Icon name="save" className="size-4 text-brand" />{copy.localHint}</p>
      </Panel>
      <ConfiguredTrainerPanel />
    </div>
  )
}
