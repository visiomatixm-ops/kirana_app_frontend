import { useRef } from 'react';
import { useInView } from 'motion/react';

/**
 * Reveals an element as it enters the viewport.
 * Returns motion props ready to spread onto a motion.div.
 */
export function useRevealAnimation(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const motionProps = {
    ref,
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: {
      type: 'spring' as const,
      stiffness: 280,
      damping: 28,
      delay,
    },
  };

  return { ref, isInView, motionProps };
}
