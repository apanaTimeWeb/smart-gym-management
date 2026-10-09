# trainer_schedule — Feature Map (v8-fix)

## Module Purpose
The Schedule module lets trainers view and update their weekly availability and request time off through the documented Trainer workflow. It also shows the resulting leave-request history. Form inputs are validated and protected by the dirty-navigation guard, while writes use stable idempotency keys. Manager approval policy is represented only through the frontend response contract; the module does not implement backend authorization.

## Dependency Manifest
**Approved application/role infrastructure:** `@/lib/api`, approved `trainer_infrastructure/*` shell/feedback/realtime/guard primitives, and framework routing/runtime facilities required by the host.
**Feature-local utilities:** numeric/date/currency/null/masking formatters are kept inside `trainer_schedule_utils/`; no module imports `@/lib/formatters`.
**Direct third-party packages detected in feature source:** @hookform/resolvers, @tanstack/react-query, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, date-fns, lucide-react, msw, next, next-intl, react, react-hook-form, vitest, zod, zustand.
**Sibling business-module dependencies:** None identified in feature source.

## Feature Lifecycle Contract
Feature lifecycle follows the documented list/detail → action/form → validated API mutation → TanStack Query reconciliation → visible result pattern.
Expected public route contract: `/trainer/schedule`. The physical Next.js `page.tsx/loading.tsx/error.tsx/not-found.tsx` files are now inside this canonical feature module. Public URL rewrites/mounting in the host application are outside the supplied archive and therefore remain host-scope verification.

## Directory Structure
```text
trainer_schedule/
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
├── trainer_schedule_api/
├──   TrainerScheduleApi.ts
├──   TrainerScheduleApiBehavior.test.ts
├── trainer_schedule_components/
├──   trainer_schedule_empty_state/
├──     TrainerScheduleEmptyState.tsx
├──   trainer_schedule_leave_requests/
├──     TrainerScheduleLeaveRequests.tsx
├──   trainer_schedule_loading_skeleton/
├──     TrainerScheduleLoadingSkeleton.tsx
├──   trainer_schedule_main/
├──     TrainerScheduleMain.tsx
├──     TrainerScheduleMainBehavior.test.tsx
├──   trainer_schedule_not_found_view/
├──     TrainerScheduleNotFoundView.tsx
├──   trainer_schedule_request_leave_modal/
├──     TrainerScheduleRequestLeaveModal.module.css
├──     TrainerScheduleRequestLeaveModal.tsx
├──   trainer_schedule_weekly_availability/
├──     TrainerScheduleWeeklyAvailability.tsx
├── trainer_schedule_constants/
├──   TrainerScheduleConstants.test.ts
├──   TrainerScheduleConstants.ts
├──   TrainerScheduleQueryKeys.ts
├── trainer_schedule_features.md
├── trainer_schedule_forbidden.md
├── trainer_schedule_hooks/
├──   useTrainerScheduleMutations.test.ts
├──   useTrainerScheduleMutations.ts
├──   useTrainerScheduleQuery.test.ts
├──   useTrainerScheduleQuery.ts
├── trainer_schedule_locales/
├──   trainer_schedule_en.json
├──   trainer_schedule_hi.json
├── trainer_schedule_mocks/
├──   trainer_schedule_fixtures/
├──     TrainerScheduleMockData.ts
├──   trainer_schedule_handlers/
├──     TrainerScheduleMockHandlers.ts
├── trainer_schedule_schemas/
├──   TrainerScheduleDomainSchemas.ts
├── trainer_schedule_store/
├──   useTrainerScheduleStore.test.ts
├──   useTrainerScheduleStore.ts
├── trainer_schedule_tests/
├──   TrainerScheduleRouteStates.test.tsx
├── trainer_schedule_theme_contract.md
├── trainer_schedule_types/
├──   TrainerScheduleMutationTypes.ts
├──   TrainerScheduleStoreTypes.ts
├──   TrainerScheduleTypes.ts
├── trainer_schedule_url_config.ts
├── trainer_schedule_utils/
├──   TrainerScheduleFormatDate.test.ts
└──   TrainerScheduleFormatDate.ts
```

