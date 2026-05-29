/**
 * Page Adapters
 * ─────────────────────────────────────────────────────────────────────────────
 * These thin wrappers bridge the existing component API (prop-based callbacks)
 * to React Router's URL-based navigation — without touching any existing UI.
 *
 * Each adapter:
 *   1. Reads route params / location if needed
 *   2. Converts useNavigate() into the onNavigate / onLogin / etc. callbacks
 *      that the existing page components expect
 *   3. Renders the original page 100% unchanged
 *
 * Each Suspense fallback now uses the branded KiranaPageLoader with the
 * correct per-page variant — so the skeleton matches the real page layout
 * and there is no blank-white flash during lazy-load.
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useToast } from '@/components/toast';
import KiranaPageLoader from '@/components/loaders/KiranaPageLoader';
import { ROUTES } from './routeConstants';

// ── Lazy pages ──────────────────────────────────────────────────────────────
const SplashScreen    = lazy(() => import('@/features/auth/pages/SplashScreen'));
const WelcomeScreen   = lazy(() => import('@/features/auth/pages/WelcomeScreen'));
const LoginScreen     = lazy(() => import('@/features/auth/pages/LoginScreen') as Promise<{ default: React.ComponentType<any> }>);
const ShopSetup       = lazy(() => import('@/features/auth/pages/ShopSetup'));
const Dashboard       = lazy(() => import('@/features/dashboard/pages/Dashboard'));
const BillingScreen   = lazy(() => import('@/features/billing/pages/BillingScreen'));
const InventoryScreen = lazy(() => import('@/features/inventory/pages/InventoryScreen'));
const KhataScreen     = lazy(() => import('@/features/customers/pages/KhataScreen'));
const ReportsScreen   = lazy(() => import('@/features/reports/pages/ReportsScreen'));
const SettingsScreen  = lazy(() => import('@/features/settings/pages/SettingsScreen'));

// ── Splash ──────────────────────────────────────────────────────────────────
export function SplashAdapter() {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<KiranaPageLoader variant="default" />}>
      <SplashScreen onComplete={() => navigate(ROUTES.WELCOME)} />
    </Suspense>
  );
}

// ── Welcome ─────────────────────────────────────────────────────────────────
export function WelcomeAdapter() {
  const navigate = useNavigate();
  const { loginDemo } = useAuthContext();

  return (
    <Suspense fallback={<KiranaPageLoader variant="default" />}>
      <WelcomeScreen
        onGetStarted={() => {
          navigate(ROUTES.LOGIN, { replace: true });
        }}
        onSkipDemo={() => {
          loginDemo();
          navigate(ROUTES.DASHBOARD, { replace: true });
        }}
      />
    </Suspense>
  );
}

// ── Login ────────────────────────────────────────────────────────────────────
export function LoginAdapter() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const toast = useToast();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ??
    ROUTES.DASHBOARD;

  const handleLogin = (user: Parameters<typeof login>[0], token: string) => {
    // Save session
    login(user, token);
    toast.success('Welcome back!');

    // If user has a shopId, go to dashboard; otherwise go to shop setup
    if ((user as any)?.shopId) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    } else {
      navigate(ROUTES.SETUP, { replace: true });
    }
  };

  return (
    <Suspense fallback={<KiranaPageLoader variant="default" />}>
      <LoginScreen
        onLogin={handleLogin}
        onBack={() => navigate(ROUTES.WELCOME)}
      />
    </Suspense>
  );
}

// ── Shop Setup ───────────────────────────────────────────────────────────────
export function ShopSetupAdapter() {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Suspense fallback={<KiranaPageLoader variant="default" />}>
      <ShopSetup
        onComplete={() => {
          toast.success('Shop setup complete!');
          navigate(ROUTES.DASHBOARD, { replace: true });
        }}
      />
    </Suspense>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export function DashboardAdapter() {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<KiranaPageLoader variant="dashboard" />}>
      <Dashboard onNavigate={(screen) => navigate(`/app/${screen}`)} />
    </Suspense>
  );
}

// ── Billing ──────────────────────────────────────────────────────────────────
export function BillingAdapter() {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<KiranaPageLoader variant="billing" />}>
      <BillingScreen
        activeScreen="billing"
        onNavigate={(screen) => navigate(`/app/${screen}`)}
      />
    </Suspense>
  );
}

// ── Inventory ────────────────────────────────────────────────────────────────
export function InventoryAdapter() {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<KiranaPageLoader variant="inventory" />}>
      <InventoryScreen
        activeScreen="inventory"
        onNavigate={(screen) => navigate(`/app/${screen}`)}
      />
    </Suspense>
  );
}

// ── Khata ────────────────────────────────────────────────────────────────────
export function KhataAdapter() {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<KiranaPageLoader variant="khata" />}>
      <KhataScreen
        activeScreen="khata"
        onNavigate={(screen) => navigate(`/app/${screen}`)}
      />
    </Suspense>
  );
}

// ── Reports ──────────────────────────────────────────────────────────────────
export function ReportsAdapter() {
  return (
    <Suspense fallback={<KiranaPageLoader variant="reports" />}>
      <ReportsScreen />
    </Suspense>
  );
}

// ── Settings ─────────────────────────────────────────────────────────────────
export function SettingsAdapter() {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<KiranaPageLoader variant="settings" />}>
      <SettingsScreen
        activeScreen="settings"
        onNavigate={(screen) => navigate(`/app/${screen}`)}
      />
    </Suspense>
  );
}
