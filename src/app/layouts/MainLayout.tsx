/**
 * MainLayout.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Authenticated app shell.
 *
 * Fix for blank-screen flash:
 *   React Router's AnimatePresence + Suspense interact badly when the
 *   exiting route is being replaced by a lazy-loaded page — the new page
 *   starts blank while waiting for Suspense to resolve.
 *
 *   Solution: we pass location.key (not pathname) as the AnimatePresence key
 *   so each navigation gets a unique id, and we set mode="wait" so the enter
 *   animation only starts after the exit is done AND the Suspense content
 *   has resolved (because <Outlet> is already wrapped in Suspense inside
 *   each adapter — the fallback skeleton fills the space during load).
 *
 *   BottomNav is rendered OUTSIDE AnimatePresence so it never disappears
 *   during page transitions — this is what prevents the bottom-nav flicker.
 */

import { Outlet, useLocation, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import BottomNav from '@/components/layout/BottomNav';
import { pathnameToScreen } from '@/app/routes/routeConstants';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0  },
  exit:    { opacity: 0, y: -6 },
};

import type { Transition } from 'motion/react';

const pageTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
  duration: 0.22,
};

export default function MainLayout() {
  const location    = useLocation();
  const navigate    = useNavigate();
  const activeScreen = pathnameToScreen(location.pathname);

  return (
    /*
     * min-h-screen keeps the shell full-height so BottomNav is always at
     * the viewport bottom even when a Suspense skeleton is showing.
     */
    <div className="min-h-screen bg-background" style={{ position: 'relative' }}>
      {/*
       * AnimatePresence wraps only the page content — NOT the BottomNav.
       * mode="wait": exit finishes before enter starts, preventing overlap.
       */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.key}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          style={{ willChange: 'opacity, transform' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {/*
       * BottomNav lives outside AnimatePresence — it is always rendered
       * and never participates in page enter/exit animations.
       * z-40 keeps it above page content but below modals (z-50+).
       */}
      <BottomNav
        activeScreen={activeScreen}
        onNavigate={(screen) => navigate(`/app/${screen}`)}
      />
    </div>
  );
}
