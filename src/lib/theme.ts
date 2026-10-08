export type Theme = 'light' | 'dark'
const storageKey = 'pokemon-trainer:theme'
let transitionTimer: ReturnType<typeof setTimeout> | undefined

export function getStoredTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(storageKey)
    return saved === 'dark' || saved === 'light' ? saved : null
  } catch {
    return null
  }
}

export function getSavedTheme(): Theme {
  return getStoredTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

export function applyTheme(theme: Theme, animate = false) {
  const root = document.documentElement
  if (animate && root.dataset.theme !== theme && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    clearTimeout(transitionTimer)
    root.dataset.themeTransition = 'true'
    transitionTimer = setTimeout(() => { delete root.dataset.themeTransition }, 320)
  }
  root.dataset.theme = theme
  root.style.colorScheme = theme
}

export function saveTheme(theme: Theme) {
  applyTheme(theme, true)
  try {
    localStorage.setItem(storageKey, theme)
  } catch {
    // Keep the selected theme for this session if storage is unavailable.
  }
}
