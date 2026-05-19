/**
 * AppRoutes.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Central router configuration using React Router v7's createBrowserRouter.
 *
 * Architecture:
 *
 *   / (root)
 *   ├── AuthLayout                     ← no BottomNav, clean slate
 *   │   ├── /              SplashAdapter
 *   │   ├── /welcome       WelcomeAdapter
 *   │   ├── /login         LoginAdapter
 *   │   └── /setup         ShopSetupAdapter   (protected: needs auth token)
 *   │
 *   ├── /app               ProtectedRoute     ← redirects to /login if not authed
 *   │   └──  MainLayout                       ← BottomNav + page transitions
 *   │       ├── dashboard  DashboardAdapter
 *   │       ├── billing    BillingAdapter
 *   │       ├── inventory  InventoryAdapter
 *   │       ├── khata      KhataAdapter
 *   │       ├── reports    ReportsAdapter
 *   │       └── settings   SettingsAdapter
 *   │
 *   └── *                  NotFoundPage       ← 404
 */

import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout      from '@/app/layouts/AuthLayout';
import MainLayout      from '@/app/layouts/MainLayout';
import ProtectedRoute  from './ProtectedRoute';
import NotFoundPage    from './NotFoundPage';
import { ROUTES }      from './routeConstants';
import {
  SplashAdapter,
  WelcomeAdapter,
  LoginAdapter,
  ShopSetupAdapter,
  DashboardAdapter,
  BillingAdapter,
  InventoryAdapter,
  KhataAdapter,
  ReportsAdapter,
  SettingsAdapter,
} from './PageAdapters';

export const router = createBrowserRouter([
  // ── Auth / Onboarding ────────────────────────────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.SPLASH,  element: <SplashAdapter />  },
      { path: ROUTES.WELCOME, element: <WelcomeAdapter /> },
      { path: ROUTES.LOGIN,   element: <LoginAdapter />   },
      { path: ROUTES.SETUP,   element: <ShopSetupAdapter /> },
    ],
  },

  // ── Protected App ────────────────────────────────────────────────────────
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.APP,
        element: <MainLayout />,
        children: [
          // /app  →  redirect to /app/dashboard
          { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
          { path: 'dashboard', element: <DashboardAdapter /> },
          { path: 'billing',   element: <BillingAdapter />   },
          { path: 'inventory', element: <InventoryAdapter /> },
          { path: 'khata',     element: <KhataAdapter />     },
          { path: 'reports',   element: <ReportsAdapter />   },
          { path: 'settings',  element: <SettingsAdapter />  },
        ],
      },
    ],
  },

  // ── 404 ──────────────────────────────────────────────────────────────────
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