Root files are intentionally limited to framework-reserved route files and module documentation. All business/config/schema/query/api artifacts are inside their role+module-prefixed subfolders.

## Approved External Dependencies
- Application infrastructure: approved global API transport, auth/session plumbing, global logging/error monitoring, and zero-business UI/shell primitives.
- Role infrastructure: `trainer_infrastructure_*` zero-business shell/feedback/realtime/guard facilities.
- Business Feature Dependencies: None.

## Feature Inventory
| Feature | Behavior |
|---|---|
| Availability | View and save weekly availability. |
| Leaves | View leave requests and submit a new request. |
| Tab switch | UI-only active tab state. |
| Leave modal | RHF/Zod-backed request flow with feedback and loading state. |

## User Flows & Interactions
Open Schedule → Availability/Leaves tab → edit or request leave → validation → mutation → success/error feedback → refreshed visible state.

## Data & State Architecture
- Server/API state → TanStack Query only.
- UI-only shared state → module-scoped Zustand where required.
- Private UI state → local React state.
- URL/filter/search/pagination state → URL/query parameters where the feature documents those interactions.
- API responses are validated at the feature API boundary with Zod.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchSchedule` | GET | `TRAINER_SCHEDULE_URLS.API.SCHEDULE` | none | schedule + availability + leave data |
| `updateAvailability` | PATCH | `TRAINER_SCHEDULE_URLS.API.AVAILABILITY` | `WeeklyAvailability[]` + idempotency key | mutation envelope/message |
| `requestLeave` | POST | `TRAINER_SCHEDULE_URLS.API.LEAVES` | `CreateLeaveDto` + idempotency key | `LeaveRequest` + message |

## UI Data Requirements
| UI Element | Required fields | Source |
|---|---|---|
| Weekly availability | day, available flag, start/end times | schedule response |
| Leave request list | request ID/status/date/reason fields rendered by list | schedule response |
| Leave form | leave type/date/reason fields defined in `CreateLeaveDto` | RHF/Zod + API |
| Tab state | active availability/leaves selection | local UI state |

## Permissions and Security
- Required capability: `trainer.view`.
- Trainer may manage only their documented availability/leave workflow.
- No Manager approval/admin controls are exposed as Trainer actions.
- Leave submission is non-duplicable and uses stable idempotency behavior.

## Loading, Empty, and Error States
- Route loading skeleton mirrors schedule/availability geometry.
- Leave list has a contextual empty state where no requests exist.
- Leave form disables submit during mutation and preserves entered values on failure.
- Route error provides Retry.

## Edge Cases and AI Warnings
- **Availability updates are non-duplicable:** preserve one idempotency key across request retries.
- **Leave form dirty state matters:** do not silently discard partially entered leave data.
- **Tab state is client-only:** never move schedule API response data into Zustand.
- **Status colors are semantic:** business status mapping belongs to Schedule constants, not global UI.
- **A successful leave request must be reflected in the visible request list/query state.**

## Component Responsibility Map
| Component area | Responsibility |
|---|---|
| `TrainerScheduleMain` | Tabs and page orchestration. |
| `TrainerScheduleWeeklyAvailability` | Weekly availability editor/view. |
| `TrainerScheduleLeaveRequests` | Leave request list and actions. |
| `TrainerScheduleRequestLeaveModal` | RHF/Zod leave request form. |

## Current v8-fix Architecture Evidence
- Route files owned by the feature: not-found.tsx, error.tsx, page.tsx, loading.tsx.
- Query files: TrainerScheduleQueryKeys.ts, useTrainerScheduleMutations.test.ts, useTrainerScheduleMutations.ts, useTrainerScheduleQuery.test.ts, useTrainerScheduleQuery.ts.
- Hook files: useTrainerScheduleMutations.test.ts, useTrainerScheduleMutations.ts, useTrainerScheduleQuery.test.ts, useTrainerScheduleQuery.ts.
- Constants: TrainerScheduleConstants.test.ts, TrainerScheduleConstants.ts.
- Schemas: TrainerScheduleDomainSchemas.ts.
- Types: TrainerScheduleMutationTypes.ts, TrainerScheduleStoreTypes.ts, TrainerScheduleTypes.ts.
- Locales: en.json, hi.json.
- Utils: TrainerScheduleFormatDate.ts.
- Module-owned tests: 8 files.
- Mock/fixture files: 2 files.

## Rule Compliance Checklist
- [x] Canonical feature module retained as single source of business implementation.
- [x] Route files physically owned by this module.
- [x] Prefixed snake_case internal folders.
- [x] Role+module filename contract for module-owned artifacts.
- [x] Component/hook/store/schema/API size ceilings.
- [x] No global business formatter dependency.
- [x] Feature-owned localization, mocks, schemas, query keys, and tests.
- [x] No raw theme colors/arbitrary Tailwind values in feature JSX.
- [x] No fake/no-op controls found in static source checks.
- [ ] Host build/CI/runtime/browser verification — NOT VERIFIED; host application configuration was not supplied.
- [x] URL configuration placement follows the documented feature-root URL configuration exception; no source conflict remains.

## Routes
- `/trainer/schedule` → `page.tsx` (canonical route owner).
- Route lifecycle files (`page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) are physically owned by this feature module.

