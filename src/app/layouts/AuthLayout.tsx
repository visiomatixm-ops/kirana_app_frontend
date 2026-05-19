import { Outlet } from 'react-router';

/**
 * AuthLayout
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-screen layout for onboarding/auth screens.
 * No BottomNav, no sidebar — clean slate for Splash, Welcome, Login, Setup.
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Outlet />
    </div>
  );
}
