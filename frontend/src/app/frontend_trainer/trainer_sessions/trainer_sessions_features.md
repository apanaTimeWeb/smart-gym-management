# trainer_sessions — Feature Map (v8-fix)

## Module Purpose
The Sessions module lets trainers browse their scheduled sessions, create or edit sessions, manage enrolled-member attendance, and perform the documented no-show/cancellation actions. Session data is server state owned by TanStack Query and mutable demo behavior is represented by module-owned MSW fixtures. Forms use RHF/Zod and destructive or irreversible actions use the confirmation contract. Trainer users do not receive unrelated scheduling administration features outside this module.

## Mock State Reset Contract
The MSW collection is mutable during an active flow. Tests that share the handler module must call `resetTrainerSessionsMockData()` from `trainer_sessions_mocks/trainer_sessions_handlers/TrainerSessionsMockHandlers.ts` before each isolated case. Resetting handlers alone does not reset collection state.

## Dependency Manifest
**Approved application/role infrastructure:** `@/lib/api`, approved `trainer_infrastructure/*` shell/feedback/realtime/guard primitives, and framework routing/runtime facilities required by the host.
**Feature-local utilities:** numeric/date/currency/null/masking formatters are kept inside `trainer_sessions_utils/`; no module imports `@/lib/formatters`.
**Direct third-party packages detected in feature source:** @hookform/resolvers, @tanstack/react-query, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, date-fns, http-status-codes, lucide-react, msw, next, next-intl, react, react-hook-form, vitest, zod.
**Sibling business-module dependencies:** None identified in feature source.

## Feature Lifecycle Contract
Feature lifecycle follows the documented list/detail → action/form → validated API mutation → TanStack Query reconciliation → visible result pattern.
Expected public route contract: `/trainer/sessions`. The physical Next.js `page.tsx/loading.tsx/error.tsx/not-found.tsx` files are now inside this canonical feature module. Public URL rewrites/mounting in the host application are outside the supplied archive and therefore remain host-scope verification.

## Directory Structure
```text
trainer_sessions/
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
├── trainer_sessions_api/
├──   TrainerSessionsApi.ts
├──   TrainerSessionsApiBehavior.test.ts
├── trainer_sessions_components/
├──   trainer_sessions_attendance_modal/
├──     TrainerSessionsAttendanceModal.tsx
├──   trainer_sessions_edit_modal/
├──     TrainerSessionsEditModal.tsx
├──   trainer_sessions_empty_state/
├──     TrainerSessionsEmptyState.tsx
├──   trainer_sessions_kpis/
├──     TrainerSessionsKPIs.tsx
├──   trainer_sessions_loading_skeleton/
├──     TrainerSessionsLoadingSkeleton.tsx
├──   trainer_sessions_main/
├──     TrainerSessionsMain.tsx
├──     TrainerSessionsMainBehavior.test.tsx
├──   trainer_sessions_not_found_view/
├──     TrainerSessionsNotFoundView.tsx
├──   trainer_sessions_schedule_modal/
├──     TrainerSessionsScheduleModal.tsx
├── trainer_sessions_constants/
├──   TrainerSessionsIsSpecificFilter.test.ts
├──   TrainerSessionsConstants.ts
├──   TrainerSessionsQueryKeys.ts
├── trainer_sessions_features.md
├── trainer_sessions_forbidden.md
├── trainer_sessions_hooks/
├──   useTrainerSessionsEditForm.test.ts
├──   useTrainerSessionsEditForm.ts
├──   useTrainerSessionsFilters.test.ts
├──   useTrainerSessionsFilters.ts
├──   useTrainerSessionsKpis.test.ts
├──   useTrainerSessionsKpis.ts
├──   useTrainerSessionsMain.test.ts
├──   useTrainerSessionsMain.ts
├──   useTrainerSessionsMutations.test.ts
├──   useTrainerSessionsMutations.ts
├──   useTrainerSessionsQuery.test.ts
├──   useTrainerSessionsQuery.ts
├──   useTrainerSessionsScheduleForm.test.ts
├──   useTrainerSessionsScheduleForm.ts
├── trainer_sessions_locales/
├──   trainer_sessions_en.json
├──   trainer_sessions_hi.json
├── trainer_sessions_mocks/
├──   trainer_sessions_fixtures/
├──     TrainerSessionsMockData.ts
├──   trainer_sessions_handlers/
├──     TrainerSessionsMockHandlers.ts
├── trainer_sessions_schemas/
├──   TrainerSessionsDomainSchemas.ts
├──   TrainerSessionsEditSchema.ts
├──   TrainerSessionsScheduleFormSchema.ts
├── trainer_sessions_tests/
├──   TrainerSessionsRouteStates.test.tsx
├── trainer_sessions_theme_contract.md
├── trainer_sessions_types/
├──   TrainerSessionsAttendanceModalProps.ts
├──   TrainerSessionsEditModalProps.ts
├──   TrainerSessionsEmptyStateProps.ts
├──   TrainerSessionsKPIsProps.ts
├──   TrainerSessionsKpiValues.ts
├──   TrainerSessionsListQueryParams.ts
├──   TrainerSessionsMutationTypes.ts
├──   TrainerSessionsScheduleFormTypes.ts
├──   TrainerSessionsScheduleModalTypes.ts
├──   TrainerSessionsTypes.ts
└── trainer_sessions_url_config.ts
```

