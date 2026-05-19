/**
 * App.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Legacy compatibility shim.
 *
 * The application entry point is now src/main.tsx.
 * Routing is handled by src/app/routes/AppRoutes.tsx via createBrowserRouter.
 *
 * This file is kept so any tooling that auto-imports "App" continues to work.
 * It simply re-exports the router for convenience.
 */
export { router } from '@/app/routes/AppRoutes';
