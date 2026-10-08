import { texts } from '../../../lib/config'
import config from '../../../config/pokemon.json'
import type { Pokemon } from '../types/pokemon'
import { PokemonImage } from './PokemonImage'
import { Icon } from '../../../components/ui/Icon'

export function SelectedTeam({ selected, onRemove }: { selected: Pokemon[]; onRemove: (id: number) => void }) {
  const copy = texts.team
  return (
    <ol className="space-y-3" aria-label={copy.selectedTitle}>
      {Array.from({ length: config.teamSize }, (_, index) => {
        const pokemon = selected[index]
        return <li key={index} className="flex min-h-24 items-center gap-3 rounded-xl border border-line p-3">
          {pokemon ? <>
            <PokemonImage pokemon={pokemon} className="size-16 shrink-0" />
            <div className="min-w-0 flex-1"><span className="block text-xs text-muted">#{String(pokemon.id).padStart(3, '0')}</span><span className="block truncate text-sm font-bold capitalize">{pokemon.name}</span><span className="text-xs text-muted">{pokemon.types.map(type => copy.types[type]).join(' / ')}</span></div>
            <button type="button" onClick={() => onRemove(pokemon.id)} aria-label={`${copy.remove} ${pokemon.name}`} className="cursor-pointer rounded-lg px-2 py-2 text-xs font-semibold text-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-focus">{copy.remove}</button>
          </> : <><span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-soft"><Icon name="ball" className="size-7 opacity-40" /></span><span className="text-sm text-muted">{copy.emptySlot}</span></>}
        </li>
      })}
    </ol>
  )
}