Root files are intentionally limited to framework-reserved route files and module documentation. All business/config/schema/query/api artifacts are inside their role+module-prefixed subfolders.

## Approved External Dependencies
- Application infrastructure: approved global API transport, auth/session plumbing, global logging/error monitoring, and zero-business UI/shell primitives.
- Role infrastructure: `trainer_infrastructure_*` zero-business shell/feedback/realtime/guard facilities.
- Business Feature Dependencies: None.

## Feature Inventory
| Feature | Route | API | Status |
|---|---|---|---|
| Session list | `/trainer/sessions` | `GET /trainer/sessions?date=` | Live via MSW |
| Session member options | `/trainer/sessions` | `GET /trainer/trainer_sessions/members` | Live via MSW |
| Schedule session | `/trainer/sessions` | `POST /trainer/sessions` | Live via MSW |
| Edit session | `/trainer/sessions` | `PATCH /trainer/trainer_sessions/:id` | Live via MSW |
| Cancel session | `/trainer/sessions` | `DELETE /trainer/trainer_sessions/:id` | Live via MSW |
| Mark attendance | `/trainer/sessions` | `POST /trainer/trainer_sessions/:id/attendance` | Live via MSW |

## User Flows & Interactions
All discovered actionable controls are recorded in the v8-fix actionable-control matrix. Important flows are verified through their module-owned hooks, mutations, MSW handlers, and co-located tests.

## Data & State Architecture
- Server/API state → TanStack Query only.
- UI-only shared state → module-scoped Zustand where required.
- Private UI state → local React state.
- URL/filter/search/pagination state → URL/query parameters where the feature documents those interactions.
- API responses are validated at the feature API boundary with Zod.

### Source Contract Resolution
The supplied stage-1 feature/API requirements are the higher-priority feature contract and define cancellation as `DELETE /trainer/trainer_sessions/:id`. Any older module-map reference using `/cancel` is superseded and is not used by the implementation.

## API Contract
| Function | Method | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchTrainerSessions(date)` | GET | `/trainer/sessions?date=` | date query | `TrainerSession[]` |
| `fetchTrainerSessionMembers()` | GET | `/trainer/trainer_sessions/members` | — | `{ id, name }[]` |
| `createTrainerSession(dto)` | POST | `/trainer/sessions` | `CreateSessionDto` | `TrainerSession` |
| `updateTrainerSession(id, dto)` | PATCH | `/trainer/trainer_sessions/:id` | partial DTO | `TrainerSession` |
| `cancelTrainerSession(id)` | DELETE | `/trainer/trainer_sessions/:id` | path id | `null` |
| `markTrainerSessionAttendance(id, memberIds)` | POST | `/trainer/trainer_sessions/:id/attendance` | member IDs | `null` |

## UI Data Requirements
| UI element | Field | Endpoint |
|---|---|---|
| Session card title | `title` | sessions |
| Session card type/status | `type`, `status` | sessions |
| Session date/time | `sessionDate`, `time`, `duration` | sessions |
| Attendee count | `attendees`, `maxAttendees` | sessions |
| Member picker | `id`, `name` | sessions/members |
| Location | `location`, `room`, `isOnline` | sessions |

## Permissions and Security
- Required capability: `trainer.view`.
- Trainer can create/edit/cancel/mark attendance only for the session flows exposed by this module.
- Cancellation is destructive and requires the documented confirmation flow.
- Create/update/cancel/attendance mutations use one idempotency key per user intent and reuse it for retries.

## Loading, Empty, and Error States
- Route loading uses `TrainerSessionsLoadingSkeleton`.
- Empty session lists show a meaningful no-session state.
- Scheduling/edit/trainer_attendance/cancel actions expose button-level loading and disable duplicate submission.
- Route errors use module Retry fallback.

## Edge Cases and AI Warnings
- **Cancellation is destructive:** Always use `useConfirm()` before executing a cancellation.
- **Member dropdown is API-driven:** Never reintroduce an inline member array in `TrainerSessionsApi.ts` or a component.
- **Form validation:** `CreateSessionDtoSchema` is the client contract; backend validation remains authoritative.
- **Date filtering:** The selected date is explicitly passed to `fetchTrainerSessions(date)` and the MSW handler filters the fixture dataset.
- **Mutation reconciliation:** Session create/update/cancel/attendance mutations must invalidate/update the session query cache using the backend response.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `trainer_sessions_components/trainer_sessions_main/TrainerSessionsMain.tsx` | Session list layout and orchestration. |
| `TrainerSessionsScheduleModal.tsx` | Validated scheduling form. |
| `TrainerSessionsEditModal.tsx` | Session editing form. |
| `TrainerSessionsAttendanceModal.tsx` | Attendance selection/submission. |
| `TrainerSessionsKPIs.tsx` | Read-only session KPIs. |

## Current v8-fix Architecture Evidence
- Route files owned by the feature: not-found.tsx, error.tsx, page.tsx, loading.tsx.
- Query files: TrainerSessionsQueryKeys.ts, useTrainerSessionsMutations.test.ts, useTrainerSessionsMutations.ts, useTrainerSessionsQuery.test.ts, useTrainerSessionsQuery.ts.
- Hook files: useTrainerSessionsEditForm.test.ts, useTrainerSessionsEditForm.ts, useTrainerSessionsFilters.test.ts, useTrainerSessionsFilters.ts, useTrainerSessionsKpis.test.ts, useTrainerSessionsKpis.ts.
- Constants: TrainerSessionsIsSpecificFilter.test.ts, TrainerSessionsConstants.ts.
- Schemas: TrainerSessionsDomainSchemas.ts, TrainerSessionsEditSchema.ts, TrainerSessionsScheduleFormSchema.ts.
- Types: TrainerSessionsAttendanceModalProps.ts, TrainerSessionsEditModalProps.ts, TrainerSessionsEmptyStateProps.ts, TrainerSessionsKPIsProps.ts, TrainerSessionsKpiValues.ts, TrainerSessionsListQueryParams.ts, TrainerSessionsMutationTypes.ts, TrainerSessionsScheduleFormTypes.ts, TrainerSessionsTypes.ts.
- Locales: en.json, hi.json.
- Utils: TrainerSessionsIsSpecificFilter.test.ts, TrainerSessionsIsSpecificFilter.ts.
- Module-owned tests: 11 files.
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
- `/trainer/sessions` → `page.tsx` (canonical route owner).
- Route lifecycle files (`page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) are physically owned by this feature module.

