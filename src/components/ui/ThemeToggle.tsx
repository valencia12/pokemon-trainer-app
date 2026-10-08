import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { texts } from '../../lib/config'
import { applyTheme, getSavedTheme, getStoredTheme, saveTheme } from '../../lib/theme'

export function ThemeToggle() {
  const [theme, setTheme] = useState(getSavedTheme)
  const isDark = theme === 'dark'
  const manuallySelected = useRef(false)

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    function followSystem() {
      if (manuallySelected.current || getStoredTheme() !== null) return
      const nextTheme = systemTheme.matches ? 'dark' : 'light'
      applyTheme(nextTheme, true)
      setTheme(nextTheme)
    }
    systemTheme.addEventListener('change', followSystem)
    followSystem()
    return () => systemTheme.removeEventListener('change', followSystem)
  }, [])

  function toggleTheme() {
    const nextTheme = isDark ? 'light' : 'dark'
    manuallySelected.current = true
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
