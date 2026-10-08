import type { Trainer, TrainerProfile } from '../features/trainer/types/trainer'
import pokemonConfig from '../config/pokemon.json'
import { isPokemonTeam } from '../features/pokemon/utils/selection'

export interface TrainerState {
  profiles: TrainerProfile[]
  activeTrainerId: string | null
}

export type TrainerAction =
  | { type: 'trainer/created'; payload: TrainerProfile }
  | { type: 'trainer/selected'; payload: string }
  | { type: 'trainer/saved'; payload: Trainer }
  | { type: 'team/saved'; payload: { trainerId: string; team: number[] } }

export const initialState: TrainerState = { profiles: [], activeTrainerId: null }

export function trainerReducer(state: TrainerState, action: TrainerAction): TrainerState {
  switch (action.type) {
    case 'trainer/created':
      if (state.profiles.some(profile => profile.id === action.payload.id)) return state
      return { profiles: [...state.profiles, action.payload], activeTrainerId: action.payload.id }
    case 'trainer/selected':
      if (!state.profiles.some(profile => profile.id === action.payload)) return state
      return { ...state, activeTrainerId: action.payload }
    case 'trainer/saved':
      return { ...state, profiles: state.profiles.map(profile => profile.id === state.activeTrainerId ? { ...profile, trainer: action.payload } : profile) }
    case 'team/saved':
      if (!isPokemonTeam(action.payload.team) || action.payload.team.length !== pokemonConfig.teamSize) return state
      return { ...state, profiles: state.profiles.map(profile => profile.id === action.payload.trainerId ? { ...profile, team: [...action.payload.team] } : profile) }
  }
}
