import type { Variants, Transition } from 'motion/react';

/** Build a staggered container variant */
export function makeStagger(staggerChildren = 0.06, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
    exit: {
      transition: { staggerChildren: 0.04, staggerDirection: -1 },
    },
  };
}

/** Build a simple fade+slide child variant */
export function makeFadeSlide(
  distance = 16,
  axis: 'y' | 'x' = 'y',
  transition?: Transition
): Variants {
  const hidden = axis === 'y' ? { opacity: 0, y: distance } : { opacity: 0, x: distance };
  const visible = axis === 'y' ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 };
  return {
    hidden,
    visible: { ...visible, transition: transition ?? { type: 'spring', stiffness: 300, damping: 28 } },
    exit: { ...hidden, transition: { duration: 0.15 } },
  };
}

/** Check if reduced motion is preferred */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Returns motion-safe variants — fallback to instant if reduced motion */
export function safeVariants(variants: Variants): Variants {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
      exit: { opacity: 0, transition: { duration: 0 } },
    };
  }
  return variants;
}

/** Delay a transition by n seconds */
export function withDelay(transition: Transition, delay: number): Transition {
  return { ...transition, delay };
}
