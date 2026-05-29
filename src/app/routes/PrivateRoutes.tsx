import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { ROUTES } from './routeConstants';
import {
  DashboardAdapter,
  BillingAdapter,
  InventoryAdapter,
  KhataAdapter,
  ReportsAdapter,
  SettingsAdapter,
} from './PageAdapters';

/**
 * privateRoutes
 * ─────────────────────────────────────────────────────────────────────────────
 * Route definitions for authenticated /app/* pages.
 * These are served inside MainLayout (with BottomNav + page transitions).
 * The parent ProtectedRoute handles auth redirects.
 *
 * Imported by AppRoutes.tsx — do not use standalone.
 */
export const privateRoutes: RouteObject[] = [
  // /app  →  redirect to /app/dashboard
  { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
  { path: 'dashboard', element: <DashboardAdapter /> },
  { path: 'billing',   element: <BillingAdapter />   },
  { path: 'inventory', element: <InventoryAdapter /> },
  { path: 'khata',     element: <KhataAdapter />     },
  { path: 'reports',   element: <ReportsAdapter />   },
  { path: 'settings',  element: <SettingsAdapter />  },
];
