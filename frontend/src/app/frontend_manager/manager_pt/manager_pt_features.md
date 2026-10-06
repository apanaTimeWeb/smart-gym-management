# Manager Pt — Feature Map

## Module Purpose
Manager PT is the personal-training operations workspace. Managers can review PT KPIs, trainer workload, package offerings, active assignments, and complete sessions. PT assignment and revenue-related data is server state owned by this module. Financial assignment/payment data must never use unsafe optimistic updates.

Module root: `frontend_manager/manager_pt/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `date-fns`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
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
| Create | Exposed | query |
| Read | Exposed | ManagerPtApi: fetchPtDashboardKpis, fetchWorkload, fetchPackages, fetchAssignments. |
| Update | Exposed | ManagerPtApi |
| Delete | Not exposed | No module API client uses DELETE in the supplied snapshot. |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_pt_api/` | Owns feature API clients and request/response transport contracts. | `ManagerPtApi.ts` |
| `manager_pt_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_pt_components/manager_pt_main/` | Owns the named feature-specific responsibility implied by this folder. | ManagerPtMain.tsx |
| `manager_pt_components/manager_pt_main/manager_pt_dashboard_tab/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerPtDashboardTab.tsx` |
| `manager_pt_components/manager_pt_main/manager_pt_packages_grid/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerPtPackagesGrid.tsx` |
| `manager_pt_components/manager_pt_main/manager_pt_tab_bar/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerPtTabBar.tsx` |
| `manager_pt_components/manager_pt_main/manager_pt_toolbar/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerPtToolbar.tsx` |
| `manager_pt_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerPtConstants.ts`, `ManagerPtQueryKeys.ts` |
| `manager_pt_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerPtAssignmentForm.test.ts`, `useManagerPtAssignmentForm.ts`, `useManagerPtLogic.test.ts`, `useManagerPtLogic.ts` |
| `manager_pt_locales/` | Owns module English and Hindi translation catalogs. | `manager_pt_en.json`, `manager_pt_hi.json` |
| `manager_pt_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_pt_mocks/manager_pt_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerPtMockData.ts` |
| `manager_pt_mocks/manager_pt_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerPtMockHandlers.ts` |
| `manager_pt_schemas/` | Owns feature Zod validation and response schemas. | `ManagerPtAssignmentSchema.ts`, `ManagerPtSchema.ts` |
| `manager_pt_tests/` | Owns module behavior and utility tests. | `ManagerPtBehavior.test.tsx` |
| `manager_pt_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerPtAssignmentFormTypes.ts`, `ManagerPtAssignmentsTableTypes.ts`, `ManagerPtDashboardTabTypes.ts`, `ManagerPtExpiringSoonTypes.ts`, `ManagerPtKpisTypes.ts`, `ManagerPtPackagesGridTypes.ts`, `ManagerPtTabBarTypes.ts`, `ManagerPtToolbarTypes.ts` (+2 more) |
| `manager_pt_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerPtFormatters.test.ts`, `ManagerPtFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_pt_features.md`
- `manager_pt_forbidden.md`
- `manager_pt_theme_contract.md`
- `manager_pt_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
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
- `@/lib/logger`
- `@/lib/useDateRangeSuffix`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@hookform`
- `@tanstack`
- `@testing-library/react`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchPtDashboardKpis | `/manager/pt` | Uses the fetchPtDashboardKpis workflow with typed request/response handling. | `GET /manager/pt/kpis` | ✅ Implemented |
| fetchWorkload | `/manager/pt` | Uses the fetchWorkload workflow with typed request/response handling. | `GET /manager/pt/workload` | ✅ Implemented |
| fetchPackages | `/manager/pt` | Uses the fetchPackages workflow with typed request/response handling. | `GET /manager/pt/packages` | ✅ Implemented |
| fetchAssignments | `/manager/pt` | Uses the fetchAssignments workflow with typed request/response handling. | `GET /manager/pt/assignments` | ✅ Implemented |
| createAssignment | `/manager/pt` | Uses the createAssignment workflow with typed request/response handling. | `POST /manager/pt/assignments` | ✅ Implemented |
| markSessionComplete | `/manager/pt` | Uses the markSessionComplete workflow with typed request/response handling. | `PATCH /manager/pt/assignments/:assignmentId/complete-session` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Assign PT package
1. Manager opens the assignment form and selects member, trainer, package and start date.
2. RHF + Zod validates the assignment payload.
3. createAssignment() submits the request.
4. The authoritative assignment response becomes Query cache state.
### Flow 2: Complete PT session
1. Manager selects an active assignment and marks a session complete.
2. markSessionComplete(assignmentId) sends the action.
3. The server response updates the assignment counts and revenue-related display.

