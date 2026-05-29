import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedTooltipProps {
  content: string;
  children: ReactNode;
  placement?: 'top' | 'bottom';
}

export default function AnimatedTooltip({
  content,
  children,
  placement = 'top',
}: AnimatedTooltipProps) {
  const [visible, setVisible] = useState(false);

  const yInit = placement === 'top' ? 4 : -4;

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.span
            initial={{ opacity: 0, y: yInit, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: yInit, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              position: 'absolute',
              [placement === 'top' ? 'bottom' : 'top']: 'calc(100% + 6px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(17,24,39,0.92)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 500,
              padding: '4px 10px',
              borderRadius: 6,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 70,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
