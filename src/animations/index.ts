// Variants
export * from './variants/fadeVariants';
export * from './variants/slideVariants';
export * from './variants/scaleVariants';
export * from './variants/staggerVariants';
export * from './variants/modalVariants';
export * from './variants/pageVariants';
export * from './variants/toastVariants';

// Transitions
export * from './transitions/spring';
export * from './transitions/easing';
export * from './transitions/durations';

// Utils
export * from './utils/motionPresets';
export * from './utils/animationHelpers';
export * from './utils/animationConstants';

// Hooks — import each from its canonical file to avoid duplicate-export conflicts
// usePageTransition.ts also defines useScrollAnimation, useRevealAnimation, useHoverAnimation
// so we only take usePageTransition from that file and the rest from their dedicated files.
export { usePageTransition } from './hooks/usePageTransition';
export { useScrollAnimation } from './hooks/useScrollAnimation';
export { useRevealAnimation } from './hooks/useRevealAnimation';
export { useHoverAnimation, hoverLift, hoverScale, hoverGlow, tapPress } from './hooks/useHoverAnimation';
