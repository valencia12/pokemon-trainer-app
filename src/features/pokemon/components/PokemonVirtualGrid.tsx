import { useEffect, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { texts } from '../../../lib/config'
import config from '../../../config/pokemon.json'
import type { Pokemon } from '../types/pokemon'
import { PokemonCard } from './PokemonCard'

interface PokemonVirtualGridProps {
  pokemon: Pokemon[]
  selectedIds: number[]
  onToggle: (id: number) => void
}

export function PokemonVirtualGrid({ pokemon, selectedIds, onToggle }: PokemonVirtualGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(2)
  useEffect(() => {
    const element = scrollRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width
      setColumns(width >= 800 ? 4 : width >= 540 ? 3 : 2)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // Virtualizer reads mutable scroll measurements; keep this hook outside compiler memoization.
  // oxlint-disable-next-line react/incompatible-library
  const rows = useVirtualizer({
    count: Math.ceil(pokemon.length / columns),
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 260,
    overscan: 2,
  })

  useEffect(() => {
    rows.measure()
  }, [columns, rows])

  return (
    <div ref={scrollRef} role="region" aria-label={texts.team.catalogLabel} tabIndex={0}
      className="h-[70dvh] max-h-[720px] min-h-64 overflow-y-auto p-1 focus-visible:outline-3 focus-visible:outline-focus">
      <div className="relative w-full" style={{ height: rows.getTotalSize() }}>
        {rows.getVirtualItems().map(row => (
          <div key={row.key} data-index={row.index} ref={rows.measureElement}
            className="absolute left-0 top-0 grid w-full gap-3 pb-3"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, transform: `translateY(${row.start}px)` }}>
            {pokemon.slice(row.index * columns, (row.index + 1) * columns).map(item => (
              <PokemonCard key={item.id} pokemon={item} selected={selectedIds.includes(item.id)}
                disabled={selectedIds.length >= config.teamSize && !selectedIds.includes(item.id)}
                onToggle={() => onToggle(item.id)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
