import { useCallback, useReducer, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { initialState, trainerReducer } from '../../stores/trainerReducer'
import type { TrainerAction } from '../../stores/trainerReducer'
import { TrainerContext } from './TrainerContext'
import { loadTrainerState, persistTrainerState } from '../../stores/trainerStorage'
import { LoadingOverlay } from '../../components/ui/LoadingOverlay'
import { useLoading } from '../../hooks/useLoading'

export function AppProviders({ children }: { children: ReactNode }) {
  const { isLoading } = useLoading()
  const [state, internalDispatch] = useReducer(trainerReducer, initialState, loadTrainerState)
  const stateRef = useRef(state)
  const [storageError, setStorageError] = useState(false)
  const dispatch = useCallback((action: TrainerAction) => {
    const nextState = trainerReducer(stateRef.current, action)
    stateRef.current = nextState
    setStorageError(!persistTrainerState(nextState))
    internalDispatch(action)
  }, [])
  return (
    <TrainerContext.Provider value={{ state, dispatch, storageError }}>
      <div inert={isLoading} aria-busy={isLoading}>{children}</div>
      <LoadingOverlay isLoading={isLoading} />
    </TrainerContext.Provider>
  )
}
