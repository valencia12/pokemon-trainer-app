import { StatBar } from '../../../components/ui/StatBar'
import { texts } from '../../../lib/config'
import config from '../../../config/pokemon.json'
import type { Pokemon, PokemonStatName } from '../types/pokemon'
import { PokemonImage } from './PokemonImage'

export function PokemonStatsCard({ pokemon }: { pokemon: Pokemon }) {
  const limits = Object.entries(config.statLimits) as [PokemonStatName, number][]
  return (
    <article className="min-w-0 rounded-xl border border-line p-3">
      <div className="mb-3 flex flex-col items-center border-b border-line pb-3">
        <span className="self-start text-xs text-muted">#{String(pokemon.id).padStart(3, '0')}</span>
        <PokemonImage pokemon={pokemon} className="size-24" />
        <h3 className="text-base font-bold capitalize">{pokemon.name}</h3>
        <ul className="mt-1 flex flex-wrap justify-center gap-1">{pokemon.types.map(type => <li key={type} className="rounded bg-brand-soft px-2 py-0.5 text-[11px] text-muted">{texts.team.types[type]}</li>)}</ul>
      </div>
      <div className="space-y-2.5">
        {limits.map(([name, maximum]) => <StatBar key={name} label={texts.profile.stats[name]} value={pokemon.stats.find(stat => stat.name === name)?.value ?? null} maximum={maximum} />)}
      </div>
    </article>
  )
}
