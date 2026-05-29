import React from 'react';

import {
  createBrowserRouter,
  Navigate,
  Outlet,
} from 'react-router-dom';

import AuthLayout from '@/app/layouts/AuthLayout';
import MainLayout from '@/app/layouts/MainLayout';

import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from './NotFoundPage';

import { ROUTES } from './routeConstants';

import AppProviders from '@/app/providers/AppProviders';

import {
  SplashAdapter,
  WelcomeAdapter,
  LoginAdapter,
  ShopSetupAdapter,
  DashboardAdapter,
  BillingAdapter,
  InventoryAdapter,
  KhataAdapter,
  ReportsAdapter,
  SettingsAdapter,
} from './PageAdapters';

export const router = createBrowserRouter([
  {
    element: (
      <AppProviders>
        <Outlet />
      </AppProviders>
    ),

    children: [
      {
        element: <AuthLayout />,

        children: [
          {
            path: ROUTES.SPLASH,
            element: <SplashAdapter />,
          },

          {
            path: ROUTES.WELCOME,
            element: <WelcomeAdapter />,
          },

          {
            path: ROUTES.LOGIN,
            element: <LoginAdapter />,
          },

          {
            path: ROUTES.SETUP,
            element: <ShopSetupAdapter />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,

        children: [
          {
            path: ROUTES.APP,

            element: <MainLayout />,

            children: [
              {
                index: true,

                element: (
                  <Navigate
                    to={ROUTES.DASHBOARD}
                    replace
                  />
                ),
              },

              {
                path: 'dashboard',
                element: <DashboardAdapter />,
              },

              {
                path: 'billing',
                element: <BillingAdapter />,
              },

              {
                path: 'inventory',
                element: <InventoryAdapter />,
              },

              {
                path: 'khata',
                element: <KhataAdapter />,
              },

              {
                path: 'reports',
                element: <ReportsAdapter />,
              },

              {
                path: 'settings',
                element: <SettingsAdapter />,
              },
            ],
          },
        ],
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;