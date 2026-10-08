import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import loadingPokemon from '../../assets/loading-pokemon.gif'
import { texts } from '../../lib/config'

interface LoadingOverlayProps {
  isLoading: boolean
  message?: string
}

export function LoadingOverlay({ isLoading, message = texts.common.loading }: LoadingOverlayProps) {
  useEffect(() => {
    if (!isLoading) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [isLoading])

  if (!isLoading) return null

  return createPortal(
    <div className="fixed inset-0 z-[1000] grid cursor-wait place-items-center bg-black/75 p-6">
      <div className="flex max-w-full flex-col items-center gap-4" role="status" aria-live="polite" aria-atomic="true">
        <img className="block max-h-[65vh] w-[min(320px,75vw)] rounded-2xl object-contain" src={loadingPokemon} alt="" />
        <span className="text-center text-lg font-semibold text-white">{message}</span>
      </div>
    </div>,
    document.body,
  )
}
