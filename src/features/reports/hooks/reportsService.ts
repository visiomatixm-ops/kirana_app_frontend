import apiClient from '@/services/api/apiClient';
import { REPORT_ENDPOINTS } from '@/services/endpoints';
import type { ApiResponse } from '@/types';
import { buildQueryString } from '@/services/common';

interface SalesReportParams {
  startDate: string;
  endDate: string;
  groupBy?: 'day' | 'week' | 'month';
  [key: string]: unknown;
}

interface RevenueData {
  label: string;
  revenue: number;
  profit: number;
  transactions: number;
}

interface TopProduct {
  productId: string;
  name: string;
  units: number;
  revenue: number;
}

interface DashboardSummary {
  todaySales: number;
  todayRevenue: number;
  totalProducts: number;
  lowStockCount: number;
  pendingKhata: number;
  totalCustomers: number;
}

export const reportsService = {
  getSalesReport: (params: SalesReportParams): Promise<ApiResponse<RevenueData[]>> =>
    apiClient.get(`${REPORT_ENDPOINTS.SALES}${buildQueryString(params)}`),

  getRevenue: (params: SalesReportParams): Promise<ApiResponse<RevenueData[]>> =>
    apiClient.get(`${REPORT_ENDPOINTS.REVENUE}${buildQueryString(params)}`),

  getTopProducts: (limit = 10): Promise<ApiResponse<TopProduct[]>> =>
    apiClient.get(`${REPORT_ENDPOINTS.TOP_PRODUCTS}?limit=${limit}`),

  getDashboardSummary: (): Promise<ApiResponse<DashboardSummary>> =>
    apiClient.get(REPORT_ENDPOINTS.DASHBOARD_SUMMARY),
};
