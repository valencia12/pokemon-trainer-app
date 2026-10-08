import { endpoints } from '../../../lib/config'
import { getJson } from '../../../lib/http'
import type { PokemonListResponse } from '../types/pokemon'

export function getFirstGeneration(signal?: AbortSignal) {
  const query = new URLSearchParams({ limit: String(endpoints.firstGenerationLimit), offset: '0' })
  return getJson<PokemonListResponse>(`${endpoints.pokemon}?${query}`, signal)
}
