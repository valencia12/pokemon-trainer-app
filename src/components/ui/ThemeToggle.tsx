import { useState } from 'react'
import { Icon } from './Icon'
import { texts } from '../../lib/config'
import { getSavedTheme, saveTheme } from '../../lib/theme'

export function ThemeToggle() {
  const [theme, setTheme] = useState(getSavedTheme)
  const isDark = theme === 'dark'

  function toggleTheme() {
    const nextTheme = isDark ? 'light' : 'dark'
    saveTheme(nextTheme)
    setTheme(nextTheme)
  }

  return (
    <button type="button" onClick={toggleTheme} aria-pressed={isDark}
      aria-label={texts.theme.toggle} title={isDark ? texts.theme.dark : texts.theme.light}
      className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-brand hover:bg-brand-soft aria-pressed:text-accent focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-focus">
      <Icon name="moon" className="size-5" fill={isDark ? 'currentColor' : 'none'} />
    </button>
  )
}
