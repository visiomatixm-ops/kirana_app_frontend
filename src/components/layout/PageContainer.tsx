/**
 * PageContainer
 * ─────────────────────────────────────────────────────────────────────────────
 * Root wrapper for every main-app page.
 * Uses a flex-column layout so the sticky header + scrollable body
 * always fit exactly within the viewport — no content ever hidden
 * under the BottomNav or the sticky top section.
 *
 * Usage:
 *   <PageContainer>
 *     <StickyHeaderLayout>…header…</StickyHeaderLayout>
 *     <ScrollContainer scrollKey="inventory">…content…</ScrollContainer>
 *   </PageContainer>
 */
import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  /** Background colour override (default white) */
  bg?: string;
}

export default function PageContainer({
  children,
  className = '',
  bg = 'bg-white',
}: PageContainerProps) {
  return (
    <div
      className={`page-container ${bg} ${className}`}
      style={{ height: '100dvh' }}
    >
      {children}
    </div>
  );
}
