import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface MenuCardProps {
  title: string
  description?: string
  to: string
  children?: ReactNode
}

export function MenuCard({ title, description, to, children }: MenuCardProps) {
  return (
    <Link to={to} className="block rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand hover:bg-brand-soft focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-focus">
      <h2 className="text-lg font-semibold text-brand">{title}</h2>
      {description && <p className="mb-0 text-sm">{description}</p>}
      {children}
    </Link>
  )
}
