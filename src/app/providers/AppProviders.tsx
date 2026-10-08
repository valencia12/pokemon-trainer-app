import { useCallback, useReducer, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { initialState, trainerReducer } from '../../stores/trainerReducer'
import type { TrainerAction } from '../../stores/trainerReducer'
import { TrainerContext } from './TrainerContext'
import { loadTrainerState, persistTrainerState } from '../../stores/trainerStorage'

export function AppProviders({ children }: { children: ReactNode }) {
  const [state, internalDispatch] = useReducer(trainerReducer, initialState, loadTrainerState)
  const stateRef = useRef(state)
  const [storageError, setStorageError] = useState(false)
  const dispatch = useCallback((action: TrainerAction) => {
    const nextState = trainerReducer(stateRef.current, action)
    stateRef.current = nextState
    setStorageError(!persistTrainerState(nextState))
    internalDispatch(action)
  }, [])
  return <TrainerContext.Provider value={{ state, dispatch, storageError }}>{children}</TrainerContext.Provider>
}
