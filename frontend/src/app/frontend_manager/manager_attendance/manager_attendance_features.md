# Manager Attendance — Feature Map

## Module Purpose
Manager Attendance is the branch attendance workspace for recording and reviewing member and staff check-ins. Managers use it to inspect the current-day attendance list, filter the dataset, open attendance history, and record attendance events. The module owns attendance-specific queries, filters, fixtures, and handlers so it can be given to an AI without unrelated business modules. It does not own member billing, payroll, or other role-specific business workflows.

Module root: `frontend_manager/manager_attendance/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `date-fns`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | ManagerAttendanceApi |
| Read | Exposed | ManagerAttendanceApi: fetchAttendanceRecords, fetchAttendanceStats, fetchAttendanceHistory, fetchAttendanceMembers, fetchAttendanceStaff. |
| Update | Not exposed | No module API client uses PUT/PATCH in the supplied snapshot. |
| Delete | Not exposed | No module API client uses DELETE in the supplied snapshot. |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_attendance_api/` | Owns feature API clients and request/response transport contracts. | `ManagerAttendanceApi.ts` |
| `manager_attendance_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_attendance_components/manager_attendance_calendar/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerAttendanceCalendar.tsx` |
| `manager_attendance_components/manager_attendance_kpis/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerAttendanceKPIs.tsx` |
| `manager_attendance_components/manager_attendance_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerAttendanceMain.tsx` |
| `manager_attendance_components/manager_attendance_main/manager_attendance_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerAttendanceContent.tsx` |
| `manager_attendance_components/manager_attendance_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerAttendanceModal.tsx` |
| `manager_attendance_components/manager_attendance_qr_scanner/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerAttendanceQrScannerModal.tsx`, `useManagerAttendanceQrScannerLogic.test.ts`, `useManagerAttendanceQrScannerLogic.ts` |
| `manager_attendance_components/manager_attendance_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerAttendanceEmptyState.tsx`, `ManagerAttendanceTable.tsx` |
| `manager_attendance_components/manager_attendance_table/manager_attendance_check_in_method_badge/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerAttendanceCheckInMethodBadge.tsx` |
| `manager_attendance_components/manager_attendance_toolbar/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerAttendanceToolbar.tsx` |
| `manager_attendance_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerAttendanceConstants.ts`, `ManagerAttendanceQrScannerConstants.ts`, `ManagerAttendanceQueryKeys.ts`, `ManagerAttendanceSharedConstants.test.ts`, `ManagerAttendanceSharedConstants.ts` |
| `manager_attendance_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerAttendanceForm.test.ts`, `useManagerAttendanceForm.ts`, `useManagerAttendanceLogic.test.ts`, `useManagerAttendanceLogic.ts`, `useManagerAttendanceMutations.test.ts`, `useManagerAttendanceMutations.ts`, `useManagerAttendanceQueries.test.ts`, `useManagerAttendanceQueries.ts` |
| `manager_attendance_locales/` | Owns module English and Hindi translation catalogs. | `manager_attendance_en.json`, `manager_attendance_hi.json` |
| `manager_attendance_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_attendance_mocks/manager_attendance_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerAttendanceMockData.ts`, `ManagerAttendanceQrMockData.ts` |
| `manager_attendance_mocks/manager_attendance_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerAttendanceMockHandlers.ts` |
| `manager_attendance_schemas/` | Owns feature Zod validation and response schemas. | `ManagerAttendanceFormSchema.ts`, `ManagerAttendanceSchema.ts`, `ManagerAttendanceSnapshotSchema.ts` |
| `manager_attendance_store/` | Owns module-scoped Zustand UI state only. | `useManagerAttendanceUiStore.test.ts`, `useManagerAttendanceUiStore.ts` |
| `manager_attendance_tests/` | Owns module behavior and utility tests. | `ManagerAttendanceBehavior.test.tsx` |
| `manager_attendance_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerAttendanceFormTypes.ts`, `ManagerAttendanceQrScannerTypes.ts`, `ManagerAttendanceRequestTypes.ts`, `ManagerAttendanceSnapshotTypes.ts`, `ManagerAttendanceTypes.ts` |
| `manager_attendance_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerAttendanceFormatters.test.ts`, `ManagerAttendanceFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_attendance_features.md`
- `manager_attendance_forbidden.md`
- `manager_attendance_theme_contract.md`
- `manager_attendance_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_empty_state/ManagerEmptyState`
- `@/components/ui/manager_toast/ManagerToast`
- `@/components/ui/manager_toast/ManagerToastTypes`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/components/ui/manager_table_skeleton/ManagerTableSkeleton`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults`
- `@/app/frontend_manager/manager_infrastructure/ManagerToastService`
- `@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@hookform`
- `@tanstack`
- `@testing-library/react`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

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

## Component Tree

