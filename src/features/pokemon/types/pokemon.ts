export interface PokemonSummary {
  name: string
  url: string
}

export interface PokemonListResponse {
  results: PokemonSummary[]
}
