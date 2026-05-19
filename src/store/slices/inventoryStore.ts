/**
 * Inventory Store - Zustand slice for local inventory state.
 *
 * NOTE: Requires `zustand` package.
 * Install: pnpm add zustand
 */

import type { Product } from '@/types';
import { searchBy } from '@/helpers';

interface InventoryState {
  products: Product[];
  searchQuery: string;
  isLoading: boolean;
}

interface InventoryActions {
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  getFilteredProducts: () => Product[];
  getLowStockProducts: () => Product[];
}

type InventoryStore = InventoryState & InventoryActions;

// ─── Fallback implementation (works without Zustand) ─────────────────────────
const inventoryState: InventoryState = {
  products: [],
  searchQuery: '',
  isLoading: false,
};

export const useInventoryStore = (): InventoryStore => {
  const setProducts = (products: Product[]) => {
    inventoryState.products = products;
  };

  const addProduct = (product: Product) => {
    inventoryState.products.push(product);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const idx = inventoryState.products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      inventoryState.products[idx] = { ...inventoryState.products[idx], ...updates };
    }
  };

  const deleteProduct = (id: string) => {
    inventoryState.products = inventoryState.products.filter((p) => p.id !== id);
  };

  const setSearchQuery = (query: string) => {
    inventoryState.searchQuery = query;
  };

  const setLoading = (loading: boolean) => {
    inventoryState.isLoading = loading;
  };

  const getFilteredProducts = () =>
    searchBy(inventoryState.products, inventoryState.searchQuery, ['name', 'barcode']);

  const getLowStockProducts = () =>
    inventoryState.products.filter((p) => p.stock <= p.lowStockAlert);

  return {
    ...inventoryState,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    setSearchQuery,
    setLoading,
    getFilteredProducts,
    getLowStockProducts,
  };
};
