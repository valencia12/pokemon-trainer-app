import { Link, useLocation } from 'react-router-dom'
import emptyTrainerImage from '../../../assets/pikachu-empty-state.png'
import { EmptyState } from '../../../components/ui/EmptyState'
import { Icon } from '../../../components/ui/Icon'
import { routes, texts } from '../../../lib/config'

export function TrainerEmptyState() {
  const { pathname } = useLocation()
  const copy = texts.dashboard
  const actionClassName = 'flex w-full cursor-pointer items-center justify-center gap-4 rounded-xl border border-dashed border-input-border/50 p-5 text-left hover:bg-brand-soft/50 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-focus'
  const actionContent = (
    <>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"><Icon name="plus" className="size-6" /></span>
      <span><span className="block text-sm font-bold text-brand">{copy.createFirst}</span><span className="mt-1 block text-xs text-muted">{copy.createFirstHint}</span></span>
    </>
  )

  function focusForm() {
    document.getElementById('trainer-name')?.focus()
  }

  return <EmptyState image={emptyTrainerImage} title={copy.emptyTitle} description={copy.emptyDescription} action={(pathname === routes.setup || pathname === routes.newTrainer)
    ? <button type="button" className={actionClassName} onClick={focusForm}>{actionContent}</button>
    : <Link to={routes.newTrainer} className={actionClassName}>{actionContent}</Link>} />
}
