import { useState } from 'react'
import { texts } from '../../../lib/config'
import type { Pokemon } from '../types/pokemon'
import { Icon } from '../../../components/ui/Icon'

export function PokemonImage({ pokemon, className = 'size-24' }: { pokemon: Pokemon; className?: string }) {
  const [failed, setFailed] = useState(false)
  return pokemon.image && !failed
    ? <img src={pokemon.image} alt={pokemon.name} loading="lazy" decoding="async" className={`${className} object-contain`} onError={() => setFailed(true)} />
    : <span role="img" aria-label={texts.team.imageUnavailable} className={`${className} flex items-center justify-center`}><Icon name="ball" className="size-9" /></span>
}
