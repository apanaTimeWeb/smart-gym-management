# Trainer Progress Tracking — Feature Map

## Module Purpose
This feature lets Trainers record and review member progress measurements and compare multiple assigned members. It supports weight, height, BMI, body-fat, muscle-mass and circumference tracking with historical trend visualizations. Trainers can add, edit and delete progress entries using validated forms and confirmation for deletion. The module is read-only for unassigned members and does not expose Manager payroll or HR capabilities.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `progress_components/` | Member selector, charts, table, empty state and validated entry modal | `TrainerProgressMain.tsx`, `TrainerProgressChart.tsx`, `TrainerProgressTable.tsx`, `TrainerProgressModal.tsx`, `TrainerProgressComparisonChart.tsx`, `TrainerProgressComparisonTable.tsx` |
| `progress_queries/` | TanStack Query list/detail reads and mutations | `useTrainerProgressQuery.ts`, `useTrainerProgressMutations.ts` |
| `progress_store/` | UI-only selected member/tab state | `useTrainerProgressStore.ts` |
| `progress_utils/` | URL filters and comparison calculations | `useTrainerProgressFilters.ts`, `useTrainerProgressComparison.ts`, `TrainerProgressSharedConstants.ts` |
| `progress_types/` | Zod schemas and derived domain types | `TrainerProgress.schema.ts`, `TrainerProgressTypes.ts` |
| `progress_api/` | API boundary methods | `TrainerProgressApi.ts` |
| `progress_fixtures/` | MSW server data | `TrainerProgressMockData.ts` |
| `progress_mocks/handlers/` | Feature-owned MSW handlers | `TrainerProgressMockHandlers.ts` |

## Feature Inventory
| Feature | Route | Main API | Status |
|---|---|---|---|
| Individual progress history | `/trainer/progress-tracking` | `GET /trainer/progress-tracking/:memberId/entries` | Live via MSW |
| Add progress entry | `/trainer/progress-tracking` | `POST /trainer/progress-tracking/:memberId/entries` | Live via MSW |
| Edit progress entry | `/trainer/progress-tracking` | `PATCH /trainer/progress-tracking/:memberId/entries/:entryId` | Live via MSW |
| Delete progress entry | `/trainer/progress-tracking` | `DELETE /trainer/progress-tracking/:memberId/entries/:entryId` | Live via MSW |
| Comparison view | `/trainer/progress-tracking` | `GET /trainer/progress-tracking/members` plus member entry reads | Live via MSW |

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
