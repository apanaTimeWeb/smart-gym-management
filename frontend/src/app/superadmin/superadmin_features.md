# Superadmin — Feature Map

## Module Purpose
The Superadmin module is the platform-owner control surface for tenant lifecycle and platform operations. Its business features are independently organized so an AI agent can work inside one feature without loading unrelated business code. Users can inspect and administer tenants, plans, billing, support, messaging, infrastructure, migrations, audits, jobs, reporting, and platform configuration. Tenant-user operational workflows outside the Superadmin role are out of scope.

## Directory Structure

| Folder | Responsibility | Key files/pattern |
|---|---|---|
| `affiliates/` | Owns the `affiliates` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_affiliates_api/superadmin_affiliates_api.ts` |
| `analytics/` | Owns the `analytics` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_analytics_api/superadmin_analytics_api.ts` |
| `backups/` | Owns the `backups` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_backups_api/superadmin_backups_api.ts` |
| `branches/` | Owns the `branches` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_branches_api/superadmin_branches_api.ts` |
| `broadcasts/` | Owns the `broadcasts` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_broadcasts_api/superadmin_broadcasts_api.ts` |
| `cancellations/` | Owns the `cancellations` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `cancellations_api/superadmin_cancellations_api.ts` |
| `coupons/` | Owns the `coupons` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_coupons_api/superadmin_coupons_api.ts` |
| `dashboard/` | Owns the `dashboard` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `dashboard_api/superadmin_dashboard_api.ts` |
| `features/` | Owns the `features` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_features_api/superadmin_features_api.ts` |
| `franchises/` | Owns the `franchises` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_franchises_api/superadmin_franchises_api.ts` |
| `global-audit/` | Owns the `global-audit` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_global-audit_api/superadmin_global-audit_api.ts` |
| `gyms/` | Owns the `gyms` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_gyms_api/superadmin_gyms_api.ts` |
| `infrastructure/` | Owns the `infrastructure` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_infrastructure_api/superadmin_infrastructure_api.ts` |
| `invoices/` | Owns the `invoices` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_invoices_api/superadmin_invoices_api.ts` |
| `jobs/` | Owns the `jobs` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_jobs_api/superadmin_jobs_api.ts` |
| `messaging/` | Owns the `messaging` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `messaging_api/superadmin_messaging_api.ts` |
| `migrations/` | Owns the `migrations` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_migrations_api/superadmin_migrations_api.test.ts`, `superadmin_migrations_api/superadmin_migrations_api.ts` |
| `onboarding/` | Owns the `onboarding` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_onboarding_api/superadmin_onboarding_api.ts` |
| `plans/` | Owns the `plans` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_plans_api/superadmin_plans_api.ts` |
| `profile/` | Owns the `profile` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `profile_api/superadmin_profile_api.ts` |
| `reports/` | Owns the `reports` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `reports_api/superadmin_reports_api.ts` |
| `settings/` | Owns the `settings` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_settings_api/superadmin_settings_api.ts` |
| `system/` | Owns the `system` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_system_api/superadmin_system_api.ts`, `system_api/superadmin_system_api.ts` |
| `tickets/` | Owns the `tickets` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_tickets_api/superadmin_tickets_api.ts` |
| `usage-meters/` | Owns the `usage-meters` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, `superadmin_usage-meters_api/superadmin_usage-meters_api.ts` |
| `superadmin_components/` | Superadmin shell, shared dumb UI and confirmation/error primitives; no business-domain API ownership. | `SuperadminLayout/`, `SuperadminFeedback/`, `SuperadminShared/` |
| `superadmin_utils/` | Stable module-level UI helpers and URL-state utilities shared by features. | URL state, chart/date helpers |

## Feature Inventory

| Feature | Route | User can | API owner | Status |
|---|---|---|---|---|
| `affiliates` | `/superadmin/affiliates` | Inspect and operate the feature's documented platform controls. | `superadmin_affiliates_api/superadmin_affiliates_api.ts` | Implemented |
| `analytics` | `/superadmin/analytics` | Inspect and operate the feature's documented platform controls. | `superadmin_analytics_api/superadmin_analytics_api.ts` | Implemented |
| `backups` | `/superadmin/backups` | Inspect and operate the feature's documented platform controls. | `superadmin_backups_api/superadmin_backups_api.ts` | Implemented |
| `branches` | `/superadmin/branches` | Inspect and operate the feature's documented platform controls. | `superadmin_branches_api/superadmin_branches_api.ts` | Implemented |
| `broadcasts` | `/superadmin/broadcasts` | Inspect and operate the feature's documented platform controls. | `superadmin_broadcasts_api/superadmin_broadcasts_api.ts` | Implemented |
| `cancellations` | `/superadmin/cancellations` | Inspect and operate the feature's documented platform controls. | `cancellations_api/superadmin_cancellations_api.ts` | Implemented |
| `coupons` | `/superadmin/coupons` | Inspect and operate the feature's documented platform controls. | `superadmin_coupons_api/superadmin_coupons_api.ts` | Implemented |
| `dashboard` | `/superadmin/dashboard` | Inspect and operate the feature's documented platform controls. | `dashboard_api/superadmin_dashboard_api.ts` | Implemented |
| `features` | `/superadmin/features` | Inspect and operate the feature's documented platform controls. | `superadmin_features_api/superadmin_features_api.ts` | Implemented |
| `franchises` | `/superadmin/franchises` | Inspect and operate the feature's documented platform controls. | `superadmin_franchises_api/superadmin_franchises_api.ts` | Implemented |
| `global-audit` | `/superadmin/global-audit` | Inspect and operate the feature's documented platform controls. | `superadmin_global-audit_api/superadmin_global-audit_api.ts` | Implemented |
| `gyms` | `/superadmin/gyms` | Inspect and operate the feature's documented platform controls. | `superadmin_gyms_api/superadmin_gyms_api.ts` | Implemented |
| `infrastructure` | `/superadmin/infrastructure` | Inspect and operate the feature's documented platform controls. | `superadmin_infrastructure_api/superadmin_infrastructure_api.ts` | Implemented |
| `invoices` | `/superadmin/invoices` | Inspect and operate the feature's documented platform controls. | `superadmin_invoices_api/superadmin_invoices_api.ts` | Implemented |
| `jobs` | `/superadmin/jobs` | Inspect and operate the feature's documented platform controls. | `superadmin_jobs_api/superadmin_jobs_api.ts` | Implemented |
| `messaging` | `/superadmin/messaging` | Inspect and operate the feature's documented platform controls. | `messaging_api/superadmin_messaging_api.ts` | Implemented |
| `migrations` | `/superadmin/migrations` | Inspect and operate the feature's documented platform controls. | `superadmin_migrations_api/superadmin_migrations_api.test.ts` | Implemented |
| `onboarding` | `/superadmin/onboarding` | Inspect and operate the feature's documented platform controls. | `superadmin_onboarding_api/superadmin_onboarding_api.ts` | Implemented |
| `plans` | `/superadmin/plans` | Inspect and operate the feature's documented platform controls. | `superadmin_plans_api/superadmin_plans_api.ts` | Implemented |
| `profile` | `/superadmin/profile` | Inspect and operate the feature's documented platform controls. | `profile_api/superadmin_profile_api.ts` | Implemented |
| `reports` | `/superadmin/reports` | Inspect and operate the feature's documented platform controls. | `reports_api/superadmin_reports_api.ts` | Implemented |
| `settings` | `/superadmin/settings` | Inspect and operate the feature's documented platform controls. | `superadmin_settings_api/superadmin_settings_api.ts` | Implemented |
| `system` | `/superadmin/system` | Inspect and operate the feature's documented platform controls. | `superadmin_system_api/superadmin_system_api.ts` | Implemented |
| `tickets` | `/superadmin/tickets` | Inspect and operate the feature's documented platform controls. | `superadmin_tickets_api/superadmin_tickets_api.ts` | Implemented |
| `usage-meters` | `/superadmin/usage-meters` | Inspect and operate the feature's documented platform controls. | `superadmin_usage-meters_api/superadmin_usage-meters_api.ts` | Implemented |

## Data and State Architecture
Server/async data is owned by TanStack Query in feature-local hooks/data layers. Zustand is reserved for UI-only shared state. Local `useState` is component-private. Feature business logic is not shared through sibling business folders; consuming features maintain local endpoint constants and response contracts when they need data from another backend resource.

## API Contract
Each feature owns one `[moduleName]_url_config.ts` and its API client. API response data is validated with Zod at the API boundary. Shared `@/lib/api` is transport infrastructure only.

## Permissions and Security
Superadmin routes are intended for the Superadmin role. Destructive actions use the Superadmin confirmation infrastructure. Frontend role/permission UI does not replace backend authorization.

## Loading, Empty, and Error States
Each feature retains framework route loading/error boundaries where present and implements feature-specific empty/request-error states in its client views. Independently fetched sections should isolate render failures where required by the host design system.

## Edge Cases and AI Warnings
- **No sibling business imports:** do not restore `feature A → feature B` imports for types, APIs, schemas or business constants.
- **No server data in Zustand:** query cache remains the async source of truth.
- **No hardcoded URLs:** route and backend paths belong in the owning feature URL config.
- **No raw Tailwind theme colors:** use semantic design tokens.
- **No fake production records:** fake backend data belongs in feature mock layers.
- **No destructive bypasses:** preserve the Superadmin confirmation flow.

## Unavoidable External Infrastructure Dependencies
- `@/lib/api` — HTTP transport/response envelope.
- `@/lib/formatters` and approved shared UI primitives — stable application infrastructure.
- Approved monitoring provider — **NOT VERIFIED** in the supplied module-only archive.

## Documentation Consistency
This file reflects the feature-oriented repository currently delivered in this archive. The previous centralized Superadmin API/store description has been removed because it did not match the actual feature folders.
