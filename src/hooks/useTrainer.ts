import { useContext } from 'react'
import { TrainerContext } from '../app/providers/TrainerContext'

export function useTrainer() {
  const context = useContext(TrainerContext)
  if (!context) throw new Error('useTrainer must be used within AppProviders')
  const activeProfile = context.state.profiles.find(profile => profile.id === context.state.activeTrainerId)
  return {
    ...context,
    state: {
      ...context.state,
      trainer: activeProfile?.trainer ?? null,
      team: activeProfile?.team ?? [],
    },
  }
}
