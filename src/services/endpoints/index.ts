export const AUTH_ENDPOINTS = {
  SEND_OTP: '/auth/send-otp',
  VERIFY_OTP: '/auth/verify-otp',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
} as const;

export const SHOP_ENDPOINTS = {
  GET_SHOP: '/shop',
  UPDATE_SHOP: '/shop',
  SETUP_SHOP: '/shop/setup',
} as const;

export const PRODUCT_ENDPOINTS = {
  LIST: '/inventory/products',
  GET: (id: string) => `/inventory/products/${id}`,
  CREATE: '/inventory/products',
  UPDATE: (id: string) => `/inventory/products/${id}`,
  DELETE: (id: string) => `/inventory/products/${id}`,
  SEARCH: '/inventory/products/search',
} as const;

export const BILL_ENDPOINTS = {
  LIST: '/bills',
  GET: (id: string) => `/bills/${id}`,
  CREATE: '/bills',
  CANCEL: (id: string) => `/bills/${id}/cancel`,
} as const;

export const CUSTOMER_ENDPOINTS = {
  LIST: '/customers',
  GET: (id: string) => `/customers/${id}`,
  CREATE: '/customers',
  UPDATE: (id: string) => `/customers/${id}`,
  TRANSACTIONS: (id: string) => `/customers/${id}/transactions`,
  ADD_TRANSACTION: (id: string) => `/customers/${id}/transactions`,
} as const;

export const REPORT_ENDPOINTS = {
  SALES: '/reports/sales',
  REVENUE: '/reports/revenue',
  TOP_PRODUCTS: '/reports/top-products',
  DASHBOARD_SUMMARY: '/reports/dashboard',
} as const;
