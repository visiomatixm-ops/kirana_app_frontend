/**
 * useScrollRestore.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Saves and restores scroll position for a named scroll container.
 * Use on any page that needs scroll-position persistence across navigation.
 *
 * Usage:
 *   const { scrollRef } = useScrollRestore('inventory');
 *   <div ref={scrollRef} className="scroll-area scroll-hidden"> … </div>
 */
import { useRef, useEffect, useCallback } from 'react';
import { saveScrollPosition, restoreScrollPosition } from '@/utils/scrollHelpers';

export function useScrollRestore(key: string) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Small timeout lets React finish painting before restoring
    const id = requestAnimationFrame(() => restoreScrollPosition(key, el));
    return () => {
      cancelAnimationFrame(id);
      saveScrollPosition(key, el);
    };
  }, [key]);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { scrollRef, scrollToTop };
}
