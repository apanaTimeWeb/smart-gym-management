# Trainer Schedule — Feature Map

## Module Purpose
Trainer weekly availability aur leave-request workflows ko manage karta hai.

## Directory Structure
- `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` — route states.
- `schedule_components/` — availability, leave request, empty/loading, and main views.
- `schedule_queries/` — TanStack Query reads and mutation orchestration.
- `schedule_store/` — UI-only active-tab/modal state; its contract is in `schedule_types/TrainerScheduleStoreTypes.ts`.
- `schedule_types/` — state/domain contracts.
- `schedule_utils/` — static tabs/status/time configuration.
- `schedule_fixtures/` / `schedule_mocks/` — feature-owned demo data/handlers.
- `schedule_api/TrainerScheduleApi.ts` — API boundary.
- `schedule_url_config.ts` — URL contract.
- `schedule_tests/` — API/main/route tests.

## Feature Inventory
| Feature | Behavior |
|---|---|
| Availability | View and save weekly availability. |
| Leaves | View leave requests and submit a new request. |
| Tab switch | UI-only active tab state. |
| Leave modal | RHF/Zod-backed request flow with feedback and loading state. |

## Data and State Architecture
- TanStack Query owns availability/leaves server state.
- Zustand owns only tab/modal UI state.
- No React Context owns API data.
- Static status labels/options live in feature utilities.

## User Flows
Open Schedule → Availability/Leaves tab → edit or request leave → validation → mutation → success/error feedback → refreshed visible state.

## Architecture Notes
Critical/destructive interactions use the shared `useConfirm()` infrastructure where applicable; no native browser dialogs are used.

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, Trainer feedback/confirmation primitives.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchSchedule` | GET | `ScheduleUrlConfig.BACKEND_API.SCHEDULE` | none | schedule + availability + leave data |
| `updateAvailability` | PATCH | `ScheduleUrlConfig.BACKEND_API.AVAILABILITY` | `WeeklyAvailability[]` + idempotency key | mutation envelope/message |
| `requestLeave` | POST | `ScheduleUrlConfig.BACKEND_API.LEAVES` | `CreateLeaveDto` + idempotency key | `LeaveRequest` + message |

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
| `TrainerWeeklyAvailability` | Weekly availability editor/view. |
| `TrainerLeaveRequests` | Leave request list and actions. |
| `TrainerRequestLeaveModal` | RHF/Zod leave request form. |

## Rule Compliance Checklist
- [x] TanStack Query server-state ownership
- [x] Zustand UI-only state
- [x] RHF + Zod leave form
- [x] Stable idempotency keys for non-duplicable mutations
- [x] Module-owned fixtures/handlers
- [x] No native browser dialogs
- [x] Semantic theme classes
- [ ] Parent-app runtime/tooling verification — NOT VERIFIED
