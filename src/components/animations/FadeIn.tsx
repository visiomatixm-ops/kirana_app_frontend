import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUpVariants, fadeVariants } from "@/animations/variants/fadeVariants";
import { scaleVariants } from "@/animations/variants/scaleVariants";
import { slideRightVariants, slideUpVariants } from "@/animations/variants/slideVariants";
import {
  staggerContainerVariants,
  staggerItemVariants,
  staggerTightContainerVariants,
} from "@/animations/variants/staggerVariants";

interface WrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Fade in from slightly below */
export function FadeIn({ children, className = "", delay = 0 }: WrapperProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </motion.div>
  );
}

/** Pure opacity fade */
export function FadeOnly({ children, className = "" }: WrapperProps) {
  return (
    <motion.div
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Scale in from center */
export function ScaleIn({ children, className = "" }: WrapperProps) {
  return (
    <motion.div
      variants={scaleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Slide in from right */
export function SlideIn({ children, className = "" }: WrapperProps) {
  return (
    <motion.div
      variants={slideRightVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Slide in from bottom */
export function SlideUp({ children, className = "" }: WrapperProps) {
  return (
    <motion.div
      variants={slideUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — wraps a list and staggers children */
export function StaggerContainer({
  children,
  className = "",
  tight = false,
}: WrapperProps & { tight?: boolean }) {
  return (
    <motion.div
      variants={tight ? staggerTightContainerVariants : staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Individual item inside StaggerContainer */
export function StaggerItem({ children, className = "" }: WrapperProps) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
