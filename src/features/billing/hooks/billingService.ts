import apiClient from '@/services/api/apiClient';
import { BILL_ENDPOINTS } from '@/services/endpoints';
import type { Bill, CartItem, PaymentMethod, ApiResponse, PaginatedResponse } from '@/types';

interface CreateBillPayload {
  items: CartItem[];
  customerId?: string;
  discount: number;
  paymentMethod: PaymentMethod;
}

export const billingService = {
  getBills: (page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<Bill>>> =>
    apiClient.get(`${BILL_ENDPOINTS.LIST}?page=${page}&limit=${limit}`),

  getBill: (id: string): Promise<ApiResponse<Bill>> =>
    apiClient.get(BILL_ENDPOINTS.GET(id)),

  createBill: (data: CreateBillPayload): Promise<ApiResponse<Bill>> =>
    apiClient.post(BILL_ENDPOINTS.CREATE, data),

  cancelBill: (id: string): Promise<ApiResponse<Bill>> =>
    apiClient.post(BILL_ENDPOINTS.CANCEL(id), {}),
};
