import type { Variants } from "motion/react";

export const toastVariants: Variants = {
  initial: {
    opacity: 0,
    y: -24,
    scale: 0.94,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 420,
      damping: 28,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -12,
    filter: "blur(2px)",
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

export const toastProgressVariants = {
  initial: { scaleX: 1, originX: 0 },
  animate: (duration: number) => ({
    scaleX: 0,
    transition: { duration: duration / 1000, ease: "linear" },
  }),
};
