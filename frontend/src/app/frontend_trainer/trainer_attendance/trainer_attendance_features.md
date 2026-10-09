# trainer_attendance — Feature Map (v8-fix)

## Module Purpose
The Attendance module gives trainers one place to review their own attendance and the attendance records they are allowed to see for members. The trainer can switch between member records and personal attendance, search/date-filter the dataset, record member attendance, and use self check-in/out. Attendance reads and mutations stay in TanStack Query and the feature-owned API/mock boundary. The module does not expose manager/superadmin attendance administration or unrelated staff records.

## Dependency Manifest
**Approved application/role infrastructure:** `@/lib/api`, approved `trainer_infrastructure/*` shell/feedback/realtime/guard primitives, and framework routing/runtime facilities required by the host.
**Feature-local utilities:** numeric/date/currency/null/masking formatters are kept inside `trainer_attendance_utils/`; no module imports `@/lib/formatters`.
**Direct third-party packages detected in feature source:** @hookform/resolvers, @tanstack/react-query, @testing-library/jest-dom, @testing-library/react, date-fns, http-status-codes, lucide-react, msw, next, next-intl, react, react-hook-form, vitest, zod, zustand.
**Sibling business-module dependencies:** None identified in feature source.

## Feature Lifecycle Contract
Feature lifecycle follows the documented list/detail → action/form → validated API mutation → TanStack Query reconciliation → visible result pattern.
Expected public route contract: `/trainer/attendance`. The physical Next.js `page.tsx/loading.tsx/error.tsx/not-found.tsx` files are now inside this canonical feature module. Public URL rewrites/mounting in the host application are outside the supplied archive and therefore remain host-scope verification.

## Directory Structure
```text
trainer_attendance/
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
├── trainer_attendance_api/
├──   TrainerAttendanceApi.ts
├──   TrainerAttendanceApiBehavior.test.ts
├── trainer_attendance_components/
├──   trainer_attendance_empty_state/
├──     TrainerAttendanceEmptyState.tsx
├──   trainer_attendance_kpis/
├──     TrainerAttendanceKPIs.tsx
├──   trainer_attendance_loading_skeleton/
├──     TrainerAttendanceLoadingSkeleton.tsx
├──   trainer_attendance_main/
├──     TrainerAttendanceMain.tsx
├──   trainer_attendance_modal/
├──     TrainerAttendanceModal.tsx
├──   trainer_attendance_my_attendance_calendar/
├──     TrainerAttendanceMyAttendanceCalendar.test.tsx
├──     TrainerAttendanceMyAttendanceCalendar.tsx
├──   trainer_attendance_not_found_view/
├──     TrainerAttendanceNotFoundView.tsx
├──   trainer_attendance_sortable_header/
├──     TrainerAttendanceSortableHeader.tsx
├──   trainer_attendance_summary_card/
├──     TrainerAttendanceSummaryCard.tsx
├──   trainer_attendance_table/
├──     TrainerAttendanceTable.tsx
├──   trainer_attendance_toolbar/
├──     TrainerAttendanceToolbar.tsx
├── trainer_attendance_constants/
├──   TrainerAttendanceConstants.test.ts
├──   TrainerAttendanceConstants.ts
├──   TrainerAttendanceQueryKeys.ts
├── trainer_attendance_features.md
├── trainer_attendance_forbidden.md
├── trainer_attendance_hooks/
├──   useTrainerAttendanceFilters.test.ts
├──   useTrainerAttendanceFilters.ts
├──   useTrainerAttendanceMain.test.ts
├──   useTrainerAttendanceMain.ts
├──   useTrainerAttendanceMutations.test.ts
├──   useTrainerAttendanceMutations.ts
├──   useTrainerAttendanceQuery.test.ts
├──   useTrainerAttendanceQuery.ts
├── trainer_attendance_locales/
├──   trainer_attendance_en.json
├──   trainer_attendance_hi.json
├── trainer_attendance_mocks/
├──   trainer_attendance_fixtures/
├──     TrainerAttendanceMockData.ts
├──   trainer_attendance_handlers/
├──     TrainerAttendanceMockHandlers.ts
├── trainer_attendance_schemas/
├──   TrainerAttendanceDomainSchemas.ts
├──   TrainerAttendanceFormSchema.ts
├── trainer_attendance_store/
├──   TrainerAttendanceStoreTypes.ts
├──   useTrainerAttendanceStore.test.ts
├──   useTrainerAttendanceStore.ts
├── trainer_attendance_tests/
├──   TrainerAttendanceRouteStates.test.tsx
├── trainer_attendance_theme_contract.md
├── trainer_attendance_types/
├──   TrainerAttendanceEmptyStateProps.ts
├──   TrainerAttendanceInteractionTypes.ts
├──   TrainerAttendanceKPIsProps.ts
├──   TrainerAttendanceListResult.ts
├──   TrainerAttendanceModalProps.ts
├──   TrainerAttendanceMutationTypes.ts
├──   TrainerAttendanceMyAttendanceCalendarTypes.ts
├──   TrainerAttendanceQueryTypes.ts
├──   TrainerAttendanceSortableHeaderProps.ts
├──   TrainerAttendanceSummaryCardProps.ts
├──   TrainerAttendanceTableProps.ts
├──   TrainerAttendanceToolbarTypes.ts
├──   TrainerAttendanceTypes.ts
├── trainer_attendance_url_config.ts
├── trainer_attendance_utils/
├──   TrainerAttendanceDisplayFormatters.test.ts
└──   TrainerAttendanceDisplayFormatters.ts
```

