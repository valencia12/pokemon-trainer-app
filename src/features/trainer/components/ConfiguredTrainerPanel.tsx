import { Link } from 'react-router-dom'
import { useTrainer } from '../../../hooks/useTrainer'
import { routes, texts } from '../../../lib/config'
import { getAge } from '../utils/validation'
import { Panel } from '../../../components/ui/Panel'
import { Icon } from '../../../components/ui/Icon'
import { TrainerEmptyState } from './TrainerEmptyState'

export function ConfiguredTrainerPanel() {
  const { state } = useTrainer()
  const { trainer, team } = state
  const copy = texts.dashboard
  const complete = team.length === 3
  return (
    <Panel title={trainer ? copy.savedTitle : copy.emptyPanelTitle} description={trainer ? copy.savedDescription : copy.emptyPanelDescription} icon="users">
      {trainer ? (
        <article className="rounded-xl border border-line p-4">
          <div className="flex flex-wrap items-center gap-4">
            <img className="size-20 rounded-full border-4 border-brand-soft object-cover" src={trainer.photo} alt={texts.home.photoAlt} />
            <div className="min-w-0 flex-1">
              <h3 className="break-words text-lg font-bold">{trainer.name}</h3>
              <p className="my-1 flex items-center gap-2 text-sm"><Icon name="calendar" />{getAge(trainer.birthDate)} {texts.setup.form.years}</p>
              {trainer.hobby && <p className="my-1 flex items-start gap-2 text-sm"><Icon name="game" className="mt-0.5 size-5 shrink-0" /><span className="break-words">{trainer.hobby}</span></p>}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Link className="inline-flex items-center justify-center gap-2 rounded-lg bg-action px-3 py-2.5 text-sm font-semibold text-white hover:brightness-110" to={complete ? routes.profile : routes.team}><Icon name="play" className="size-4" />{copy.continue}</Link>
            <Link className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-2.5 text-sm font-semibold hover:bg-brand-soft" to={routes.setup}><Icon name="edit" className="size-4" />{texts.home.edit}</Link>
          </div>
          <p className="mt-4 mb-0 text-xs">{texts.home.teamCount}: {team.length}/3</p>
        </article>
      ) : (
        <TrainerEmptyState />
      )}
      {trainer && <div className="mt-6 rounded-xl bg-brand-soft/60 p-4">
        <p className="m-0 flex items-start gap-2 text-xs"><Icon name="info" className="size-4 shrink-0 text-brand" />{trainer ? complete ? copy.teamReady : texts.home.teamPending : copy.savedHint}</p>
      </div>}
    </Panel>
  )
}
