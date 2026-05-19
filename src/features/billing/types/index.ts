import type { PaymentMethod } from '@/types';

// ─── Billing UI State ─────────────────────────────────────────────────────────
export type BillingView = 'new-bill' | 'bill-preview' | 'bill-history';

export interface BillFormValues {
  customerId?: string;
  customerName?: string;
  discount: number;
  paymentMethod: PaymentMethod;
  notes?: string;
}

// ─── Product Search ───────────────────────────────────────────────────────────
export interface ProductSearchResult {
  id: string;
  name: string;
  barcode: string;
  sellingPrice: number;
  mrp: number;
  stock: number;
  unit: string;
}

// ─── Print / Share ────────────────────────────────────────────────────────────
export type ShareMethod = 'whatsapp' | 'print' | 'download';

export interface PrintBillOptions {
  showGstin: boolean;
  showSignature: boolean;
  showBarcode: boolean;
  paperSize: 'a4' | 'thermal-58' | 'thermal-80';
}
