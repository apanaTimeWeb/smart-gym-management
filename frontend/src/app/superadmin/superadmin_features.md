# Superadmin Feature Map

## Module Purpose
The Master Control Panel for the Multi-Tenant SaaS platform. Strictly isolated from the ERP module. Intended exclusively for platform owners (Superadmins). Handles tenant provisioning, global subscriptions, analytics, and infrastructure health.

## Directory Structure
- `superadmin_components/`: Reusable components within the superadmin module.
- `superadmin_store/`: Zustand stores for UI state (modals, search).
- `superadmin_api/`: Strictly typed API client adhering to the Verb Contract.
- `superadmin_types/`: Interfaces and Enums.
- `superadmin_utils/`: Constants, validation schemas, and formatters.

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Owner |
|---|---|---|---|---|
| Dashboard | `/superadmin/dashboard` | High-level metrics | `fetchDashboardData` | Superadmin |
| Tenants (Gyms) | `/superadmin/gyms` | Tenant CRUD & Impersonation | `fetchGyms`, `impersonateTenant`, `changeGymStatus` | Superadmin |
| Subscriptions | `/superadmin/plans` | SaaS Plans CRUD | `fetchPlans`, `createPlan`, `updatePlan` | Superadmin |
| Audit Logs | `/superadmin/audit-logs` | Global tracking | `fetchGlobalLogs` | Superadmin |
| Infrastructure | `/superadmin/infrastructure`| Health metrics | `fetchInfrastructureNodes` | DevOps |

## Data and State Architecture
- Server-state query keys: `['superadmin', 'gyms']`, `['superadmin', 'plans']`
- Zustand stores: `useGymsStore`, `usePlansStore` (Modal state only)
- Context providers: None (using Zustand for UI state)
- Local-storage keys: `gymsmart_impersonate_token`
- MSW handler file: `src/mocks/superadmin_handlers.ts`

## API Contract
- `superadminApi.gyms.fetchGyms` -> `ApiResponse<Tenant[]>`
- `superadminApi.gyms.createGym` -> `ApiResponse<Tenant>`
- `superadminApi.plans.fetchPlans` -> `ApiResponse<SubscriptionPlan[]>`

## Permissions and Security
- Access strictly limited to `ROLE_SUPERADMIN`. Handled in `middleware.ts`.
- `CODEOWNERS` requires mandatory human review for changes to auth and billing paths.

## Loading, Empty, Error States
- `loading.tsx` uses `--skeleton-base` layout-matching skeletons.
- `error.tsx` catches rendering issues with a retry boundary.

## Edge Cases / AI Warnings
- **Pessimistic UI:** Tenant suspension must wait for API success before updating state.
- **Type-to-Confirm:** Destructive actions (deleting tenants) strictly require typing "DELETE".

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 7: Type isolation
- [x] Rule 8: Server/client boundary
- [x] Rule 9: Loading/error/not-found handling
- [x] Rule 14: Backend-driven messages
- [x] Rule 15A: Tests present
- [x] Rule 15B: Forms use React Hook Form + Zod
- [x] Rule 15C: State placed per Server/Client decision matrix
- [x] Rule 15D: Env vars validated centrally, none exposed unsafely
- [x] Rule 15E: Error monitoring wired for critical flows
- [x] Rule 74: Security scan gates passed (SCA + secrets)
- [x] Rule 76: CODEOWNERS covers security-critical paths
- [x] Rule 79: MSW handler present where needed
