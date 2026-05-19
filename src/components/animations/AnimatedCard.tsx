import { motion } from 'motion/react';
import type { ReactNode, MouseEvent } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
  delay?: number;
  disableHover?: boolean;
}

/**
 * AnimatedCard — entrance animation + premium hover lift.
 * Replaces plain div wrappers on list cards and stat cards.
 */
export default function AnimatedCard({
  children,
  onClick,
  className = '',
  delay = 0,
  disableHover = false,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28, delay }}
      whileHover={
        disableHover
          ? undefined
          : {
              y: -2,
              boxShadow: '0 8px 28px rgba(34,57,96,0.10)',
              transition: { type: 'spring', stiffness: 500, damping: 32 },
            }
      }
      whileTap={onClick ? { scale: 0.985 } : undefined}
      onClick={onClick}
      className={className}
      style={{ willChange: 'opacity, transform', cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
}
