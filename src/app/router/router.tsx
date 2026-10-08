import { createBrowserRouter, Navigate } from 'react-router-dom'
import { routes } from '../../lib/config'
import HomePage from '../../pages/HomePage'
import TrainerSetupPage from '../../pages/TrainerSetupPage'
import TeamSelectionPage from '../../pages/TeamSelectionPage'
import TrainerProfilePage from '../../pages/TrainerProfilePage'
import { AppLayout } from './AppLayout'
import { RequireTrainer } from './RequireTrainer'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: routes.home, element: <HomePage /> },
      { path: routes.setup, element: <TrainerSetupPage /> },
      {
        element: <RequireTrainer />,
        children: [
          { path: routes.team, element: <TeamSelectionPage /> },
          {
            element: <RequireTrainer requireTeam />,
            children: [{ path: routes.profile, element: <TrainerProfilePage /> }],
          },
        ],
      },
      { path: '*', element: <Navigate to={routes.home} replace /> },
    ],
  },
])
