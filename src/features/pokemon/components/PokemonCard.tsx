import { texts } from '../../../lib/config'
import type { Pokemon } from '../types/pokemon'
import { PokemonImage } from './PokemonImage'

interface PokemonCardProps {
  pokemon: Pokemon
  selected: boolean
  disabled: boolean
  onToggle: () => void
}

export function PokemonCard({ pokemon, selected, disabled, onToggle }: PokemonCardProps) {
  const copy = texts.team
  return (
    <button type="button" onClick={onToggle} aria-pressed={selected} aria-label={`${selected ? copy.remove : copy.select} ${pokemon.name}`} disabled={disabled}
      className={`flex min-w-0 cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-default disabled:opacity-45 ${selected ? 'border-accent bg-accent/10 ring-1 ring-accent' : 'border-line bg-surface hover:border-input-border hover:bg-brand-soft/50'}`}>
      <span className="self-start text-xs text-muted">#{String(pokemon.id).padStart(3, '0')}</span>
      <PokemonImage pokemon={pokemon} />
      <span className="w-full truncate text-sm font-bold capitalize">{pokemon.name}</span>
      <span className="flex flex-wrap justify-center gap-1">{pokemon.types.map(type => <span key={type} className="rounded bg-brand-soft px-2 py-1 text-[10px] text-muted">{copy.types[type]}</span>)}</span>
      <span className="mt-auto pt-1 text-xs font-semibold">{selected ? copy.selected : copy.select}</span>
    </button>
  )
}
