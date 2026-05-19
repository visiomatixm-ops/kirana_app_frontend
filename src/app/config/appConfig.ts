import { env } from './env';

export const appConfig = {
  appName: 'Kirana Billing',
  appVersion: env.appVersion,
  apiBaseUrl: env.apiBaseUrl,
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'hi', 'mr', 'ta', 'te', 'kn', 'bn'],
  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
  },
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },
  toast: {
    duration: 3000,
    position: 'top-center' as const,
  },
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
} as const;
