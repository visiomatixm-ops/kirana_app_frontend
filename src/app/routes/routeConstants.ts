// ─── Route Path Constants ──────────────────────────────────────────────────────
// All application routes are defined here.
// Never hardcode route strings elsewhere — always import from here.

export const ROUTES = {
  // ── Public / Onboarding ────────────────────────────────────────────────────
  SPLASH:   '/',
  WELCOME:  '/welcome',
  LOGIN:    '/login',
  SETUP:    '/setup',

  // ── Protected / Main App ──────────────────────────────────────────────────
  APP:       '/app',
  DASHBOARD: '/app/dashboard',
  BILLING:   '/app/billing',
  INVENTORY: '/app/inventory',
  KHATA:     '/app/khata',
  REPORTS:   '/app/reports',
  SETTINGS:  '/app/settings',

  // ── Utility ───────────────────────────────────────────────────────────────
  NOT_FOUND: '*',
} as const;

export type RouteKey  = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

/** All screens that live inside the main app shell with BottomNav */
export const MAIN_SCREENS = [
  'dashboard',
  'billing',
  'inventory',
  'khata',
  'reports',
  'settings',
] as const;

export type MainScreenId = (typeof MAIN_SCREENS)[number];

/** Maps a URL pathname to the MainScreen id */
export function pathnameToScreen(pathname: string): MainScreenId {
  const seg = pathname.split('/').pop() ?? 'dashboard';
  return (MAIN_SCREENS as readonly string[]).includes(seg)
    ? (seg as MainScreenId)
    : 'dashboard';
}
