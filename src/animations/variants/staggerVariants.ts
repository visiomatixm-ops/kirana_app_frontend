import type { Variants } from "motion/react";
import { stagger } from "../transitions/durations";

/** Container that staggers its children */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: 0.05,
    },
  },
};

export const staggerTightContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.tight,
      delayChildren: 0.02,
    },
  },
};

/** Child item for stagger lists */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 28,
    },
  },
};

export const staggerItemFadeVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
};
