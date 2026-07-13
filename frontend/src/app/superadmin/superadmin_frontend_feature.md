# Superadmin Module — Feature Documentation

## Overview
The Master Control Panel for the Multi-Tenant SaaS platform. Strictly isolated from the ERP module. Intended exclusively for platform owners (Superadmins).

## Architecture

### State Management Decision (Rule 58)
- **Zustand** (`gyms_store/useGymsStore.ts`): All async API data for the Gyms module (the most complex module with full CRUD + modals).
- **Zustand** (`plans_store/usePlansStore.ts`): Subscription Plans module — all async API data, modal state, and CRUD actions. `plans_context/` is intentionally empty per Rule 58.
- **Local `useState`**: All other pages (Tickets, Invoices, Coupons, Affiliates, Broadcasts, etc.) use local state via `useSuperadminData` hook or direct `superadminApi` calls.

### Data Fetching
- `superadmin_utils/useSuperadminData.ts` — Generic hook wrapping `apiFetch`. Returns `{ data, fetchState, error, mutate }`. Used by simpler pages.
- `superadmin_api/superadmin_api.ts` — Centralized typed API client for all 16 modules. Imports `apiFetch` from `src/lib/api.ts`.
- `superadmin_url_config.ts` — Single source of truth for all page routes and backend API paths.

### Async State Pattern
All pages use `FetchState = 'idle' | 'loading' | 'success' | 'error'` enum (never boolean `isLoading` flags).

## Directory Structure

