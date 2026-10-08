export interface PokemonSummary {
  name: string
  url: string
}

export interface PokemonListResponse {
  results: PokemonSummary[]
}

export type PokemonType = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'

export type PokemonStatName = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed'

export interface PokemonResponse {
  id: number
  name: string
  sprites: { other: { home: { front_default: string | null } } }
  types: { slot: number; type: { name: PokemonType } }[]
  stats: { base_stat: number; stat: { name: PokemonStatName } }[]
}

export interface Pokemon {
  id: number
  name: string
  image: string | null
  types: PokemonType[]
  stats: { name: PokemonStatName; value: number }[]
}
