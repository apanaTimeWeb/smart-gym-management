# Superadmin Module — Feature Map

## Module Purpose
The Superadmin module is the Master Control Panel (SaaS layer) for the GymSmart 360 platform.
It is the exclusive interface for the platform operator (not gym owners or staff) to manage
the entire multi-tenant SaaS business. Superadmins use it to onboard and suspend gym tenants,
define and price subscription plans, monitor infrastructure health, manage billing invoices,
run global audit trails, broadcast system-wide announcements, and impersonate any gym admin
for support purposes via Ghost Login. Everything in this module operates at the platform level —
above any individual gym's data silo. No gym-level (Admin/Manager/Trainer) user can access
any route under `/superadmin`.

---

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_api/` | Central API client covering 10 domain namespaces (gyms, plans, jobs, migrations, auditLogs, broadcasts, dashboard, settings, system, infrastructure) | `superadmin_api.ts` |
| `superadmin_components/SuperadminLayout/` | App shell: sidebar, header, error boundary, Ghost Login banner. Renders for every `/superadmin/*` route. | `SuperadminLayout.tsx`, `SuperadminSidebar.tsx`, `SuperadminHeader.tsx`, `SuperadminGhostLoginBanner.tsx`, `useSuperadminGhostLoginStore.ts` |
| `superadmin_components/SuperadminFeedback/` | Global confirmation modal system (`useConfirm()` hook) | `SuperadminConfirmModal.tsx`, `SuperadminConfirmProvider.tsx` |
| `superadmin_components/SuperadminShared/` | Shared primitives used across modules (pagination, date picker, metrics bar) | `SuperadminPagination.tsx` |
| `superadmin_types/` | Shared TypeScript interfaces for the entire superadmin module | `superadmin_types.ts` |
| `superadmin_utils/` | Shared hooks, constants, Zod schemas, and formatters used across modules | `useSuperadminDebounce.ts`, `SuperadminZodSchemas.ts`, `SuperadminChartConstants.ts` |
| `superadmin_url_config.ts` | Single source of truth for all frontend page routes and backend API paths | — |
| `dashboard/` | SaaS-level KPI overview — MRR, active gyms, new onboards | `SuperadminDashboardClient.tsx`, `dashboard_features.md` |
| `analytics/` | Revenue analytics and MRR trend charts | `SuperadminAnalyticsClient.tsx`, `analytics_features.md` |
| `gyms/` | Master tenant registry — CRUD, suspend, Ghost Login, WhatsApp | `SuperadminGymsClient.tsx`, `useSuperadminGymsTable.ts`, `gyms_features.md` |
| `plans/` | SaaS subscription tiers and pricing management | `SuperadminPlansClient.tsx`, `plans_features.md` |
| `invoices/` | Billing history and manual payment logging for tenant subscriptions | `SuperadminInvoicesClient.tsx`, `useSuperadminInvoicesStore.ts`, `invoices_features.md` |
| `coupons/` | Promotional codes and discount management for SaaS subscriptions | `SuperadminCouponsClient.tsx`, `coupons_features.md` |
| `affiliates/` | Affiliate partner tracking and referral management | `SuperadminAffiliatesClient.tsx`, `affiliates_features.md` |
| `tickets/` | Global support ticketing — view and respond to gym owner tickets | `SuperadminTicketsClient.tsx`, `tickets_features.md` |
| `usage-meters/` | Per-tenant resource consumption tracking (members, storage, API calls) | `SuperadminUsageMetersClient.tsx`, `usage-meters_features.md` |
| `broadcasts/` | System-wide announcements pushed to all tenant dashboards | `SuperadminBroadcastsClient.tsx`, `broadcasts_features.md` |
| `features/` | Feature flag management — enable/disable features per plan or tenant | `SuperadminFeaturesClient.tsx`, `features_features.md` |
| `infrastructure/` | Server node health, Redis telemetry, cache flush controls | `SuperadminInfrastructureClient.tsx`, `infrastructure_features.md` |
| `migrations/` | Database schema rollout tracking across all tenant instances | `SuperadminMigrationsClient.tsx`, `migrations_features.md` |
| `jobs/` | Background job queue monitoring (BullMQ — active, completed, failed, delayed) | `SuperadminJobsClient.tsx`, `jobs_features.md` |
| `backups/` | Database backup scheduling and restore operations | `SuperadminBackupsClient.tsx`, `backups_features.md` |
| `system/` | OS-level system health — CPU, RAM, disk, uptime, service statuses | `SuperadminSystemClient.tsx`, `system_features.md` |
| `global-audit/` | Immutable master audit log for all cross-tenant superadmin actions | `SuperadminGlobalAuditClient.tsx`, `global-audit_features.md` |
| `settings/` | Global platform configuration (billing cycle, maintenance mode, SMTP, etc.) | `SuperadminSettingsClient.tsx`, `settings_features.md` |
| `messaging/` | Direct messaging to gym owners via email or in-app channel | `SuperadminMessagingClient.tsx`, `messaging_features.md` |
| `reports/` | Platform-wide financial and operational reports | `SuperadminReportsClient.tsx`, `reports_features.md` |
| `onboarding/` | Guided onboarding wizard for new gym tenants | `SuperadminOnboardingClient.tsx`, `onboarding_features.md` |
| `tenant-preview/` | Read-only simulated view of any tenant's admin dashboard (no mutations) | `SuperadminTenantPreviewClient.tsx`, `tenant-preview_features.md` |
| `branches/` | Cross-tenant branch management and franchise group view | `SuperadminBranchesClient.tsx`, `branches_features.md` |
| `franchises/` | Franchise group management — parent entities owning multiple gym branches | `SuperadminFranchisesClient.tsx`, `franchises_features.md` |

---

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| SaaS Dashboard | `/superadmin/dashboard` | View MRR, active gyms, new onboards, suspended tenants at a glance | `SuperadminDashboardClient` | `GET /superadmin/dashboard/metrics` | ✅ Live |
| Tenant List | `/superadmin/gyms` | Paginated gym table with search, status filter, inline actions | `SuperadminGymsClient`, `SuperadminGymsTable` | `GET /superadmin/gyms-list` | ✅ Live |
| Onboard Gym | `/superadmin/gyms/add` | Multi-step wizard to register a new gym tenant | `SuperadminAddGymForm` | `POST /superadmin/gyms-list` | ✅ Live |
| Suspend / Reactivate | `/superadmin/gyms` | Toggle gym status ACTIVE ↔ SUSPENDED | `useSuperadminGymsTable` | `PATCH /superadmin/gyms-list/:id/status` | ✅ Live |
| Delete Gym | `/superadmin/gyms` | Permanent type-to-confirm deletion | `SuperadminGymDeleteModal` | `DELETE /superadmin/gyms-list/:id` | ✅ Live |
| Ghost Login | `/superadmin/gyms` → `/admin/dashboard` | Impersonate any gym's admin — issues JWT, sets cookie, redirects with exit banner | `useSuperadminGymsTable`, `SuperadminGhostLoginBanner` | `POST /superadmin/gyms-list/:id/impersonate` | ✅ Live |
| Subscription Plans | `/superadmin/plans` | Create, edit, delete SaaS subscription tiers (BASIC / STARTER / PRO / ENTERPRISE) | `SuperadminPlansClient`, `SuperadminPlanCreateModal`, `SuperadminPlanEditModal` | `GET/POST/PATCH/DELETE /superadmin/plans` | ✅ Live |
| Invoices & Billing | `/superadmin/invoices` | View tenant billing history; log manual offline payments | `SuperadminInvoicesClient`, `SuperadminInvoicesLogPaymentModal` | `GET /superadmin/invoices`, `POST /superadmin/invoices/manual-payment` | ✅ Live |
| Coupons | `/superadmin/coupons` | Manage discount codes for SaaS subscription checkout | `SuperadminCouponsClient` | `GET/POST/PATCH/DELETE /superadmin/coupons` | ✅ Live |
| Affiliates | `/superadmin/affiliates` | Track affiliate partners and referral earnings | `SuperadminAffiliatesClient` | `GET /superadmin/affiliates` | ✅ Live |
| Support Tickets | `/superadmin/tickets` | View and respond to gym owner support requests | `SuperadminTicketsClient` | `GET /superadmin/tickets` | ✅ Live |
| Usage Meters | `/superadmin/usage-meters` | Monitor per-tenant resource usage (members, API calls, storage) | `SuperadminUsageMetersClient` | `GET /superadmin/usage-meters` | ✅ Live |
| Broadcasts | `/superadmin/broadcasts` | Send a system-wide announcement to all tenant dashboards | `SuperadminBroadcastsClient` | `POST /superadmin/broadcasts` | ✅ Live |
| Feature Flags | `/superadmin/features` | Toggle platform features on/off per plan tier or specific tenant | `SuperadminFeaturesClient` | `GET/PATCH /superadmin/features` | ✅ Live |
| Infrastructure | `/superadmin/infrastructure` | View server node health, Redis telemetry; flush global or tenant cache | `SuperadminInfrastructureClient`, `SuperadminFlushTenantModal` | `GET /superadmin/infrastructure`, `GET /superadmin/infrastructure/redis`, `POST /superadmin/infrastructure/redis/flush-*` | ✅ Live |
| Schema Migrations | `/superadmin/migrations` | Track and trigger database schema rollouts across all tenant instances | `SuperadminMigrationsClient` | `GET /superadmin/migrations`, `POST /superadmin/migrations/trigger` | ✅ Live |
| Background Jobs | `/superadmin/jobs` | Monitor BullMQ job queues — active, completed, failed, delayed counts | `SuperadminJobsClient` | `GET /superadmin/jobs` | ✅ Live |
| Backups | `/superadmin/backups` | View backup schedule; trigger manual backup; initiate restore | `SuperadminBackupsClient` | `GET/POST /superadmin/backups` | ✅ Live |
| System Health | `/superadmin/system` | View CPU, RAM, disk, uptime, and per-service status | `SuperadminSystemClient` | `GET /superadmin/system-health` | ✅ Live |
| Global Audit Log | `/superadmin/global-audit` | Immutable log of all superadmin actions across all tenants | `SuperadminGlobalAuditClient` | `GET /superadmin/audit-logs` | ✅ Live |
| Platform Settings | `/superadmin/settings` | Edit global key-value configuration (billing cycle, maintenance mode, SMTP) | `SuperadminSettingsClient` | `GET /superadmin/settings`, `PATCH /superadmin/settings/:id` | ✅ Live |
| Tenant Preview | `/superadmin/tenant-preview` | Read-only simulation of any gym's admin dashboard — no mutations | `SuperadminTenantPreviewClient` | `GET /superadmin/tenant-preview/:id` (future) | ✅ Live |
| Analytics | `/superadmin/analytics` | MRR trends, gym growth charts, churn analysis | `SuperadminAnalyticsClient` | `GET /superadmin/analytics` | ✅ Live |
| Reports | `/superadmin/reports` | Platform-wide financial and operational PDF/CSV exports | `SuperadminReportsClient` | `GET /superadmin/reports` | ✅ Live |

---

## User Flows & Interactions

### Flow 1: Ghost Login (Tenant Impersonation)
1. Superadmin opens `/superadmin/gyms` → gym list loads via `useQuery(['superadmin', 'gyms'])`
2. Superadmin hovers a row → row action buttons become visible (mobile: always visible)
3. Clicks **LogIn icon** → `onGhostLoginClick` in `useSuperadminGymsTable` fires `impersonateMutation`
4. `POST /superadmin/gyms-list/:id/impersonate` returns `{ token: string }`
5. Token is written as HTTP-only cookie via `POST AuthUrlConfig.PROXY_API.SET_COOKIE`
6. `startGhostLogin({ id, name, plan, adminEmail })` populates `useSuperadminGhostLoginStore`
7. Hard redirect to `/admin/dashboard` — superadmin is now inside the gym's admin shell
8. `SuperadminGhostLoginBanner` is always visible (rendered in `SuperadminLayout`) — shows tenant name + plan + "Exit" button
9. On "Exit Ghost Login" click → `exitGhostLogin()` clears store state + `window.location.href = '/superadmin/gyms'`

### Flow 2: Create a Subscription Plan
1. Superadmin opens `/superadmin/plans` → plan cards loaded
2. Clicks **"Create Plan"** → `SuperadminPlanCreateModal` opens
3. Fills plan name, monthly price, annual price, max members, max staff, feature list
4. On submit → `POST /superadmin/plans` → `useSuperadminPlansStore.closeCreateModal()` + TanStack Query invalidates `['superadmin', 'plans']`
5. New plan card appears in the list with the data returned from the backend

### Flow 3: Log a Manual Invoice Payment
1. Superadmin opens `/superadmin/invoices`
2. Clicks **"Log Manual Payment"** → `SuperadminInvoicesLogPaymentModal` opens
3. Selects gym from dropdown (loaded from `superadminApi.gyms.fetchGyms()`), enters amount and plan name
4. On submit → `POST /superadmin/invoices/manual-payment` → backend creates invoice record
5. On success: `useSuperadminInvoicesStore` prepends the returned invoice object to the list (pessimistic update — uses backend `res.data`, not local construction)

### Flow 4: Flush Tenant Redis Cache
1. Superadmin opens `/superadmin/infrastructure`
2. Views Redis telemetry (hit rate, connected clients, memory usage — auto-refreshes every 30s)
3. Clicks **"Flush Tenant Cache"** → `SuperadminFlushTenantModal` opens — select specific tenant IDs
4. Confirms action → `POST /superadmin/infrastructure/redis/flush-tenant { tenantIds }`
5. Toast shows backend confirmation message

---

## Data and State Architecture

- **Server state pattern:** TanStack Query (`useQuery` / `useMutation`) is the single source of truth for all API data. Backend data is NEVER stored in Zustand.
- **Query client config:** `SuperadminQueryProvider` — `staleTime: 60_000`, `refetchOnWindowFocus: false`
- **TanStack Query key namespace:** All keys begin with `['superadmin', ...]`
  - `['superadmin', 'gyms']` — tenant list
  - `['superadmin', 'plans']` — subscription plans
  - `['superadmin', 'invoices']` — billing records
  - `['superadmin', 'migrations']` — schema rollout logs
  - `['superadmin', 'jobs']` — background job queue metrics
  - `['superadmin', 'dashboard']` — SaaS KPI metrics
  - `['superadmin', 'infrastructure']` — server node data (refetchInterval: 30_000)
  - `['superadmin', 'settings']` — platform config key-values
- **Zustand stores (UI state only):**
  - `useSuperadminGymsStore.ts` — gym module modal visibility + filter values
  - `useSuperadminPlansStore.ts` — plans module modal visibility + selected plan
  - `useSuperadminGhostLoginStore.ts` — active impersonation session (`ghostTenant`)
  - `useSuperadminInvoicesStore.ts` — invoice list + tenant list (exception: holds server data for cross-entity join; documented pragmatic deviation)
- **Context providers:** `SuperadminConfirmProvider` (global `useConfirm()` hook) + `SuperadminQueryProvider`
- **Local-storage keys:** None — auth token is HTTP-only cookie
- **MSW handler files:** Not yet configured

---

## API Contract

All calls go through `apiFetch` at `@/lib/api`. Full envelope: `{ success: boolean, message: string, data: T | null }`

Central client: `superadminApi` in `superadmin_api/superadmin_api.ts`

| Namespace | Function | Method | Endpoint | Response `data` |
|---|---|---|---|---|
| `gyms` | `fetchGyms(params?)` | GET | `/superadmin/gyms-list` | `Tenant[]` |
| `gyms` | `fetchGymById(id)` | GET | `/superadmin/gyms-list/:id` | `Tenant` |
| `gyms` | `createGym(body)` | POST | `/superadmin/gyms-list` | `Tenant` |
| `gyms` | `updateGym(id, body)` | PATCH | `/superadmin/gyms-list/:id` | `Tenant` |
| `gyms` | `changeGymStatus(id, status)` | PATCH | `/superadmin/gyms-list/:id/status` | `Tenant` |
| `gyms` | `impersonateTenant(id)` | POST | `/superadmin/gyms-list/:id/impersonate` | `{ token: string }` |
| `gyms` | `deleteGym(id)` | DELETE | `/superadmin/gyms-list/:id` | `void` |
| `gyms` | `emailGymOwner(id, body)` | POST | `/superadmin/gyms-list/:id/email` | `void` |
| `plans` | `fetchPlans(params?)` | GET | `/superadmin/plans` | `SubscriptionPlan[]` |
| `plans` | `createPlan(body)` | POST | `/superadmin/plans` | `SubscriptionPlan` |
| `plans` | `updatePlan(id, body)` | PATCH | `/superadmin/plans/:id` | `SubscriptionPlan` |
| `plans` | `deletePlan(id)` | DELETE | `/superadmin/plans/:id` | `void` |
| `dashboard` | `fetchDashboardData()` | GET | `/superadmin/dashboard` | `SaaSDashboardMetrics` |
| `settings` | `fetchSettings()` | GET | `/superadmin/settings` | `PlatformSetting[]` |
| `settings` | `updateSetting(id, body)` | PATCH | `/superadmin/settings/:id` | `PlatformSetting` |
| `system` | `fetchSystemInfo()` | GET | `/superadmin/system-health` | `SystemHealthData` |
| `infrastructure` | `fetchInfrastructureNodes()` | GET | `/superadmin/infrastructure` | `InfrastructureNode[]` |
| `infrastructure` | `fetchRedisTelemetry()` | GET | `/superadmin/infrastructure/redis` | `RedisTelemetry` |
| `infrastructure` | `flushGlobalCache()` | POST | `/superadmin/infrastructure/redis/flush-global` | `void` |
| `infrastructure` | `flushTenantCache(tenantIds)` | POST | `/superadmin/infrastructure/redis/flush-tenant` | `void` |
| `jobs` | `fetchJobs(params?)` | GET | `/superadmin/jobs` | `BackgroundJob[]` |
| `migrations` | `fetchMigrations(params?)` | GET | `/superadmin/migrations` | `MigrationsPageData` |
| `auditLogs` | `fetchGlobalLogs(params?)` | GET | `/superadmin/audit-logs` | `GlobalAuditLog[]` |
| `broadcasts` | `sendBroadcast(message)` | POST | `/superadmin/broadcasts` | `void` |
| `invoicesApi` | `fetchInvoices(params?)` | GET | `/superadmin/invoices` | `SaaSInvoice[]` |
| `invoicesApi` | `createManualPayment(dto)` | POST | `/superadmin/invoices/manual-payment` | `SaaSInvoice` |

---

## Permissions and Security

- **Required role:** `SUPERADMIN` — enforced by `middleware.ts` checking the `gymsmart_token` HTTP-only cookie
- **Complete isolation:** Zero imports from `/admin`, `/manager`, `/trainer`. `superadmin_forbidden.md` enforces this.
- **Ghost Login guards:** Impersonation token is short-lived and scoped to `ADMIN` role on the specific tenant only. Cookie is HTTP-only. Exit always forces a hard redirect.
- **Destructive action gates:**
  - Delete gym → type-to-confirm (`"DELETE"`) in `SuperadminGymDeleteModal`
  - Flush global Redis cache → `useConfirm()` modal with explicit consequence statement
  - Delete plan (when no active subscribers) → `useConfirm()` modal
- **Sensitive data handling:** Gym owner phone numbers masked via `maskSensitiveData()` in list views
- **No payment logic in this module:** Stripe/payment gateway integration (if any) is in `invoices/` only

---

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| All pages | `loading.tsx` — structural skeleton matching the page layout (table ghost rows or card ghosts) | N/A | `error.tsx` — module-branded card with "Try Again" button calling `reset()` |
| Gyms table | 5 ghost rows (7 columns) in `SuperadminGymsTable` | `SuperadminGymsEmptyState` — icon + message + "Onboard First Gym" CTA | Inline danger text in table body |
| Plans list | Card grid skeleton in plans `loading.tsx` | `SuperadminPlansEmptyState` — "No plans yet" + "Create Plan" CTA | Inline error with retry |
| Infrastructure | Node card skeletons + Redis metric ghosts | N/A (always has data if server is up) | Section-level error with "Retry" |
| Background Jobs | Table skeleton | "No jobs in queue" | Inline error |

---

## Edge Cases and AI Warnings

- **Ghost Login uses `window.location.href` not `router.push` — do not change this.** A hard redirect is required to clear any admin-role state loaded during impersonation. Next.js client navigation would leave stale TanStack Query caches from the impersonated session in memory.
- **`useSuperadminInvoicesStore` stores server data in Zustand — this is a documented exception.** The invoices module requires a cross-entity join (invoices + tenants) that cannot be cleanly expressed as a single TanStack Query. This pattern is explicitly noted and must not be replicated in new modules.
- **`MOCK_GYMS` in `SuperadminGymsConstants.ts` is a dev fallback.** When the API returns an empty array, `MOCK_GYMS` is used instead. Gate this with `process.env.NODE_ENV === 'development'` before production.
- **`superadmin_api.ts` covers only 10 of 24 modules.** Many modules (affiliates, analytics, backups, coupons, features, invoices, tickets, etc.) use their own dedicated `superadmin_{module}_api.ts`. Do not add these to the central client — the micro-modularization pattern is intentional.
- **`InfrastructureNode` type exists in both `superadmin_types.ts` (global) and `infrastructure_types.ts` (module-local).** The two definitions have diverged — the module-local type is canonical. When working on the infrastructure module, always import from `@/app/superadmin/infrastructure/infrastructure_types/infrastructure_types` not from the global types file.
- **Redis cache flush affects ALL tenants simultaneously.** Global flush must state this clearly in the `useConfirm()` dialog. Never allow an AI agent to simplify the warning text.
- **Audit logs are immutable.** There is no delete endpoint for `global-audit`. Never add one. Soft-delete is also forbidden.
- **Plans with active subscribers cannot be deleted.** Validate `activeTenants > 0` before enabling the delete button. If the backend rejects it, display the `res.message` — do not hardcode a fallback message.
- **The `BACKEND_API.AUDIT_LOGS_BASE` path (`/superadmin/audit-logs`) differs from the `PAGES.GLOBAL_AUDIT` path (`/superadmin/global-audit`).** This asymmetry is intentional — the backend uses `audit-logs` while the frontend route uses `global-audit` to avoid confusion with module-level audit logs inside individual gyms.

---

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, file size ceilings enforced
- [x] Rule 2: Total Role Isolation — zero cross-role imports (`/admin`, `/manager`, `/trainer`)
- [x] Rule 3: Hyper-descriptive naming — `Superadmin` prefix on all component files
- [x] Rule 3B: Centralized data — plan colors in constants, URLs in `superadmin_url_config.ts`, status maps in module constants
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind arbitrary values in JSX
- [x] Rule 5: Smart State Management — TanStack Query for server state, Zustand for UI state only
- [x] Rule 6: Logic/UI Separation — `use*Table.ts` / `use*Page.ts` hooks extract all query and mutation logic
- [x] Rule 7: Type Isolation — all types in `*_types/` folders; `import type` enforced
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component, `*Client.tsx` = Client Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present in every module with non-generic skeletons
- [x] Rule 10: Absolute imports — `@/app/superadmin/...` throughout
- [x] Rule 11: Centralized URL Config — `SuperadminUrlConfig` used everywhere; no hardcoded strings
- [x] Rule 13: Feature Map — this document; updated with every code change
- [x] Rule 14: Backend-driven messages — all toasts display `res.message`; no hardcoded strings
- [x] Rule 19: Clickable table rows — `cursor-pointer` on all `<tr>`; no View/Eye button
- [x] Rule 26: Loading button states — `Loader2` spinners on all async actions
- [x] Rule 32: No barrel files — direct named imports only
- [x] Rule 40: `superadmin_forbidden.md` present with 6 specific entries; per-module `_forbidden.md` present for all 24 modules
- [x] Rule 43: Sensitive data masking — phone numbers masked via `maskSensitiveData()` in list views
- [x] Rule 44: No `console.log` in production code
- [x] Rule 55: No `key={index}` — stable UUIDs used as keys in all lists
- [x] Rule 63: Zero cross-module imports verified
- [x] Rule 71: Destructive actions use `useConfirm()` or type-to-confirm modal
- [x] Rule 73: `import type` used for all type-only imports
- [ ] Rule 15A: Tests — co-located test files for hooks and utils not yet present (gap)
- [ ] Rule 15B: Forms — React Hook Form + Zod used in most forms; verify coverage in all modals
- [ ] Rule 75: MSW handlers — not yet configured for any superadmin module
- [x] Design §3: Sidebar active state = subtle gold left border + `bg-primary-subtle` + glow
- [x] Design §12: Z-index scale — header `z-20`, dropdowns `z-30`, modals `z-40`, toasts `z-50`, Ghost Login banner `z-50`
- [x] Design §28: Surface elevation — `bg-overlay` for modals, `bg-popover` for dropdowns
- [x] Design §29: `motion-safe:` prefix on all transitions and animations
