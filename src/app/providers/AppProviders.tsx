import type { ReactNode } from 'react';
import { AuthProvider }      from '@/context/AuthContext';
import { AppStateProvider }  from '@/context/AppStateContext';
import { ToastProvider }     from '@/components/toast';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders
 * ─────────────────────────────────────────────────────────────────────────────
 * Root provider tree. React Router's RouterProvider sits OUTSIDE this tree
 * (in main.tsx) so that useNavigate / useLocation work inside all providers.
 *
 * Provider order (outer → inner):
 *   ToastProvider      → UI notifications, no deps
 *   AuthProvider       → auth state + localStorage token
 *   AppStateProvider   → legacy screen state (kept for backward compat)
 */
export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppStateProvider>
          {children}
        </AppStateProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