Root files are intentionally limited to framework-reserved route files and module documentation. All business/config/schema/query/api artifacts are inside their role+module-prefixed subfolders.

## Approved External Dependencies
- Application infrastructure: approved global API transport, auth/session plumbing, global logging/error monitoring, and zero-business UI/shell primitives.
- Role infrastructure: `trainer_infrastructure_*` zero-business shell/feedback/realtime/guard facilities.
- Business Feature Dependencies: None.

## Feature Inventory
| Feature | Route | Behavior |
|---|---|---|
| KPI cards | `/trainer/attendance` | Loads attendance statistics. |
| Members tab | `/trainer/attendance` | Search/filter/paginated member attendance list. |
| My Attendance tab | `/trainer/attendance` | Trainer-scoped calendar/list view backed by a separate full-history query; the trainer staff ID is mandatory. |
| Record Attendance | `/trainer/attendance` | RHF + Zod modal creates a member attendance record. |
| Self Check In | `/trainer/attendance` | Creates a staff open attendance record in the module mock state. |
| Self Check Out | `/trainer/attendance` | Closes the trainer's current open attendance record. |
| Search/date/page | `/trainer/attendance` | URL/query state changes the server/mock result set. |

## User Flows & Interactions
1. Open Attendance → route skeleton → KPI + member list.
2. Switch to My Attendance → load the full trainer-scoped history across every API page, independent of the table's page/search/date filters → calendar/list toggle.
3. Search/filter/paginate → URL/query key changes → mock/API result set changes.
4. Record member attendance → validate → POST → feedback → list refresh.
5. Self Check In → mutation → open STAFF record visible on subsequent My Attendance read.
6. Self Check Out → mutation → existing STAFF record gains checkout time.

