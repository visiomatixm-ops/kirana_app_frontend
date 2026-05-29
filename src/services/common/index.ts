/**
 * Common service utilities — query string builder, response transformers, etc.
 */

/**
 * Build a URL query string from a params object.
 * Skips null, undefined, and empty string values.
 */
export function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  }
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

/**
 * Extract paginated data defaults from a partial filters object
 */
export function withPagination(
  filters: Record<string, unknown> = {},
  page = 1,
  limit = 20
): Record<string, unknown> {
  return { ...filters, page, limit };
}
