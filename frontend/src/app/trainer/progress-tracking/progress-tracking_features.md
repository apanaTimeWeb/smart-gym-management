# Trainer Progress Tracking — Feature Map

## Module Purpose
The Progress Tracking module lets trainers review and record member progress measurements, compare selected members, and inspect goal/progress visualizations. It keeps the selected member identity in UI state while server measurements remain Query-owned. Create, update, and delete actions use the module API/mock boundary and require confirmation for destructive actions. This module does not own unrelated member, billing, or tenant data.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `progress-tracking_components/` | Member selector, charts, table, empty state and validated entry modal | `TrainerProgressMain.tsx`, `TrainerProgressChart.tsx`, `TrainerProgressTable.tsx`, `TrainerProgressModal.tsx`, `TrainerProgressComparisonChart.tsx`, `TrainerProgressComparisonTable.tsx` |
| `progress-tracking_queries/` | TanStack Query list/detail reads and mutations | `useTrainerProgressQuery.ts`, `useTrainerProgressMutations.ts` |
| `progress-tracking_store/` | UI-only selected member/tab state | `useTrainerProgressStore.ts` |
| `progress-tracking_utils/` | URL filters and comparison calculations | `useTrainerProgressFilters.ts`, `useTrainerProgressComparison.ts`, `TrainerProgressSharedConstants.ts` |
| `progress-tracking_types/` | Zod schemas and derived domain types | `TrainerProgress.schema.ts`, `TrainerProgressTypes.ts` |
| `progress-tracking_api/` | API boundary methods | `TrainerProgressApi.ts` |
| `progress-tracking_mocks/fixtures/` | MSW server data | `TrainerProgressMockData.ts` |
| `progress-tracking_mocks/handlers/` | Feature-owned MSW handlers | `TrainerProgressMockHandlers.ts` |

## Feature Inventory
| Feature | Route | Main API | Status |
|---|---|---|---|
| Individual progress history | `/trainer/progress-tracking` | `GET /trainer/progress-tracking/:memberId/entries` | Live via MSW |
| Add progress entry | `/trainer/progress-tracking` | `POST /trainer/progress-tracking/:memberId/entries` | Live via MSW |
| Edit progress entry | `/trainer/progress-tracking` | `PATCH /trainer/progress-tracking/:memberId/entries/:entryId` | Live via MSW |
| Delete progress entry | `/trainer/progress-tracking` | `DELETE /trainer/progress-tracking/:memberId/entries/:entryId` | Live via MSW |
| Comparison view | `/trainer/progress-tracking` | `GET /trainer/progress-tracking/members` plus member entry reads | Live via MSW |

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, `@/lib/formatters`, and approved zero-business Trainer UI/feedback infrastructure used directly by this module.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## Data and State Architecture
TanStack Query owns progress responses and mutation state. `useTrainerProgressStore.ts` owns only selected member/tab UI state. Search/filter state is URL-backed through `useTrainerProgressFilters.ts`. No progress API response is stored as primary server state in Zustand.

## API Contract
| Function | Method | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchProgressEntries(memberId)` | GET | `/trainer/progress-tracking/:memberId/entries` | `memberId` path | `ProgressEntry[]` |
| `fetchProgressSummary(memberId)` | GET | `/trainer/progress-tracking/:memberId/summary` | `memberId` path | `ProgressSummary` |
| `createProgressEntry(memberId, dto)` | POST | `/trainer/progress-tracking/:memberId/entries` | `CreateProgressEntryDto` | `ProgressEntry` |
| `updateProgressEntry(memberId, entryId, dto)` | PATCH | `/trainer/progress-tracking/:memberId/entries/:entryId` | partial entry DTO | `ProgressEntry` |
| `deleteProgressEntry(memberId, entryId)` | DELETE | `/trainer/progress-tracking/:memberId/entries/:entryId` | path IDs | `null` |

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

## User Flows & Interactions
### Flow 1: Review Member Progress
1. Trainer opens `/trainer/progress-tracking`.
2. The module-owned member/progress query loads the selected member's progress records.
3. Trainer reviews the table/chart data rendered from the documented API response fields.
4. Loading, empty, and error states are shown from the module-owned UI states.
5. Switching the selected member changes the query key/resource scope and renders that member's data.

### Flow 2: Compare Progress
1. Trainer selects the comparison controls.
2. The module query requests the required comparison data.
3. Comparison charts/tables render the returned measurements.
4. Invalid or unavailable comparison data produces the documented safe empty/error state.

## Edge Cases and AI Warnings
- **Delete requires confirmation:** Use `useConfirm()`; never call `window.confirm()` or delete on one click.
- **Numeric ranges are validated:** `CreateProgressEntrySchema` enforces realistic weight/height/body-fat ranges before submission.
- **Nullable measurements:** Optional measurements use `displayValue()` so missing values render as `—` instead of blank cells.
- **Member isolation:** Progress requests are scoped by the selected assigned member ID; never substitute a global member fixture.
- **Mutation cache:** After create/edit/delete, reconcile or invalidate the affected TanStack Query entry/summary queries rather than duplicating server data in Zustand.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `TrainerProgressMain.tsx` | Orchestrates individual/compare tabs and feature layout. |
| `TrainerProgressChart.tsx` | Renders the selected member trend chart from query data. |
| `TrainerProgressTable.tsx` | Renders progress rows and guarded edit/delete actions. |
| `TrainerProgressModal.tsx` | Renders the validated add/edit form. |
| `TrainerProgressComparisonChart.tsx` | Renders multi-member comparison chart. |
| `TrainerProgressComparisonTable.tsx` | Renders comparison snapshots and deltas. |
| `TrainerProgressEmptyState.tsx` | Explains absence of records and the available next action. |

## Rule Compliance Checklist
- [x] Module-owned fixtures and handlers
- [x] TanStack Query server-state ownership
- [x] RHF + Zod progress form
- [x] Double-confirm destructive action
- [x] Stable keys and nullable display fallback
- [x] ApexCharts only for comparison visualization

## Current Implementation Alignment

- Module URL contract is owned by `progress-tracking_url_config.ts`; role URL configuration only owns role navigation.
- Feature server data is owned by the module API/query layer; UI components do not call `apiFetch` directly.
- Feature-owned mock/fixture files are the browser-first demonstration boundary.
- Route loading and error states use module-owned files; route error UI does not expose raw digest/message details.
- Root project runner/tooling files are outside this archive, so lint/typecheck/build/E2E execution remains an environment verification step.

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, chart library, approved Trainer feedback/UI primitives.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

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

## Rule Compliance Checklist
- [x] Member resource identity preserved through URL/query/API/mock/UI
- [x] TanStack Query server-state ownership
- [x] RHF + Zod progress form
- [x] Idempotency on non-duplicable mutations
- [x] Feature-owned fixtures/handlers/tests/docs
- [x] Semantic theme usage
- [ ] Parent runtime/tooling/browser verification — NOT VERIFIED
