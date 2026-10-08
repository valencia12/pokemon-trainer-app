import { useId } from 'react'
import { texts } from '../../lib/config'
import { getStatPercentage } from '../../lib/progress'

interface StatBarProps {
  label: string
  value: number | null
  maximum: number
}

export function StatBar({ label, value, maximum }: StatBarProps) {
  const id = useId()
  const percentage = value === null ? 0 : getStatPercentage(value, maximum)
  const valueText = value === null ? texts.common.unavailable : `${value} / ${maximum}`
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3 text-xs"><span id={id} className="text-muted">{label}</span><span className="shrink-0 font-semibold tabular-nums">{valueText}</span></div>
      <div role="progressbar" aria-labelledby={id} aria-valuemin={0} aria-valuemax={maximum} aria-valuenow={value === null ? undefined : Math.max(0, Math.min(maximum, value))} aria-valuetext={valueText} className="h-2 overflow-hidden rounded-full bg-brand-soft">
        <div className="h-full rounded-full bg-accent" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
