import { useState, useEffect, useCallback, useRef } from 'react';
import type { ApiResponse } from '@/types';
import { getErrorMessage } from '@/services/api/apiErrorHandler';
import { logger } from '@/utils/logger';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: () => void;
  reset: () => void;
}

/**
 * useApi — generic hook for wrapping API calls with loading/error state.
 *
 * @param apiFn   - async function that returns ApiResponse<T>
 * @param options - { immediate: true } to fire on mount
 *
 * Usage:
 *   const { data, isLoading, error, execute } = useApi(
 *     () => inventoryService.getProducts(),
 *     { immediate: true }
 *   );
 */
export function useApi<T>(
  apiFn: () => Promise<ApiResponse<T>>,
  options: { immediate?: boolean; onSuccess?: (data: T) => void; onError?: (err: string) => void } = {}
): UseApiReturn<T> {
  const { immediate = false, onSuccess, onError } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const isMounted = useRef(true);
  const apiFnRef = useRef(apiFn);
  apiFnRef.current = apiFn;

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await apiFnRef.current();
      if (!isMounted.current) return;
      setState({ data: response.data, isLoading: false, error: null });
      onSuccess?.(response.data);
    } catch (err) {
      if (!isMounted.current) return;
      const message = getErrorMessage(err);
      logger.error('[useApi] error', message);
      setState({ data: null, isLoading: false, error: message });
      onError?.(message);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  useEffect(() => {
    isMounted.current = true;
    if (immediate) execute();
    return () => {
      isMounted.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, execute, reset };
}
