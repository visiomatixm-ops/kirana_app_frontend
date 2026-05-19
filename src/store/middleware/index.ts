/**
 * Store Middleware
 *
 * Middleware functions that can be applied to store actions for:
 * - Action logging
 * - Analytics tracking
 * - Side-effect orchestration
 *
 * These are thin wrappers — plug into Zustand's `middleware` or Redux Toolkit
 * depending on the store implementation chosen.
 */

import { logger } from '@/utils/logger';

// ─── Action Logger ────────────────────────────────────────────────────────────
/**
 * Wraps a store action to log it in development mode.
 */
export function withLogging<T extends (...args: unknown[]) => unknown>(
  actionName: string,
  action: T
): T {
  return ((...args: unknown[]) => {
    logger.debug(`[Store] ${actionName}`, args);
    return action(...args);
  }) as T;
}

// ─── Analytics Middleware ─────────────────────────────────────────────────────
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

type AnalyticsHandler = (event: AnalyticsEvent) => void;

let _analyticsHandler: AnalyticsHandler | null = null;

export function setAnalyticsHandler(handler: AnalyticsHandler): void {
  _analyticsHandler = handler;
}

export function trackEvent(name: string, properties?: Record<string, unknown>): void {
  if (_analyticsHandler) {
    _analyticsHandler({ name, properties });
  }
  logger.debug(`[Analytics] ${name}`, properties);
}
