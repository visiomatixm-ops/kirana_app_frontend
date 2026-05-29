import { appConfig } from '@/app/config/appConfig';

/**
 * Format a number as Indian Rupees currency string.
 * e.g. 1234.5 → "₹1,234.50"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(appConfig.currency.locale, {
    style: 'currency',
    currency: appConfig.currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a number with Indian comma notation.
 * e.g. 123456 → "1,23,456"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat(appConfig.currency.locale).format(value);
}

/**
 * Calculate percentage
 */
export function calcPercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Round to 2 decimal places
 */
export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
