import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  maxWidth?: string;
}

/**
 * BaseModal - reusable bottom-sheet style modal.
 * Matches the existing app's UI style (white card, rounded top, slide-up animation).
 */
export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  maxWidth = '480px',
}: BaseModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 50,
            }}
          />

          {/* Modal panel */}
          <motion.div
            key="panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth,
              background: '#fff',
              borderRadius: '20px 20px 0 0',
              zIndex: 51,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px 12px',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                {title && (
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
                    {title}
                  </h3>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 4,
                      marginLeft: 'auto',
                    }}
                  >
                    <X size={20} color="#666" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div style={{ padding: '16px 20px 24px' }}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
