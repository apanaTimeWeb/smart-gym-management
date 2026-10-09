# trainer_progress_tracking — Feature Map (v8-fix)

## Module Purpose
The Progress Tracking module lets trainers review and record member progress measurements, compare selected members, and inspect goal/progress visualizations. It keeps the selected member identity in UI state while server measurements remain Query-owned. Create, update, and delete actions use the module API/mock boundary and require confirmation for destructive actions. This module does not own unrelated member, billing, or tenant data.

## Dependency Manifest
**Approved application/role infrastructure:** `@/lib/api`, approved `trainer_infrastructure/*` shell/feedback/realtime/guard primitives, and framework routing/runtime facilities required by the host.
**Feature-local utilities:** numeric/date/currency/null/masking formatters are kept inside `trainer_progress_tracking_utils/`; no module imports `@/lib/formatters`.
**Direct third-party packages detected in feature source:** @hookform/resolvers, @tanstack/react-query, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, apexcharts, http-status-codes, lucide-react, msw, next, next-intl, react, react-apexcharts, react-hook-form, vitest, zod, zustand.
**Sibling business-module dependencies:** None identified in feature source.

## Feature Lifecycle Contract
Feature lifecycle follows the documented list/detail → action/form → validated API mutation → TanStack Query reconciliation → visible result pattern.
Expected public route contract: `/trainer/progress-tracking`. The physical Next.js `page.tsx/loading.tsx/error.tsx/not-found.tsx` files are now inside this canonical feature module. Public URL rewrites/mounting in the host application are outside the supplied archive and therefore remain host-scope verification.

## Directory Structure
```text
trainer_progress_tracking/
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
├── trainer_progress_tracking_api/
├──   TrainerProgressTrackingApi.ts
├──   TrainerProgressTrackingApiBehavior.test.ts
├── trainer_progress_tracking_components/
├──   trainer_progress_tracking_chart/
├──     TrainerProgressTrackingChart.tsx
├──   trainer_progress_tracking_comparison_chart/
├──     TrainerProgressTrackingComparisonChart.tsx
├──   trainer_progress_tracking_comparison_delta/
├──     TrainerProgressTrackingComparisonDelta.tsx
├──   trainer_progress_tracking_comparison_table/
├──     TrainerProgressTrackingComparisonTable.tsx
├──   trainer_progress_tracking_empty_state/
├──     TrainerProgressTrackingEmptyState.tsx
├──   trainer_progress_tracking_loading_skeleton/
├──     TrainerProgressTrackingLoadingSkeleton.tsx
├──   trainer_progress_tracking_main/
├──     TrainerProgressTrackingMain.tsx
├──     TrainerProgressTrackingMainBehavior.test.tsx
├──   trainer_progress_tracking_member_selector/
├──     TrainerProgressTrackingMemberSelector.tsx
├──   trainer_progress_tracking_modal/
├──     TrainerProgressTrackingModal.tsx
├──   trainer_progress_tracking_not_found_view/
├──     TrainerProgressTrackingNotFoundView.tsx
├──   trainer_progress_tracking_sort_direction_icon/
├──     TrainerProgressTrackingSortDirectionIcon.tsx
├──   trainer_progress_tracking_table/
├──     TrainerProgressTrackingTable.tsx
├── trainer_progress_tracking_constants/
├──   TrainerProgressTrackingConstants.test.ts
├──   TrainerProgressTrackingConstants.ts
├──   TrainerProgressTrackingQueryKeys.ts
├── trainer_progress_tracking_features.md
├── trainer_progress_tracking_forbidden.md
├── trainer_progress_tracking_hooks/
├──   TrainerProgressTrackingComparisonSnapshotBuilder.test.ts
├──   TrainerProgressTrackingComparisonSnapshotBuilder.ts
├──   useTrainerProgressTrackingComparisonQueries.test.ts
├──   useTrainerProgressTrackingComparisonQueries.ts
├──   useTrainerProgressTrackingFilters.test.ts
├──   useTrainerProgressTrackingFilters.ts
├──   useTrainerProgressTrackingMain.test.ts
├──   useTrainerProgressTrackingMain.ts
├──   useTrainerProgressTrackingMutations.test.ts
├──   useTrainerProgressTrackingMutations.ts
├──   useTrainerProgressTrackingQuery.test.ts
├──   useTrainerProgressTrackingQuery.ts
├── trainer_progress_tracking_locales/
├──   trainer_progress_tracking_en.json
├──   trainer_progress_tracking_hi.json
├── trainer_progress_tracking_mocks/
├──   trainer_progress_tracking_fixtures/
├──     TrainerProgressTrackingMockData.ts
├──   trainer_progress_tracking_handlers/
├──     TrainerProgressTrackingMockHandlers.ts
├── trainer_progress_tracking_schemas/
├──   TrainerProgressTrackingDomainSchemas.ts
├──   TrainerProgressTrackingEntriesResponseSchema.ts
├── trainer_progress_tracking_store/
├──   TrainerProgressTrackingStoreTypes.ts
├──   useTrainerProgressTrackingStore.test.ts
├──   useTrainerProgressTrackingStore.ts
├── trainer_progress_tracking_tests/
├──   TrainerProgressTrackingRouteStates.test.tsx
├── trainer_progress_tracking_theme_contract.md
├── trainer_progress_tracking_types/
├──   TrainerProgressTrackingChartProps.ts
├──   TrainerProgressTrackingComparisonChartProps.ts
├──   TrainerProgressTrackingComparisonDeltaProps.ts
├──   TrainerProgressTrackingComparisonTableProps.ts
├──   TrainerProgressTrackingEmptyStateProps.ts
├──   TrainerProgressTrackingEntriesResponse.ts
├──   TrainerProgressTrackingMemberSelectorProps.ts
├──   TrainerProgressTrackingMemberSummary.ts
├──   TrainerProgressTrackingModalProps.ts
├──   TrainerProgressTrackingMutationTypes.ts
├──   TrainerProgressTrackingQueryTypes.ts
├──   TrainerProgressTrackingSortDirectionIconProps.ts
├──   TrainerProgressTrackingTabTypes.ts
├──   TrainerProgressTrackingTableProps.ts
├──   TrainerProgressTrackingTypes.ts
├── trainer_progress_tracking_url_config.ts
├── trainer_progress_tracking_utils/
├──   TrainerProgressTrackingDisplayFormatters.test.ts
└──   TrainerProgressTrackingDisplayFormatters.ts
```

