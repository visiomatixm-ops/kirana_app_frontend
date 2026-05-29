// ─── App Constants ─────────────────────────────────────────────────────────────
export const APP_NAME = 'Kirana Billing';
export const APP_VERSION = '1.0.0';

// ─── Storage Keys ─────────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'kirana_auth_token',
  USER: 'kirana_user',
  SHOP: 'kirana_shop',
  THEME: 'kirana_theme',
  LANGUAGE: 'kirana_language',
  APP_STATE: 'kirana_app_state',
} as const;

// ─── Payment Methods ──────────────────────────────────────────────────────────
export const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash' },
  { id: 'upi', label: 'UPI' },
  { id: 'card', label: 'Card' },
  { id: 'credit', label: 'Credit' },
] as const;

// ─── Units ────────────────────────────────────────────────────────────────────
export const PRODUCT_UNITS = ['pcs', 'kg', 'g', 'litre', 'ml', 'dozen', 'packet', 'box'] as const;

// ─── Subscription Plans ───────────────────────────────────────────────────────
export const SUBSCRIPTION_PLANS = {
  STARTER: 'starter',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
} as const;

// ─── Navigation Screens ───────────────────────────────────────────────────────
export const SCREENS = {
  SPLASH: 'splash',
  WELCOME: 'welcome',
  LOGIN: 'login',
  SETUP: 'setup',
  MAIN: 'main',
} as const;

export const MAIN_SCREENS = {
  DASHBOARD: 'dashboard',
  BILLING: 'billing',
  INVENTORY: 'inventory',
  KHATA: 'khata',
  REPORTS: 'reports',
  SETTINGS: 'settings',
} as const;

// ─── HTTP Status Codes ────────────────────────────────────────────────────────
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// ─── Pagination ───────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// ─── Date Formats ─────────────────────────────────────────────────────────────
export const DATE_FORMATS = {
  DISPLAY: 'dd MMM yyyy',
  DISPLAY_WITH_TIME: 'dd MMM yyyy, hh:mm a',
  API: 'yyyy-MM-dd',
  TIME: 'hh:mm a',
} as const;
