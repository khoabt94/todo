import { RouteObject, useRoutes } from 'react-router-dom';
import { unauthRoutes } from './unauth';
import { ProtectedRoute, RootLayout, UnauthRoute } from '@/components/common';
import { privateRoutes } from './private';
import { fallbackRoutes } from './fallback';

type Route = {
  path: string;
  element: JSX.Element;
};


export function AppRoutes() {
  const parseRouteObjects = (
    routes: Route[],
    isPrivate: boolean = false
  ): RouteObject[] => {
    return routes.map((route) => ({
      path: route.path,
      element: isPrivate ? (
        <ProtectedRoute>{route.element}</ProtectedRoute>
      ) : (
        <UnauthRoute>{route.element}</UnauthRoute>
      ),
    }));
  };

  const unauthRouteObjects = parseRouteObjects(unauthRoutes);
  const privateRouteObjects = parseRouteObjects(privateRoutes, true);
  const fallbackRouteObjects = parseRouteObjects(fallbackRoutes);

  const routes = [
    ...unauthRouteObjects,
    ...privateRouteObjects,
    ...fallbackRouteObjects,
  ];

  const allRoutes = useRoutes(routes);

  return <RootLayout>{allRoutes}</RootLayout>;
}