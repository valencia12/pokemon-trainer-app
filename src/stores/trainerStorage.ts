import { isTrainer } from '../features/trainer/utils/validation'
import type { TrainerProfile } from '../features/trainer/types/trainer'
import { isPokemonTeam } from '../features/pokemon/utils/selection'
import config from '../config/storage.json'
import { initialState } from './trainerReducer'
import type { TrainerState } from './trainerReducer'

function isProfile(value: unknown): value is TrainerProfile {
  if (!value || typeof value !== 'object') return false
  const profile = value as Record<string, unknown>
  return typeof profile.id === 'string' && profile.id.length > 0
    && isTrainer(profile.trainer) && isPokemonTeam(profile.team)
}

export function loadTrainerState(): TrainerState {
  try {
    const raw = localStorage.getItem(config.trainerKey)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (!parsed || typeof parsed !== 'object') return initialState
      const value = parsed as Record<string, unknown>
      if (!Array.isArray(value.profiles) || !value.profiles.every(isProfile)) return initialState
      const profiles = value.profiles
      if (new Set(profiles.map(profile => profile.id)).size !== profiles.length) return initialState
      const activeTrainerId = profiles.some(profile => profile.id === value.activeTrainerId)
        ? value.activeTrainerId as string : profiles[0]?.id ?? null
      return { profiles, activeTrainerId }
    }

    // Preserve the previous single trainer and team when upgrading the storage format.
    const legacyRaw = localStorage.getItem(config.legacyTrainerKey)
    if (!legacyRaw) return initialState
    const parsed: unknown = JSON.parse(legacyRaw)
    if (!parsed || typeof parsed !== 'object') return initialState
    const legacy = parsed as Record<string, unknown>
    if (!isTrainer(legacy.trainer)) return initialState
    const profile: TrainerProfile = {
      id: config.migratedTrainerId,
      trainer: legacy.trainer,
      team: isPokemonTeam(legacy.team) ? legacy.team : [],
    }
    return { profiles: [profile], activeTrainerId: profile.id }
  } catch {
    return initialState
  }
}

export function persistTrainerState(state: TrainerState): boolean {
  try {
    localStorage.setItem(config.trainerKey, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}
