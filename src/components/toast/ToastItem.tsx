import { motion } from 'motion/react';
import { X, CheckCircle, XCircle, AlertTriangle, Info, Loader } from 'lucide-react';
import type { Toast } from './toast.types';
import { toastItemVariants, progressVariants } from './toast.animations';

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const CONFIG = {
  success: {
    icon: CheckCircle,
    bg: 'rgba(240,253,244,0.96)',
    border: '#86efac',
    color: '#16a34a',
    progress: '#22c55e',
  },
  error: {
    icon: XCircle,
    bg: 'rgba(254,242,242,0.96)',
    border: '#fca5a5',
    color: '#dc2626',
    progress: '#ef4444',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'rgba(255,251,235,0.96)',
    border: '#fcd34d',
    color: '#d97706',
    progress: '#f59e0b',
  },
  info: {
    icon: Info,
    bg: 'rgba(239,246,255,0.96)',
    border: '#93c5fd',
    color: '#2563eb',
    progress: '#3b82f6',
  },
  loading: {
    icon: Loader,
    bg: 'rgba(248,250,252,0.96)',
    border: '#cbd5e1',
    color: '#475569',
    progress: '#94a3b8',
  },
};

export default function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const cfg = CONFIG[toast.type];
  const Icon = cfg.icon;
  const isLoading = toast.type === 'loading';

  return (
    <motion.div
      layout
      variants={toastItemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 14,
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: 400,
        width: '100%',
        cursor: 'default',
      }}
    >
      {/* Icon */}
      <div style={{ flexShrink: 0, marginTop: 1 }}>
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          >
            <Icon size={17} color={cfg.color} />
          </motion.div>
        ) : (
          <Icon size={17} color={cfg.color} />
        )}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: '0.8375rem',
            fontWeight: 600,
            color: cfg.color,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {toast.message}
        </p>
        {toast.description && (
          <p
            style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              margin: '2px 0 0',
              lineHeight: 1.4,
            }}
          >
            {toast.description}
          </p>
        )}
      </div>

      {/* Dismiss button */}
      {!isLoading && (
        <button
          onClick={() => onDismiss(toast.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 2,
            display: 'flex',
            flexShrink: 0,
            opacity: 0.6,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.6')}
        >
          <X size={14} color={cfg.color} />
        </button>
      )}

      {/* Progress bar */}
      {toast.duration > 0 && (
        <motion.div
          variants={progressVariants}
          initial="initial"
          animate="animate"
          custom={toast.duration}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2.5,
            background: cfg.progress,
            transformOrigin: 'left',
            borderRadius: '0 0 14px 14px',
          }}
        />
      )}
    </motion.div>
  );
}