## Data & State Architecture
- Server/API state → TanStack Query only.
- UI-only shared state → module-scoped Zustand where required.
- Private UI state → local React state.
- URL/filter/search/pagination state → URL/query parameters where the feature documents those interactions.
- API responses are validated at the feature API boundary with Zod.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchTrainerAttendanceRecords` | GET | `TRAINER_ATTENDANCE_URLS.API.BASE` | date/search/type/staff/page params | attendance records + pagination meta |
| `fetchAllTrainerAttendanceRecords` | GET (reuses list endpoint) | `TRAINER_ATTENDANCE_URLS.API.BASE` | `type=STAFF`, authenticated `staffId`, fixed page size and deterministic sort; requests every page | complete trainer-scoped attendance history or an explicit error if the server total changes / the response is incomplete |
| `fetchTrainerAttendanceStats` | GET | `TRAINER_ATTENDANCE_URLS.API.STATS` | none | `TrainerAttendanceStats` |
| `fetchTrainerAttendanceMembersBasic` | GET | `TRAINER_ATTENDANCE_URLS.API.MEMBERS_BASIC` | none | `TrainerAttendanceMemberBasic[]` |
| `createTrainerAttendanceRecord` | POST | `TRAINER_ATTENDANCE_URLS.API.BASE` | `TrainerAttendanceCreateDto` | created `TrainerAttendanceRecord` + backend message |
| `selfCheckInTrainerAttendance` | POST | `TRAINER_ATTENDANCE_URLS.API.BASE` | trainer/staff identity | backend message |
| `checkOutTrainerAttendance` | POST | `TRAINER_ATTENDANCE_URLS.API.CHECKOUT(id)` | checkout timestamp | backend message |

## UI Data Requirements
| UI Element | Required fields | Source |
|---|---|---|
| Attendance KPIs | `totalCheckIns`, `memberCheckIns`, `staffCheckIns` | stats response |
| Attendance table | `id`, member/staff identity, date, checkIn, checkOut, type/status | attendance list response |
| Member selector | member `id`, `name` | members-basic response |
| My Attendance calendar | `date`, attendance status/check-in/out values across the full history | separate trainer-scoped all-pages query; independent of the table's pagination/search/date state |
| Search/filter/pagination | query values reflected in request and result set | URL/query/API contract |

## Permissions and Security
- Required capability: `trainer.view` through the Trainer role guard.
- Trainer UI exposes trainer-scoped attendance actions only.
- Self check-in/out controls mutate only the trainer's own attendance identity.
- Destructive/native browser confirmation is not used.
- Backend authorization remains authoritative; frontend visibility is not an authorization substitute.

## Loading, Empty, and Error States
- Route `loading.tsx` renders attendance-shaped skeletons.
- Table empty state uses `TrainerAttendanceEmptyState`.
- Mutation buttons expose loading/disabled states.
- Route `error.tsx` renders the module error fallback with Retry.
- Query failures are surfaced through user-safe feedback; raw backend/internal details are not rendered.

## Edge Cases and AI Warnings
- **Trainer scope must not drift:** self attendance queries must keep the trainer/staff identity in the request path; if identity is missing, the query must fail safely rather than issue an unscoped STAFF request.
- **Calendar/history completeness:** the My Attendance calendar and monthly summary use `fetchAllTrainerAttendanceRecords`; they must never derive monthly totals from the paginated/search-filtered table query. The full-history function uses the existing `page`/`limit`/`total` list contract and rejects inconsistent totals rather than presenting partial history as complete.
- **Search/filter must change server results:** do not add UI-only filtering after the query returns.
- **Self check-out requires an existing open record:** do not invent a new checkout record in the UI.
- **Attendance mutations must reconcile Query state:** a successful mutation must be reflected in the next visible read.
- **Nullable times need safe display:** missing checkout values use the module's nullable display rule rather than `undefined`.

## Component Responsibility Map
| Component area | Responsibility |
|---|---|
| `TrainerAttendanceMain` | Route-level client orchestration only. |
| `TrainerAttendanceToolbar` | View/search/date/self-action controls. |
| `TrainerAttendanceTable` | Semantic attendance table and row actions. |
| `TrainerAttendanceKPIs` | Read-only statistics presentation. |
| `TrainerAttendanceModal` | RHF/Zod attendance creation form. |
| `TrainerAttendanceMyAttendanceCalendar` | Trainer-scoped calendar/list interaction. |

## Current v8-fix Architecture Evidence
- Route files owned by the feature: not-found.tsx, error.tsx, page.tsx, loading.tsx.
- Query files: TrainerAttendanceQueryKeys.ts, useTrainerAttendanceFilters.test.ts, useTrainerAttendanceFilters.ts, useTrainerAttendanceMutations.test.ts, useTrainerAttendanceMutations.ts, useTrainerAttendanceQuery.test.ts, useTrainerAttendanceQuery.ts.
- Hook files: useTrainerAttendanceFilters.test.ts, useTrainerAttendanceFilters.ts, useTrainerAttendanceMain.test.ts, useTrainerAttendanceMain.ts, useTrainerAttendanceMutations.test.ts, useTrainerAttendanceMutations.ts, useTrainerAttendanceQuery.test.ts, useTrainerAttendanceQuery.ts.
- Constants: TrainerAttendanceConstants.test.ts, TrainerAttendanceConstants.ts.
- Schemas: TrainerAttendanceDomainSchemas.ts, TrainerAttendanceFormSchema.ts.
- Types: TrainerAttendanceEmptyStateProps.ts, TrainerAttendanceInteractionTypes.ts, TrainerAttendanceKPIsProps.ts, TrainerAttendanceListResult.ts, TrainerAttendanceModalProps.ts, TrainerAttendanceMutationTypes.ts, TrainerAttendanceQueryTypes.ts, TrainerAttendanceSortableHeaderProps.ts, TrainerAttendanceSummaryCardProps.ts, TrainerAttendanceTableProps.ts, TrainerAttendanceTypes.ts.
- Locales: en.json, hi.json.
- Utils: TrainerAttendanceDisplayFormatters.test.ts, TrainerAttendanceDisplayFormatters.ts.
- Module-owned tests: 10 files.
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
- `/trainer/attendance` → `page.tsx` (canonical route owner).
- Route lifecycle files (`page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) are physically owned by this feature module.

