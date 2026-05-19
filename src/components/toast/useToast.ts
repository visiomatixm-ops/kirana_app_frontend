import { useContext } from 'react';
import { ToastContext } from './ToastProvider';
import type { ToastOptions } from './toast.types';

/**
 * useToast — imperative toast API.
 *
 * Usage:
 *   const toast = useToast();
 *   toast.success('Saved!');
 *   toast.error('Failed to save', { description: 'Check your connection' });
 *   const id = toast.loading('Saving...');
 *   toast.dismiss(id);
 *
 *   // Promise-based:
 *   toast.promise(saveData(), {
 *     loading: 'Saving...',
 *     success: 'Saved!',
 *     error: 'Failed to save',
 *   });
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
