import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { ROUTES } from './routeConstants';

const SplashScreen  = lazy(() => import('@/features/auth/pages/SplashScreen'));
const WelcomeScreen = lazy(() => import('@/features/auth/pages/WelcomeScreen'));
const LoginScreen   = lazy(() => import('@/features/auth/pages/LoginScreen'));
const ShopSetup     = lazy(() => import('@/features/auth/pages/ShopSetup'));

/**
 * authRoutes
 * ─────────────────────────────────────────────────────────────────────────────
 * Onboarding / auth flow routes.
 * These pages use AuthLayout (no BottomNav, no sidebar).
 * Navigation callbacks are wired via React Router's useNavigate.
 */
export const authRoutes: RouteObject[] = [
  {
    path: ROUTES.SPLASH,
    element: <SplashScreen onComplete={() => {}} />,
    // onComplete is wired in AppRoutes via the NavigationBridge
  },
  {
    path: ROUTES.WELCOME,
    element: <WelcomeScreen onGetStarted={() => {}} />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginScreen onLogin={() => {}} onBack={() => {}} />,
  },
  {
    path: ROUTES.SETUP,
    element: <ShopSetup onComplete={() => {}} />,
  },
];
