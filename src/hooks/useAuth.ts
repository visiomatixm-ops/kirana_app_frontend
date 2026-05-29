import { useAuthContext } from '@/context/AuthContext';

/**
 * Hook to access authentication state and actions.
 * Must be used within AuthProvider.
 */
export function useAuth() {
  return useAuthContext();
}
