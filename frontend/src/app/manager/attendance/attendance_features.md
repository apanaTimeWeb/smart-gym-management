# Manager Attendance — Feature Map

## Module Purpose
Manager Attendance is the branch attendance workspace for recording and reviewing member and staff check-ins. Managers use it to inspect the current-day attendance list, filter the dataset, open attendance history, and record attendance events. The module owns attendance-specific queries, filters, fixtures, and handlers so it can be given to an AI without unrelated business modules. It does not own member billing, payroll, or other role-specific business workflows.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `attendance_api/` | Feature-owned responsibility for the attendance module. | `ManagerAttendanceApi.ts; ManagerUseManagerAttendanceQueries.ts` |
| `attendance_components/` | Feature-owned responsibility for the attendance module. | `—` |
| `attendance_hooks/` | Feature-owned responsibility for the attendance module. | `ManagerUseManagerAttendanceLogic.ts; ManagerUseManagerAttendanceLogic.ts; ManagerUseManagerAttendanceMutations.ts` |
| `attendance_fixtures/` | Feature-owned responsibility for the attendance module. | `ManagerAttendanceMockData.ts` |
| `attendance_mocks/` | Feature-owned responsibility for the attendance module. | `—` |
| `attendance_types/` | Feature-owned responsibility for the attendance module. | `ManagerAttendanceSchema.ts; ManagerAttendanceSnapshotTypes.ts; ManagerAttendanceTypes.ts` |
| `attendance_utils/` | Feature-owned responsibility for the attendance module. | `ManagerAttendanceSharedConstants.ts` |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| markAttendance | `/manager/attendance` | Uses the markAttendance workflow with typed request/response handling. | `POST /manager/attendance` | ✅ Implemented |
| fetchAttendanceRecords | `/manager/attendance` | Uses the fetchAttendanceRecords workflow with typed request/response handling. | `GET /manager/attendance` | ✅ Implemented |
| fetchAttendanceStats | `/manager/attendance` | Uses the fetchAttendanceStats workflow with typed request/response handling. | `GET /manager/attendance/stats` | ✅ Implemented |
| fetchAttendanceHistory | `/manager/attendance` | Uses the fetchAttendanceHistory workflow with typed request/response handling. | `GET /manager/attendance/history` | ✅ Implemented |
| fetchAttendanceMembers | `/manager/attendance` | Uses the fetchAttendanceMembers workflow with typed request/response handling. | `GET /manager/attendance/members` | ✅ Implemented |
| fetchAttendanceStaff | `/manager/attendance` | Uses the fetchAttendanceStaff workflow with typed request/response handling. | `GET /manager/attendance/staff` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Record attendance
1. Manager opens Attendance and selects a member or staff entry in the attendance modal.
2. The form validates the date, type, member/staff identifier, and optional check-in details.
3. markAttendance() sends the mutation through the Attendance API client.
4. The MSW handler returns the authoritative Attendance response in development/test; TanStack Query reconciles the affected list/stats queries.
### Flow 2: Filter and browse records
1. The manager changes search, date, status, or page controls.
2. The attendance logic builds the complete server query from URL/UI state.
3. fetchAttendanceRecords(params) sends those parameters to the API client.
4. The MSW handler filters and paginates module-owned fixtures and returns the filtered total.
5. The table renders the returned page without client-side dataset slicing.

