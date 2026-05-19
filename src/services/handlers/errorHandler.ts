import type { ApiError } from '@/types';
import { HTTP_STATUS } from '@/constants';
import { logger } from '@/utils/logger';

/**
 * Central handler for API-level errors.
 * Returns a user-friendly message for display in the UI.
 */
export function handleHttpError(error: ApiError): string {
  logger.error('[HTTP Error]', `${error.statusCode}: ${error.message}`);

  switch (error.statusCode) {
    case HTTP_STATUS.BAD_REQUEST:
      return error.message || 'Invalid request. Please check your input.';

    case HTTP_STATUS.UNAUTHORIZED:
      return 'Your session has expired. Please log in again.';

    case HTTP_STATUS.FORBIDDEN:
      return 'You do not have permission to perform this action.';

    case HTTP_STATUS.NOT_FOUND:
      return 'The requested resource was not found.';

    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return 'Something went wrong on our end. Please try again later.';

    default:
      return error.message || 'An unexpected error occurred.';
  }
}

/**
 * Extract field-level validation errors from an API error response.
 * Returns a flat map of { fieldName: firstErrorMessage }
 */
export function extractFieldErrors(
  error: ApiError
): Record<string, string> {
  if (!error.errors) return {};
  return Object.fromEntries(
    Object.entries(error.errors).map(([field, messages]) => [
      field,
      messages[0] ?? 'Invalid value',
    ])
  );
}
