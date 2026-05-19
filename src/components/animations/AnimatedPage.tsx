import { motion } from "motion/react";
import type { ReactNode } from "react";
import { pageVariants } from "@/animations/variants/pageVariants";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

/**
 * AnimatedPage — wraps screen-level content with a premium fade+lift entrance.
 * Use as the root wrapper for each main screen.
 */
export default function AnimatedPage({ children, className = "" }: AnimatedPageProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