- Route: `manager_attendance/page.tsx`
  - `<ManagerAttendanceMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_attendance_store/useManagerAttendanceUiStore.ts`, `manager_attendance_store/useManagerAttendanceUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'attendance']`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_attendance/manager_attendance_mocks/manager_attendance_mocks_handlers/` and `manager_attendance/manager_attendance_mocks/manager_attendance_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

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
**Forbidden-pattern contract:** See `manager_attendance_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Attendance filtering must remain server-side; never restore client-side slicing for paginated data:** Attendance filtering must remain server-side; never restore client-side slicing for paginated data.
- **The record response uses `data:** The record response uses `data.attendances[]`; do not reintroduce a second undocumented `data.attendance[]` contract.
- **Member and staff identifiers are mutually exclusive by attendance type; send only the appropriate identifier:** Member and staff identifiers are mutually exclusive by attendance type; send only the appropriate identifier.
- **History requests require the user type and month together; do not omit either parameter:** History requests require the user type and month together; do not omit either parameter.
- **Nullable check-out, status, trainer, and duration fields must render through the canonical nullable fallback:** Nullable check-out, status, trainer, and duration fields must render through the canonical nullable fallback.
- **Attendance export/CSV logic must never invent a status such as Present when the API returned no status:** Attendance export/CSV logic must never invent a status such as Present when the API returned no status.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_attendance/manager_attendance_components/manager_attendance_calendar/ManagerAttendanceCalendar.tsx` | Renders a month-wise calendar view of attendance for a specific user. |
| `manager_attendance/manager_attendance_components/manager_attendance_modal/ManagerAttendanceModal.tsx` | Renders the modal for marking new attendance records for members or staff. |
| `manager_attendance/manager_attendance_components/manager_attendance_table/ManagerAttendanceTable.tsx` | Renders the attendance data table and pagination controls. |
| `manager_attendance/manager_attendance_components/manager_attendance_toolbar/ManagerAttendanceToolbar.tsx` | Provides the search, filter tabs, and action buttons for the Attendance module. |
| `manager_attendance/manager_attendance_components/manager_attendance_kpis/ManagerAttendanceKPIs.tsx` | Renders the top KPI stat cards (total check-ins, member check-ins, staff check-ins) for the Attendance module. |
| `manager_attendance/manager_attendance_components/manager_attendance_main/ManagerAttendanceMain.tsx` | Framework entry component for the Attendance module; delegates feature UI and state orchestration to `ManagerAttendanceContent`. |
| `manager_attendance/manager_attendance_hooks/useManagerAttendanceLogic.ts` | Provides UI orchestration state to the attendance module hierarchy. Async data is managed in useManagerAttendanceLogic. |
| `manager_attendance_components/AttendanceTable/manager_attendance_check_in_method_badge/ManagerAttendanceCheckInMethodBadge.tsx` | Renders the Attendance Check In Method Badge presentation primitive for the owning feature using semantic tokens. |
| `manager_attendance_components/manager_attendance_main/manager_attendance_content/ManagerAttendanceContent.tsx` | Composes the Attendance Content content sections while keeping data/state orchestration outside the view layer. |
| `manager_attendance_components/ManagerQrScanner/ManagerAttendanceQrScannerModal.tsx` | Renders the Attendance Qr Scanner Modal interaction surface and delegates validation and mutation state to module-owned form/logic hooks. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_ATTENDANCE`
- Active locales: `en`, `hi`
- English catalog: `manager_attendance/manager_attendance_locales/manager_attendance_en.json`
- Hindi catalog: `manager_attendance/manager_attendance_locales/manager_attendance_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerAttendanceMain.tsx`
- Primary query-key registry: `ManagerAttendanceQueryKeys.ts`
- Primary module constants registry: `ManagerAttendanceConstants.ts`
- Canonical schema file: `ManagerAttendanceSchema.ts` in `manager_attendance_schemas/`
- Module theme contract: `manager_attendance_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_attendance_components/manager_attendance_main/ManagerAttendanceMain.tsx` | YES |
| API client | `ManagerAttendanceApi.ts` | YES |
| Schema file | `ManagerAttendanceSchema.ts` | YES |
| Query-key registry | `ManagerAttendanceQueryKeys.ts` | YES |
| Constants registry | `ManagerAttendanceConstants.ts` | YES |
| URL config | `manager_attendance_url_config.ts` | YES |
| Behavior test | `ManagerAttendanceBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_attendance_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_attendance/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_attendance/manager_attendance_mocks/manager_attendance_mocks_fixtures/` and `manager_attendance/manager_attendance_mocks/manager_attendance_mocks_handlers/`.
- External application infrastructure is limited to documented zero-business/global providers and the host transport/runtime boundary.

### Verification boundary

- Source-level structural checks can be performed from the supplied artifact.
- Production build, real TypeScript project type-check, browser click-through, Tailwind/global CSS verification, dependency/SCA/secret scans, and CI/CODEOWNERS enforcement require the host repository configuration and therefore remain NOT VERIFIED when absent from the supplied ZIP.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

## Routes
- Canonical route file: `page.tsx` in this feature module.
- Route-specific loading/error/not-found files, where present, remain physically owned by this module.

## API Contract Summary
- Canonical module API files live under the module-owned `_api` folder.
- API paths are defined by the module-owned `*_url_config.ts`; mutation methods require the documented idempotency-key contract.

## State Map
- Server state → TanStack Query.
- Shared UI/client state → module-scoped Zustand.
- Component-private state → local React state.
- Shareable list filters/search/pagination → URL state where applicable.

## External Dependencies
- Only approved global application infrastructure/UI primitives and documented third-party packages may cross the feature boundary.
- No sibling feature business implementation is an external dependency.

## Known Forbidden Patterns
- See the module-owned `*_forbidden.md` for the complete forbidden-pattern contract.
- Business logic must remain inside this feature module; global UI remains zero-business.

## Testing and Verification
- Module tests live under the module-owned test folders and alongside custom hooks/utilities as required.
- MSW fixtures/handlers are module-owned.
- Playwright E2E lives under the role-isolated `playwright_e2e/frontend_manager_e2e/<module>/` tree.
