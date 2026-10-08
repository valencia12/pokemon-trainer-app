import { Link, useNavigate } from 'react-router-dom'
import { useTrainer } from '../../../hooks/useTrainer'
import { routes, texts } from '../../../lib/config'
import { getAge } from '../utils/validation'
import { Panel } from '../../../components/ui/Panel'
import { Icon } from '../../../components/ui/Icon'
import { TrainerEmptyState } from './TrainerEmptyState'
import type { TrainerProfile } from '../types/trainer'
import pokemonConfig from '../../../config/pokemon.json'

export function ConfiguredTrainerPanel() {
  const { state, dispatch } = useTrainer()
  const navigate = useNavigate()
  const copy = texts.dashboard

  function openTrainer(profile: TrainerProfile, edit = false) {
    dispatch({ type: 'trainer/selected', payload: profile.id })
    navigate(edit ? routes.setup : profile.team.length === pokemonConfig.teamSize ? routes.profile : routes.team)
  }

  return (
    <Panel title={copy.emptyPanelTitle} description={state.profiles.length ? copy.savedDescription : copy.emptyPanelDescription} icon="users">
      {state.profiles.length ? <>
        <div className="max-h-150 space-y-3 overflow-y-auto pr-1">
          {state.profiles.map(profile => {
            const { trainer, team } = profile
            const active = state.activeTrainerId === profile.id
            return <article key={profile.id} className={`rounded-xl border p-4 ${active ? 'border-input-border bg-brand-soft/30' : 'border-line'}`}>
              <button type="button" aria-pressed={active} aria-label={`${copy.reviewTrainer} ${trainer.name}`} onClick={() => {
                dispatch({ type: 'trainer/selected', payload: profile.id })
                navigate(routes.trainerReview)
              }} className="flex w-full cursor-pointer flex-wrap items-center gap-4 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus">
                <img className="size-16 rounded-full border-4 border-brand-soft object-cover" src={trainer.photo} alt={texts.home.photoAlt} />
                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-lg font-bold">{trainer.name}</h3>
                  <p className="my-1 flex items-center gap-2 text-sm"><Icon name="calendar" />{getAge(trainer.birthDate)} {texts.setup.form.years}</p>
                  {trainer.hobby && <p className="my-1 flex items-start gap-2 text-sm"><Icon name="game" className="mt-0.5 size-5 shrink-0" /><span className="break-words">{trainer.hobby}</span></p>}
                </div>
              </button>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => openTrainer(profile)} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-action px-3 py-2.5 text-sm font-semibold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-focus"><Icon name="play" className="size-4" />{copy.continue}</button>
                <button type="button" onClick={() => openTrainer(profile, true)} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-line px-3 py-2.5 text-sm font-semibold hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-focus"><Icon name="edit" className="size-4" />{copy.edit}</button>
              </div>
              <p className="mt-3 mb-0 text-xs">{texts.home.teamCount}: {team.length}/{pokemonConfig.teamSize}{active && <span className="ml-3 font-semibold">{copy.activeTrainer}</span>}</p>
            </article>
          })}
        </div>
        <Link to={routes.newTrainer} className="mt-4 flex items-center justify-center gap-3 rounded-xl border border-dashed border-input-border p-4 text-sm font-semibold hover:bg-brand-soft"><Icon name="plus" />{copy.createNew}</Link>
        <p className="mb-0 text-xs">{copy.independentTeams}</p>
      </> : <TrainerEmptyState />}
    </Panel>
  )
}
