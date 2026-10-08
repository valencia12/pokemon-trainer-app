import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Panel } from '../components/ui/Panel'
import { FormField } from '../components/ui/FormField'
import { Icon } from '../components/ui/Icon'
import { PokemonVirtualGrid } from '../features/pokemon/components/PokemonVirtualGrid'
import { SelectedTeam } from '../features/pokemon/components/SelectedTeam'
import { usePokemonCatalog } from '../features/pokemon/hooks/usePokemonCatalog'
import { filterPokemon, togglePokemon } from '../features/pokemon/utils/selection'
import { useTrainer } from '../hooks/useTrainer'
import { routes, texts } from '../lib/config'
import config from '../config/pokemon.json'

export default function TeamSelectionPage() {
  const { state, dispatch } = useTrainer()
  const { pokemon, isLoading, hasError, retry } = usePokemonCatalog()
  const [search, setSearch] = useState('')
  const [team, setTeam] = useState(state.team)
  const navigate = useNavigate()
  const copy = texts.team
  const filtered = filterPokemon(pokemon, search)
  const selected = team.flatMap(id => { const item = pokemon.find(item => item.id === id); return item ? [item] : [] })
  const complete = team.length === config.teamSize

  function saveTeam() {
    if (!state.activeTrainerId || !complete || isLoading || hasError || selected.length !== config.teamSize) return
    dispatch({ type: 'team/saved', payload: { trainerId: state.activeTrainerId, team } })
    navigate(routes.profile)
  }

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="order-2 min-w-0 xl:order-1">
      <Panel title={copy.catalogTitle} description={copy.catalogDescription} icon="ball">
        <FormField id="pokemon-search" label={copy.search} type="search" placeholder={copy.searchPlaceholder} value={search} onChange={event => setSearch(event.target.value)} />
        {isLoading && <p role="status" className="text-sm">{texts.common.loading}</p>}
        {hasError && <div role="alert" className="mt-5 rounded-xl border border-line p-5"><p className="mt-0 text-sm">{copy.error}</p><button type="button" onClick={retry} className="cursor-pointer rounded-lg bg-action px-4 py-2 text-sm font-semibold text-white">{copy.retry}</button></div>}
        {!isLoading && !hasError && <>
          <p className="my-4 text-xs" role="status">{copy.results}: {filtered.length}</p>
          {filtered.length ? <PokemonVirtualGrid key={search.trim().toLowerCase()} pokemon={filtered} selectedIds={team} onToggle={id => setTeam(previous => togglePokemon(previous, id))} /> : <div className="py-10 text-center"><p className="text-sm">{copy.noResults}</p><button type="button" onClick={() => setSearch('')} className="cursor-pointer text-sm font-semibold underline">{copy.clearSearch}</button></div>}
        </>}
      </Panel>
      </div>
      <div className="order-1 xl:order-2 xl:sticky xl:top-5">
        <Panel title={copy.selectedTitle} description={copy.selectedDescription} icon="users">
          {state.trainer && <div className="mb-5 flex items-center gap-3 border-b border-line pb-4"><img src={state.trainer.photo} alt="" className="size-10 rounded-full object-cover" /><span className="truncate text-sm font-bold">{state.trainer.name}</span></div>}
          <p role="status" className="mt-0 text-sm font-semibold">{copy.slots}: {team.length}/{config.teamSize}</p>
          <SelectedTeam selected={selected} onRemove={id => setTeam(previous => previous.filter(item => item !== id))} />
          <p role="status" className="text-xs">{complete ? copy.limit : copy.incomplete}</p>
          <button type="button" onClick={saveTeam} disabled={!complete || isLoading || hasError} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-bold text-accent-ink disabled:cursor-default disabled:opacity-40 focus-visible:outline-3 focus-visible:outline-focus"><Icon name="save" />{copy.save}</button>
          <p className="text-xs">{copy.unsaved}</p>
          <Link to={routes.setup} className="text-xs font-semibold underline">{copy.editTrainer}</Link>
        </Panel>
      </div>
    </div>
  )
}
