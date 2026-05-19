import { Navigate, useLocation } from 'react-router';
import type { ReactNode } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import { ROUTES } from '@/app/routes/routeConstants';

interface AuthGuardProps { children: ReactNode; }

/**
 * AuthGuard — component-level guard (for wrapping individual components).
 * For route-level protection, use ProtectedRoute (Outlet-based).
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner fullScreen />;
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