Root files are intentionally limited to framework-reserved route files and module documentation. All business/config/schema/query/api artifacts are inside their role+module-prefixed subfolders.

## Approved External Dependencies
- Application infrastructure: approved global API transport, auth/session plumbing, global logging/error monitoring, and zero-business UI/shell primitives.
- Role infrastructure: `trainer_infrastructure_*` zero-business shell/feedback/realtime/guard facilities.
- Business Feature Dependencies: None.

## Feature Inventory
| Feature | Route | Main API | Status |
|---|---|---|---|
| Individual progress history | `/trainer/progress-tracking` | `GET /trainer/trainer_progress_tracking/:memberId/entries` | Live via MSW |
| Add progress entry | `/trainer/progress-tracking` | `POST /trainer/trainer_progress_tracking/:memberId/entries` | Live via MSW |
| Edit progress entry | `/trainer/progress-tracking` | `PATCH /trainer/trainer_progress_tracking/:memberId/entries/:entryId` | Live via MSW |
| Delete progress entry | `/trainer/progress-tracking` | `DELETE /trainer/trainer_progress_tracking/:memberId/entries/:entryId` | Live via MSW |
| Comparison view | `/trainer/progress-tracking` | `GET /trainer/trainer_progress_tracking/members` plus member entry reads | Live via MSW |

## User Flows & Interactions
All discovered actionable controls are recorded in the v8-fix actionable-control matrix. Important flows are verified through their module-owned hooks, mutations, MSW handlers, and co-located tests.

## Data & State Architecture
- Server/API state → TanStack Query only.
- UI-only shared state → module-scoped Zustand where required.
- Private UI state → local React state.
- URL/filter/search/pagination state → URL/query parameters where the feature documents those interactions.
- API responses are validated at the feature API boundary with Zod.

