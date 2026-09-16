# Superadmin — Feature Map

## Module Purpose
The Superadmin module is the platform-owner control surface for tenant and platform administration. Its business features are split into independently navigable folders so an AI agent can repair one feature without loading unrelated Superadmin business code. Superadmins can manage tenants, plans, billing, support, messaging, infrastructure, migrations, reporting, audits, jobs, backups, settings, and related platform operations represented by the current routes. Operational features belonging to other roles are outside this module.

## Directory Structure

| Folder | Responsibility | Key files |
|---|---|---|
| `affiliates/` | Owns the `affiliates` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `analytics/` | Owns the `analytics` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `backups/` | Owns the `backups` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `branches/` | Owns the `branches` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `broadcasts/` | Owns the `broadcasts` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `cancellations/` | Owns the `cancellations` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `coupons/` | Owns the `coupons` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `dashboard/` | Owns the `dashboard` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `features/` | Owns the `features` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `franchises/` | Owns the `franchises` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `global-audit/` | Owns the `global-audit` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `gyms/` | Owns the `gyms` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `infrastructure/` | Owns the `infrastructure` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `invoices/` | Owns the `invoices` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `jobs/` | Owns the `jobs` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `messaging/` | Owns the `messaging` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `migrations/` | Owns the `migrations` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `onboarding/` | Owns the `onboarding` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `plans/` | Owns the `plans` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `profile/` | Owns the `profile` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `reports/` | Owns the `reports` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `settings/` | Owns the `settings` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `system/` | Owns the `system` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `tickets/` | Owns the `tickets` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `usage-meters/` | Owns the `usage-meters` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `superadmin_components/` | Shared Superadmin shell/UI primitives and confirmation/error infrastructure, not business-domain API ownership. | `SuperadminLayout/`, `SuperadminFeedback/`, `SuperadminShared/` |
| `superadmin_utils/` | Stable Superadmin-wide UI helpers such as URL-state handling. | `useSuperadminUrlState.ts` |

## Feature Inventory
Each route-backed folder listed above is a separate feature boundary. See the matching `*_features.md` file inside that folder for the current route, files, API functions, state, UI data, permissions, loading/error states, edge cases, and tests.

## Data and State Architecture
Server/async data is owned by TanStack Query. UI-only shared state belongs in feature-scoped Zustand when needed; component-private state belongs in local React state. Feature business data is not stored in global/shared business modules. Feature API clients validate response data at the API boundary with Zod. Shared `@/lib/api` is transport infrastructure only.

## API Contract
Every feature owns its API boundary and its single feature URL configuration. Cross-feature business dependencies are forbidden; when a feature consumes another backend resource for UI purposes, the consuming feature owns a local minimal contract rather than importing the sibling feature's business types/API/config.

## Permissions and Security
The module is intended for the `SUPERADMIN` role. Frontend UI checks do not replace backend authorization. Destructive and security-sensitive actions must preserve the documented Superadmin confirmation and error-handling behavior.

## Loading, Empty, and Error States
Every route-backed feature should expose `loading.tsx` and `error.tsx` where applicable. Independently fetched sections should isolate failure with the Superadmin error-boundary infrastructure and should never expose raw technical errors.

## Edge Cases and AI Warnings
- **No sibling business imports:** do not couple one Superadmin feature to another feature's APIs, schemas, types, stores, or business constants.
- **No global business dumping ground:** shared infrastructure/UI is allowed; shared business logic is not a convenience layer.
- **No server data in Zustand:** TanStack Query remains the server-state source of truth.
- **No hardcoded URLs or HTTP statuses:** use the feature URL config and standard status constants where required.
- **No fake production records:** mocked backend data belongs to module-owned mock/fixture layers.
- **Do not weaken confirmation/security flows:** destructive actions must retain their feature-specific guard behavior.

## External Infrastructure Dependencies
- `@/lib/api` — global API transport and response envelope.
- Global design-system primitives and app-level authentication/error-monitoring infrastructure where documented by the host project.
- Full CI/runtime verification is **NOT VERIFIED** in this repair environment because dependencies were not installed.

## Documentation Consistency
All Superadmin feature maps in this archive use the actual current folder/file inventory rather than the former centralized business-module description.
