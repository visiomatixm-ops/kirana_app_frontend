import { motion, AnimatePresence } from 'motion/react';
import type { ReactNode } from 'react';

interface AnimatedTableRowProps {
  children: ReactNode;
  index: number;
  onClick?: () => void;
}

/**
 * AnimatedTableRow — animates table rows in with staggered delay.
 * Use inside any <tbody> in place of plain <tr>.
 */
export function AnimatedTableRow({ children, index, onClick }: AnimatedTableRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 26,
        delay: Math.min(index * 0.04, 0.4),
      }}
      whileHover={{ backgroundColor: 'rgba(14,165,233,0.04)' }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.tr>
  );
}

interface SkeletonRowProps {
  cols?: number;
}

/** Shimmer skeleton row for table loading states */
export function SkeletonRow({ cols = 4 }: SkeletonRowProps) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} style={{ padding: '10px 12px' }}>
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.1 }}
            style={{
              height: 12,
              borderRadius: 6,
              background: 'linear-gradient(90deg, #f0f0f0 0%, #e8e8e8 50%, #f0f0f0 100%)',
              backgroundSize: '200% 100%',
            }}
          />
        </td>
      ))}
    </tr>
  );
}

interface AnimatedTableProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  skeletonRows?: number;
  skeletonCols?: number;
  emptyMessage?: string;
  children: ReactNode;
}

/**
 * AnimatedTable — wraps a table body with loading skeletons and empty state.
 */
export default function AnimatedTable({
  isLoading = false,
  isEmpty = false,
  skeletonRows = 5,
  skeletonCols = 4,
  emptyMessage = 'No data found',
  children,
}: AnimatedTableProps) {
  if (isLoading) {
    return (
      <AnimatePresence>
        {Array.from({ length: skeletonRows }).map((_, i) => (
          <SkeletonRow key={i} cols={skeletonCols} />
        ))}
      </AnimatePresence>
    );
  }

  if (isEmpty) {
    return (
      <tr>
        <td
          colSpan={skeletonCols}
          style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af', fontSize: '0.875rem' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {emptyMessage}
          </motion.div>
        </td>
      </tr>
    );
  }

  return <AnimatePresence>{children}</AnimatePresence>;
}
