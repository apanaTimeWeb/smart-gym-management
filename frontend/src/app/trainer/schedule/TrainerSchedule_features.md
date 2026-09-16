# Trainer Schedule & Leave — Feature Map

## Module Purpose
This module lets Trainers maintain their recurring weekly availability and submit leave requests. Trainers can edit their own availability, review their submitted leave history, and create new pending leave requests. They cannot approve or reject leave for themselves or other Trainers. The feature owns its API contracts, fixtures, handlers and form validation.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `schedule_components/` | Availability, leave list and leave modal UI | `TrainerScheduleMain.tsx`, `TrainerWeeklyAvailability.tsx`, `TrainerLeaveRequests.tsx`, `TrainerRequestLeaveModal.tsx` |
| `schedule_api/` | Schedule and leave API boundary | `TrainerScheduleApi.ts` |
| `schedule_store/` | Active tab/modal UI state | `useTrainerScheduleStore.ts` |
| `schedule_context/` | Feature coordination hook/context | `TrainerScheduleContext.tsx`, `useTrainerScheduleLogic.ts` |
| `schedule_types/` | Availability, leave and response schemas/types | `TrainerScheduleTypes.ts` |
| `schedule_fixtures/` | Module-owned schedule/leave mock data | `TrainerScheduleMockData.ts` |
| `schedule_mocks/handlers/` | Module-owned MSW handlers | `TrainerScheduleMockHandlers.ts` |

## Feature Inventory
| Feature | Route | API | Status |
|---|---|---|---|
| Weekly availability | `/trainer/schedule` | `GET/PUT /trainer/schedule...` | Live via MSW |
| Leave history | `/trainer/schedule` | `GET /trainer/schedule` | Live via MSW |
| Request leave | `/trainer/schedule` | `POST /trainer/schedule/leaves` | Live via MSW |

## Data and State Architecture
TanStack Query owns availability/leave server responses. Zustand stores only active tab and modal UI state. Complex leave editing uses RHF/Zod and `useTrainerUnsavedChangesGuard` for dirty-state protection.

## API Contract
| Operation | Method | Endpoint | Payload | Response |
|---|---|---|---|---|
| Fetch schedule | GET | `/trainer/schedule` | — | availability + leaves |
| Save availability | PUT | `/trainer/schedule/availability` | `WeeklyAvailability[]` | backend message |
| Request leave | POST | `/trainer/schedule/leaves` | `CreateLeaveDto` | `LeaveRequest` |

## UI Data Requirements
| UI element | Field | Source |
|---|---|---|
| Availability row | `day`, `isAvailable`, `startTime`, `endTime` | schedule response |
| Leave row | `startDate`, `endDate`, `reason`, `leaveType`, `status`, `totalDays` | schedule response |
| Leave confirmation | backend `message` | mutation response |

## Edge Cases
- **Self-approval is forbidden:** A Trainer can create a PENDING request but cannot approve/reject it.
- **Dirty availability/leave forms:** Leaving a modified form uses the Trainer dirty-state guard.
- **Invalid date range:** Schema/API validation must reject an end date earlier than the start date.
- **Nullable manager fields:** Optional approval/rejection fields render with `displayValue()`.
- **Dropdown ownership:** Leave-type options are static UI constants; entity/member data must remain API-driven.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `TrainerScheduleMain.tsx` | Feature layout and tab orchestration. |
| `TrainerWeeklyAvailability.tsx` | Availability grid/edit controls. |
| `TrainerLeaveRequests.tsx` | Read-only leave history table. |
| `TrainerRequestLeaveModal.tsx` | Validated leave request form. |

## Rule Compliance
- [x] Server state via Query
- [x] Module-owned fixtures/handlers
- [x] RHF/Zod form handling
- [x] Dirty-state guard
- [x] Loading/error/not-found route files
