import { siteConfig } from '@/configs/site';
import { NotFoundPage } from '@/pages';

export const fallbackRoutes = [
  {
    path: siteConfig.paths.notFound(),
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  }
];