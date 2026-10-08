import { useContext } from 'react'
import { TrainerContext } from '../app/providers/TrainerContext'

export function useTrainer() {
  const context = useContext(TrainerContext)
  if (!context) throw new Error('useTrainer must be used within AppProviders')
  return context
}
