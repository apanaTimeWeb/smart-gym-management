# Manager Schedule — Feature Map

## Module Purpose
Manager Schedule is the trainer scheduling workspace. Managers can review trainer schedule summaries and KPIs, search the schedule, select a day, and create/update/delete shifts. Schedule data is server state owned by this module. Shift deletion and other critical scheduling changes require confirmation and authoritative reconciliation.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `schedule_api/` | Feature-owned responsibility for the schedule module. | `ManagerScheduleApi.ts; ManagerUseManagerScheduleQueries.ts` |
| `schedule_components/` | Feature-owned responsibility for the schedule module. | `—` |
| `schedule_context/` | Feature-owned responsibility for the schedule module. | `ManagerScheduleContext.tsx; ManagerUseManagerScheduleLogic.ts` |
| `schedule_fixtures/` | Feature-owned responsibility for the schedule module. | `ManagerScheduleMockData.ts` |
| `schedule_mocks/` | Feature-owned responsibility for the schedule module. | `—` |
| `schedule_types/` | Feature-owned responsibility for the schedule module. | `ManagerScheduleSchema.ts; ManagerScheduleTypes.ts` |
| `schedule_utils/` | Feature-owned responsibility for the schedule module. | `ManagerScheduleSharedConstants.ts` |

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

## Data and State Architecture
TanStack Query owns schedule server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. React Context is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

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
- **Schedule shifts must remain nested under the trainer summary response shape used by the UI:** Schedule shifts must remain nested under the trainer summary response shape used by the UI.
- **Do not invent `trainerId`/`shiftId` values when the backend fixture already provides them:** Do not invent `trainerId`/`shiftId` values when the backend fixture already provides them.
- **Shift deletion is destructive and requires double confirmation:** Shift deletion is destructive and requires double confirmation.
- **Time values must be serialized/displayed with timezone-safe conventions:** Time values must be serialized/displayed with timezone-safe conventions.
- **Search/day state must influence the schedule query rather than only the visual grid:** Search/day state must influence the schedule query rather than only the visual grid.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `schedule/schedule_components/ManagerScheduleKPIs/ManagerScheduleKPIs.tsx` | Renders the 4 KPI stat cards for the Schedule module (total trainers, on duty today, on leave, shifts this week). |
| `schedule/schedule_components/ManagerScheduleMain/ManagerScheduleMain.tsx` | Root client orchestrator for the Schedule module. Owns layout, toolbar, view toggle, and renders sub-components. |
| `schedule/schedule_components/ManagerScheduleShiftModal/ManagerScheduleShiftModal.tsx` | Add/Edit shift modal with React Hook Form + Zod validation. |
| `schedule/schedule_components/ManagerScheduleSkeleton/ManagerScheduleSkeleton.tsx` | Skeleton loader for the Schedule module |
| `schedule/schedule_components/ManagerScheduleTrainerCard/ManagerScheduleTrainerCard.tsx` | Renders a single trainer's availability summary card — total shifts, hours, and per-day status dots. |
| `schedule/schedule_components/ManagerScheduleWeeklyGrid/ManagerScheduleWeeklyGrid.tsx` | Renders the 7-day weekly schedule grid showing all trainer shifts per day column. |
| `schedule/schedule_context/ManagerScheduleContext.tsx` | Provides Schedule module state to the component tree via React Context. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
