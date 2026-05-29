import type { Variants } from "motion/react";
import { springGentle, springSnappy } from "../transitions/spring";

export const slideUpVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: springGentle },
  exit: { y: "100%", opacity: 0, transition: { ...springSnappy, duration: 0.2 } },
};

export const slideDownVariants: Variants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: springGentle },
  exit: { y: "-100%", opacity: 0, transition: { ...springSnappy, duration: 0.2 } },
};

export const slideRightVariants: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: springGentle },
  exit: { x: "100%", opacity: 0, transition: { ...springSnappy, duration: 0.2 } },
};

export const slideLeftVariants: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: springGentle },
  exit: { x: "-100%", opacity: 0, transition: { ...springSnappy, duration: 0.2 } },
};

/** Subtle slide-up for bottom sheets */
export const bottomSheetVariants: Variants = {
  hidden: { y: "105%", opacity: 1 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 320, damping: 32 },
  },
  exit: {
    y: "105%",
    transition: { type: "spring", stiffness: 400, damping: 40 },
  },
};
