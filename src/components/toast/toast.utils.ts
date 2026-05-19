import type { Toast, ToastType, ToastOptions } from './toast.types';

export function genToastId(): string {
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

const DURATIONS: Record<ToastType, number> = {
  success: 3500,
  error: 5000,
  warning: 4500,
  info: 3500,
  loading: 0, // persists until manually dismissed or updated
};

export function createToast(
  type: ToastType,
  message: string,
  options: ToastOptions = {}
): Toast {
  return {
    id: options.id ?? genToastId(),
    type,
    message,
    description: options.description ?? '',
    duration: options.duration ?? DURATIONS[type],
    createdAt: Date.now(),
  };
}
