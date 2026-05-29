/**
 * BottomSafeLayout
 * ─────────────────────────────────────────────────────────────────────────────
 * A fixed bottom bar that sits above the BottomNav.
 * Use for action buttons that need to remain always visible.
 *
 * Default bottom offset = 64px (BottomNav height) + safe-area.
 */
import type { ReactNode } from 'react';

interface BottomSafeLayoutProps {
  children: ReactNode;
  className?: string;
  /** Bottom offset in px above BottomNav (default 64) */
  navHeight?: number;
}

export default function BottomSafeLayout({
  children,
  className = '',
  navHeight = 64,
}: BottomSafeLayoutProps) {
  return (
    <div
      className={`fixed left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-30 ${className}`}
      style={{ bottom: `calc(${navHeight}px + env(safe-area-inset-bottom, 0px))` }}
    >
      {children}
    </div>
  );
}
