import { useReducer } from 'react'
import type { ReactNode } from 'react'
import { initialState, trainerReducer } from '../../stores/trainerReducer'
import { TrainerContext } from './TrainerContext'

export function AppProviders({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(trainerReducer, initialState)
  return <TrainerContext.Provider value={{ state, dispatch }}>{children}</TrainerContext.Provider>
}
