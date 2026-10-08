import { Link, NavLink, Outlet } from 'react-router-dom'
import { routes, texts } from '../../lib/config'
import { useTrainer } from '../../hooks/useTrainer'

export function AppLayout() {
  const { storageError } = useTrainer()
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to={routes.setup}>{texts.app.title}</Link>
        <nav aria-label={texts.app.navigation}>
          <NavLink to={routes.setup}>{texts.navigation.setup}</NavLink>
          <NavLink to={routes.team}>{texts.navigation.team}</NavLink>
          <NavLink to={routes.profile}>{texts.navigation.profile}</NavLink>
        </nav>
      </header>
      <main>
        {storageError && <p role="alert" className="storage-warning">{texts.common.storageError}</p>}
        <Outlet />
      </main>
    </div>
  )
}
