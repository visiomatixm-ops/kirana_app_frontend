# Kirana Billing — Enterprise Architecture

## Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animation | Motion (framer-motion v12) |
| Charts | Recharts |
| State | React Context + Zustand (slices) |
| Forms | react-hook-form |
| HTTP | Custom fetch-based ApiClient |
| Icons | Lucide React |

---

## Directory Structure

```
src/
├── App.tsx                   # Root app — ErrorBoundary + Providers + Lazy routing
├── main.tsx                  # Vite entry point
│
├── app/
│   ├── config/               # env.ts, appConfig.ts, navigationConfig.ts
│   ├── providers/            # AppProviders.tsx (root provider tree)
│   ├── layouts/              # MainLayout, AuthLayout
│   ├── guards/               # AuthGuard, GuestGuard, PermissionGuard
│   └── routes/               # routeConstants.ts
│
├── features/                 # Feature-first modules
│   ├── auth/                 # Splash, Welcome, Login, ShopSetup
│   ├── dashboard/            # Dashboard
│   ├── billing/              # BillingScreen, BillOutput, BillHistory
│   ├── inventory/            # InventoryScreen, InventoryHistory
│   ├── customers/            # KhataScreen, CustomerKhata
│   ├── reports/              # ReportsScreen
│   └── settings/             # AccountSettings + all sub-screens
│
├── components/               # Shared reusable components
│   ├── common/               # ErrorBoundary, EmptyState, Badge, ImageWithFallback
│   ├── ui/                   # shadcn/ui primitives
│   ├── forms/                # SearchInput, FormField
│   ├── tables/               # DataTable
│   ├── cards/                # StatsCard
│   ├── modals/               # BaseModal, ConfirmModal
│   ├── loaders/              # LoadingSpinner
│   └── layout/               # BottomNav
│
├── services/
│   ├── api/                  # apiClient.ts, apiErrorHandler.ts
│   ├── endpoints/            # All API endpoint constants
│   ├── interceptors/         # Request/response interceptors
│   └── common/               # buildQueryString, withPagination
│
├── store/
│   ├── rootStore/            # Barrel export of all slices
│   ├── slices/               # cartStore, inventoryStore, notificationStore
│   └── selectors/            # Pure selector functions
│
├── context/
│   ├── AuthContext.tsx       # Auth state + login/logout
│   └── AppStateContext.tsx   # Onboarding flow + active screen state
│
├── hooks/                    # useAuth, useDebounce, useModal, usePagination, useLocalStorage
├── utils/                    # currency, date, export, logger
├── helpers/                  # searchBy, sortBy, groupBy, generateId, etc.
├── constants/                # App-wide constants
├── enums/                    # TypeScript enums
├── types/                    # TypeScript interfaces
├── validations/              # Phone, email, OTP, GSTIN validators
├── permissions/              # RBAC permission matrix + hasPermission helpers
├── mocks/                    # Mock data for development
└── lib/                      # cn(), isDefined(), assertNever()
```

---

## Path Aliases

All configured in `vite.config.ts` and `tsconfig.json`:

```
@/           → src/
@/app        → src/app/
@/components → src/components/
@/features   → src/features/
@/services   → src/services/
@/utils      → src/utils/
@/hooks      → src/hooks/
@/store      → src/store/
@/types      → src/types/index.ts
@/constants  → src/constants/index.ts
@/enums      → src/enums/index.ts
@/context    → src/context/
@/helpers    → src/helpers/index.ts
@/permissions → src/permissions/index.ts
```

---

## Adding a New Feature

1. Create `src/features/<name>/pages/<Screen>.tsx`
2. Create `src/features/<name>/hooks/<name>Service.ts`
3. Add endpoints to `src/services/endpoints/index.ts`
4. Export from `src/features/<name>/index.ts`
5. Add lazy import + render in `src/App.tsx`

---

## Auth Flow

```
SplashScreen → WelcomeScreen → LoginScreen → ShopSetup → MainApp
```

State managed by `AppStateContext`. Auth tokens stored in `localStorage` via `AuthContext`.

---

## Permission System

```ts
import { Permission } from '@/enums';
import PermissionGuard from '@/app/guards/PermissionGuard';

<PermissionGuard permission={Permission.MANAGE_STAFF}>
  <StaffPanel />
</PermissionGuard>
```

Role hierarchy: `owner > manager > staff > guest`

---

## API Client Usage

```ts
import apiClient from '@/services/api/apiClient';

const data = await apiClient.get<Product[]>('/products');
const bill = await apiClient.post<Bill>('/bills', payload);
```

---

## Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=https://api.kirana-app.com/v1
VITE_APP_ENV=development
VITE_APP_VERSION=1.0.0
```
