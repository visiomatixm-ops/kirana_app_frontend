import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { ROUTES } from './routeConstants';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';

/**
 * ProtectedRoute
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps any route that requires authentication.
 * Unauthenticated users are redirected to /login, with the originally
 * requested path saved in location.state so we can redirect back after login.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

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
