import apiClient from '@/services/api/apiClient';
import { CUSTOMER_ENDPOINTS } from '@/services/endpoints';
import type { Customer, KhataTransaction, ApiResponse } from '@/types';

export const customerService = {
  getCustomers: (): Promise<ApiResponse<Customer[]>> =>
    apiClient.get(CUSTOMER_ENDPOINTS.LIST),

  getCustomer: (id: string): Promise<ApiResponse<Customer>> =>
    apiClient.get(CUSTOMER_ENDPOINTS.GET(id)),

  createCustomer: (data: Omit<Customer, 'id' | 'balance'>): Promise<ApiResponse<Customer>> =>
    apiClient.post(CUSTOMER_ENDPOINTS.CREATE, data),

  updateCustomer: (id: string, data: Partial<Customer>): Promise<ApiResponse<Customer>> =>
    apiClient.put(CUSTOMER_ENDPOINTS.UPDATE(id), data),

  getTransactions: (customerId: string): Promise<ApiResponse<KhataTransaction[]>> =>
    apiClient.get(CUSTOMER_ENDPOINTS.TRANSACTIONS(customerId)),

  addTransaction: (
    customerId: string,
    data: { type: 'credit' | 'debit'; amount: number; description: string; date: string }
  ): Promise<ApiResponse<KhataTransaction>> =>
    apiClient.post(CUSTOMER_ENDPOINTS.ADD_TRANSACTION(customerId), data),
};
