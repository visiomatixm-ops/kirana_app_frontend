/**
 * Resources — centralized references to static assets.
 *
 * Import images and other assets here so all usages
 * flow through a single import point.
 *
 * Example:
 *   import { IMAGES } from '@/resources'
 *   <img src={IMAGES.logo} />
 */

// ─── Placeholder paths (update with actual asset files) ───────────────────────
export const IMAGES = {
  logo: '/assets/logo.png',
  splashBg: '/assets/splash-bg.png',
  emptyCart: '/assets/empty-cart.svg',
  emptyInventory: '/assets/empty-inventory.svg',
  emptyKhata: '/assets/empty-khata.svg',
  defaultAvatar: '/assets/default-avatar.svg',
} as const;

export const ICONS = {
  appIcon: '/assets/icon-192.png',
} as const;

export const LOTTIE = {
  success: '/assets/lottie/success.json',
  loading: '/assets/lottie/loading.json',
  emptyBox: '/assets/lottie/empty-box.json',
} as const;
