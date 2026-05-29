/**
 * Top-level standalone providers that wrap the app globally.
 * These are separate from app/providers/AppProviders which handles auth/state.
 *
 * Usage — add to App.tsx if needed:
 *   import { ToastProvider } from '@/providers'
 */

export { ToastProvider, useToast } from './ToastProvider';
