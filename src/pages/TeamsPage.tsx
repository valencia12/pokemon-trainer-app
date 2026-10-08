import { Link } from 'react-router-dom'
import { Panel } from '../components/ui/Panel'
import { TrainerTeamCard } from '../features/pokemon/components/TrainerTeamCard'
import { useTrainer } from '../hooks/useTrainer'
import { routes, texts } from '../lib/config'

export default function TeamsPage() {
  const { state } = useTrainer()
  const copy = texts.teams
  return (
    <Panel title={copy.title} description={copy.description} icon="ball">
      {state.profiles.length ? <div className="grid items-start gap-4 md:grid-cols-2 min-[1500px]:grid-cols-3">{state.profiles.map(profile => <TrainerTeamCard key={profile.id} profile={profile} />)}</div> : <div className="py-8 text-center"><h3 className="text-xl font-bold">{copy.emptyTitle}</h3><p className="mx-auto text-sm">{copy.emptyDescription}</p><Link to={routes.newTrainer} className="inline-block rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink">{texts.home.create}</Link></div>}
    </Panel>
  )
}