```
superadmin/
├── layout.tsx                          # Server Component shell — wraps SuperadminLayout
├── page.tsx                            # Redirects to /superadmin/dashboard
├── superadmin.css                      # Module-scoped CSS (custom scrollbar, animations)
├── superadmin_url_config.ts            # All page routes + backend API paths
├── superadmin_frontend_feature.md      # This file
│
├── superadmin_types/
│   └── superadmin_types.ts             # All TypeScript types: Tenant, SubscriptionPlan, Coupon, Affiliate, Broadcast, etc.
│
├── superadmin_api/
│   └── superadmin_api.ts               # Typed API client for all 16 modules (gyms, plans, tickets, invoices, etc.)
│
├── superadmin_utils/
│   ├── useSuperadminData.ts            # Generic data-fetching hook
│   ├── useDebounce.ts                  # Debounce utility hook
│   ├── SuperadminValidation.ts         # Validation helpers
│   ├── SuperadminZodSchemas.ts         # Zod schemas for forms
│   └── hooks/
│       ├── useAffiliatesPage.ts        # Logic hook for Affiliates page
│       ├── useBroadcastsPage.ts        # Logic hook for Broadcasts page
│       ├── useCouponsPage.ts           # Logic hook for Coupons page
│       └── useSuperadminMutation.ts    # Generic mutation helper with loading state
│
├── superadmin_components/
│   ├── SuperadminLayout/
│   │   ├── SuperadminLayout.tsx        # Root layout: sidebar + header + content shell
│   │   ├── SuperadminSidebar.tsx       # Collapsible sidebar with nav groups
│   │   └── SuperadminHeader.tsx        # Top header with search, theme toggle, profile dropdown
│   ├── DashboardClient/
│   │   └── DashboardView.tsx           # SaaS KPI cards + ApexCharts MRR area chart + recent onboards
│   ├── JobsClient/
│   │   └── JobsView.tsx                # BullMQ background jobs table + metrics cards
│   └── AuditLogsClient/
│       └── AuditLogsClient.tsx         # Global audit logs table with URL-synced pagination + debounced search
│
├── dashboard/
│   ├── page.tsx                        # Server Component → renders DashboardClient
│   ├── loading.tsx                     # Skeleton loader
│   └── error.tsx                       # Error boundary with Retry
│
├── gyms/                               # Most complex module — full Zustand store
│   ├── page.tsx                        # Server Component entry point
│   ├── gyms.css
│   ├── add/page.tsx                    # Onboard new gym form page
│   ├── gyms_store/
│   │   └── useGymsStore.ts             # Zustand store: gyms[], modals, CRUD actions, ghost login, suspend
│   └── gyms_components/
│       ├── GymsTable/                  # Table + useGymsTable hook (consumes store)
│       ├── GymsToolbar/                # Search + filter bar
│       ├── GymEditModal/               # Edit gym details modal
│       ├── GymEmailModal/              # Email owner modal
│       ├── GymDeleteModal/             # Type-to-confirm delete modal
│       └── AddGymForm/                 # Multi-field onboarding form
│
├── plans/                              # Zustand store (usePlansStore) — Rule 58
│   ├── page.tsx
│   ├── PlansClient.tsx
│   ├── plans_store/
│   │   └── usePlansStore.ts            # Zustand: plans[], fetchState, modal state, CRUD actions
│   ├── plans_context/                  # Intentionally empty — Zustand used instead (Rule 58)
│   └── plans_components/
│       ├── PlansList.tsx               # Grid of plan cards
│       ├── PlanCreateModal.tsx         # RHF + Zod create form
│       └── PlanEditModal.tsx           # RHF + Zod edit form
│
├── tickets/                            # Local state via useSuperadminData
│   ├── page.tsx
│   ├── TicketsClient.tsx
│   ├── loading.tsx
│   └── error.tsx
│
├── invoices/                           # Local state via useSuperadminData
│   ├── page.tsx
│   ├── InvoicesClient.tsx
│   ├── loading.tsx
│   └── error.tsx
│
├── coupons/                            # useCouponsPage hook
│   ├── page.tsx
│   ├── CouponsClient.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── coupons_components/
│       ├── SuperadminCouponModal.tsx
│       └── SuperadminCouponEditModal.tsx
│
├── affiliates/                         # useAffiliatesPage hook
│   ├── page.tsx
│   ├── AffiliatesClient.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── affiliates_components/
│       └── SuperadminAffiliateModal.tsx
│
├── broadcasts/                         # useBroadcastsPage hook
│   ├── page.tsx
│   ├── BroadcastsClient.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── broadcasts_components/
│       └── SuperadminBroadcastModal.tsx
│
├── features/                           # Feature flags + release notes tabs
│   ├── page.tsx
│   ├── FeaturesClient.tsx
│   ├── loading.tsx
│   └── error.tsx
│
├── system/                             # Migration health + global audit log
│   ├── page.tsx
│   ├── SystemClient.tsx
│   ├── loading.tsx
│   └── error.tsx
│
├── infrastructure/                     # Server node CPU/RAM/Disk metrics
│   ├── page.tsx
│   ├── InfrastructureClient.tsx
│   ├── loading.tsx
│   └── error.tsx
│
├── backups/                            # pg_dump backup records
│   ├── page.tsx
│   ├── BackupsClient.tsx
│   ├── loading.tsx
│   └── error.tsx
│
├── migrations/                         # TypeORM schema rollout management
│   ├── page.tsx
│   ├── MigrationsClient.tsx
│   ├── loading.tsx
│   └── error.tsx
│
├── settings/                           # Platform-wide key-value settings
│   ├── page.tsx
│   ├── SettingsClient.tsx
│   ├── loading.tsx
│   └── error.tsx
│
└── audit-logs/                         # Global audit log (URL-synced pagination)
    └── page.tsx                        # Renders AuditLogsClient from superadmin_components
```

## Forbidden Patterns (see also `*_forbidden.md` per module)
- Do NOT import from the ERP module (`/erp/`) except for shared primitives like `SearchableDropdown`.
- Do NOT add global auth logic here — handled by `middleware.ts`.
- Do NOT use `any` types — use `unknown` + Zod or explicit interfaces.
- Do NOT use boolean `isLoading` flags — use `FetchState` enum.
- Do NOT use Recharts — use ApexCharts exclusively.
- Do NOT hardcode inline hex colors (`bg-[#1E1E2E]`) — use design token classes (`bg-input`).
