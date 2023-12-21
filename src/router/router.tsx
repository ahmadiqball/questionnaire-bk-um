import type { RouteObject } from 'react-router-dom';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { PageLanding } from '../pages/page-landing';
import { PageLayout } from '../pages/page-layout';
import { PageStart } from '../pages/page-start';
import { PageCounselor } from '../pages/page-counselor';
import { PageAddSession } from '../pages/page-add-session';
import { PageSession } from '../pages/page-session';
import { PageSessionList } from '../pages/page-session-list';
import { PageGuide } from '../pages/page-guide';
import { PageStartAssessment } from '../pages/page-start-assessment';
import { PageAssessment } from '../pages/page-assessment';
import { PageAssessmentResult } from '../pages/page-assessment-result';
import { PageTeam } from '../pages/page-team';

const routes: RouteObject[] = [
  {
    errorElement: <Navigate replace to='/' />
  },
  {
    Component: PageLayout,
    path: '/',
    id: 'root',
    children: [ 
      {
        Component: PageLanding,
        index: true
      },
      {
        Component: PageStart,
        path: '/start'
      },
      {
        Component: PageCounselor,
        path: '/counselor'
      },
      {
        Component: PageStart,
        path: '/counselor/start'
      },
      {
        Component: PageAddSession,
        path: '/counselor/add-session'
      },
      {
        Component: PageSessionList,
        path: '/counselor/session'
      },
      {
        Component: PageSession,
        path: '/counselor/session/:sessionId'
      },
      {
        Component: PageGuide,
        path: '/guide'
      },
      {
        Component: PageTeam,
        path: '/team'
      },
      {
        Component: PageStartAssessment,
        path: '/assessment/start'
      },
      {
        Component: PageAssessment,
        path: '/assessment/:assessmentId'
      },
      {
        Component: PageAssessmentResult,
        path: '/assessment/:assessmentId/result'
      },
    ]
  }
]

export const router = createBrowserRouter(routes)