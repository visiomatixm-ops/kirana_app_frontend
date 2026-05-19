/**
 * Request/Response interceptors for the API client.
 *
 * These are applied in apiClient.ts via the `request` method.
 * Add cross-cutting concerns here: logging, retry, token refresh, etc.
 */

import { logger } from '@/utils/logger';
import { STORAGE_KEYS } from '@/constants';

// ─── Request Interceptor ──────────────────────────────────────────────────────
export function onRequest(url: string, init: RequestInit): RequestInit {
  logger.debug(`[API] ${init.method ?? 'GET'} ${url}`);
  return init;
}

// ─── Response Interceptor ─────────────────────────────────────────────────────
export async function onResponse(response: Response): Promise<Response> {
  if (response.status === 401) {
    // Token expired — clear stored credentials and reload
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch {}
    logger.warn('[API] 401 Unauthorized — session cleared');
  }
  return response;
}

// ─── Error Interceptor ────────────────────────────────────────────────────────
export function onRequestError(error: unknown): never {
  logger.error('[API] Request failed', error);
  throw error;
}
