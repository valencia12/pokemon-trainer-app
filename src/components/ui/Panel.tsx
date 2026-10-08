import type { ReactNode } from 'react'
import { Icon } from './Icon'
import type { IconName } from './Icon'

interface PanelProps {
  title: string
  description: string
  icon: IconName
  children: ReactNode
}

export function Panel({ title, description, icon, children }: PanelProps) {
  return (
    <section className="min-w-0 rounded-2xl border border-line/70 bg-surface p-5 shadow-[0_8px_40px_rgb(0_0_0/3%)] sm:p-6">
      <header className="mb-7 flex items-start gap-3">
        <span className="flex h-7 shrink-0 items-center text-muted"><Icon name={icon} className="size-5" /></span>
        <div><h2 className="text-lg font-bold tracking-tight text-ink">{title}</h2><p className="mt-1 mb-0 text-sm">{description}</p></div>
      </header>
      {children}
    </section>
  )
}
