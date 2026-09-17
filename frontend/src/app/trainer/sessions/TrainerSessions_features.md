# Trainer Sessions — Feature Map

## Module Purpose
The Sessions module is the Trainer's daily session workspace. Trainers can view their own PT and Group sessions, schedule new sessions, mark attendance and cancel upcoming sessions. Member choices for scheduling are loaded through a session-owned API endpoint and fixture rather than hardcoded in the API client. The module does not expose other trainers' calendars or Manager scheduling controls.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `sessions_components/` | Session cards, filters and schedule/attendance/edit modals | `TrainerSessionsMain.tsx`, `TrainerSessionsEditModal.tsx`, `TrainerSessionsScheduleModal.tsx`, `TrainerSessionAttendanceModal.tsx` |
| `sessions_api/` | Session and member-option API boundary | `TrainerSessionsApi.ts` |
| `sessions_queries/` | Query/mutation hooks | `useTrainerSessionsQuery.ts`, `useTrainerSessionMutations.ts` |
| `sessions_types/` | Session and DTO schemas/types | `TrainerSessionsTypes.ts` |
| `sessions_utils/` | Static filter/duration constants | `TrainerSessionsSharedConstants.ts` |
| `sessions_fixtures/` | Module-owned session/member fixtures | `TrainerSessionsMockData.ts` |
| `sessions_mocks/handlers/` | Module-owned MSW handlers | `TrainerSessionsMockHandlers.ts` |

## Feature Inventory
| Feature | Route | API | Status |
|---|---|---|---|
| Session list | `/trainer/sessions` | `GET /trainer/sessions?date=` | Live via MSW |
| Session member options | `/trainer/sessions` | `GET /trainer/sessions/members` | Live via MSW |
| Schedule session | `/trainer/sessions` | `POST /trainer/sessions` | Live via MSW |
| Edit session | `/trainer/sessions` | `PATCH /trainer/sessions/:id` | Live via MSW |
| Cancel session | `/trainer/sessions` | `DELETE /trainer/sessions/:id` | Live via MSW |
| Mark attendance | `/trainer/sessions` | `POST /trainer/sessions/:id/attendance` | Live via MSW |

## Data and State Architecture
TanStack Query owns sessions and member-option responses. Local component state is limited to private modal/input UI. The scheduling form uses RHF/Zod and the dirty-state guard. Member options are API data and are never stored as component constants.

## API Contract
| Function | Method | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchTrainerSessions(date)` | GET | `/trainer/sessions?date=` | date query | `TrainerSession[]` |
| `fetchTrainerSessionMembers()` | GET | `/trainer/sessions/members` | — | `{ id, name }[]` |
| `createTrainerSession(dto)` | POST | `/trainer/sessions` | `CreateSessionDto` | `TrainerSession` |
| `updateTrainerSession(id, dto)` | PATCH | `/trainer/sessions/:id` | partial DTO | `TrainerSession` |
| `cancelTrainerSession(id)` | DELETE | `/trainer/sessions/:id` | path id | `null` |
| `markTrainerSessionAttendance(id, memberIds)` | POST | `/trainer/sessions/:id/attendance` | member IDs | `null` |

## UI Data Requirements
| UI element | Field | Endpoint |
|---|---|---|
| Session card title | `title` | sessions |
| Session card type/status | `type`, `status` | sessions |
| Session date/time | `sessionDate`, `time`, `duration` | sessions |
| Attendee count | `attendees`, `maxAttendees` | sessions |
| Member picker | `id`, `name` | sessions/members |
| Location | `location`, `room`, `isOnline` | sessions |

## Edge Cases and AI Warnings
- **Cancellation is destructive:** Always use `useConfirm()` before executing a cancellation.
- **Member dropdown is API-driven:** Never reintroduce an inline member array in `TrainerSessionsApi.ts` or a component.
- **Form validation:** `CreateSessionDtoSchema` is the client contract; backend validation remains authoritative.
- **Date filtering:** The selected date is explicitly passed to `fetchTrainerSessions(date)` and the MSW handler filters the fixture dataset.
- **Mutation reconciliation:** Session create/update/cancel/attendance mutations must invalidate/update the session query cache using the backend response.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `TrainerSessionsMain.tsx` | Session list layout and orchestration. |
| `TrainerSessionsScheduleModal.tsx` | Validated scheduling form. |
| `TrainerSessionsEditModal.tsx` | Session editing form. |
| `TrainerSessionAttendanceModal.tsx` | Attendance selection/submission. |
| `TrainerSessionsKPIs.tsx` | Read-only session KPIs. |

## Rule Compliance Checklist
- [x] No hardcoded member business data
- [x] Module-owned MSW fixtures/handlers
- [x] RHF/Zod form contracts
- [x] Double-confirm cancellation
- [x] TanStack Query server state

- **Feedback:** Mutation success/error feedback uses `useTrainerFeedback()` with stable deduplication IDs and the role-level `TrainerToastHost`.
