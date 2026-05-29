import type { Variants } from 'motion/react';

export const toastItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: -20,
    scale: 0.94,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 28,
      mass: 0.7,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -10,
    filter: 'blur(3px)',
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
};

export const progressVariants: Variants = {
  initial: { scaleX: 1 },
  animate: (duration: number) => ({
    scaleX: 0,
    transition: { duration: duration / 1000, ease: 'linear' },
  }),
};
