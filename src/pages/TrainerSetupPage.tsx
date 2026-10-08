import { useNavigate } from 'react-router-dom'
import { TrainerForm } from '../features/trainer/components/TrainerForm'
import { useTrainer } from '../hooks/useTrainer'
import { routes, texts } from '../lib/config'

export default function TrainerSetupPage() {
  const { state, dispatch } = useTrainer()
  const navigate = useNavigate()
  return (
    <section className="page-card">
      <span className="badge">{texts.setup.step}</span>
      <h1>{texts.setup.title}</h1>
      <p>{texts.setup.description}</p>
      <TrainerForm initialTrainer={state.trainer} onSave={trainer => {
        dispatch({ type: 'trainer/saved', payload: trainer })
        navigate(routes.team)
      }} />
    </section>
  )
}
