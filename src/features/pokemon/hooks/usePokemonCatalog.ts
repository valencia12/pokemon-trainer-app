import { useEffect, useState } from 'react'
import { getGenerationPokemon } from '../services/pokemonService'
import type { Pokemon } from '../types/pokemon'

export function usePokemonCatalog() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    getGenerationPokemon(controller.signal).then(result => {
      if (controller.signal.aborted) return
      setPokemon(result)
      setHasError(false)
      setIsLoading(false)
    }).catch(() => {
      if (controller.signal.aborted) return
      setHasError(true)
      setIsLoading(false)
      controller.abort()
    })
    return () => controller.abort()
  }, [attempt])

  function retry() {
    setHasError(false)
    setIsLoading(true)
    setAttempt(previous => previous + 1)
  }

  return { pokemon, isLoading, hasError, retry }
}
