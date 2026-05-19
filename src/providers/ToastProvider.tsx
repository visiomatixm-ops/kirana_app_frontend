import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { NotificationType } from '@/enums';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Toast {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Style map ───────────────────────────────────────────────────────────────

const toastStyles: Record<
  NotificationType,
  { bg: string; color: string; border: string; Icon: typeof CheckCircle }
> = {
  [NotificationType.SUCCESS]: {
    bg: '#f0fdf4',
    color: '#15803d',
    border: '#bbf7d0',
    Icon: CheckCircle,
  },
  [NotificationType.ERROR]: {
    bg: '#fef2f2',
    color: '#dc2626',
    border: '#fecaca',
    Icon: XCircle,
  },
  [NotificationType.WARNING]: {
    bg: '#fefce8',
    color: '#ca8a04',
    border: '#fef08a',
    Icon: AlertTriangle,
  },
  [NotificationType.INFO]: {
    bg: '#eff6ff',
    color: '#2563eb',
    border: '#bfdbfe',
    Icon: Info,
  },
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: NotificationType, message: string, duration = 3500) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev.slice(-4), { id, type, message, duration }]);
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  const ctx: ToastContextValue = {
    success: (msg, dur) => addToast(NotificationType.SUCCESS, msg, dur),
    error: (msg, dur) => addToast(NotificationType.ERROR, msg, dur),
    warning: (msg, dur) => addToast(NotificationType.WARNING, msg, dur),
    info: (msg, dur) => addToast(NotificationType.INFO, msg, dur),
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}

      {/* Toast container */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          width: '90%',
          maxWidth: 420,
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const { bg, color, border, Icon } = toastStyles[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: bg,
                  border: `1.5px solid ${border}`,
                  borderRadius: 14,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  pointerEvents: 'all',
                }}
              >
                <Icon size={18} color={color} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: '0.875rem', color, fontWeight: 500 }}>
                  {toast.message}
                </span>
                <button
                  onClick={() => removeToast(toast.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 2,
                    display: 'flex',
                    flexShrink: 0,
                  }}
                >
                  <X size={14} color={color} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
