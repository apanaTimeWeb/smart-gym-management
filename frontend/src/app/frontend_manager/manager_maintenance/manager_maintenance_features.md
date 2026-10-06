# Manager Maintenance — Feature Map

## Module Purpose
The Manager Maintenance module gives gym managers a dedicated operational queue for equipment and facility issues. Managers can log a maintenance issue, assign a priority through the documented static options, review reported equipment/area details and mark unresolved issues as resolved. The module owns its API contract, query keys, form validation, mock state and UI transitions. It does not own vendor business systems, billing logic or backend authorization.

Module root: `frontend_manager/manager_maintenance/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `date-fns`
- `lucide-react`
- `msw`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | ManagerMaintenanceApi, requestPayload |
| Read | Exposed | ManagerMaintenanceApi: fetchMaintenanceIssues. |
| Update | Not exposed | No module API client uses PUT/PATCH in the supplied snapshot. |
| Delete | Not exposed | No module API client uses DELETE in the supplied snapshot. |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_maintenance_api/` | Owns feature API clients and request/response transport contracts. | `ManagerMaintenanceApi.ts` |
| `manager_maintenance_components/` | Owns the feature UI component tree and feature-specific presentation. | `manager_maintenance_components/manager_maintenance_log_issue_modal/ManagerMaintenanceLogIssueModal.tsx`, `ManagerMaintenanceMain.tsx` |
| `manager_maintenance_components/manager_maintenance_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMaintenanceContent.tsx` |
| `manager_maintenance_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerMaintenanceConstants.ts`, `ManagerMaintenanceQueryKeys.ts` |
| `manager_maintenance_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerMaintenanceLogic.test.ts`, `useManagerMaintenanceLogic.ts`, `useManagerMaintenanceMutations.test.ts`, `useManagerMaintenanceMutations.ts`, `useManagerMaintenanceQueries.test.ts`, `useManagerMaintenanceQueries.ts` |
| `manager_maintenance_locales/` | Owns module English and Hindi translation catalogs. | `manager_maintenance_en.json`, `manager_maintenance_hi.json` |
| `manager_maintenance_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_maintenance_mocks/manager_maintenance_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMaintenanceMockFixtures.ts` |
| `manager_maintenance_mocks/manager_maintenance_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMaintenanceMockHandlers.test.ts`, `ManagerMaintenanceMockHandlers.ts` |
| `manager_maintenance_schemas/` | Owns feature Zod validation and response schemas. | `ManagerMaintenanceSchemas.ts` |
| `manager_maintenance_tests/` | Owns module behavior and utility tests. | `ManagerMaintenanceBehavior.test.tsx` |
| `manager_maintenance_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerMaintenanceContentTypes.ts`, `ManagerMaintenanceLogIssueModalTypes.ts`, `ManagerMaintenanceTypes.ts` |
| `manager_maintenance_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerMaintenanceFormatters.test.ts`, `ManagerMaintenanceFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_maintenance_features.md`
- `manager_maintenance_forbidden.md`
- `manager_maintenance_theme_contract.md`
- `manager_maintenance_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerToastService`
- `@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- None.

### Third-Party Dependencies
- `@hookform`
- `@tanstack`
- `@testing-library/react`
- `@testing-library/user-event`
- `lucide-react`
- `msw`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Maintenance queue | `/manager/maintenance` | Review maintenance issues and their current status/priority | `ManagerMaintenanceContent.tsx` | GET `/manager/maintenance` | Implemented |
| Log issue | `/manager/maintenance` | Record a maintenance issue with title, equipment, priority and estimated cost | `ManagerMaintenanceLogIssueModal.tsx` | POST `/manager/maintenance` | Implemented |
| Resolve issue | `/manager/maintenance` | Mark an unresolved issue as resolved | `ManagerMaintenanceContent.tsx` | POST `/manager/maintenance/:id/resolve` | Implemented |

## User Flows & Interactions
### Flow 1: Log a maintenance issue
1. Manager clicks `Log Issue`.
2. `ManagerMaintenanceLogIssueModal` opens with RHF + Zod validation.
3. Manager enters title, equipment/area, priority and optional non-negative cost.
4. Submit calls the create mutation.
5. Success invalidates the maintenance list, uses the backend message via Manager toast infrastructure and closes the form.
6. The new issue appears in the queue from the mutable mock/API read path.

### Flow 2: Resolve an issue
1. Manager clicks `Mark as Resolved`.
2. The mutation calls the feature resolve endpoint.
3. The successful response is followed by query invalidation.
4. The record re-renders with `RESOLVED` status and the action is removed.

## Component Tree

- Route: `manager_maintenance/page.tsx`
  - `<ManagerMaintenanceMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** No URL-backed list state was detected; this module must add URL state before introducing a searchable/filterable/paginated list.
