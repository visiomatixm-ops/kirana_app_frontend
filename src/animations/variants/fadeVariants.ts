import type { Variants } from "motion/react";
import { ease } from "../transitions/easing";
import { duration } from "../transitions/durations";

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: ease.out },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast, ease: ease.in },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.smooth, ease: ease.expo },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: duration.fast, ease: ease.in },
  },
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.smooth, ease: ease.expo },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: duration.fast, ease: ease.in },
  },
};

export const fadeScaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.smooth, ease: ease.expo },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: duration.fast, ease: ease.in },
  },
};
