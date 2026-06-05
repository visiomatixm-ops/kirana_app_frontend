import apiClient from '@/services/api/apiClient';
import { PRODUCT_ENDPOINTS } from '@/services/endpoints';
import type { Product, ApiResponse, PaginatedResponse } from '@/types';

interface ProductFilters {
  search?: string;
  lowStock?: boolean;
  page?: number;
  limit?: number;
}

const mapProductToFrontend = (p: any): Product => ({
  id: p.id,
  name: p.name,
  barcode: p.barcode || '',
  mrp: p.mrp,
  sellingPrice: p.mrp,
  purchasePrice: p.costPrice,
  stock: p.stock,
  lowStockAlert: p.lowStock,
  unit: p.unit,
  category: p.category,
  imageUrl: p.imageUrl,
});

export const inventoryService = {
  getProducts: async (filters?: ProductFilters): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    const queryParams: Record<string, string> = {};
    if (filters?.search) queryParams.search = filters.search;
    if (filters?.lowStock !== undefined) queryParams.lowStock = String(filters.lowStock);
    const searchString = new URLSearchParams(queryParams).toString();
    const url = searchString ? `${PRODUCT_ENDPOINTS.LIST}?${searchString}` : PRODUCT_ENDPOINTS.LIST;

    const response = await apiClient.get<any[]>(url);
    const mappedList = (response.data || []).map(mapProductToFrontend);

    return {
      ...response,
      data: {
        data: mappedList,
        total: mappedList.length,
        page: filters?.page || 1,
        limit: filters?.limit || mappedList.length,
        totalPages: 1,
      },
    };
  },

  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await apiClient.get<any>(PRODUCT_ENDPOINTS.GET(id));
    return {
      ...response,
      data: mapProductToFrontend(response.data),
    };
  },

  createProduct: async (data: Omit<Product, 'id'>): Promise<ApiResponse<Product>> => {
    const payload = {
      name: data.name,
      unit: data.unit || 'pcs',
      mrp: data.mrp,
      costPrice: data.purchasePrice,
      stock: data.stock || 0,
      lowStock: data.lowStockAlert || 5,
    };
    const response = await apiClient.post<any>(PRODUCT_ENDPOINTS.CREATE, payload);
    return {
      ...response,
      data: mapProductToFrontend(response.data),
    };
  },

  updateProduct: async (id: string, data: Partial<Product>): Promise<ApiResponse<Product>> => {
    const payload: Record<string, any> = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.unit !== undefined) payload.unit = data.unit;
    if (data.mrp !== undefined) payload.mrp = data.mrp;
    if (data.purchasePrice !== undefined) payload.costPrice = data.purchasePrice;
    if (data.lowStockAlert !== undefined) payload.lowStock = data.lowStockAlert;

    const response = await apiClient.patch<any>(PRODUCT_ENDPOINTS.UPDATE(id), payload);
    return {
      ...response,
      data: mapProductToFrontend(response.data),
    };
  },

  deleteProduct: (id: string): Promise<ApiResponse<void>> =>
    apiClient.delete(PRODUCT_ENDPOINTS.DELETE(id)),

  searchProducts: async (query: string): Promise<ApiResponse<Product[]>> => {
    const response = await apiClient.get<any[]>(PRODUCT_ENDPOINTS.LIST);
    const mapped = (response.data || []).map(mapProductToFrontend);
    const filtered = mapped.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.barcode.toLowerCase().includes(query.toLowerCase())
    );
    return {
      ...response,
      data: filtered,
    };
  },
};
