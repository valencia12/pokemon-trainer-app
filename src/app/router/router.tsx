import { createBrowserRouter, Navigate } from 'react-router-dom'
import { routes } from '../../lib/config'
import TeamsPage from '../../pages/TeamsPage'
import HomePage from '../../pages/HomePage'
import TrainerSetupPage from '../../pages/TrainerSetupPage'
import TeamSelectionPage from '../../pages/TeamSelectionPage'
import TrainerReviewPage from '../../pages/TrainerReviewPage'
import TrainerProfilePage from '../../pages/TrainerProfilePage'
import { AppLayout } from './AppLayout'
import { RequireTrainer } from './RequireTrainer'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: routes.home, element: <HomePage /> },
      { path: routes.teams, element: <TeamsPage /> },
      { path: routes.setup, element: <TrainerSetupPage /> },
      { path: routes.newTrainer, element: <TrainerSetupPage /> },
      {
        element: <RequireTrainer />,
        children: [
          { path: routes.trainerReview, element: <TrainerReviewPage /> },
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
