import { useRef } from 'react';
import { useInView } from 'motion/react';

interface UseScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
  margin?: string;
}

/**
 * Returns a ref + boolean indicating if element has entered viewport.
 * Use with AnimatePresence or motion components for scroll-reveal.
 */
export function useScrollAnimation({
  threshold = 0.15,
  once = true,
  margin = '0px 0px -60px 0px',
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
    // margin typing varies across motion versions — cast to any to stay compatible
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    margin: margin as any,
  });

  return { ref, isInView };
}
