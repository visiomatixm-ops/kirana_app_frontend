export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface ToastOptions {
  duration?: number;        // ms, 0 = persist until dismissed
  id?: string;              // custom id for deduplication / promise updates
  description?: string;     // optional sub-text
}

export interface Toast extends Required<Omit<ToastOptions, 'id'>> {
  id: string;
  type: ToastType;
  message: string;
  createdAt: number;
}

export type ToastUpdatePayload = {
  id: string;
  type?: ToastType;
  message?: string;
  description?: string;
};
