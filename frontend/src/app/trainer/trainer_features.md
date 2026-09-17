# Trainer — Feature Map

## Module Purpose
The Trainer module is the authenticated Trainer role surface of Smart Gym 360. It lets trainers manage their own assigned-member coaching workflow, attendance actions, workout and diet assignments, progress tracking, scheduling, sessions, earnings visibility, notifications, and profile settings. The module deliberately isolates feature-specific business code so an AI repair can normally be performed from one feature root without importing another feature's business implementation. Trainers do not receive manager/admin business capabilities such as branch management, permissions, finance administration, or other trainers' private records.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `attendance/` | Member/staff attendance views, mutations, filters, MSW, tests and docs | `attendance_components/*`, `attendance_api/TrainerAttendance_api.ts`, `attendance_queries/*`, `attendance_mocks/handlers/*`, `attendance_fixtures/*` |
| `dashboard/` | Trainer landing dashboard and read-only coaching metrics | `dashboard_components/*`, `dashboard_api/TrainerDashboard_api.ts`, `dashboard_queries/useTrainerDashboardQuery.ts` |
| `earnings/` | Trainer earnings/payout views | `earnings_components/*`, `earnings_api/TrainerEarnings_api.ts`, `earnings_queries/*` |
| `library/` | Trainer diet-plan browsing and assignment | `library_components/*`, `library_api/TrainerLibrary_api.ts`, `library_queries/*` |
| `members/` | Assigned member list/profile plus member-local attendance/diet/workout/progress supporting data | `members_components/*`, `members_api/TrainerMembersApi.ts`, `members_queries/*`, `members_types/*` |
| `notifications/` | Trainer notification list and read-state mutations | `notifications_components/*`, `notifications_api/TrainerNotificationsApi.ts`, `notifications_context/*` |
| `profile/` | Trainer profile and password forms | `profile_components/*`, `profile_api/TrainerProfileApi.ts`, `profile_context/useTrainerProfileLogic.ts` |
| `progress-tracking/` | Member progress entries, charts and comparison UI | `progress_components/*`, `progress_api/TrainerProgressApi.ts`, `progress_queries/*` |
| `schedule/` | Weekly availability and leave requests | `schedule_components/*`, `schedule_api/TrainerScheduleApi.ts`, `schedule_queries/*` |
| `sessions/` | PT/group session list and scheduling/attendance mutations | `sessions_components/*`, `sessions_api/TrainerSessionsApi.ts`, `sessions_queries/*` |
| `workout/` | Workout plans and exercise library CRUD | `workout_components/*`, `workout_api/TrainerWorkout_api.ts`, `workout_queries/*` |
| `trainer_components/` | Trainer shell and generic Trainer feedback/shared UI only | `TrainerLayout/*`, `TrainerFeedback/*`, `TrainerShared/*` |
| `trainer_utils/` | Trainer-wide infrastructure utilities | `TrainerNavigationGuardStore.ts`, `TrainerUseDebounce.ts`, `TrainerUseWarnIfUnsavedChanges.ts`, `TrainerSharedConstants.ts` |
| `trainer_types/` | Trainer-wide infrastructure types | `TrainerRoleGuardTypes.ts` |
| `trainer_e2e/` | Critical Playwright flows | `TrainerCriticalFlows.spec.ts` |

## Feature Inventory
| Feature | Route | Main API Calls | State Owner | Status |
|---|---|---|---|---|
| Dashboard | `/trainer/dashboard` | `GET /trainer/dashboard/stats` | TanStack Query + dashboard UI store | Live; MSW present |
| Attendance | `/trainer/attendance` | `GET /trainer/attendance`, `/stats`, `/members-basic`, `POST /trainer/attendance`, `PATCH /trainer/attendance/checkout/:staffId` | URL params + Attendance Zustand | Live; MSW present |
| Earnings | `/trainer/earnings` | `GET /trainer/earnings` | TanStack Query + Earnings store | Live |
| Diet Library | `/trainer/library` | `GET /trainer/library/diet-plans`, `PATCH /trainer/members/:id/diet` | TanStack Query + local UI | Live |
| Members | `/trainer/members` | `GET /trainer/members`, `/stats`, `GET /trainer/members/:id`, member supporting-data endpoints, `PATCH /trainer/members/:id` | TanStack Query + Members Zustand | Live |
| Notifications | `/trainer/notifications` | `GET /trainer/notifications`, notification read mutations | TanStack Query | Live |
| Profile | `/trainer/profile` | `GET/PATCH /trainer/profile`, `PATCH /trainer/profile/password` | TanStack Query + RHF local form state | Live |
| Progress Tracking | `/trainer/progress-tracking` | member/entry/summary GET plus create/update/delete entry endpoints | TanStack Query + Progress Zustand | Live |
| Schedule | `/trainer/schedule` | schedule/availability/leaves GET/PATCH/POST | TanStack Query + Schedule Zustand | Live |
| Sessions | `/trainer/sessions` | sessions/member options GET, session POST/PATCH/DELETE, attendance POST | TanStack Query + local modal state | Live; MSW present |
| Workout | `/trainer/workout` | workout/exercise GET, POST, PATCH, DELETE | TanStack Query + Workout Zustand | Live; MSW present |

