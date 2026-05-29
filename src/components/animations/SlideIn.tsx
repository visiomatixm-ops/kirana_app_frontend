import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface SlideInProps {
  children: ReactNode;
  from?: 'bottom' | 'top' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const fromMap = {
  bottom: { y: 32, x: 0 },
  top: { y: -32, x: 0 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
};

export default function SlideIn({
  children,
  from = 'bottom',
  delay = 0,
  className = '',
}: SlideInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...fromMap[from] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...fromMap[from] }}
      transition={{ type: 'spring', stiffness: 300, damping: 28, delay }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}
