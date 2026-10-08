import { useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import calendarConfig from '../../config/calendar.json'
import { texts } from '../../lib/config'
import { getMonthDays, parseDate, toDateString } from '../../lib/date'
import { Icon } from './Icon'

interface DatePickerProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  max?: string
  min?: string
  required?: boolean
  error?: string
}

const buttonStyle = 'cursor-pointer rounded-lg p-2 text-sm hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-default disabled:opacity-30'

export function DatePicker({ id, label, value, onChange, max: maximum, min = calendarConfig.minDate, required, error }: DatePickerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const copy = texts.calendar
  const selected = parseDate(value)
  const [today] = useState(() => toDateString(new Date()))
  const max = maximum ?? today
  const initial = parseDate(value >= min && value <= max ? value : today < min ? min : today > max ? max : today)!
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() })
  const [focusedDate, setFocusedDate] = useState(toDateString(initial))
  const minYear = Number(min.slice(0, 4))
  const maxYear = Number(max.slice(0, 4))
  const days = getMonthDays(view.year, view.month)
  const monthStart = toDateString(new Date(view.year, view.month, 1))
  const monthEnd = toDateString(new Date(view.year, view.month + 1, 0))
  const displayDate = selected ? `${String(selected.getDate()).padStart(2, '0')}/${String(selected.getMonth() + 1).padStart(2, '0')}/${selected.getFullYear()}` : copy.placeholder

  function close() {
    dialogRef.current?.close()
    triggerRef.current?.focus()
  }

  function open() {
    setView({ year: initial.getFullYear(), month: initial.getMonth() })
    setFocusedDate(toDateString(initial))
    dialogRef.current?.showModal()
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLButtonElement>(`[data-date="${toDateString(initial)}"]`)?.focus())
  }

  function choose(date: string) {
    onChange(date)
    close()
  }

  function moveMonth(delta: number) {
    const target = new Date(view.year, view.month + delta, 1)
    setView({ year: target.getFullYear(), month: target.getMonth() })
    const first = toDateString(target)
    setFocusedDate(first < min ? min : first)
  }

  function keyboardDate(event: KeyboardEvent<HTMLButtonElement>, date: string) {
    const target = parseDate(date)!
    const offsets: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }
    if (event.key in offsets) target.setDate(target.getDate() + offsets[event.key])
    else if (event.key === 'Home') target.setDate(target.getDate() - (target.getDay() + 6) % 7)
    else if (event.key === 'End') target.setDate(target.getDate() + 6 - (target.getDay() + 6) % 7)
    else if (event.key === 'PageUp' || event.key === 'PageDown') {
      const day = target.getDate()
      target.setDate(1)
      target.setMonth(target.getMonth() + (event.key === 'PageUp' ? -1 : 1))
      target.setDate(Math.min(day, new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()))
    } else return
    event.preventDefault()
    const next = toDateString(target)
    const clamped = next < min ? min : next > max ? max : next
    const nextDate = parseDate(clamped)!
    setView({ year: nextDate.getFullYear(), month: nextDate.getMonth() })
    setFocusedDate(clamped)
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLButtonElement>(`[data-date="${clamped}"]`)?.focus())
  }

  function backdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close()
  }

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className="font-semibold">{label}{required && <span className="text-danger" aria-hidden="true"> *</span>}</label>
      <button ref={triggerRef} id={id} type="button" onClick={open} aria-haspopup="dialog" aria-controls={`${id}-calendar`} aria-label={`${label}: ${displayDate}. ${copy.open}`} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
        className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[10px] border border-input-border bg-surface px-3.5 py-3 text-left focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand aria-invalid:border-danger">
        <span className={selected ? 'text-ink' : 'text-muted'}>{displayDate}</span><Icon name="calendar" className="size-5 shrink-0 text-brand" />
      </button>
      {error && <span id={`${id}-error`} className="text-sm text-danger">{error}</span>}
      <dialog ref={dialogRef} id={`${id}-calendar`} aria-labelledby={`${id}-calendar-title`} onClick={backdropClick} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_32px)] max-w-88 overflow-y-auto rounded-2xl border border-line bg-surface p-5 text-ink shadow-2xl backdrop:bg-black/60">
        <header className="mb-4 flex items-center justify-between gap-3"><h2 id={`${id}-calendar-title`} className="text-base font-bold">{label}</h2><button type="button" onClick={close} aria-label={copy.close} className={buttonStyle}><svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button></header>
        <div className="mb-4 flex items-center gap-2">
          <button type="button" className={buttonStyle} onClick={() => moveMonth(-1)} disabled={monthStart <= min} aria-label={copy.previous}><Icon name="arrow" className="size-4 rotate-180" /></button>
          <select aria-label={copy.month} value={view.month} onChange={event => { const month = Number(event.target.value); setView({ ...view, month }); const date = toDateString(new Date(view.year, month, 1)); setFocusedDate(date < min ? min : date) }} className="min-w-0 flex-1 rounded-lg border border-line bg-surface p-2 text-sm focus-visible:outline-brand">{copy.months.map((month, index) => <option key={month} value={index} disabled={toDateString(new Date(view.year, index, 1)) > max || toDateString(new Date(view.year, index + 1, 0)) < min}>{month}</option>)}</select>
          <select aria-label={copy.year} value={view.year} onChange={event => { const year = Number(event.target.value); const target = toDateString(new Date(year, view.month, 1)); const clamped = target < min ? min : target > max ? max : target; const date = parseDate(clamped)!; setView({ year: date.getFullYear(), month: date.getMonth() }); setFocusedDate(clamped) }} className="rounded-lg border border-line bg-surface p-2 text-sm focus-visible:outline-brand">{Array.from({ length: maxYear - minYear + 1 }, (_, index) => maxYear - index).map(year => <option key={year} value={year}>{year}</option>)}</select>
          <button type="button" className={buttonStyle} onClick={() => moveMonth(1)} disabled={monthEnd >= max} aria-label={copy.next}><Icon name="arrow" className="size-4" /></button>
        </div>
        <table className="w-full table-fixed border-separate border-spacing-1" aria-label={`${copy.months[view.month]} ${view.year}`}>
          <thead><tr>{copy.weekdays.map((day, index) => <th key={day} scope="col" className="pb-2 text-xs font-normal text-muted"><abbr title={day} className="no-underline">{copy.shortWeekdays[index]}</abbr></th>)}</tr></thead>
          <tbody>{Array.from({ length: days.length / 7 }, (_, week) => <tr key={week}>{days.slice(week * 7, week * 7 + 7).map((day, column) => {
            if (!day) return <td key={column} />
            const date = toDateString(new Date(view.year, view.month, day))
            const chosen = date === value
            return <td key={column}><button type="button" data-date={date} tabIndex={date === focusedDate ? 0 : -1} aria-pressed={chosen} aria-current={date === today ? 'date' : undefined} aria-label={`${day} ${copy.months[view.month]} ${view.year}`} disabled={date < min || date > max} onClick={() => choose(date)} onKeyDown={event => keyboardDate(event, date)} className={`flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand disabled:cursor-default disabled:opacity-25 ${chosen ? 'bg-accent font-bold text-accent-ink' : date === today ? 'border border-brand text-brand hover:bg-brand-soft' : 'hover:bg-brand-soft'}`}>{day}</button></td>
          })}</tr>)}</tbody>
        </table>
        <footer className="mt-4 flex justify-between border-t border-line pt-3"><button type="button" className={`${buttonStyle} text-muted`} onClick={() => choose('')}>{copy.clear}</button><button type="button" className={`${buttonStyle} font-semibold text-brand`} disabled={today < min || today > max} onClick={() => choose(today)}>{copy.today}</button></footer>
      </dialog>
    </div>
  )
}