## API Contract
| Function | Method | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchProgressEntries(memberId)` | GET | `/trainer/trainer_progress_tracking/:memberId/entries` | `memberId` path | `ProgressEntry[]` |
| `fetchProgressSummary(memberId)` | GET | `/trainer/trainer_progress_tracking/:memberId/summary` | `memberId` path | `ProgressSummary` |
| `createProgressEntry(memberId, dto)` | POST | `/trainer/trainer_progress_tracking/:memberId/entries` | `CreateProgressEntryDto` | `ProgressEntry` |
| `updateProgressEntry(memberId, entryId, dto)` | PATCH | `/trainer/trainer_progress_tracking/:memberId/entries/:entryId` | partial entry DTO | `ProgressEntry` |
| `deleteProgressEntry(memberId, entryId)` | DELETE | `/trainer/trainer_progress_tracking/:memberId/entries/:entryId` | path IDs | `null` |

## UI Data Requirements
| UI Element | Response Field | Endpoint | Mocked |
|---|---|---|---|
| Progress table date | `date` | entries | Yes |
| Progress table weight | `weightKg` | entries | Yes |
| Progress table BMI | `bmi` | entries | Yes |
| Optional body fat | `bodyFatPercent` | entries | Yes |
| Optional muscle mass | `muscleMassKg` | entries | Yes |
| Comparison member name | `name` | members | Yes |
| Summary weight delta | `weightChangeKg` | summary | Yes |

## Permissions and Security
- Required capability: `trainer.view`.
- Member IDs in the progress URL/query must map to the same member used for requests and rendered detail.
- Create/update/delete progress entries are non-duplicable mutations and use a stable idempotency key for each user intent.
- Frontend permission checks do not replace backend authorization.

## Loading, Empty, and Error States
- Route `loading.tsx` uses progress-shaped skeleton UI.
- Empty progress state offers the documented add-entry action.
- Query failures are presented as safe section errors with retry where applicable.
- Mutation forms show loading/disabled state and preserve failed drafts.

## Edge Cases and AI Warnings
- **Delete requires confirmation:** Use `useConfirm()`; never call `window.confirm()` or delete on one click.
- **Numeric ranges are validated:** `CreateProgressEntrySchema` enforces realistic weight/height/body-fat ranges before submission.
- **Nullable measurements:** Optional measurements use `displayValue()` so missing values render as `—` instead of blank cells.
- **Member isolation:** Progress requests are scoped by the selected assigned member ID; never substitute a global member fixture.
- **Mutation cache:** After create/edit/delete, reconcile or invalidate the affected TanStack Query entry/summary queries rather than duplicating server data in Zustand.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `TrainerProgressTrackingMain.tsx` | Orchestrates individual/compare tabs and feature layout. |
| `TrainerProgressTrackingChart.tsx` | Renders the selected member trend chart from query data. |
| `TrainerProgressTrackingTable.tsx` | Renders progress rows and guarded edit/delete actions. |
| `TrainerProgressTrackingModal.tsx` | Renders the validated add/edit form. |
| `TrainerProgressTrackingComparisonChart.tsx` | Renders multi-member comparison chart. |
| `TrainerProgressTrackingComparisonTable.tsx` | Renders comparison snapshots and deltas. |
| `TrainerProgressTrackingEmptyState.tsx` | Explains absence of records and the available next action. |

## Current v8-fix Architecture Evidence
- Route files owned by the feature: not-found.tsx, error.tsx, page.tsx, loading.tsx.
- Query files: TrainerProgressTrackingQueryKeys.ts, useTrainerProgressTrackingComparisonQueries.test.ts, useTrainerProgressTrackingComparisonQueries.ts, useTrainerProgressTrackingMutations.test.ts, useTrainerProgressTrackingMutations.ts, useTrainerProgressTrackingQuery.test.ts, useTrainerProgressTrackingQuery.ts.
- Utility files: TrainerProgressTrackingComparisonSnapshotBuilder.test.ts, TrainerProgressTrackingComparisonSnapshotBuilder.ts. Hook files: useTrainerProgressTrackingFilters.test.ts, useTrainerProgressTrackingFilters.ts.
- Constants: TrainerProgressTrackingConstants.test.ts, TrainerProgressTrackingConstants.ts.
- Schemas: TrainerProgressTrackingDomainSchemas.ts, TrainerProgressTrackingEntriesResponseSchema.ts.
- Types: TrainerProgressTrackingChartProps.ts, TrainerProgressTrackingComparisonChartProps.ts, TrainerProgressTrackingComparisonDeltaProps.ts, TrainerProgressTrackingComparisonTableProps.ts, TrainerProgressTrackingEmptyStateProps.ts, TrainerProgressTrackingEntriesResponse.ts, TrainerProgressTrackingMemberSelectorProps.ts, TrainerProgressTrackingMemberSummary.ts, TrainerProgressTrackingModalProps.ts, TrainerProgressTrackingMutationTypes.ts, TrainerProgressTrackingQueryTypes.ts, TrainerProgressTrackingSortDirectionIconProps.ts, TrainerProgressTrackingTabTypes.ts, TrainerProgressTrackingTableProps.ts, TrainerProgressTrackingTypes.ts.
- Locales: en.json, hi.json.
- Utils: TrainerProgressTrackingDisplayFormatters.ts.
- Module-owned tests: 12 files.
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
- `/trainer/progress-tracking` → `page.tsx` (canonical route owner).
- Route lifecycle files (`page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) are physically owned by this feature module.

