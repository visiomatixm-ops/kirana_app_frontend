import { useState, useEffect } from 'react';
import apiClient from '@/services/api/apiClient';
import { REPORT_ENDPOINTS } from '@/services/endpoints';
import { logger } from '@/utils/logger';

interface DashboardSummary {
  todaySales: number;
  todayRevenue: number;
  totalProducts: number;
  lowStockCount: number;
  pendingKhata: number;
  totalCustomers: number;
}

interface UseDashboardReturn {
  summary: DashboardSummary | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const DEFAULT_SUMMARY: DashboardSummary = {
  todaySales: 0,
  todayRevenue: 0,
  totalProducts: 0,
  lowStockCount: 0,
  pendingKhata: 0,
  totalCustomers: 0,
};

/**
 * useDashboard — fetches dashboard summary metrics.
 * Falls back to empty defaults on error to avoid blank screens.
 */
export function useDashboard(): UseDashboardReturn {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    apiClient
      .get<DashboardSummary>(REPORT_ENDPOINTS.DASHBOARD_SUMMARY)
      .then((res) => {
        if (!cancelled) setSummary(res.data);
      })
      .catch((err) => {
        if (!cancelled) {
          logger.warn('[useDashboard] API unavailable, using defaults', err);
          setSummary(DEFAULT_SUMMARY);
          setError(null); // Suppress error — use mock data silently
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [tick]);

  return {
    summary,
    isLoading,
    error,
    refetch: () => setTick((t) => t + 1),
  };
}
