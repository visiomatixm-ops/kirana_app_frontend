import type { Variants } from "motion/react";

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.18, delay: 0.05 } },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 30 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.16 },
  },
};

export const drawerVariants: Variants = {
  hidden: { y: "100%", opacity: 1 },
  visible: {
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 32 },
  },
  exit: {
    y: "100%",
    transition: { type: "spring", stiffness: 400, damping: 38 },
  },
};

export const sideSheetVariants: Variants = {
  hidden: { x: "100%", opacity: 1 },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", stiffness: 380, damping: 36 },
  },
};

export const dropdownVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: -6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: -4,
    transition: { duration: 0.12 },
  },
};
