export const ROUTES = {
  SPLASH: '/',

  WELCOME: '/welcome',

  LOGIN: '/login',

  SETUP: '/setup',

  APP: '/app',

  DASHBOARD: '/app/dashboard',

  BILLING: '/app/billing',

  INVENTORY: '/app/inventory',

  KHATA: '/app/khata',

  REPORTS: '/app/reports',

  SETTINGS: '/app/settings',
};

export function pathnameToScreen(pathname: string): string | null {
  // Normalise to remove trailing slashes
  const normalized = pathname.replace(/\/+$/, '');

  if (normalized.startsWith('/app/dashboard')) return 'dashboard';
  if (normalized.startsWith('/app/inventory')) return 'inventory';
  if (normalized.startsWith('/app/billing')) return 'billing';
  if (normalized.startsWith('/app/khata')) return 'khata';
  if (normalized.startsWith('/app/settings')) return 'settings';

  return null;
}