## User Flows & Interactions
### Flow 1: Record Member Attendance
1. Trainer opens `/trainer/attendance`.
2. URL-backed tab/search/date state feeds the Attendance Query hook.
3. Trainer opens the record modal from the Members tab.
4. RHF + Zod validates the payload.
5. `createAttendanceRecord()` sends the request through the Attendance API boundary.
6. Success uses the backend `message`, invalidates Attendance queries, and closes the modal.
7. Failure preserves entered form state and surfaces the API message or safe fallback.

### Flow 2: Update Member Coaching Assignment
1. Trainer selects a member from `/trainer/members`.
2. The Members feature loads member detail plus member-local supporting data through `TrainerMembersApi`.
3. Trainer selects a diet/workout plan using the Trainer-owned searchable dropdown.
4. Mutation runs through the Members API and Query layer.
5. On success, authoritative response data reconciles the Query cache.
6. No Library/Workout/Progress business module is imported into Members.

### Flow 3: Schedule a Session
1. Trainer opens `/trainer/sessions` and selects a date.
2. TanStack Query requests the server-backed session list with the selected date.
3. Trainer opens the schedule modal and selects an API-backed member option.
4. RHF + Zod validates the session payload.
5. `createTrainerSession()` posts the payload.
6. The Query cache is invalidated/reconciled and the backend `message` is shown.

## Data and State Architecture
- **Server state:** TanStack Query only; API responses are never stored as the primary source in Context/Zustand.
- **URL state:** Searchable/filterable/paginated list features use URL parameters and pass those parameters explicitly to their query/API layer.
- **UI shared state:** Feature-local Zustand stores own modal selection, view modes, local filters, and other UI-only state.
- **Forms:** React Hook Form + Zod own form state/validation; dirty guards use `useTrainerUnsavedChangesGuard`.
- **Navigation guard:** `trainer_utils/TrainerNavigationGuardStore.ts` registers dirty feature sources; Trainer sidebar navigation confirms before leaving a dirty feature.
- **API envelope:** Trainer API clients validate the canonical `{ success, message, data, meta?, error?, statusCode? }` envelope with `TrainerApiResponseSchema` plus feature-specific schemas.

## Query Keys
| Feature | Query Keys |
|---|---|
| Attendance | `['trainer','attendance','records', params]`, `['trainer','attendance','stats']`, `['trainer','attendance','members']` |
| Dashboard | `['trainer','dashboard', timeRange, startDate, endDate]` |
| Earnings | `['trainer','earnings', startDate, endDate]` |
| Library | `['trainer','library','diet-plans', { search, goal, page }]` |
| Members | `['trainer','members','list', params]`, `['trainer','members','stats']`, detail/supporting-data keys under `trainer/members/*` |
| Notifications | `['trainer','notifications','list']` |
| Progress | `['trainer','progress','members']`, `entries/memberId`, `summary/memberId` |
| Schedule | `['trainer','schedule']` |
| Sessions | `['trainer','sessions','list', { date }]`, `['trainer','sessions','membersBasic']` |
| Workout | `['trainer','workout','plans', { search, category, page }]`, `['trainer','workout','exercises', { search, category, page }]` |

## API Contract
All module API call sites use the centralized Trainer URL configuration in `Trainer_url_config.ts` and the global `apiFetch` transport. Feature-specific response data is validated at the API boundary before Query/UI consumption.

