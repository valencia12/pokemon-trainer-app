import { useEffect, useState } from 'react'
import { getPokemonTeam } from '../services/pokemonService'
import type { Pokemon } from '../types/pokemon'

interface TeamResult {
  key: string
  pokemon: Pokemon[]
  hasError: boolean
}

export function usePokemonTeam(ids: number[]) {
  const key = ids.join(',')
  const [result, setResult] = useState<TeamResult>({ key: '', pokemon: [], hasError: false })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const teamIds = key ? key.split(',').map(Number) : []
    getPokemonTeam(teamIds, controller.signal).then(pokemon => {
      if (!controller.signal.aborted) setResult({ key, pokemon, hasError: false })
    }).catch(() => {
      if (controller.signal.aborted) return
      setResult({ key, pokemon: [], hasError: true })
      controller.abort()
    })
    return () => controller.abort()
  }, [key, attempt])

  function retry() {
    setResult({ key: '', pokemon: [], hasError: false })
    setAttempt(previous => previous + 1)
  }

  // Do not show the previous trainer's results while the next team is loading.
  return {
    pokemon: result.key === key ? result.pokemon : [],
    isLoading: result.key !== key,
    hasError: result.key === key && result.hasError,
    retry,
  }
}
