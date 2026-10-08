import type { ReactNode } from 'react'

interface EmptyStateProps {
  image: string
  title: string
  description: string
  action: ReactNode
}

export function EmptyState({ image, title, description, action }: EmptyStateProps) {
  return (
    <div className="py-3 text-center">
      <img src={image} alt="" width="640" height="426" className="mx-auto mb-4 aspect-[3/2] w-full max-w-110 object-contain" />
      <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{title}</h3>
      <p className="mx-auto mt-2 mb-6 text-sm sm:text-base">{description}</p>
      {action}
    </div>
  )
}
