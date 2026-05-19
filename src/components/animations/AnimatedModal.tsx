import { motion, AnimatePresence } from 'motion/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

/**
 * AnimatedModal — reusable bottom-sheet modal with spring animation.
 * Locks body scroll while open.
 */
export default function AnimatedModal({
  isOpen,
  onClose,
  children,
  maxWidth = '480px',
}: AnimatedModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.48)',
              backdropFilter: 'blur(2px)',
              zIndex: 50,
            }}
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            style={{
              position: 'fixed', bottom: 0,
              left: '50%', transform: 'translateX(-50%)',
              width: '100%', maxWidth,
              background: '#fff',
              borderRadius: '20px 20px 0 0',
              zIndex: 51,
              maxHeight: '90vh',
              overflowY: 'auto',
              willChange: 'transform',
            }}
          >
            {/* Drag handle */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 4 }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E5E7EB' }} />
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
