/**
 * Motion presets — drop-in props for <motion.div>
 * Usage: <motion.div {...motionPresets.fadeUp} />
 */

import { ease } from "../transitions/easing";

export const motionPresets = {
  /** Fade in from below */
  fadeUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
    transition: { duration: 0.28, ease: ease.expo },
  },

  /** Fade in */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.22 },
  },

  /** Scale in from center */
  scale: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },

  /** Slide in from right (mobile page) */
  slideRight: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },

  /** Bottom sheet drawer */
  drawer: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    transition: { type: "spring", stiffness: 320, damping: 32 },
  },

  /** Card hover effect */
  cardHover: {
    whileHover: { y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.10)" },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },

  /** Button press */
  buttonPress: {
    whileTap: { scale: 0.96 },
    transition: { duration: 0.08 },
  },

  /** Subtle list item */
  listItem: {
    initial: { opacity: 0, x: -8 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.2, ease: ease.organic },
  },
} as const;
