/**
 * Root store barrel export.
 *
 * This project uses Zustand for lightweight global state management.
 * Each slice is a separate Zustand store. Import individual slices as needed:
 *   import { useCartStore } from '@/store/slices/cartStore'
 *   import { useInventoryStore } from '@/store/slices/inventoryStore'
 */

export { useCartStore } from '../slices/cartStore';
export { useInventoryStore } from '../slices/inventoryStore';
export { useNotificationStore } from '../slices/notificationStore';
