# Manager Infrastructure — Feature Map

## Module Purpose
`manager_infrastructure/` contains stable role-level infrastructure that multiple Manager features can safely consume without creating business coupling. It owns safe error-message normalization, environment/configuration access, HTTP-status constants, money/pagination helpers, permission-gate infrastructure, idempotency and unsaved-change helpers, and the Manager toast service.

Module root: `frontend_manager/manager_infrastructure/`

## Dependency Manifest
- Next.js App Router
- React
- TanStack Query
- Zod
- next-intl
- Vitest

## Feature Lifecycle Contract
- Create: Not applicable — infrastructure exposes helpers/providers, not business CRUD.
- Read: Exposed through infrastructure helpers/providers only.
- Update: Not applicable — no business records are owned.
- Delete: Not applicable — no business records are owned.


## Directory Structure

| Folder | Exact Responsibility | Key Files |
|---|---|---|
| `(module root)` | Owns stable Manager infrastructure contracts and documentation; it does not expose a business route or feature URL config. | useManagerDebounce.test.ts, useManagerDebounce.ts, ManagerEnvConfig.ts, manager_infrastructure_env_contract.md, ManagerErrorMessage.ts, ManagerGymIdentity.ts, manager_infrastructure_hook_filename_convention.md, ManagerHttpStatus.ts, ManagerIdempotency.test.ts, ManagerIdempotency.ts, manager_infrastructure_boundary.md, ManagerMockApiUrl.ts, manager_infrastructure_mock_runtime_policy.md, ManagerMoney.test.ts, ManagerMoney.ts, ManagerPaginationDefaults.ts, ManagerPermissionGate.tsx, manager_infrastructure_root_tooling_requirements.md, ManagerToastService.test.ts, ManagerToastService.ts, manager_infrastructure_features.md, manager_infrastructure_forbidden.md, manager_infrastructure_theme_contract.md |
| `manager_infrastructure_locales/` | Owns the module-local translation catalogs consumed through next-intl. | manager_infrastructure_en.json, manager_infrastructure_hi.json |
| `manager_infrastructure_types/` | Owns Infrastructure domain, API, form, and view-model TypeScript contracts. | ManagerPermissionGateTypes.ts |

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/lib/usePermissions`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- None.

### Third-Party Dependencies
- `@testing-library/react`
- `http-status-codes`
- `next`
- `next-intl`
- `react`
- `sonner`
- `vitest`
- `zod`

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `ManagerPermissionGate.tsx` | Applies the documented Manager capability boundary without owning feature business behavior. |
| `ManagerQueryProvider.tsx` | Owns the Manager role TanStack Query client/provider boundary. |

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** No URL-backed list state was detected; this module must add URL state before introducing a searchable/filterable/paginated list.
- **Zustand stores:** None detected.
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** No static queryKey literals detected.
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** No module-owned MSW handlers/fixtures; this role-level infrastructure module is not a business feature mock boundary.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Error/message normalization | Infrastructure-only | Receive safe backend error text for UI feedback | None | Implemented |
| Idempotency helper | Infrastructure-only | Generate and reuse one mutation key per user intent | None | Implemented |
| Unsaved-change guard | Infrastructure-only | Confirm before browser exit, in-app navigation, or modal discard when forms are dirty | None | Implemented |
| Permission gate | Authenticated Manager routes | Prevent rendering of Manager workspace when the documented capability is absent | Host permission infrastructure | Implemented |
| Toast service | Infrastructure-only | Show deduplicated backend-driven success/error notifications | None | Implemented |

## User Flows & Interactions
### Flow 1: Dirty-form navigation guard
1. A form reports `isDirty=true` to the Manager components unsaved-changes guard hook.
2. Browser-exit protection is registered with `beforeunload`.
3. Same-origin anchor navigation is intercepted and routed through the confirmation provider.
4. The user confirms discard or stays on the form.
5. After successful submission the owning feature disables the dirty state.

### Flow 2: Mutation notification
1. A feature receives a backend success/error response.
2. The feature passes the backend message to `ManagerToastService`.
3. The toast receives a stable deduplication ID.
4. Repeated identical notifications reuse the same visible toast instead of stacking.

## API Contract
No business API endpoints are owned by `manager_infrastructure`. Helpers only construct transport metadata, normalization, or UI protection behavior.

## UI Data Requirements
No server/business records are rendered by this module.

## Permissions and Security
- `ManagerPermissionGate` consumes the approved application permission source.
- `ManagerIdempotency` must never be used as a security control; it only protects repeated mutation intent.

## Loading, Empty, and Error States
Infrastructure utilities do not own business loading/empty/error states. They expose reusable primitives consumed by feature modules.

## Edge Cases and AI Warnings
- **Never swallow backend messages in feature mutations:** pass the normalized error/message to the feature-owned feedback path.
- **Never generate a fresh idempotency key for a retry:** reuse the key until the user starts a new intent.
- **Never bypass the unsaved-change guard on modal close or navigation:** confirm when the form is dirty.
- **Do not move business configuration into this module:** infrastructure must remain behaviorally stable and business-agnostic.
- **Do not treat `ManagerPermissionGate` as backend authorization:** backend authorization remains authoritative.

## Rule Compliance Checklist
- [x] Infrastructure responsibilities are documented and separate from feature business logic.
- [x] No feature-specific API/client/data registry is owned here.
- [x] Unsaved-change guard covers browser exit and same-origin client navigation interception.
- [x] Idempotency helper exposes stable per-intent key/header primitives.
- [x] Toast service supports stable success/error deduplication IDs.
- [ ] Host permission provider, global API interceptor, CI/security gates, CODEOWNERS and production build require root-repository verification.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.


### Key Infrastructure File
- `ManagerQueryProvider.tsx` owns the TanStack Query client/provider boundary for the Manager frontend role.
