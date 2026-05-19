import type { Product, Customer, Bill } from '@/types';
import { BillStatus } from '@/enums';

// ─── Cart Selectors ───────────────────────────────────────────────────────────
export const selectCartItemCount = (items: { quantity: number }[]): number =>
  items.reduce((sum, i) => sum + i.quantity, 0);

export const selectCartSubtotal = (items: { price: number; quantity: number }[]): number =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const selectCartTotal = (subtotal: number, discount: number): number =>
  Math.max(0, subtotal - discount);

// ─── Inventory Selectors ──────────────────────────────────────────────────────
export const selectLowStockProducts = (products: Product[]): Product[] =>
  products.filter((p) => p.stock <= p.lowStockAlert);

export const selectOutOfStockProducts = (products: Product[]): Product[] =>
  products.filter((p) => p.stock === 0);

export const selectTotalInventoryValue = (products: Product[]): number =>
  products.reduce((sum, p) => sum + p.purchasePrice * p.stock, 0);

// ─── Customer Selectors ───────────────────────────────────────────────────────
export const selectCustomersWithDebt = (customers: Customer[]): Customer[] =>
  customers.filter((c) => c.balance < 0);

export const selectTotalReceivable = (customers: Customer[]): number =>
  customers.filter((c) => c.balance < 0).reduce((sum, c) => sum + Math.abs(c.balance), 0);

// ─── Bill Selectors ───────────────────────────────────────────────────────────
export const selectPaidBills = (bills: Bill[]): Bill[] =>
  bills.filter((b) => b.status === BillStatus.PAID);

export const selectTotalRevenue = (bills: Bill[]): number =>
  selectPaidBills(bills).reduce((sum, b) => sum + b.total, 0);
