import type { ApiError } from '@/types';
import { HTTP_STATUS } from '@/constants';

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'statusCode' in error
  );
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) return error.message;
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}

export function handleApiError(error: unknown): void {
  if (!isApiError(error)) {
    console.error('Unknown error:', error);
    return;
  }

  switch (error.statusCode) {
    case HTTP_STATUS.UNAUTHORIZED:
      // Could dispatch logout action here
      console.warn('Session expired. Please log in again.');
      break;
    case HTTP_STATUS.FORBIDDEN:
      console.warn('You do not have permission to perform this action.');
      break;
    case HTTP_STATUS.NOT_FOUND:
      console.warn('Resource not found.');
      break;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      console.error('Server error. Please try again later.');
      break;
    default:
      console.error('API Error:', error.message);
  }
}