## Data and State Architecture
TanStack Query owns attendance server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. module-local state/query layer is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `markAttendance` | `POST` | `/api/v1/manager/attendance` | `{ memberId?: string; staffId?: string; date: string; checkIn?: string; type: string }` | `Attendance` |
| `fetchAttendanceRecords` | `GET` | `/api/v1/manager/attendance` | `{ page?, limit?, search?, date?, status?, type? }` | `AttendanceResponse` |
| `fetchAttendanceStats` | `GET` | `/api/v1/manager/attendance/stats` | `—` | `AttendanceStatsResponse` |
| `fetchAttendanceHistory` | `GET` | `/api/v1/manager/attendance/history` | `{ userId: string; type: MEMBER | STAFF; month: string }` | `Attendance[]` |
| `fetchAttendanceMembers` | `GET` | `/api/v1/manager/attendance/members` | `{ search?/status? }` | `{ members: MemberSnapshot[] }` |
| `fetchAttendanceStaff` | `GET` | `/api/v1/manager/attendance/staff` | `{ search?/status? }` | `{ staff: StaffSnapshot[] }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total check-ins | `totalCheckIns` | `/api/v1/manager/attendance/stats` | `data.totalCheckIns` | No | Yes |
| KPI: Member check-ins | `memberCheckIns` | `/api/v1/manager/attendance/stats` | `data.memberCheckIns` | No | Yes |
| KPI: Staff check-ins | `staffCheckIns` | `/api/v1/manager/attendance/stats` | `data.staffCheckIns` | No | Yes |
| Table: Record ID | `id` | `/api/v1/manager/attendance` | `data.attendances[].id` | No | Yes |
| Table: Member name | `member.name` | `/api/v1/manager/attendance` | `data.attendances[].member.name` | Yes | Yes |
| Table: Staff name | `staff.name` | `/api/v1/manager/attendance` | `data.attendances[].staff.name` | Yes | Yes |
| Table: Date | `date` | `/api/v1/manager/attendance` | `data.attendances[].date` | No | Yes |
| Table: Status | `status` | `/api/v1/manager/attendance` | `data.attendances[].status` | Yes | Yes |
| Table: Check-in | `checkIn` | `/api/v1/manager/attendance` | `data.attendances[].checkIn` | Yes | Yes |
| Table: Check-out | `checkOut/checkOutTime` | `/api/v1/manager/attendance` | `data.attendances[].checkOut | data.attendances[].checkOutTime` | Yes | Yes |
| Table: Type | `type` | `/api/v1/manager/attendance` | `data.attendances[].type` | No | Yes |
| Table: Duration | `durationMinutes` | `/api/v1/manager/attendance` | `data.attendances[].durationMinutes` | Yes | Yes |

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
- **Attendance filtering must remain server-side; never restore client-side slicing for paginated data:** Attendance filtering must remain server-side; never restore client-side slicing for paginated data.
- **The record response uses `data:** The record response uses `data.attendances[]`; do not reintroduce a second undocumented `data.attendance[]` contract.
- **Member and staff identifiers are mutually exclusive by attendance type; send only the appropriate identifier:** Member and staff identifiers are mutually exclusive by attendance type; send only the appropriate identifier.
- **History requests require the user type and month together; do not omit either parameter:** History requests require the user type and month together; do not omit either parameter.
- **Nullable check-out, status, trainer, and duration fields must render through the canonical nullable fallback:** Nullable check-out, status, trainer, and duration fields must render through the canonical nullable fallback.
- **Attendance export/CSV logic must never invent a status such as Present when the API returned no status:** Attendance export/CSV logic must never invent a status such as Present when the API returned no status.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `attendance/attendance_components/AttendanceCalendar/ManagerAttendanceCalendar.tsx` | Renders a month-wise calendar view of attendance for a specific user. |
| `attendance/attendance_components/AttendanceModal/ManagerAttendanceModal.tsx` | Renders the modal for marking new attendance records for members or staff. |
| `attendance/attendance_components/AttendanceTable/ManagerAttendanceTable.tsx` | Renders the attendance data table and pagination controls. |
| `attendance/attendance_components/AttendanceToolbar/ManagerAttendanceToolbar.tsx` | Provides the search, filter tabs, and action buttons for the Attendance module. |
| `attendance/attendance_components/ManagerAttendanceKPIs/ManagerAttendanceKPIs.tsx` | Renders the top KPI stat cards (total check-ins, member check-ins, staff check-ins) for the Attendance module. |
| `attendance/attendance_components/ManagerAttendanceMain/ManagerAttendanceMain.tsx` | Framework entry component for the Attendance module; delegates feature UI and state orchestration to `ManagerAttendanceContent`. |
| `attendance/attendance_hooks/ManagerUseManagerAttendanceLogic.ts` | Provides UI orchestration state to the attendance module hierarchy. Async data is managed in useManagerAttendanceLogic. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