## User Flows
1. Enter the feature route and load server-backed data.
2. Use documented search/filter/detail controls.
3. Submit a create/update/action form after feature validation.
4. Execute the mutation with its idempotency contract.
5. Reconcile TanStack Query and surface backend success/error feedback.

## Component Tree
```text
trainer_attendance/
  page.tsx
  trainer_attendance_components/
    trainer_attendance_empty_state/
      TrainerAttendanceEmptyState.tsx
    trainer_attendance_kpis/
      TrainerAttendanceKPIs.tsx
    trainer_attendance_loading_skeleton/
      TrainerAttendanceLoadingSkeleton.tsx
    trainer_attendance_main/
      TrainerAttendanceMain.tsx
    trainer_attendance_modal/
      TrainerAttendanceModal.tsx
    trainer_attendance_my_attendance_calendar/
      TrainerAttendanceMyAttendanceCalendar.test.tsx
    trainer_attendance_not_found_view/
      TrainerAttendanceNotFoundView.tsx
    trainer_attendance_sortable_header/
      TrainerAttendanceSortableHeader.tsx
    trainer_attendance_summary_card/
      TrainerAttendanceSummaryCard.tsx
    trainer_attendance_table/
      TrainerAttendanceTable.tsx
    trainer_attendance_toolbar/
      TrainerAttendanceToolbar.tsx
```

## API Contract Summary
The module-owned URL config is the single URL source-of-truth; API services consume these paths. Key declared paths:
- `export const TRAINER_ATTENDANCE_PAGE_DASHBOARD = '/trainer/dashboard' as const;`
- `export const TRAINER_ATTENDANCE_PAGE_LIST = '/trainer/attendance' as const;`
- `export const TRAINER_ATTENDANCE_API_BASE = '/trainer/attendance' as const;`
- `export const TRAINER_ATTENDANCE_API_STATS = '/trainer/trainer_attendance/stats' as const;`
- `export const TRAINER_ATTENDANCE_API_MEMBERS_BASIC = '/trainer/trainer_attendance/members-basic' as const;`
- `export const TRAINER_ATTENDANCE_API_TODAY_STATS = '/trainer/trainer_attendance/today-stats' as const;`
- `export const TRAINER_ATTENDANCE_API_CHECKOUT = (id: string) => `/trainer/trainer_attendance/checkout/${id}` as const;`

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
- Do not import sibling feature business code into `trainer_attendance`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.
