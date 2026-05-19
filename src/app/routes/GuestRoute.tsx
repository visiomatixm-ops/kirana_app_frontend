import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '@/context/AuthContext';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import { ROUTES } from './routeConstants';

/**
 * GuestRoute (AuthRoutes wrapper)
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps public/auth-only routes (Splash, Welcome, Login, Setup).
 * If the user is already authenticated, they're redirected to the main app.
 */
export default function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) return <LoadingSpinner fullScreen />;

  // Don't redirect if user hasn't finished setup yet
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}
