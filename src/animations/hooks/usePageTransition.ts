import { useReducedMotion } from "motion/react";
import { useRef, useCallback } from "react";

/**
 * Returns transition settings respecting user's reduced-motion preference.
 * Use this when constructing custom transitions dynamically.
 */
export function usePageTransition() {
  const shouldReduce = useReducedMotion();

  return {
    pageProps: shouldReduce
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -4 },
          transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
        },
  };
}

/**
 * Returns hover animation props that respect reduced-motion.
 */
export function useHoverAnimation(
  hoverProps: Record<string, unknown> = { y: -2 },
  tapProps: Record<string, unknown> = { scale: 0.97 }
) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return { whileHover: {}, whileTap: {} };
  return { whileHover: hoverProps, whileTap: tapProps };
}

/**
 * Returns stagger container + children transition props.
 */
export function useRevealAnimation(delayChildren = 0.05, staggerChildren = 0.06) {
  const shouldReduce = useReducedMotion();

  return {
    container: shouldReduce
      ? {}
      : {
          initial: "hidden",
          animate: "visible",
          variants: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren, delayChildren },
            },
          },
        },
    item: shouldReduce
      ? {}
      : {
          variants: {
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 340, damping: 26 },
            },
          },
        },
  };
}

/**
 * Returns a ref + imperative scroll-to-top helper.
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollToTop = useCallback(() => {
    ref.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return { ref, scrollToTop };
}
