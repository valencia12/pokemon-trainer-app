import { Panel } from '../../../components/ui/Panel'
import { texts } from '../../../lib/config'
import { usePokemonTeam } from '../hooks/usePokemonTeam'
import { PokemonTeamCarousel } from './PokemonTeamCarousel'

export function PokemonTeamSummary({ ids }: { ids: number[] }) {
  const { pokemon, isLoading, hasError, retry } = usePokemonTeam(ids)
  const copy = texts.profile
  return (
    <Panel title={copy.teamTitle} description={copy.teamDescription} icon="ball">
      {isLoading && <p role="status" className="text-sm">{texts.common.loading}</p>}
      {hasError && <div role="alert" className="rounded-xl border border-line p-5"><p className="mt-0 text-sm">{copy.teamError}</p><button type="button" onClick={retry} className="cursor-pointer rounded-lg bg-action px-4 py-2 text-sm font-semibold text-white focus-visible:outline-3 focus-visible:outline-focus">{copy.retry}</button></div>}
      {!isLoading && !hasError && <PokemonTeamCarousel key={ids.join(',')} pokemon={pokemon} />}
    </Panel>
  )
}
