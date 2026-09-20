# Trainer Sessions — Feature Map

## Module Purpose
The Sessions module lets trainers browse their scheduled sessions, create or edit sessions, manage enrolled-member attendance, and perform the documented no-show/cancellation actions. Session data is server state owned by TanStack Query and mutable demo behavior is represented by module-owned MSW fixtures. Forms use RHF/Zod and destructive or irreversible actions use the confirmation contract. Trainer users do not receive unrelated scheduling administration features outside this module.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `sessions_components/` | Session cards, filters and schedule/attendance/edit modals | `sessions_components/TrainerSessionsMain/TrainerSessionsMain.tsx`, `TrainerSessionsEditModal.tsx`, `TrainerSessionsScheduleModal.tsx`, `TrainerSessionAttendanceModal.tsx` |
| `sessions_api/` | Session and member-option API boundary | `TrainerSessionsApi.ts` |
| `sessions_queries/` | Query/mutation hooks | `useTrainerSessionsQuery.ts`, `useTrainerSessionMutations.ts` |
| `sessions_types/` | Session and DTO schemas/types | `TrainerSessionsTypes.ts` |
| `sessions_utils/` | Static filter/duration constants | `TrainerSessionsSharedConstants.ts` |
| `sessions_mocks/fixtures/` | Module-owned session/member fixtures | `TrainerSessionsMockData.ts` |
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

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, `@/lib/formatters`, and approved zero-business Trainer UI/feedback infrastructure used directly by this module.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

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

## User Flows & Interactions
### Flow 1: Schedule a Session
1. Trainer opens `/trainer/sessions` and chooses the schedule action.
2. `TrainerSessionsScheduleModal` opens with module-owned member options loaded from the API.
3. RHF/Zod validates the session details.
4. Confirming the action creates one user-intent idempotency key and calls `createTrainerSession(dto)`.
5. Success reconciles/invalidate the sessions query and the new session becomes visible.
6. Failure preserves the entered form data and surfaces the backend message.

### Flow 2: Cancel a Session
1. Trainer selects a cancellable session.
2. The module opens its confirmation flow.
3. Confirming generates one idempotency key for the cancellation intent and calls `cancelTrainerSession(id)`.
4. On success, the session disappears/updates from the query-backed list and feedback is shown.
5. On error, the original session remains visible and retry uses the same mutation intent key.

## Edge Cases and AI Warnings
- **Cancellation is destructive:** Always use `useConfirm()` before executing a cancellation.
- **Member dropdown is API-driven:** Never reintroduce an inline member array in `TrainerSessionsApi.ts` or a component.
- **Form validation:** `CreateSessionDtoSchema` is the client contract; backend validation remains authoritative.
- **Date filtering:** The selected date is explicitly passed to `fetchTrainerSessions(date)` and the MSW handler filters the fixture dataset.
- **Mutation reconciliation:** Session create/update/cancel/attendance mutations must invalidate/update the session query cache using the backend response.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `sessions_components/TrainerSessionsMain/TrainerSessionsMain.tsx` | Session list layout and orchestration. |
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

## Current Implementation Alignment

- Module URL contract is owned by `sessions_url_config.ts`; role URL configuration only owns role navigation.
- Feature server data is owned by the module API/query layer; UI components do not call `apiFetch` directly.
- Feature-owned mock/fixture files are the browser-first demonstration boundary.
- Route loading and error states use module-owned files; route error UI does not expose raw digest/message details.
- Root project runner/tooling files are outside this archive, so lint/typecheck/build/E2E execution remains an environment verification step.

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, Trainer feedback/confirmation primitives, generic searchable dropdown.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## Permissions and Security
- Required capability: `trainer.view`.
- Trainer can create/edit/cancel/mark attendance only for the session flows exposed by this module.
- Cancellation is destructive and requires the documented confirmation flow.
- Create/update/cancel/attendance mutations use one idempotency key per user intent and reuse it for retries.

## Loading, Empty, and Error States
- Route loading uses `TrainerSessionsLoadingSkeleton`.
- Empty session lists show a meaningful no-session state.
- Scheduling/edit/attendance/cancel actions expose button-level loading and disable duplicate submission.
- Route errors use module Retry fallback.

## Rule Compliance Checklist
- [x] API-driven member options
- [x] Session date filtering reaches the mock/API request
- [x] RHF + Zod scheduling/edit forms
- [x] Mutable mock state for create/update/cancel/attendance
- [x] Idempotent non-duplicable mutations
- [x] Destructive cancellation confirmation
- [x] No sibling feature imports
- [ ] Parent runtime/Vitest/Playwright/build verification — NOT VERIFIED
