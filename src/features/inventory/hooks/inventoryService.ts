import apiClient from '@/services/api/apiClient';
import { PRODUCT_ENDPOINTS } from '@/services/endpoints';
import type { Product, ApiResponse, PaginatedResponse } from '@/types';

interface ProductFilters {
  search?: string;
  lowStock?: boolean;
  page?: number;
  limit?: number;
}

export const inventoryService = {
  getProducts: (filters?: ProductFilters): Promise<ApiResponse<PaginatedResponse<Product>>> =>
    apiClient.get(`${PRODUCT_ENDPOINTS.LIST}?${new URLSearchParams(filters as Record<string, string>).toString()}`),

  getProduct: (id: string): Promise<ApiResponse<Product>> =>
    apiClient.get(PRODUCT_ENDPOINTS.GET(id)),

  createProduct: (data: Omit<Product, 'id'>): Promise<ApiResponse<Product>> =>
    apiClient.post(PRODUCT_ENDPOINTS.CREATE, data),

  updateProduct: (id: string, data: Partial<Product>): Promise<ApiResponse<Product>> =>
    apiClient.put(PRODUCT_ENDPOINTS.UPDATE(id), data),

  deleteProduct: (id: string): Promise<ApiResponse<void>> =>
    apiClient.delete(PRODUCT_ENDPOINTS.DELETE(id)),

  searchProducts: (query: string): Promise<ApiResponse<Product[]>> =>
    apiClient.get(`${PRODUCT_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`),
};