- **Zustand stores:** None detected.
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** No static queryKey literals detected.
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_maintenance/manager_maintenance_mocks/manager_maintenance_mocks_handlers/` and `manager_maintenance/manager_maintenance_mocks/manager_maintenance_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `ManagerMaintenanceApi.fetchMaintenanceIssues` | GET | `/manager/maintenance` | — | `MaintenanceTicket[]` |
| `ManagerMaintenanceApi.createMaintenanceTicket` | POST | `/manager/maintenance` | `CreateMaintenanceTicketPayload` | `MaintenanceTicket` |
| `ManagerMaintenanceApi.resolveMaintenanceTicket` | POST | `/manager/maintenance/:id/resolve` | — | `MaintenanceTicket` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Title | `title` | GET | `data[].title` | No | Yes |
| Equipment/area | `equipment` | GET | `data[].equipment` | No | Yes |
| Priority | `priority` | GET | `data[].priority` | No | Yes |
| Status | `status` | GET | `data[].status` | No | Yes |
| Vendor | `assignedVendor` | GET | `data[].assignedVendor` | Yes | Yes |
| Estimated cost | `estimatedCost` | GET | `data[].estimatedCost` | Yes | Yes |
| Reported time | `reportedAt` | GET | `data[].reportedAt` | No | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **Destructive/irreversible actions:** Resolution is a state transition and must complete through the API/mutation path; UI must not show success before the mutation succeeds.
- **Cross-role isolation:** None.

## Loading, Empty, and Error States
- Route loading: structural `loading.tsx` skeleton using both skeleton semantic tokens.
- Query error: safe inline error plus `Retry`.
- Empty list: contextual empty state with access to `Log Issue`.
- Mutation loading: button label remains stable in the create modal and the queue action is disabled by the mutation state.

## Edge Cases and AI Warnings
**Forbidden-pattern contract:** See `manager_maintenance_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- Estimated cost must be non-negative.
- Do not use raw color utilities or semantic opacity modifiers.
- Do not hardcode maintenance URLs outside `manager_maintenance_url_config.ts`.
- Mock state must reflect create/resolve results on later reads.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `ManagerMaintenanceContent.tsx` | Issue queue rendering and resolve action with all async UI states. |
| `ManagerMaintenanceLogIssueModal.tsx` | Issue create form view and validation wiring. |

## Rule Compliance Checklist
- [x] Feature-local business ownership
- [x] Module-prefixed non-reserved files
- [x] API boundary schema validation
- [x] URL config ownership
- [x] Mutable MSW state + reset
- [x] Loading/error/empty states
- [x] Semantic theme tokens
- [x] Accessible form labels and errors

## Internationalization
- Namespace: `MANAGER_MAINTENANCE`
- Active locales: `en`, `hi`
- English catalog: `manager_maintenance/manager_maintenance_locales/manager_maintenance_en.json`
- Hindi catalog: `manager_maintenance/manager_maintenance_locales/manager_maintenance_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerMaintenanceContent.tsx`
- Primary query-key registry: `ManagerMaintenanceQueryKeys.ts`
- Primary module constants registry: `ManagerMaintenanceConstants.ts`
- Canonical schema file: `ManagerMaintenanceSchemas.ts` in `manager_maintenance_schemas/`
- Module theme contract: `manager_maintenance_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_maintenance_components/manager_maintenance_main/ManagerMaintenanceMain.tsx` | YES |
| API client | `ManagerMaintenanceApi.ts` | YES |
| Schema file | `ManagerMaintenanceSchemas.ts` | YES |
| Query-key registry | `ManagerMaintenanceQueryKeys.ts` | YES |
| Constants registry | `ManagerMaintenanceConstants.ts` | YES |
| URL config | `manager_maintenance_url_config.ts` | YES |
| Behavior test | `ManagerMaintenanceBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_maintenance_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_maintenance/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_maintenance/manager_maintenance_mocks/manager_maintenance_mocks_fixtures/` and `manager_maintenance/manager_maintenance_mocks/manager_maintenance_mocks_handlers/`.
- External application infrastructure is limited to documented zero-business/global providers and the host transport/runtime boundary.

### Verification boundary

- Source-level structural checks can be performed from the supplied artifact.
- Production build, real TypeScript project type-check, browser click-through, Tailwind/global CSS verification, dependency/SCA/secret scans, and CI/CODEOWNERS enforcement require the host repository configuration and therefore remain NOT VERIFIED when absent from the supplied ZIP.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

## Routes
- Canonical route file: `page.tsx` in this feature module.
- Route-specific loading/error/not-found files, where present, remain physically owned by this module.

## API Contract Summary
- Canonical module API files live under the module-owned `_api` folder.
- API paths are defined by the module-owned `*_url_config.ts`; mutation methods require the documented idempotency-key contract.

## State Map
- Server state → TanStack Query.
- Shared UI/client state → module-scoped Zustand.
- Component-private state → local React state.
- Shareable list filters/search/pagination → URL state where applicable.

## External Dependencies
- Only approved global application infrastructure/UI primitives and documented third-party packages may cross the feature boundary.
- No sibling feature business implementation is an external dependency.

## Known Forbidden Patterns
- See the module-owned `*_forbidden.md` for the complete forbidden-pattern contract.
- Business logic must remain inside this feature module; global UI remains zero-business.

## Testing and Verification
- Module tests live under the module-owned test folders and alongside custom hooks/utilities as required.
- MSW fixtures/handlers are module-owned.
- Playwright E2E lives under the role-isolated `playwright_e2e/frontend_manager_e2e/<module>/` tree.
