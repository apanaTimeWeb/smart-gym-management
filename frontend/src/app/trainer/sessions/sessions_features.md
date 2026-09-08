# Trainer Sessions — Feature Map

## Module Purpose
The Sessions module is the trainer's daily schedule hub. Trainers use it to view all their PT (Personal Training) and Group class sessions for a selected date, schedule new PT sessions with specific members, mark attendance, and cancel upcoming sessions. Trainers can only see and manage their own sessions — they have zero visibility into other trainers' schedules.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `sessions_components/TrainerSessionsMain/` | Root client orchestrator. Renders filter toolbar, date picker, session cards, and schedule modal | `TrainerSessionsMain.tsx` |
| `sessions_api/` | All API calls for session CRUD and attendance marking | `TrainerSessionsApi.ts` |
| `sessions_types/` | TypeScript types re-exported from constants | `TrainerSessionsTypes.ts` |
| `sessions_utils/` | Centralized constants: filter options, status/type styles, mock data, member list, duration options | `TrainerSessionsSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Session List | `/trainer/sessions` | View all PT and Group sessions for a selected date, filtered by type | `TrainerSessionsMain` | `GET /api/v1/trainer/sessions?date=` | 🔧 Mock data |
| Schedule PT | `/trainer/sessions` (modal) | Schedule a new PT session — select member via SearchableDropdown, pick date/time/duration | `TrainerSessionsMain` (modal) | `POST /api/v1/trainer/sessions` | 🔧 Mock |
| Cancel Session | `/trainer/sessions` (inline) | Cancel an upcoming session with double-confirm dialog | `TrainerSessionsMain` | `PATCH /api/v1/trainer/sessions/:id/cancel` | 🔧 Mock |
| Mark Attendance | `/trainer/sessions` (inline) | Mark attendance for an upcoming session | `TrainerSessionsMain` | `PATCH /api/v1/trainer/sessions/:id/attendance` | 🔧 Stub |

## Data and State Architecture
- **State pattern:** Local `useState` only — no Zustand, no Context. Simple enough for local state.
- **Mock data:** `MOCK_SESSIONS` and `MOCK_MEMBERS_FOR_SCHEDULE` in `TrainerSessionsSharedConstants.ts` — replace with API calls when backend is ready.
- **SearchableDropdown:** Used for member selection and duration — no native `<select>` (Rule 20).

## API Contract

| Function | Method | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchTrainerSessions(date)` | GET | `/api/v1/trainer/sessions?date=` | `date: string` | `TrainerSession[]` |
| `createTrainerSession(dto)` | POST | `/api/v1/trainer/sessions` | `CreateSessionDto` | `TrainerSession` |
| `updateTrainerSession(id, dto)` | PATCH | `/api/v1/trainer/sessions/:id` | `Partial<CreateSessionDto>` | `TrainerSession` |
| `cancelTrainerSession(id)` | PATCH | `/api/v1/trainer/sessions/:id/cancel` | — | `void` |
| `markTrainerSessionAttendance(id)` | PATCH | `/api/v1/trainer/sessions/:id/attendance` | — | `void` |

## Edge Cases and AI Warnings
- **Never use `alert()` or `window.confirm()` for session cancellation:** Always use `useConfirm()` from `TrainerConfirmProvider`. The confirm dialog is already wired in `handleCancelSession`.
- **Never use native `<select>` for member or duration dropdowns:** Use `SearchableDropdown` from `trainer_components/TrainerShared/`. Rule 20 violation.
- **Mock data lives in `TrainerSessionsSharedConstants.ts` only:** Never inline mock arrays in the component. When backend is ready, replace the constants import with an API call in a new `useTrainerSessionsLogic.ts` hook.
- **`TrainerHeader` must NOT be imported here:** The layout (`trainer/layout.tsx`) renders the header. Importing it in `TrainerSessionsMain` causes a duplicate header (Rule 8).
- **Session status badge colors are in `SESSION_STATUS_STYLES`:** Never add inline color classes for status. Add new statuses to the constants map.

## Rule Compliance Checklist
- [x] Rule 8: page.tsx = Server Component, TrainerSessionsMain = Client Component, no TrainerHeader import
- [x] Rule 20: SearchableDropdown used for member and duration — no native `<select>`
- [x] Rule 3B: All constants/mock data centralized in `TrainerSessionsSharedConstants.ts`
- [x] Rule 71: Session cancellation uses `useConfirm()` — no `alert()`
- [x] Rule 9: `loading.tsx` and `error.tsx` present
- [x] Rule 11: `TrainerSessionsUrlConfig.ts` present
- [x] Rule 29: `motion-safe:` prefix on all animations
- [x] Design §12: Modal uses `z-40`
