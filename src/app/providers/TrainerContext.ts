import { createContext } from 'react'
import type { Dispatch } from 'react'
import type { TrainerAction, TrainerState } from '../../stores/trainerReducer'

export const TrainerContext = createContext<{
  state: TrainerState
  dispatch: Dispatch<TrainerAction>
} | null>(null)
