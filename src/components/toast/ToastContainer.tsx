import { AnimatePresence, motion } from 'motion/react';
import ToastItem from './ToastItem';
import type { Toast } from './toast.types';

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
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
      <AnimatePresence mode="sync">
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            layout
            style={{
              pointerEvents: 'all',
              // Stack visual offset for depth effect
              zIndex: toasts.length - index,
            }}
          >
            <ToastItem toast={toast} onDismiss={onDismiss} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
