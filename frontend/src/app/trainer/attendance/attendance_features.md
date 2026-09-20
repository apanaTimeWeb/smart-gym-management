# Trainer Attendance — Feature Map

## Module Purpose
The Attendance module gives trainers one place to review their own attendance and the attendance records they are allowed to see for members. The trainer can switch between member records and personal attendance, search/date-filter the dataset, record member attendance, and use self check-in/out. Attendance reads and mutations stay in TanStack Query and the feature-owned API/mock boundary. The module does not expose manager/superadmin attendance administration or unrelated staff records.

## Directory Structure
- `page.tsx` — framework Server Component route entry.
- `loading.tsx` — attendance-shaped route skeleton.
- `error.tsx` / `not-found.tsx` — route fallbacks.
- `attendance_components/` — one primary React component per feature responsibility.
- `attendance_queries/` — TanStack Query access, URL filter orchestration, and mutations.
- `attendance_store/` — UI-only view-mode state.
- `attendance_api/` — API transport boundary and response parsing.
- `attendance_types/` — schemas, query/filter contracts, and calendar types.
- `attendance_utils/` — static UI constants and formatting utilities.
- `attendance_mocks/fixtures/` / `attendance_mocks/` — feature-owned demo server state and MSW handlers.
- `attendance_url_config.ts` — complete Attendance page/API route contract.
- `attendance_tests/` — API, route-state, and calendar behavior tests.

## Feature Inventory
| Feature | Route | Behavior |
|---|---|---|
| KPI cards | `/trainer/attendance` | Loads attendance statistics. |
| Members tab | `/trainer/attendance` | Search/filter/paginated member attendance list. |
| My Attendance tab | `/trainer/attendance` | Trainer-scoped calendar/list view with staff ID passed to query. |
| Record Attendance | `/trainer/attendance` | RHF + Zod modal creates a member attendance record. |
| Self Check In | `/trainer/attendance` | Creates a staff open attendance record in the module mock state. |
| Self Check Out | `/trainer/attendance` | Closes the trainer's current open attendance record. |
| Search/date/page | `/trainer/attendance` | URL/query state changes the server/mock result set. |

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, `@/lib/formatters`, and approved zero-business Trainer UI/feedback infrastructure used directly by this module.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## Data and State Architecture
- Server/API state: TanStack Query via `TrainerUseAttendanceQuery.ts` and mutation hooks.
- URL state: attendance tab/filter/search/page where exposed by the feature filter hook.
- Zustand: only UI view mode; no attendance API response ownership.
- React Context: not used for Attendance server state.
- Demo state: feature-owned MSW `attendanceDB`; mutations visibly update subsequent list/query reads.

## User Flows & Interactions
1. Open Attendance → route skeleton → KPI + member list.
2. Switch to My Attendance → trainer-scoped records → calendar/list toggle.
3. Search/filter/paginate → URL/query key changes → mock/API result set changes.
4. Record member attendance → validate → POST → feedback → list refresh.
5. Self Check In → mutation → open STAFF record visible on subsequent My Attendance read.
6. Self Check Out → mutation → existing STAFF record gains checkout time.

## Permissions
- `TRAINER`: view own attendance, view member check-ins, record member check-in, self check-in/out.
- Other staff attendance is not exposed by the feature UI.

## Loading / Empty / Error
- Route skeleton: `loading.tsx`.
- Empty: `TrainerAttendanceEmptyState`.
- Mutation loading: buttons/modal submit states.
- Route error: `error.tsx` with Retry.
- Query/section errors are rendered without raw backend details.

## Architecture Notes
- Feature-specific URL contract is `attendance_url_config.ts`.
- Feature business data stays inside this module.
- Global Trainer infrastructure is limited to approved shell/feedback/UI primitives.
- Root project tooling is outside this archive, so final runtime lint/typecheck/build/E2E execution remains `NOT VERIFIED` until the application root is available.

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, `@/lib/formatters`, `@/lib/useDateRangeSuffix` where imported.
- Role infrastructure: `@/app/trainer/trainer_components/TrainerShared/*`, `TrainerFeedback/*`, and `trainer_url_config.ts` only for approved shell navigation.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchAttendanceRecords` | GET | `AttendanceUrlConfig.BACKEND_API.BASE` | date/search/type/staff/page params | attendance records + pagination meta |
| `fetchAttendanceStats` | GET | `AttendanceUrlConfig.BACKEND_API.STATS` | none | `AttendanceStats` |
| `fetchAttendanceMembersBasic` | GET | `AttendanceUrlConfig.BACKEND_API.MEMBERS_BASIC` | none | `AttendanceMemberBasic[]` |
| `createAttendanceRecord` | POST | `AttendanceUrlConfig.BACKEND_API.BASE` | `CreateAttendanceDto` | created `AttendanceRecord` + backend message |
| `selfCheckInAttendance` | POST | `AttendanceUrlConfig.BACKEND_API.BASE` | trainer/staff identity | backend message |
| `checkoutAttendance` | POST | `AttendanceUrlConfig.BACKEND_API.CHECKOUT(id)` | checkout timestamp | backend message |

## UI Data Requirements
| UI Element | Required fields | Source |
|---|---|---|
| Attendance KPIs | `totalCheckIns`, `memberCheckIns`, `staffCheckIns` | stats response |
| Attendance table | `id`, member/staff identity, date, checkIn, checkOut, type/status | attendance list response |
| Member selector | member `id`, `name` | members-basic response |
| My Attendance calendar | `date`, attendance status/check-in/out values | trainer-scoped attendance response |
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
- **Trainer scope must not drift:** self attendance queries must keep the trainer/staff identity in the request path.
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
| `TrainerMyAttendanceCalendar` | Trainer-scoped calendar/list interaction. |

## Rule Compliance Checklist
- [x] Feature-owned URL config
- [x] Feature-owned fixtures/handlers
- [x] TanStack Query owns server state
- [x] RHF + Zod form boundary
- [x] No cross-feature business imports
- [x] Semantic theme classes only
- [x] Module loading/error/not-found routes present
- [ ] Parent-app typecheck/lint/test/build/browser verification — NOT VERIFIED outside supplied archive
