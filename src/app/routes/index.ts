// ─── Router instance ──────────────────────────────────────────────────────────
export { router, default as AppRoutes } from './AppRoutes';

// ─── Route guards ─────────────────────────────────────────────────────────────
export { default as ProtectedRoute } from './ProtectedRoute';
export { default as GuestRoute }     from './GuestRoute';

// ─── Route groups ─────────────────────────────────────────────────────────────
export { publicRoutes }  from './PublicRoutes';
export { privateRoutes } from './PrivateRoutes';

// ─── Page adapters ────────────────────────────────────────────────────────────
export * from './PageAdapters';

// ─── Utility ──────────────────────────────────────────────────────────────────
export { default as NotFoundPage }   from './NotFoundPage';
export { default as RouteWithLayout } from './RouteWithLayout';

// ─── Constants & types ────────────────────────────────────────────────────────
export { ROUTES, pathnameToScreen, MAIN_SCREENS } from './routeConstants';
export type { RouteKey, RoutePath, MainScreenId } from './routeConstants';