## Component Tree

- Route: `manager_pt/page.tsx`
  - `<ManagerPtMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** None detected.
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'pt', 'kpis']`; `['manager', 'pt', 'workload']`; `['manager', 'pt', 'packages']`; `['manager', 'pt', 'assignments', assignmentParams]`; `['manager', 'pt', 'assignments']`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_pt/manager_pt_mocks/manager_pt_mocks_handlers/` and `manager_pt/manager_pt_mocks/manager_pt_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchPtDashboardKpis` | `GET` | `/api/v1/manager/pt/kpis` | `—` | `PtDashboardKpis` |
| `fetchWorkload` | `GET` | `/api/v1/manager/pt/workload` | `—` | `PtTrainerWorkload[]` |
| `fetchPackages` | `GET` | `/api/v1/manager/pt/packages` | `—` | `PtPackage[]` |
| `fetchAssignments` | `GET` | `/api/v1/manager/pt/assignments` | `{ page?, limit?, search?, trainerId?, status? }` | `PtAssignmentsResponse` |
| `createAssignment` | `POST` | `/api/v1/manager/pt/assignments` | `CreatePtAssignmentPayload` | `PtAssignment` |
| `markSessionComplete` | `PATCH` | `/api/v1/manager/pt/assignments/:assignmentId/complete-session` | `{ assignmentId: string }` | `PtAssignment` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Active assignments | `totalActiveAssignments` | `/api/v1/manager/pt/kpis` | `data.totalActiveAssignments` | No | Yes |
| KPI: Sessions today | `sessionsScheduledToday` | `/api/v1/manager/pt/kpis` | `data.sessionsScheduledToday` | No | Yes |
| KPI: Expiring packages | `packagesExpiringSoon` | `/api/v1/manager/pt/kpis` | `data.packagesExpiringSoon` | No | Yes |
| KPI: PT revenue | `monthlyPtRevenue` | `/api/v1/manager/pt/kpis` | `data.monthlyPtRevenue` | No | Yes |
| Workload: Trainer | `trainerName` | `/api/v1/manager/pt/workload` | `data[].trainerName` | No | Yes |
| Workload: Active clients | `activeClients` | `/api/v1/manager/pt/workload` | `data[].activeClients` | No | Yes |
| Assignment: Member | `memberName` | `/api/v1/manager/pt/assignments` | `data.assignments[].memberName` | No | Yes |
| Assignment: Trainer | `trainerName` | `/api/v1/manager/pt/assignments` | `data.assignments[].trainerName` | No | Yes |
| Assignment: Package | `packageName` | `/api/v1/manager/pt/assignments` | `data.assignments[].packageName` | No | Yes |
| Assignment: Sessions remaining | `sessionsRemaining` | `/api/v1/manager/pt/assignments` | `data.assignments[].sessionsRemaining` | No | Yes |
| Assignment: Payment status | `paymentStatus` | `/api/v1/manager/pt/assignments` | `data.assignments[].paymentStatus` | No | Yes |
| Assignment: Amount paid | `amountPaid` | `/api/v1/manager/pt/assignments` | `data.assignments[].amountPaid` | No | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **UI guard:** `ManagerPermissionGate` provides the Manager workspace capability boundary; module-specific permissions remain documented at the feature level when applicable.
- **Critical actions:** destructive/financial actions use explicit confirmation and server-authoritative responses.
- **Sensitive data:** list views use masking/display rules appropriate to the data type.
- **Cross-role isolation:** no business imports from other role roots or unrelated business modules.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-matching skeleton.
- Data sections use dedicated inline skeletons while TanStack Query is pending.
- Entity lists provide module-specific empty-state UI where the entity is user-browsable.
- Module `error.tsx` provides a safe retry fallback and does not expose raw backend/stack-trace text.

## Edge Cases and AI Warnings
**Forbidden-pattern contract:** See `manager_pt_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **PT revenue values must use formatCurrencyFromMinorUnits:** PT revenue values must use formatCurrencyFromMinorUnits.
- **Assignment completion changes a server-side session count; reconcile with the response:** Assignment completion changes a server-side session count; reconcile with the response.
- **Do not store assignment arrays in Zustand:** Do not store assignment arrays in Zustand.
- **Optional nextSessionDate must render via centralized date formatting/empty fallback:** Optional nextSessionDate must render via centralized date formatting/empty fallback.
- **Trainer workload and assignment list are separate server datasets; do not merge them into one response shape in the UI:** Trainer workload and assignment list are separate server datasets; do not merge them into one response shape in the UI.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_pt/manager_pt_components/manager_pt_assignment_form/ManagerPtAssignmentForm.tsx` | Renders and validates the PT assignment form; submission is delegated to the API mutation callback. |
| `manager_pt/manager_pt_components/manager_pt_assignments_table/ManagerPtAssignmentsTable.tsx` | Data table to track active PT assignments and mark sessions. |
| `manager_pt/manager_pt_components/manager_pt_expiring_soon/ManagerPtExpiringSoon.tsx` | Shows a list of members whose PT packages are nearing completion (< 3 sessions left). |
| `manager_pt/manager_pt_components/manager_pt_kpis/ManagerPtKPIs.tsx` | Renders the top-level KPI stat cards for the PT Dashboard. |
| `manager_pt/manager_pt_components/manager_pt_main/ManagerPtMain.tsx` | Root client component for Manager PT page. |
| `manager_pt/manager_pt_components/manager_pt_trainer_workload/ManagerPtTrainerWorkload.tsx` | Renders the trainer workload to help managers balance assignment distribution. |
| `manager_pt_components/manager_pt_assignments_empty_state/ManagerPtAssignmentsEmptyState.tsx` | Renders the Pt Assignments contextual empty state and the documented permitted recovery or create action. |
| `manager_pt_components/manager_pt_trainer_workload_empty_state/ManagerPtTrainerWorkloadEmptyState.tsx` | Renders the Pt Trainer Workload contextual empty state and the documented permitted recovery or create action. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_PT`
- Active locales: `en`, `hi`
- English catalog: `manager_pt/manager_pt_locales/manager_pt_en.json`
- Hindi catalog: `manager_pt/manager_pt_locales/manager_pt_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerPtMain.tsx`
- Primary query-key registry: `ManagerPtQueryKeys.ts`
- Primary module constants registry: `ManagerPtConstants.ts`
- Canonical schema file: `ManagerPtSchema.ts` in `manager_pt_schemas/`
- Module theme contract: `manager_pt_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_pt_components/manager_pt_main/ManagerPtMain.tsx` | YES |
| API client | `ManagerPtApi.ts` | YES |
| Schema file | `ManagerPtSchema.ts` | YES |
| Query-key registry | `ManagerPtQueryKeys.ts` | YES |
| Constants registry | `ManagerPtConstants.ts` | YES |
| URL config | `manager_pt_url_config.ts` | YES |
| Behavior test | `ManagerPtBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_pt_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_pt/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_pt/manager_pt_mocks/manager_pt_mocks_fixtures/` and `manager_pt/manager_pt_mocks/manager_pt_mocks_handlers/`.
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
