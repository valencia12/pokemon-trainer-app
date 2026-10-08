import { Navigate, Outlet } from 'react-router-dom'
import { useTrainer } from '../../hooks/useTrainer'
import { routes } from '../../lib/config'

export function RequireTrainer({ requireTeam = false }: { requireTeam?: boolean }) {
  const { state } = useTrainer()
  if (!state.trainer) return <Navigate to={routes.home} replace />
  if (requireTeam && state.team.length !== 3) return <Navigate to={routes.team} replace />
  return <Outlet />
}
