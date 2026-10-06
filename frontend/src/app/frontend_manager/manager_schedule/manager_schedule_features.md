# Manager Schedule — Feature Map

## Module Purpose
Manager Schedule is the trainer scheduling workspace. Managers can review trainer schedule summaries and KPIs, search the schedule, select a day, and create/update/delete shifts. Schedule data is server state owned by this module. Shift deletion and other critical scheduling changes require confirmation and authoritative reconciliation.

Module root: `frontend_manager/manager_schedule/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | query |
| Read | Exposed | ManagerScheduleApi: fetchSchedule. |
| Update | Exposed | ManagerScheduleApi |
| Delete | Exposed | ManagerScheduleApi |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_schedule_api/` | Owns feature API clients and request/response transport contracts. | `ManagerScheduleApi.ts` |
| `manager_schedule_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_schedule_components/manager_schedule_kpis/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerScheduleKPIs.tsx` |
| `manager_schedule_components/manager_schedule_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerScheduleMain.tsx` |
| `manager_schedule_components/manager_schedule_main/manager_schedule_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerScheduleContent.tsx` |
| `manager_schedule_components/manager_schedule_shift_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerScheduleShiftModal.tsx` |
| `manager_schedule_components/manager_schedule_skeleton/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerScheduleSkeleton.tsx` |
| `manager_schedule_components/manager_schedule_trainer_card/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerScheduleTrainerCard.tsx` |
| `manager_schedule_components/manager_schedule_weekly_grid/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerScheduleEmptyState.tsx`, `ManagerScheduleWeeklyGrid.tsx` |
| `manager_schedule_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerScheduleConstants.ts`, `ManagerScheduleQueryKeys.ts`, `ManagerScheduleSharedConstants.test.ts`, `ManagerScheduleSharedConstants.ts` |
| `manager_schedule_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerScheduleLogic.test.ts`, `useManagerScheduleLogic.ts`, `useManagerScheduleQueries.test.ts`, `useManagerScheduleQueries.ts`, `useManagerScheduleShiftForm.test.ts`, `useManagerScheduleShiftForm.ts` |
| `manager_schedule_locales/` | Owns module English and Hindi translation catalogs. | `manager_schedule_en.json`, `manager_schedule_hi.json` |
| `manager_schedule_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_schedule_mocks/manager_schedule_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerScheduleMockData.ts` |
| `manager_schedule_mocks/manager_schedule_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerScheduleMockHandlers.ts` |
| `manager_schedule_schemas/` | Owns feature Zod validation and response schemas. | `ManagerScheduleSchema.ts`, `ManagerScheduleShiftFormSchema.ts` |
| `manager_schedule_store/` | Owns module-scoped Zustand UI state only. | `useManagerScheduleUiStore.test.ts`, `useManagerScheduleUiStore.ts` |
| `manager_schedule_tests/` | Owns module behavior and utility tests. | `ManagerScheduleBehavior.test.tsx` |
| `manager_schedule_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerScheduleShiftFormTypes.ts`, `ManagerScheduleTrainerCardTypes.ts`, `ManagerScheduleTypes.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_schedule_features.md`
- `manager_schedule_forbidden.md`
- `manager_schedule_theme_contract.md`
- `manager_schedule_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/components/ui/manager_empty_state/ManagerEmptyState`
- `@/components/ui/manager_toast/ManagerToast`
- `@/components/ui/manager_tooltip/ManagerTooltip`
- `@/components/ui/manager_toast/ManagerToastTypes`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/components/ui/manager_stat_card/ManagerStatCard`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
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
- `zustand`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchSchedule | `/manager/schedule` | Uses the fetchSchedule workflow with typed request/response handling. | `GET /manager/schedule` | ✅ Implemented |
| createShift | `/manager/schedule` | Uses the createShift workflow with typed request/response handling. | `POST /manager/schedule/shifts` | ✅ Implemented |
| updateShift | `/manager/schedule` | Uses the updateShift workflow with typed request/response handling. | `PATCH /manager/schedule/shifts/:id` | ✅ Implemented |
| deleteShift | `/manager/schedule` | Uses the deleteShift workflow with typed request/response handling. | `DELETE /manager/schedule/shifts/:id` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Browse and edit schedule
1. Manager selects/searches a day or trainer view.
2. fetchSchedule(params) loads the trainer summaries and KPI snapshot.
3. The weekly grid renders trainer shifts from the response.
4. Create/update/delete actions use the schedule API and reconcile Query state.

## Component Tree

- Route: `manager_schedule/page.tsx`
  - `<ManagerScheduleMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_schedule_store/useManagerScheduleUiStore.ts`, `manager_schedule_store/useManagerScheduleUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** No static queryKey literals detected.
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_schedule/manager_schedule_mocks/manager_schedule_mocks_handlers/` and `manager_schedule/manager_schedule_mocks/manager_schedule_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchSchedule` | `GET` | `/api/v1/manager/schedule` | `{ search?, day? }` | `{ trainers: TrainerScheduleSummary[]; kpis: ScheduleKPIData }` |
| `createShift` | `POST` | `/api/v1/manager/schedule/shifts` | `CreateShiftDto` | `TrainerShift` |
| `updateShift` | `PATCH` | `/api/v1/manager/schedule/shifts/:id` | `{ id: string; body: CreateShiftDto }` | `TrainerShift` |
| `deleteShift` | `DELETE` | `/api/v1/manager/schedule/shifts/:id` | `{ id: string }` | `{ id: string }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total trainers | `totalTrainers` | `/api/v1/manager/schedule` | `data.kpis.totalTrainers` | No | Yes |
| KPI: On duty today | `trainersOnDutyToday` | `/api/v1/manager/schedule` | `data.kpis.trainersOnDutyToday` | No | Yes |
| KPI: On leave today | `trainersOnLeaveToday` | `/api/v1/manager/schedule` | `data.kpis.trainersOnLeaveToday` | No | Yes |
| KPI: Shifts this week | `totalShiftsThisWeek` | `/api/v1/manager/schedule` | `data.kpis.totalShiftsThisWeek` | No | Yes |
| KPI: Classes this week | `totalClassesThisWeek` | `/api/v1/manager/schedule` | `data.kpis.totalClassesThisWeek` | No | Yes |
| KPI: Occupancy rate | `avgOccupancyRate` | `/api/v1/manager/schedule` | `data.kpis.avgOccupancyRate` | No | Yes |
| Trainer: Name | `trainerName` | `/api/v1/manager/schedule` | `data.trainers[].trainerName` | No | Yes |
| Trainer: Role | `trainerRole` | `/api/v1/manager/schedule` | `data.trainers[].trainerRole` | No | Yes |
| Shift: ID | `id` | `/api/v1/manager/schedule` | `data.trainers[].shifts[].id` | No | Yes |
| Shift: Day | `day` | `/api/v1/manager/schedule` | `data.trainers[].shifts[].day` | No | Yes |
| Shift: Start time | `startTime` | `/api/v1/manager/schedule` | `data.trainers[].shifts[].startTime` | No | Yes |
| Shift: End time | `endTime` | `/api/v1/manager/schedule` | `data.trainers[].shifts[].endTime` | No | Yes |
| Shift: Status | `status` | `/api/v1/manager/schedule` | `data.trainers[].shifts[].status` | No | Yes |
| Shift: Notes | `notes` | `/api/v1/manager/schedule` | `data.trainers[].shifts[].notes` | Yes | Yes |

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
**Forbidden-pattern contract:** See `manager_schedule_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Schedule shifts must remain nested under the trainer summary response shape used by the UI:** Schedule shifts must remain nested under the trainer summary response shape used by the UI.
- **Do not invent `trainerId`/`shiftId` values when the backend fixture already provides them:** Do not invent `trainerId`/`shiftId` values when the backend fixture already provides them.
- **Shift deletion is destructive and requires double confirmation:** Shift deletion is destructive and requires double confirmation.
- **Time values must be serialized/displayed with timezone-safe conventions:** Time values must be serialized/displayed with timezone-safe conventions.
- **Search/day state must influence the schedule query rather than only the visual grid:** Search/day state must influence the schedule query rather than only the visual grid.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_schedule/manager_schedule_components/manager_schedule_kpis/ManagerScheduleKPIs.tsx` | Renders the 4 KPI stat cards for the Schedule module (total trainers, on duty today, on leave, shifts this week). |
| `manager_schedule/manager_schedule_components/manager_schedule_main/ManagerScheduleMain.tsx` | Framework entry component for the Schedule module; delegates feature behavior and UI composition to `ManagerScheduleContent`. |
| `manager_schedule/manager_schedule_components/manager_schedule_shift_modal/ManagerScheduleShiftModal.tsx` | Add/Edit shift modal with React Hook Form + Zod validation. |
| `manager_schedule/manager_schedule_components/manager_schedule_skeleton/ManagerScheduleSkeleton.tsx` | Skeleton loader for the Schedule module |
| `manager_schedule/manager_schedule_components/manager_schedule_trainer_card/ManagerScheduleTrainerCard.tsx` | Renders a single trainer's availability summary card — total shifts, hours, and per-day status dots. |
| `manager_schedule/manager_schedule_components/manager_schedule_weekly_grid/ManagerScheduleWeeklyGrid.tsx` | Renders the 7-day weekly schedule grid showing all trainer shifts per day column. |
| `manager_schedule/manager_schedule_hooks/useManagerScheduleLogic.ts` | Provides Schedule module state to the component tree via module-local state/query layer. |
| `manager_schedule_components/manager_schedule_main/manager_schedule_content/ManagerScheduleContent.tsx` | Composes the Schedule Content content sections while keeping data/state orchestration outside the view layer. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_SCHEDULE`
- Active locales: `en`, `hi`
- English catalog: `manager_schedule/manager_schedule_locales/manager_schedule_en.json`
- Hindi catalog: `manager_schedule/manager_schedule_locales/manager_schedule_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerScheduleMain.tsx`
- Primary query-key registry: `ManagerScheduleQueryKeys.ts`
- Primary module constants registry: `ManagerScheduleConstants.ts`
- Canonical schema file: `ManagerScheduleSchema.ts` in `manager_schedule_schemas/`
- Module theme contract: `manager_schedule_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_schedule_components/manager_schedule_main/ManagerScheduleMain.tsx` | YES |
| API client | `ManagerScheduleApi.ts` | YES |
| Schema file | `ManagerScheduleSchema.ts` | YES |
| Query-key registry | `ManagerScheduleQueryKeys.ts` | YES |
| Constants registry | `ManagerScheduleConstants.ts` | YES |
| URL config | `manager_schedule_url_config.ts` | YES |
| Behavior test | `ManagerScheduleBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_schedule_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_schedule/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_schedule/manager_schedule_mocks/manager_schedule_mocks_fixtures/` and `manager_schedule/manager_schedule_mocks/manager_schedule_mocks_handlers/`.
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
