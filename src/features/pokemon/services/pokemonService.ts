import { endpoints } from '../../../lib/config'
import config from '../../../config/pokemon.json'
import { getJson } from '../../../lib/http'
import { withLoading } from '../../../stores/loadingStore'
import type { Pokemon, PokemonListResponse, PokemonResponse } from '../types/pokemon'

const cache = new Map<number, Pokemon>()
let generationList: PokemonListResponse | null = null

export async function getFirstGeneration(signal?: AbortSignal) {
  signal?.throwIfAborted()
  if (generationList) return generationList
  const query = new URLSearchParams({ limit: String(endpoints.firstGenerationLimit), offset: '0' })
  const list = await getJson<PokemonListResponse>(`${endpoints.pokemon}?${query}`, signal)
  generationList = list
  return list
}

export async function getPokemon(id: number, signal?: AbortSignal): Promise<Pokemon> {
  signal?.throwIfAborted()
  const cached = cache.get(id)
  if (cached) return cached
  const path = endpoints.pokemonDetails.replace('{id}', String(id))
  const response = await getJson<PokemonResponse>(path, signal)
  const pokemon: Pokemon = {
    id: response.id,
    name: response.name,
    image: response.sprites.other.home.front_default,
    types: response.types.toSorted((a, b) => a.slot - b.slot).map(item => item.type.name),
    stats: response.stats.map(item => ({ name: item.stat.name, value: item.base_stat })),
  }
  cache.set(id, pokemon)
  return pokemon
}

// Limit concurrent requests and reuse completed responses when retrying or revisiting.
export async function getGenerationPokemon(signal?: AbortSignal): Promise<Pokemon[]> {
  return withLoading(async () => {
    const list = await getFirstGeneration(signal)
    const results: Pokemon[] = new Array(list.results.length)
    let cursor = 0
    async function worker() {
      while (cursor < list.results.length) {
        signal?.throwIfAborted()
        const index = cursor++
        const id = Number(new URL(list.results[index].url).pathname.split('/').filter(Boolean).at(-1))
        results[index] = await getPokemon(id, signal)
      }
    }
    await Promise.all(Array.from({ length: Math.min(config.requestConcurrency, list.results.length) }, () => worker()))
    return results.toSorted((a, b) => a.id - b.id)
  })
}

export async function getPokemonTeam(ids: number[], signal?: AbortSignal): Promise<Pokemon[]> {
  return withLoading(() => Promise.all(ids.map(id => getPokemon(id, signal))))
}
