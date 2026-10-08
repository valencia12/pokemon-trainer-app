import { Link } from 'react-router-dom'
import { TrainerSummary } from '../features/trainer/components/TrainerSummary'
import { PokemonTeamSummary } from '../features/pokemon/components/PokemonTeamSummary'
import { useTrainer } from '../hooks/useTrainer'
import { routes, texts } from '../lib/config'

export default function TrainerProfilePage() {
  const { state } = useTrainer()
  if (!state.trainer) return null
  return (
    <>
      <div className="grid items-start gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <TrainerSummary key={state.activeTrainerId} trainer={state.trainer} />
        <PokemonTeamSummary key={state.activeTrainerId} ids={state.team} />
      </div>
      <Link to={routes.home} className="mt-6 inline-block text-sm font-semibold underline">{texts.profile.backToTrainers}</Link>
    </>
  )
}
