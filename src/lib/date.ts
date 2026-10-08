// Calendar dates use local time to avoid changing the day across time zones.
export function toDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(0)
  date.setFullYear(year, month - 1, day)
  date.setHours(0, 0, 0, 0)
  return toDateString(date) === value ? date : null
}

export function getMonthDays(year: number, month: number) {
  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7
  const days = new Date(year, month + 1, 0).getDate()
  const cells = Math.ceil((offset + days) / 7) * 7
  return Array.from({ length: cells }, (_, index) => index >= offset && index < offset + days ? index - offset + 1 : null)
}
