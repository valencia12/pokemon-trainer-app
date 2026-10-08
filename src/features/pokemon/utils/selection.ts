import config from '../../../config/pokemon.json'
import { endpoints } from '../../../lib/config'
import type { Pokemon } from '../types/pokemon'

export function filterPokemon(pokemon: Pokemon[], search: string) {
  const query = search.trim().toLowerCase().replace(/^#/, '')
  if (!query) return pokemon
  if (/^\d+$/.test(query)) return pokemon.filter(item => item.id === Number(query))
  return pokemon.filter(item => item.name.includes(query))
}

export function togglePokemon(team: number[], id: number) {
  if (team.includes(id)) return team.filter(item => item !== id)
  if (team.length >= config.teamSize) return team
  return [...team, id]
}

export function isPokemonTeam(value: unknown): value is number[] {
  return Array.isArray(value) && value.length <= config.teamSize
    && value.every(id => Number.isInteger(id) && id >= 1 && id <= endpoints.firstGenerationLimit)
    && new Set(value).size === value.length
}
