import { StrictMode } from 'react';
import { createRoot }     from 'react-dom/client';
import { RouterProvider } from 'react-router';
import AppProviders       from '@/app/providers/AppProviders';
import { ErrorBoundary }  from '@/components/common/ErrorBoundary';
import { router }         from '@/app/routes/AppRoutes';
import './styles/index.css';

/**
 * Application entry point.
 *
 * Tree structure:
 *   StrictMode
 *     ErrorBoundary         ← catches render errors globally
 *       AppProviders        ← Toast + Auth + AppState context providers
 *         RouterProvider    ← React Router v7 data router
 *           AppRoutes       ← defined inside router (createBrowserRouter)
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>,
);
