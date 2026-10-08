import type { Trainer } from '../features/trainer/types/trainer'

export interface TrainerState {
  trainer: Trainer | null
  team: number[]
}

export type TrainerAction =
  | { type: 'trainer/saved'; payload: Trainer }
  | { type: 'team/saved'; payload: number[] }

export const initialState: TrainerState = { trainer: null, team: [] }

export function trainerReducer(state: TrainerState, action: TrainerAction): TrainerState {
  switch (action.type) {
    case 'trainer/saved':
      return { ...state, trainer: action.payload }
    case 'team/saved':
      return { ...state, team: action.payload }
  }
}
