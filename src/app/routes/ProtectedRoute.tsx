import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthContext } from '@/context/AuthContext';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import { ROUTES } from './routeConstants';

/**
 * ProtectedRoute
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps any route that requires authentication.
 * Unauthenticated users are redirected to /login, with the originally
 * requested path saved in location.state so we can redirect back after login.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner fullScreen />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}
