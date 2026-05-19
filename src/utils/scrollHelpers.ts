/**
 * scrollHelpers.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable scroll utilities for mobile-safe internal scrolling.
 */

/** Save scroll position for a named key */
export function saveScrollPosition(key: string, el: HTMLElement | null) {
  if (!el) return;
  try {
    sessionStorage.setItem(`scroll:${key}`, String(el.scrollTop));
  } catch {}
}

/** Restore scroll position for a named key */
export function restoreScrollPosition(key: string, el: HTMLElement | null) {
  if (!el) return;
  try {
    const saved = sessionStorage.getItem(`scroll:${key}`);
    if (saved !== null) {
      el.scrollTop = parseInt(saved, 10);
    }
  } catch {}
}

/** Clear saved scroll position */
export function clearScrollPosition(key: string) {
  try {
    sessionStorage.removeItem(`scroll:${key}`);
  } catch {}
}

/** Scroll an element to top smoothly */
export function scrollToTop(el: HTMLElement | null) {
  if (!el) return;
  el.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Get mobile-safe viewport height.
 * Uses dvh when supported, falls back to window.innerHeight.
 */
export function getViewportHeight(): number {
  if (typeof window === 'undefined') return 812;
  // visualViewport accounts for on-screen keyboard
  return window.visualViewport?.height ?? window.innerHeight;
}

/**
 * Lock body scroll (when a modal is open) and return a cleanup function.
 */
export function lockBodyScroll(): () => void {
  const { body } = document;
  const scrollY = window.scrollY;
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.width = '100%';
  body.style.overflowY = 'scroll';
  return () => {
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    body.style.overflowY = '';
    window.scrollTo(0, scrollY);
  };
}
