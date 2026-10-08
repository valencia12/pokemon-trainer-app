import { isTrainer } from '../features/trainer/utils/validation'
import { initialState } from './trainerReducer'
import type { TrainerState } from './trainerReducer'

const storageKey = 'pokemon-trainer:v1'

export function loadTrainerState(): TrainerState {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return initialState
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return initialState
    const value = parsed as Record<string, unknown>
    if (!isTrainer(value.trainer)) return initialState
    const team = Array.isArray(value.team)
      && value.team.length <= 3
      && value.team.every(id => Number.isInteger(id) && id >= 1 && id <= 151)
      && new Set(value.team).size === value.team.length
      ? value.team as number[] : []
    return { trainer: value.trainer, team }
  } catch {
    return initialState
  }
}

export function persistTrainerState(state: TrainerState): boolean {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}
