export type Theme = 'light' | 'dark'
const storageKey = 'pokemon-trainer:theme'

export function getSavedTheme(): Theme {
  try {
    return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function saveTheme(theme: Theme) {
  applyTheme(theme)
  try {
    localStorage.setItem(storageKey, theme)
  } catch {
    // Keep the selected theme for this session if storage is unavailable.
  }
}
