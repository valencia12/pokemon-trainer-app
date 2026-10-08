import type { InputHTMLAttributes } from 'react'
import styles from './FormField.module.css'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
  hint?: string
}

export function FormField({ id, label, error, hint, required, ...props }: FormFieldProps) {
  const descriptions = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      <input {...props} id={id} required={required} aria-invalid={Boolean(error)} aria-describedby={descriptions || undefined} />
      {hint && <small id={`${id}-hint`}>{hint}</small>}
      {error && <span id={`${id}-error`} className={styles.error}>{error}</span>}
    </div>
  )
}
