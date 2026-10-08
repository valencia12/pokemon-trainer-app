import { useLocation, useNavigate } from 'react-router-dom'
import { TrainerForm } from '../features/trainer/components/TrainerForm'
import { ConfiguredTrainerPanel } from '../features/trainer/components/ConfiguredTrainerPanel'
import { Panel } from '../components/ui/Panel'
import { useTrainer } from '../hooks/useTrainer'
import { routes, texts } from '../lib/config'

export default function TrainerSetupPage() {
  const { state, dispatch } = useTrainer()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isCreating = pathname === routes.newTrainer || !state.trainer
  const copy = texts.dashboard
  return (
    <div className="grid items-start gap-5 xl:grid-cols-[1.25fr_1fr]">
      <Panel title={isCreating ? copy.createNew : copy.formTitle} description={texts.setup.description} icon="user">
        <TrainerForm key={isCreating ? 'new' : state.activeTrainerId} initialTrainer={isCreating ? null : state.trainer} onSave={trainer => {
          if (isCreating) {
            const id = crypto.randomUUID()
            dispatch({ type: 'trainer/created', payload: { id, trainer, team: [] } })
          } else {
            dispatch({ type: 'trainer/saved', payload: trainer })
          }
          navigate(routes.trainerReview, { replace: true, state: { saved: true } })
        }} />
      </Panel>
      <ConfiguredTrainerPanel />
    </div>
  )
}
