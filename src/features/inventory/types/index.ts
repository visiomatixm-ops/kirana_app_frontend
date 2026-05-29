// ─── Inventory UI State ───────────────────────────────────────────────────────
export type InventoryView = 'list' | 'history' | 'add' | 'edit';

export type StockFilter = 'all' | 'low-stock' | 'out-of-stock' | 'in-stock';

export type SortField = 'name' | 'stock' | 'sellingPrice' | 'purchasePrice';
export type SortDirection = 'asc' | 'desc';

// ─── Product Form ─────────────────────────────────────────────────────────────
export interface ProductFormValues {
  name: string;
  barcode: string;
  mrp: number;
  sellingPrice: number;
  purchasePrice: number;
  stock: number;
  lowStockAlert: number;
  unit: string;
  category?: string;
}

// ─── Stock History ────────────────────────────────────────────────────────────
export interface StockHistoryEntry {
  id: string;
  productId: string;
  productName: string;
  type: 'purchase' | 'sale' | 'adjustment' | 'return';
  quantityChange: number;
  stockBefore: number;
  stockAfter: number;
  date: string;
  notes?: string;
}

// ─── Barcode Scanner ──────────────────────────────────────────────────────────
export interface BarcodeScanResult {
  barcode: string;
  productId?: string;
  found: boolean;
}