## User Flows
1. Enter the feature route and load server-backed data.
2. Use documented search/filter/detail controls.
3. Submit a create/update/action form after feature validation.
4. Execute the mutation with its idempotency contract.
5. Reconcile TanStack Query and surface backend success/error feedback.

## Component Tree
```text
trainer_sessions/
  page.tsx
  trainer_sessions_components/
    trainer_sessions_attendance_modal/
      TrainerSessionsAttendanceModal.tsx
    trainer_sessions_edit_modal/
      TrainerSessionsEditModal.tsx
    trainer_sessions_empty_state/
      TrainerSessionsEmptyState.tsx
    trainer_sessions_kpis/
      TrainerSessionsKPIs.tsx
    trainer_sessions_loading_skeleton/
      TrainerSessionsLoadingSkeleton.tsx
    trainer_sessions_main/
      TrainerSessionsMain.tsx
    trainer_sessions_not_found_view/
      TrainerSessionsNotFoundView.tsx
    trainer_sessions_schedule_modal/
      TrainerSessionsScheduleModal.tsx
```

## API Contract Summary
The module-owned URL config is the single URL source-of-truth; API services consume these paths. Key declared paths:
- `export const TRAINER_SESSIONS_PAGE_DASHBOARD = '/trainer/dashboard' as const;`
- `export const TRAINER_SESSIONS_PAGE_LIST = '/trainer/sessions' as const;`
- `export const TRAINER_SESSIONS_API_LIST = '/trainer/sessions' as const;`
- `export const TRAINER_SESSIONS_API_CREATE = '/trainer/sessions' as const;`
- `export const TRAINER_SESSIONS_API_UPDATE = (id: string) => `/trainer/trainer_sessions/${id}` as const;`
- `export const TRAINER_SESSIONS_API_CANCEL = (id: string) => `/trainer/trainer_sessions/${id}` as const;`
- `export const TRAINER_SESSIONS_API_MARK_ATTENDANCE = (id: string) => `/trainer/trainer_sessions/${id}/attendance` as const;`
- `export const TRAINER_SESSIONS_API_MEMBERS = '/trainer/trainer_sessions/members' as const;`

## State Map
- Server/API state: TanStack Query.
- Shared UI state: no module-scoped Zustand store is present; keep state local or server-owned.
- Private interaction state: local React state.
- URL-backed filters/pagination: URL/search parameters where documented by the feature.

## Permissions
- Trainer role only within `frontend_trainer`; feature must not introduce manager/superadmin business capabilities.
- Business permissions and status mappings remain feature-owned; do not move them into global UI infrastructure.

## External Dependencies
- Approved global/application infrastructure only: API transport, auth/session, logging/error monitoring, routing/runtime plumbing, and zero-business UI primitives.
- Trainer role infrastructure may be consumed through `trainer_infrastructure_*` contracts. No sibling business-module imports are permitted.

## Known Forbidden Patterns
- Do not import sibling feature business code into `trainer_sessions`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.
