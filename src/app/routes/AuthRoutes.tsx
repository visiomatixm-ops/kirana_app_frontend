import type { RouteObject } from 'react-router';
import { ROUTES } from './routeConstants';
import {
  LoginAdapter,
  ShopSetupAdapter,
  SplashAdapter,
  WelcomeAdapter,
} from './PageAdapters';

/**
 * authRoutes
 * Onboarding / auth flow routes with real navigation and auth handlers.
 */
export const authRoutes: RouteObject[] = [
  {
    path: ROUTES.SPLASH,
    element: <SplashAdapter />,
  },
  {
    path: ROUTES.WELCOME,
    element: <WelcomeAdapter />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginAdapter />,
  },
  {
    path: ROUTES.SETUP,
    element: <ShopSetupAdapter />,
  },
];
