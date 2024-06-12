import { siteConfig } from '@/configs/site';
import { AccountInfoPage, AccountPasswordPage, HomePage, ProjectDetailPage, TimelinePage } from '@/pages';

export const privateRoutes = [
  {
    path: siteConfig.paths.home(),
    element: <HomePage />,
  },
  {
    path: siteConfig.paths.projectTemplate(),
    element: <ProjectDetailPage />,
  },
  {
    path: siteConfig.paths.timelineTemplate(),
    element: <TimelinePage />,
  },
  {
    path: siteConfig.paths.accountInfo(),
    element: <AccountInfoPage />,
  },
  {
    path: siteConfig.paths.accountPassword(),
    element: <AccountPasswordPage />,
  }
];