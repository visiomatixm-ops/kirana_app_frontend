// ─── Auth Types ───────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role: UserRole;
  shopId?: string;
  avatar?: string;
}

export type UserRole = 'owner' | 'manager' | 'staff' | 'guest';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Shop / Business Types ────────────────────────────────────────────────────
export interface Shop {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  address: string;
  gstin?: string;
  logo?: string;
  plan: SubscriptionPlan;
}

export type SubscriptionPlan = 'starter' | 'pro' | 'enterprise';

// ─── Product / Inventory Types ────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  barcode: string;
  mrp: number;
  sellingPrice: number;
  purchasePrice: number;
  stock: number;
  lowStockAlert: number;
  unit: string;
  category?: string;
  imageUrl?: string;
}

// ─── Billing Types ────────────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  mrp: number;
}

export interface Bill {
  id: string;
  billNumber: string;
  customerId?: string;
  customerName?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  createdAt: string;
  status: BillStatus;
}

export type PaymentMethod = 'cash' | 'upi' | 'card' | 'credit';
export type BillStatus = 'paid' | 'pending' | 'cancelled';

// ─── Customer / Khata Types ───────────────────────────────────────────────────
export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  balance: number;
  lastTransactionDate?: string;
}

export interface KhataTransaction {
  id: string;
  customerId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

// ─── API Response Types ───────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// ─── UI / Common Types ────────────────────────────────────────────────────────
export interface SelectOption {
  label: string;
  value: string | number;
}

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}
