/** Duration values in seconds — for Framer Motion */
export const duration = {
  instant: 0.08,
  fast: 0.15,
  normal: 0.22,
  smooth: 0.3,
  slow: 0.45,
  verySlow: 0.65,
} as const;

/** Duration values in ms — for CSS transitions */
export const durationMs = {
  instant: 80,
  fast: 150,
  normal: 220,
  smooth: 300,
  slow: 450,
  verySlow: 650,
} as const;

/** Stagger delays for list items */
export const stagger = {
  tight: 0.04,
  normal: 0.06,
  loose: 0.08,
  wide: 0.12,
} as const;
