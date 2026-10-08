import { Link, useLocation } from 'react-router-dom'
import { TrainerSummary } from '../features/trainer/components/TrainerSummary'
import { ConfiguredTrainerPanel } from '../features/trainer/components/ConfiguredTrainerPanel'
import { useTrainer } from '../hooks/useTrainer'
import { routes, texts } from '../lib/config'
import config from '../config/pokemon.json'

export default function TrainerReviewPage() {
  const { state } = useTrainer()
  const location = useLocation()
  const navigationState = location.state as { saved?: boolean } | null
  if (!state.trainer) return null
  return (
    <div className="grid items-start gap-5 xl:grid-cols-[1.25fr_1fr]">
      <div>
        {navigationState?.saved && <p role="status" className="mt-0 rounded-lg bg-brand-soft p-3 text-sm text-brand">{texts.dashboard.savedMessage}</p>}
        <TrainerSummary key={state.activeTrainerId} trainer={state.trainer} title={texts.dashboard.formTitle} />
        {state.team.length === config.teamSize && <Link to={routes.profile} className="mt-4 inline-block text-sm font-semibold underline">{texts.profile.viewComplete}</Link>}
      </div>
      <ConfiguredTrainerPanel />
    </div>
  )
}
