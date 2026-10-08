import type { InputHTMLAttributes } from 'react'
import { Icon } from './Icon'
import type { IconName } from './Icon'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
  hint?: string
  icon?: IconName
}

export function FormField({ id, label, error, hint, icon, required, className, ...props }: FormFieldProps) {
  const descriptions = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label className="font-semibold" htmlFor={id}>{label}{required && <span aria-hidden="true" className="text-danger"> *</span>}</label>
      <div className="relative">
        {icon && <Icon name={icon} className="pointer-events-none absolute top-3.5 left-3 size-5 text-muted" />}
        <input className={`w-full rounded-[10px] border border-input-border bg-surface px-3.5 py-3 text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand aria-invalid:border-danger file:mr-3 file:rounded-md file:bg-brand-soft file:px-3 file:py-1 file:text-brand ${icon ? 'pl-10' : ''} ${className ?? ''}`} {...props} id={id} required={required} aria-invalid={Boolean(error)} aria-describedby={descriptions || undefined} />
      </div>
      {hint && <small className="text-sm leading-normal text-muted" id={`${id}-hint`}>{hint}</small>}
      {error && <span id={`${id}-error`} className="text-sm text-danger">{error}</span>}
    </div>
  )
}
