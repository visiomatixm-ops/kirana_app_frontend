/**
 * ScrollContainer
 * ─────────────────────────────────────────────────────────────────────────────
 * Scrollable body area used inside PageContainer (below a sticky header).
 * Hides the scrollbar visually while keeping momentum scrolling on iOS.
 * Saves / restores scroll position when scrollKey is provided.
 *
 * Usage:
 *   <ScrollContainer scrollKey="inventory" className="px-4">
 *     …list content…
 *   </ScrollContainer>
 */
import { useRef, useEffect, type ReactNode } from 'react';
import { saveScrollPosition, restoreScrollPosition } from '@/utils/scrollHelpers';

interface ScrollContainerProps {
  children: ReactNode;
  className?: string;
  /** If provided, scroll position is saved/restored across navigations */
  scrollKey?: string;
  /** Extra bottom padding in px (stacks on top of the built-in nav padding) */
  extraBottomPad?: number;
}

export default function ScrollContainer({
  children,
  className = '',
  scrollKey,
  extraBottomPad = 0,
}: ScrollContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollKey) return;
    const el = ref.current;
    const rafId = requestAnimationFrame(() => restoreScrollPosition(scrollKey, el));
    return () => {
      cancelAnimationFrame(rafId);
      saveScrollPosition(scrollKey, el);
    };
  }, [scrollKey]);

  return (
    <div
      ref={ref}
      className={`scroll-area scroll-touch ${className}`}
      style={extraBottomPad ? { paddingBottom: `calc(76px + ${extraBottomPad}px + env(safe-area-inset-bottom, 0px))` } : undefined}
    >
      {children}
    </div>
  );
}
