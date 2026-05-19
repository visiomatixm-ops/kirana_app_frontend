import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}

export const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 28 },
  },
};

/**
 * StaggerContainer — animates direct children in staggered sequence.
 * Wrap children in <motion.div variants={staggerChild}> to participate.
 */
export default function StaggerContainer({
  children,
  stagger = 0.06,
  delay = 0,
  className = '',
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
