import { useNavigate } from 'react-router-dom'
import { useTrainer } from '../../../hooks/useTrainer'
import { routes, texts } from '../../../lib/config'
import type { TrainerProfile } from '../../trainer/types/trainer'
import config from '../../../config/pokemon.json'
import { usePokemonTeam } from '../hooks/usePokemonTeam'
import { PokemonImage } from './PokemonImage'
import { Icon } from '../../../components/ui/Icon'

function TeamPreview({ ids }: { ids: number[] }) {
  const { pokemon, isLoading, hasError, retry } = usePokemonTeam(ids)
  if (isLoading) return <p role="status" className="text-xs">{texts.common.loading}</p>
  if (hasError) return <div role="alert"><p className="text-xs">{texts.teams.loadError}</p><button type="button" onClick={retry} className="cursor-pointer text-xs font-semibold underline">{texts.profile.retry}</button></div>
  return <ul className="my-5 grid grid-cols-3 gap-2">{pokemon.map(item => <li key={item.id} className="flex min-w-0 flex-col items-center gap-1 rounded-lg bg-brand-soft/40 p-2"><PokemonImage pokemon={item} className="size-16" /><span className="w-full truncate text-center text-xs font-semibold capitalize">{item.name}</span></li>)}</ul>
}

export function TrainerTeamCard({ profile }: { profile: TrainerProfile }) {
  const { dispatch } = useTrainer()
  const navigate = useNavigate()
  const copy = texts.teams
  const complete = profile.team.length === config.teamSize

  function openTeam(view = false) {
    dispatch({ type: 'trainer/selected', payload: profile.id })
    navigate(view ? routes.profile : routes.team)
  }

  return (
    <article className="min-w-0 rounded-xl border border-line p-4">
      <header className="flex items-center gap-3"><img src={profile.trainer.photo} alt="" className="size-12 rounded-full object-cover" /><div className="min-w-0"><h3 className="truncate font-bold">{profile.trainer.name}</h3><span className="text-xs text-muted">{texts.team.slots}: {profile.team.length}/{config.teamSize}</span></div></header>
      {profile.team.length ? <TeamPreview ids={profile.team} /> : <p className="my-6 text-sm">{copy.noTeam}</p>}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => openTeam()} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink focus-visible:outline-3 focus-visible:outline-focus"><Icon name="edit" className="size-4" />{profile.team.length ? copy.edit : copy.choose}</button>
        {complete && <button type="button" onClick={() => openTeam(true)} className="cursor-pointer rounded-lg border border-line px-4 py-2.5 text-sm font-semibold hover:bg-brand-soft focus-visible:outline-3 focus-visible:outline-focus">{copy.view}</button>}
      </div>
    </article>
  )
}
