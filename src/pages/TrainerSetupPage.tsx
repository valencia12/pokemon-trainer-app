import { useState } from 'react'
import { TrainerForm } from '../features/trainer/components/TrainerForm'
import { ConfiguredTrainerPanel } from '../features/trainer/components/ConfiguredTrainerPanel'
import { Panel } from '../components/ui/Panel'
import { useTrainer } from '../hooks/useTrainer'
import { texts } from '../lib/config'

export default function TrainerSetupPage() {
  const { state, dispatch } = useTrainer()
  const [saved, setSaved] = useState(false)
  const copy = texts.dashboard
  return (
    <div className="grid items-start gap-5 xl:grid-cols-[1.25fr_1fr]">
      <Panel title={copy.formTitle} description={texts.setup.description} icon="user">
        {saved && <p role="status" className="rounded-lg bg-brand-soft p-3 text-sm text-brand">{copy.savedMessage}</p>}
        <TrainerForm initialTrainer={state.trainer} onSave={trainer => {
          dispatch({ type: 'trainer/saved', payload: trainer })
          setSaved(true)
        }} />
      </Panel>
      <ConfiguredTrainerPanel />
    </div>
  )
}
