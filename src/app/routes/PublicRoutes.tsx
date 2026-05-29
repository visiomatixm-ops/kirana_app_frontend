import type { RouteObject } from 'react-router';
import { ROUTES } from './routeConstants';
import {
  SplashAdapter,
  WelcomeAdapter,
  LoginAdapter,
  ShopSetupAdapter,
} from './PageAdapters';

/**
 * publicRoutes
 * ─────────────────────────────────────────────────────────────────────────────
 * Route definitions for the onboarding / auth flow.
 * These are served inside AuthLayout (no BottomNav).
 *
 * Imported by AppRoutes.tsx — do not use standalone.
 */
export const publicRoutes: RouteObject[] = [
  { path: ROUTES.SPLASH,  element: <SplashAdapter />    },
  { path: ROUTES.WELCOME, element: <WelcomeAdapter />   },
  { path: ROUTES.LOGIN,   element: <LoginAdapter />     },
  { path: ROUTES.SETUP,   element: <ShopSetupAdapter /> },
];
