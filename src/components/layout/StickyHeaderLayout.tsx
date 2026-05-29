/**
 * StickyHeaderLayout
 * ─────────────────────────────────────────────────────────────────────────────
 * Sticky top section inside PageContainer.
 * Because PageContainer is a flex-column, this element stays at the top
 * and the ScrollContainer below it gets the remaining height.
 * Content can NEVER scroll behind this header.
 */
import type { ReactNode } from 'react';

interface StickyHeaderLayoutProps {
  children: ReactNode;
  className?: string;
  shadow?: boolean;
}

export default function StickyHeaderLayout({
  children,
  className = '',
  shadow = true,
}: StickyHeaderLayoutProps) {
  return (
    <div
      className={`sticky-header bg-white ${shadow ? 'border-b border-gray-200' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
