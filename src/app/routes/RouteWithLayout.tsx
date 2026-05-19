import type { ReactNode } from 'react';

/**
 * RouteWithLayout
 * ─────────────────────────────────────────────────────────────────────────────
 * Thin helper that injects a layout around a page component.
 * Used to explicitly document layout boundaries in AppRoutes.tsx.
 *
 * Usage:
 *   <RouteWithLayout layout={<MainLayout />}>
 *     <Dashboard />
 *   </RouteWithLayout>
 */
interface RouteWithLayoutProps {
  layout: ReactNode;
  children?: ReactNode;
}

export default function RouteWithLayout({ layout, children }: RouteWithLayoutProps) {
  return (
    <>
      {layout}
      {children}
    </>
  );
}