| API Area | Methods |
|---|---|
| Attendance | `fetchAttendanceRecords`, `fetchAttendanceStats`, `fetchAttendanceMembersBasic`, `createAttendanceRecord`, `checkoutAttendance`, `selfCheckInAttendance` |
| Dashboard | `getStats` (existing exported API object method; endpoint is centralized and response validated) |
| Earnings | `getEarningsData` (existing exported API object method; endpoint is centralized and response validated) |
| Library | `getDietPlans`, `assignDietPlan` |
| Members | `fetchMembers`, `fetchMemberById`, `fetchMemberStats`, `updateMember`, `assignDiet`, `assignWorkout`, `fetchMemberAttendance`, `fetchDietPlans`, `fetchWorkoutPlans`, `fetchMemberProgressEntries` |
| Notifications | `fetchTrainerNotifications`, `markTrainerNotificationRead`, `markAllTrainerNotificationsRead` |
| Profile | `fetchProfile`, `updateProfile`, `updatePassword` |
| Progress | member/entry/summary fetches and create/update/delete entry operations |
| Schedule | schedule read, availability update, leave request |
| Sessions | session/member-option fetch, create/update/cancel, attendance mutation |
| Workout | workout/exercise list, create/update/delete |

## UI Data Requirements
Every feature-level `_features.md` remains the authoritative field map for its own UI. At Trainer root, the required contract is that rendered data must originate from the corresponding feature API/query layer, not component fallback business data. Critical requirements include member names/statuses/IDs, attendance dates/check-in/out/duration, plan metadata, session date/time/member/location, progress metrics, earnings amounts/statuses, notification message/read state, and profile form fields.

## Permissions and Security
- Required role for all routes: `TRAINER`.
- Trainer UI must hide or disable actions that are not part of the Trainer capability set.
- Members data is restricted to Trainer-owned/assigned scope by the feature contract.
- Sensitive values are masked in list views where applicable.
- Frontend permission checks are UX/security-defense-in-depth only; backend authorization remains authoritative.
- Destructive and critical financial actions use `useConfirm()`; highly irreversible actions must use type-to-confirm.
- Security-sensitive project-level CODEOWNERS/CI gates are **NOT VERIFIED** from this module-only archive.

## Loading, Empty, and Error States
- Every route has `loading.tsx`, `error.tsx`, and `not-found.tsx` where applicable.
- Major data sections use structural skeletons; short async button actions may use `Loader2`.
- Empty list/table states have dedicated entity-specific empty-state components.
- User-facing error UI uses safe text and Retry where retry is meaningful; technical stack traces/raw backend objects are not rendered.
- Section failures should not unnecessarily crash unrelated sections.

## Edge Cases and AI Warnings
- **No cross-feature business imports:** Members must not import Library/Workout/Progress business code; localized Member supporting-data contracts live inside Members.
- **No synthetic business data:** Components must never invent attendance, revenue, member, or plan records when API data is absent.
- **No duplicate SSR/client fetch:** A page and client Query hook must not independently fetch the same endpoint without an explicit hydration strategy.
- **No hardcoded routes:** All Trainer routes and feature API endpoints must come from `Trainer_url_config.ts`.
- **No raw API error rendering:** Route/section UI must not display raw `Error.message` values unless the error has explicitly been normalized as a safe backend user message by the API layer.
- **No optimistic financial/destructive updates:** Workout/member destructive and financial operations must reconcile against authoritative responses.
- **No undocumented mock data:** Feature mock fixtures/handlers belong inside their owning feature and must satisfy the consuming UI contract.
- **No `any`:** Unknown external/API values must be validated/narrowed with Zod.

## Component Responsibility Map
The root orchestrators and major shared UI files follow single-responsibility comments in their source. For detailed component ownership, use the individual feature maps under `attendance/`, `dashboard/`, `earnings/`, `library/`, `members/`, `notifications/`, `profile/`, `progress-tracking/`, `schedule/`, `sessions/`, and `workout/`.

## Rule Compliance Checklist
- [x] Feature-specific business dependencies are isolated within Trainer feature roots.
- [x] Member profile supporting data is owned by Members rather than imported from unrelated Trainer business modules.
- [x] Component-generated synthetic attendance data removed.
- [x] Central Trainer route/API URL configuration is used by production call sites.
- [x] API clients validate response envelopes with Zod.
- [x] Workout Query keys are module-namespaced.
- [x] Complex form flows use RHF + Zod where implemented.
- [x] Unsaved form state is guarded for browser and in-app navigation through Trainer navigation infrastructure.
- [x] Module-owned MSW fixtures/handlers remain inside their owning feature.
- [x] `any`, TS-ignore and TS-nocheck patterns removed from Trainer source.
- [x] Motion utilities are motion-safe guarded in Trainer TSX.
- [x] Trainer shell uses 240px/60px sidebar and 64px header alignment with documented breakpoints.
- [ ] Project-level ESLint/Tailwind/Husky/CI/security/CODEOWNERS gates — NOT VERIFIED because the supplied archive is module-only.
- [ ] Full browser/E2E execution — NOT VERIFIED in this environment because project dependencies/configuration are outside the supplied module archive.
