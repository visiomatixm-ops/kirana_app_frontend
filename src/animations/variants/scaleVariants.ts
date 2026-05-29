import type { Variants } from "motion/react";
import { springBouncy, springSnappy } from "../transitions/spring";

export const scaleVariants: Variants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: springSnappy },
  exit: { scale: 0.94, opacity: 0, transition: { duration: 0.15 } },
};

export const scaleUpVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: springBouncy },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.12 } },
};

export const popVariants: Variants = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 500, damping: 22 },
  },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.1 } },
};

/** For cards on hover */
export const cardHoverVariants = {
  rest: { y: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  hover: {
    y: -2,
    boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};