## User Flows
1. Enter the feature route and load server-backed data.
2. Use documented search/filter/detail controls.
3. Submit a create/update/action form after feature validation.
4. Execute the mutation with its idempotency contract.
5. Reconcile TanStack Query and surface backend success/error feedback.

## Component Tree
```text
trainer_progress_tracking/
  page.tsx
  trainer_progress_tracking_components/
    trainer_progress_tracking_chart/
      TrainerProgressTrackingChart.tsx
    trainer_progress_tracking_comparison_chart/
      TrainerProgressTrackingComparisonChart.tsx
    trainer_progress_tracking_comparison_delta/
      TrainerProgressTrackingComparisonDelta.tsx
    trainer_progress_tracking_comparison_table/
      TrainerProgressTrackingComparisonTable.tsx
    trainer_progress_tracking_empty_state/
      TrainerProgressTrackingEmptyState.tsx
    trainer_progress_tracking_loading_skeleton/
      TrainerProgressTrackingLoadingSkeleton.tsx
    trainer_progress_tracking_main/
      TrainerProgressTrackingMain.tsx
    trainer_progress_tracking_member_selector/
      TrainerProgressTrackingMemberSelector.tsx
    trainer_progress_tracking_modal/
      TrainerProgressTrackingModal.tsx
    trainer_progress_tracking_not_found_view/
      TrainerProgressTrackingNotFoundView.tsx
    trainer_progress_tracking_sort_direction_icon/
      TrainerProgressTrackingSortDirectionIcon.tsx
    trainer_progress_tracking_table/
      TrainerProgressTrackingTable.tsx
```

## API Contract Summary
The module-owned URL config is the single URL source-of-truth; API services consume these paths. Key declared paths:
- `export const TRAINER_PROGRESS_TRACKING_PAGE_DASHBOARD = '/trainer/dashboard' as const;`
- `export const TRAINER_PROGRESS_TRACKING_PAGE_LIST = '/trainer/progress-tracking' as const;`
- `export const TRAINER_PROGRESS_TRACKING_API_MEMBERS = '/trainer/trainer_progress_tracking/members' as const;`
- `export const TRAINER_PROGRESS_TRACKING_API_ENTRIES = (memberId: string) => `/trainer/trainer_progress_tracking/${memberId}/entries` as const;`
- `export const TRAINER_PROGRESS_TRACKING_API_ENTRY_DETAIL = (memberId: string, entryId: string) => `/trainer/trainer_progress_tracking/${memberId}/entries/${entryId}` as const;`
- `export const TRAINER_PROGRESS_TRACKING_API_SUMMARY = (memberId: string) => `/trainer/trainer_progress_tracking/${memberId}/summary` as const;`

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
- Do not import sibling feature business code into `trainer_progress_tracking`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.
