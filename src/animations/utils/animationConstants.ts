/** GPU-safe properties only. Never animate width/height/top/left. */
export const GPU_SAFE_PROPS = ['opacity', 'transform'] as const;

/** Reduced motion media query */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Z-index layers */
export const Z = {
  base: 0,
  raised: 10,
  dropdown: 20,
  sticky: 30,
  overlay: 40,
  modal: 50,
  toast: 60,
  tooltip: 70,
} as const;

/** Standard animation durations in seconds */
export const DUR = {
  instant: 0.08,
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  slower: 0.6,
} as const;
