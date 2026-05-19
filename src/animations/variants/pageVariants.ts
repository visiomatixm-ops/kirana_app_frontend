import type { Variants } from "motion/react";

/** Subtle fade + tiny upward drift — Stripe / Vercel style */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
};

/** Slide-based page transition for mobile navigation */
export const mobilePageVariants: Variants = {
  initial: { x: "100%", opacity: 0 },
  enter: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 280, damping: 28 },
  },
  exit: {
    x: "-30%",
    opacity: 0,
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
};

/** Tab content switch */
export const tabVariants: Variants = {
  initial: { opacity: 0, x: 8 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -8,
    transition: { duration: 0.15 },
  },
};