## User Flows
1. Enter the feature route and load server-backed data.
2. Use documented search/filter/detail controls.
3. Submit a create/update/action form after feature validation.
4. Execute the mutation with its idempotency contract.
5. Reconcile TanStack Query and surface backend success/error feedback.

## Component Tree
```text
trainer_schedule/
  page.tsx
  trainer_schedule_components/
    trainer_schedule_empty_state/
      TrainerScheduleEmptyState.tsx
    trainer_schedule_leave_requests/
      TrainerScheduleLeaveRequests.tsx
    trainer_schedule_loading_skeleton/
      TrainerScheduleLoadingSkeleton.tsx
    trainer_schedule_main/
      TrainerScheduleMain.tsx
    trainer_schedule_not_found_view/
      TrainerScheduleNotFoundView.tsx
    trainer_schedule_request_leave_modal/
      TrainerScheduleRequestLeaveModal.tsx
    trainer_schedule_weekly_availability/
      TrainerScheduleWeeklyAvailability.tsx
```

## API Contract Summary
The module-owned URL config is the single URL source-of-truth; API services consume these paths. Key declared paths:
- `export const TRAINER_SCHEDULE_PAGE_DASHBOARD = '/trainer/dashboard' as const;`
- `export const TRAINER_SCHEDULE_PAGE_LIST = '/trainer/schedule' as const;`
- `export const TRAINER_SCHEDULE_API_SCHEDULE = '/trainer/schedule' as const;`
- `export const TRAINER_SCHEDULE_API_AVAILABILITY = '/trainer/trainer_schedule/availability' as const;`
- `export const TRAINER_SCHEDULE_API_LEAVES = '/trainer/trainer_schedule/leaves' as const;`

## State Map
- Server/API state: TanStack Query.
- Shared UI state: module-scoped Zustand where required.
- Private interaction state: local React state.
- URL-backed filters/pagination: URL/search parameters where documented by the feature.

## Permissions
- Trainer role only within `frontend_trainer`; feature must not introduce manager/superadmin business capabilities.
- Business permissions and status mappings remain feature-owned; do not move them into global UI infrastructure.

## External Dependencies
- Approved global/application infrastructure only: API transport, auth/session, logging/error monitoring, routing/runtime plumbing, and zero-business UI primitives.
- Trainer role infrastructure may be consumed through `trainer_infrastructure_*` contracts. No sibling business-module imports are permitted.

## Known Forbidden Patterns
- Do not import sibling feature business code into `trainer_schedule`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.
