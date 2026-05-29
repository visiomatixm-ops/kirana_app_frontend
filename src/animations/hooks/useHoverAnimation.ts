/**
 * Returns whileHover + whileTap props for common interactive elements.
 * Use by spreading onto motion components:
 *   <motion.button {...hoverLift} />
 */

export const hoverLift = {
  whileHover: { y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' },
  whileTap: { y: 0, scale: 0.98 },
  transition: { type: 'spring' as const, stiffness: 500, damping: 30 },
};

export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring' as const, stiffness: 500, damping: 30 },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.18)',
    transition: { duration: 0.2 },
  },
};

export const tapPress = {
  whileTap: { scale: 0.96 },
  transition: { type: 'spring' as const, stiffness: 600, damping: 35 },
};

export function useHoverAnimation(variant: 'lift' | 'scale' | 'glow' | 'press' = 'lift') {
  const map = { lift: hoverLift, scale: hoverScale, glow: hoverGlow, press: tapPress };
  return map[variant];
}
