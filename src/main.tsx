import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppProviders } from './app/providers/AppProviders'
import { router } from './app/router/router'
import { texts } from './lib/config'
import { applyTheme, getSavedTheme } from './lib/theme'
import './index.css'

applyTheme(getSavedTheme())

document.title = texts.app.title
document.documentElement.lang = 'es'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders><RouterProvider router={router} /></AppProviders>
  </StrictMode>,
)
