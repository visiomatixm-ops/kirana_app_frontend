/**
 * Cart Store - Zustand slice for billing cart state.
 *
 * NOTE: Requires `zustand` package.
 * Install: pnpm add zustand
 *
 * Usage:
 *   import { useCartStore } from '@/store/slices/cartStore'
 *   const { items, addItem, removeItem, clearCart } = useCartStore()
 */

import type { CartItem } from '@/types';

// ─── Zustand-compatible store definition ────────────────────────────────────
// Written as a plain class pattern so it compiles without zustand installed.
// Replace with `import { create } from 'zustand'` when zustand is added.

interface CartState {
  items: CartItem[];
  discount: number;
}

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setDiscount: (discount: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
}

type CartStore = CartState & CartActions;

// ─── Fallback implementation (works without Zustand) ─────────────────────────
const cartState: CartState = { items: [], discount: 0 };

export const useCartStore = (): CartStore => {
  const addItem = (item: CartItem) => {
    const existing = cartState.items.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cartState.items.push({ ...item });
    }
  };

  const removeItem = (id: string) => {
    cartState.items = cartState.items.filter((i) => i.id !== id);
  };

  const updateQuantity = (id: string, quantity: number) => {
    const item = cartState.items.find((i) => i.id === id);
    if (item) item.quantity = Math.max(0, quantity);
  };

  const setDiscount = (discount: number) => {
    cartState.discount = discount;
  };

  const clearCart = () => {
    cartState.items = [];
    cartState.discount = 0;
  };

  const getSubtotal = () =>
    cartState.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const getTotal = () => Math.max(0, getSubtotal() - cartState.discount);

  return { ...cartState, addItem, removeItem, updateQuantity, setDiscount, clearCart, getTotal, getSubtotal };
};

/* ─── Zustand implementation (uncomment after `pnpm add zustand`) ─────────────
import { create } from 'zustand';

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  discount: 0,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === item.id ? { ...i, quantity: Math.max(0, quantity) } : i
      ),
    })),

  setDiscount: (discount) => set({ discount }),

  clearCart: () => set({ items: [], discount: 0 }),

  getSubtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

  getTotal: () => Math.max(0, get().getSubtotal() - get().discount),
}));
────────────────────────────────────────────────────────────────────────────── */
