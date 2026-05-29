import type { Transition } from "motion/react";

/** Snappy spring — for modals, cards, drawers */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

/** Gentle spring — for page transitions, large panels */
export const springGentle: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 28,
};

/** Bouncy spring — for success states, badges */
export const springBouncy: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 24,
  mass: 0.8,
};

/** Tight spring — for micro-interactions, button presses */
export const springTight: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 35,
};

/** No bounce — for tooltips, dropdowns */
export const springFlat: Transition = {
  type: "spring",
  stiffness: 350,
  damping: 40,
};
