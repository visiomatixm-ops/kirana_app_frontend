import { Navigate } from 'react-router';
import type { ReactNode } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { ROUTES } from '@/app/routes/routeConstants';

interface GuestGuardProps { children: ReactNode; }

/** GuestGuard — redirects authenticated users to dashboard */
export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  if (!isLoading && isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <>{children}</>;
}
