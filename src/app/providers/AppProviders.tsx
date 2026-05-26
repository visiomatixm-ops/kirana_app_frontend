import type { ReactNode } from 'react';
import { AuthProvider }      from '@/context/AuthContext';
import { AppStateProvider }  from '@/context/AppStateContext';
import { ToastProvider }     from '@/components/toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
 *   GoogleOAuthProvider→ Google Sign-In Context
 */
export default function AppProviders({ children }: AppProvidersProps) {
  // Replace with your actual Google Client ID, preferably from env: import.meta.env.VITE_GOOGLE_CLIENT_ID
  const clientId = "1002767618414-bh0dliellal3b3r7apsf1mj8dq14ivr6.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ToastProvider>
        <AuthProvider>
          <AppStateProvider>
            {children}
          </AppStateProvider>
        </AuthProvider>
      </ToastProvider>
    </GoogleOAuthProvider>
  );
}
