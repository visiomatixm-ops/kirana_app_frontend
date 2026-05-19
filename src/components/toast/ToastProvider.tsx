import {
  createContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import ToastContainer from './ToastContainer';
import type { Toast, ToastType, ToastOptions } from './toast.types';
import { createToast, genToastId } from './toast.utils';

// ─── Context API shape ─────────────────────────────────────────────────────────
interface ToastAPI {
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  info: (message: string, options?: ToastOptions) => string;
  loading: (message: string, options?: Omit<ToastOptions, 'duration'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  update: (id: string, type: ToastType, message: string, options?: ToastOptions) => void;
  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string | ((data: T) => string); error: string | ((err: unknown) => string) },
    options?: ToastOptions
  ) => Promise<T>;
}

export const ToastContext = createContext<ToastAPI | null>(null);

const MAX_TOASTS = 5;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const add = useCallback((type: ToastType, message: string, options: ToastOptions = {}): string => {
    const toast = createToast(type, message, options);

    setToasts((prev) => {
      const filtered = prev.filter((t) => t.id !== toast.id); // remove if same id
      const next = [toast, ...filtered].slice(0, MAX_TOASTS);
      return next;
    });

    if (toast.duration > 0) {
      // Clear existing timer for this id
      const existing = timers.current.get(toast.id);
      if (existing) clearTimeout(existing);
      const timer = setTimeout(() => {
        dismiss(toast.id);
      }, toast.duration);
      timers.current.set(toast.id, timer);
    }

    return toast.id;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const t = timers.current.get(id);
    if (t) { clearTimeout(t); timers.current.delete(id); }
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);

  const update = useCallback(
    (id: string, type: ToastType, message: string, options: ToastOptions = {}) => {
      setToasts((prev) =>
        prev.map((t) =>
          t.id === id
            ? createToast(type, message, { ...options, id })
            : t
        )
      );
      if ((options.duration ?? 3500) > 0) {
        const existing = timers.current.get(id);
        if (existing) clearTimeout(existing);
        const timer = setTimeout(() => dismiss(id), options.duration ?? 3500);
        timers.current.set(id, timer);
      }
    },
    [dismiss]
  );

  const promise = useCallback(
    async <T,>(
      p: Promise<T>,
      messages: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((err: unknown) => string);
      },
      options: ToastOptions = {}
    ): Promise<T> => {
      const id = genToastId();
      add('loading', messages.loading, { ...options, id, duration: 0 });
      try {
        const data = await p;
        const msg = typeof messages.success === 'function' ? messages.success(data) : messages.success;
        update(id, 'success', msg, options);
        return data;
      } catch (err) {
        const msg = typeof messages.error === 'function' ? messages.error(err) : messages.error;
        update(id, 'error', msg, options);
        throw err;
      }
    },
    [add, update]
  );

  const api: ToastAPI = {
    success: (msg, opts) => add('success', msg, opts),
    error: (msg, opts) => add('error', msg, opts),
    warning: (msg, opts) => add('warning', msg, opts),
    info: (msg, opts) => add('info', msg, opts),
    loading: (msg, opts) => add('loading', msg, { ...opts, duration: 0 }),
    dismiss,
    dismissAll,
    update,
    promise,
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}
