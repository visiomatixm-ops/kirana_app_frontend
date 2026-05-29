import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/services/api/apiClient';
import { CUSTOMER_ENDPOINTS } from '@/services/endpoints';
import { useDebounce } from '@/hooks/useDebounce';
import { searchBy } from '@/helpers';
import type { Customer, KhataTransaction } from '@/types';
import { logger } from '@/utils/logger';

// ─── useCustomers ─────────────────────────────────────────────────────────────
interface UseCustomersReturn {
  customers: Customer[];
  filteredCustomers: Customer[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isLoading: boolean;
  refetch: () => void;
}

export function useCustomers(): UseCustomersReturn {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tick, setTick] = useState(0);

  const debouncedQuery = useDebounce(searchQuery, 250);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    apiClient
      .get<Customer[]>(CUSTOMER_ENDPOINTS.LIST)
      .then((res) => { if (!cancelled) setCustomers(res.data); })
      .catch((err) => { logger.warn('[useCustomers] fetch failed', err); })
      .finally(() => { if (!cancelled) setIsLoading(false); });

    return () => { cancelled = true; };
  }, [tick]);

  const filteredCustomers = searchBy(customers, debouncedQuery, ['name', 'phone']);

  return {
    customers,
    filteredCustomers,
    searchQuery,
    setSearchQuery,
    isLoading,
    refetch: () => setTick((t) => t + 1),
  };
}

// ─── useCustomerTransactions ──────────────────────────────────────────────────
interface UseCustomerTransactionsReturn {
  transactions: KhataTransaction[];
  isLoading: boolean;
  addTransaction: (type: 'credit' | 'debit', amount: number, description: string) => Promise<void>;
  refetch: () => void;
}

export function useCustomerTransactions(customerId: string): UseCustomerTransactionsReturn {
  const [transactions, setTransactions] = useState<KhataTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!customerId) return;
    let cancelled = false;
    setIsLoading(true);

    apiClient
      .get<KhataTransaction[]>(CUSTOMER_ENDPOINTS.TRANSACTIONS(customerId))
      .then((res) => { if (!cancelled) setTransactions(res.data); })
      .catch((err) => { logger.warn('[useCustomerTransactions] fetch failed', err); })
      .finally(() => { if (!cancelled) setIsLoading(false); });

    return () => { cancelled = true; };
  }, [customerId, tick]);

  const addTransaction = useCallback(
    async (type: 'credit' | 'debit', amount: number, description: string) => {
      await apiClient.post(CUSTOMER_ENDPOINTS.ADD_TRANSACTION(customerId), {
        type,
        amount,
        description,
        date: new Date().toISOString(),
      });
      setTick((t) => t + 1);
    },
    [customerId]
  );

  return {
    transactions,
    isLoading,
    addTransaction,
    refetch: () => setTick((t) => t + 1),
  };
}
