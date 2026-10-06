# Manager Members — Feature Map

## Module Purpose
Manager Members is the central branch member lifecycle workspace. Managers can search, filter, sort and paginate members, inspect a member profile, create/update/delete members, renew memberships, record payments, assign trainers/diet/workouts, and send member communications. The module owns its member API contract, snapshots, fixtures and handlers. It does not import business logic from other role roots.

Module root: `frontend_manager/manager_members/`

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
- `react-dom`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | ManagerMembersApi |
| Read | Exposed | ManagerMembersApi: fetchMembers, fetchMemberById, fetchMemberStats, fetchMemberTrainers, fetchMemberPlans, fetchMemberPayments, fetchMemberAttendance, fetchMemberDietPlans, fetchMemberWorkouts. |
| Update | Exposed | ManagerMembersApi |
| Delete | Exposed | ManagerMembersApi |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_members_api/` | Owns feature API clients and request/response transport contracts. | `ManagerMembersApi.ts` |
| `manager_members_components/` | Owns the feature UI component tree and feature-specific presentation. | Named child component folders |
| `manager_members_components/manager_members_kpis/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersKPIs.tsx` |
| `manager_members_components/manager_members_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersMain.tsx` |
| `manager_members_components/manager_members_main/manager_members_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersContent.tsx` |
| `manager_members_components/manager_members_member_profile/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersMemberProfile.tsx`, `ManagerMembersProfileAttendance.tsx`, `ManagerMembersProfileDiet.tsx`, `ManagerMembersProfileOverview.tsx`, `ManagerMembersProfilePayments.tsx`, `ManagerMembersProfileWorkout.tsx` |
| `manager_members_components/manager_members_message_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersMessageModal.tsx` |
| `manager_members_components/manager_members_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersMemberProfilePictureUpload.tsx`, `ManagerMembersModal.tsx`, `useManagerMembersModalForm.test.ts`, `useManagerMembersModalForm.ts` |
| `manager_members_components/manager_members_renew_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersRenewModal.tsx` |
| `manager_members_components/manager_members_sort_icon/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersSortIcon.tsx` |
| `manager_members_components/manager_members_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersEmptyState.tsx`, `ManagerMembersTable.tsx` |
| `manager_members_components/manager_members_thermal_receipt/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersThermalReceipt.module.css`, `ManagerMembersThermalReceipt.tsx` |
| `manager_members_components/manager_members_toolbar/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersToolbar.tsx` |
| `manager_members_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerMembersConstants.ts`, `ManagerMembersKpiConstants.ts`, `ManagerMembersQueryKeys.ts`, `ManagerMembersSharedConstants.test.ts`, `ManagerMembersSharedConstants.ts`, `ManagerMembersUiConstants.test.ts`, `ManagerMembersUiConstants.ts`, `ManagerMembersValidationConstants.ts` |
| `manager_members_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerMembersCoreMutations.test.ts`, `useManagerMembersCoreMutations.ts`, `useManagerMembersDietPlansQuery.test.ts`, `useManagerMembersDietPlansQuery.ts`, `useManagerMembersLogic.test.ts`, `useManagerMembersLogic.ts`, `useManagerMembersMutations.test.ts`, `useManagerMembersMutations.ts` (+12 more) |
| `manager_members_locales/` | Owns module English and Hindi translation catalogs. | `manager_members_en.json`, `manager_members_hi.json` |
| `manager_members_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_members_mocks/manager_members_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersMockData.ts` |
| `manager_members_mocks/manager_members_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerMembersMockHandlers.ts`, `ManagerMembersMockMutationHandlers.ts`, `ManagerMembersMockReadHandlers.ts`, `ManagerMembersMockState.ts` |
| `manager_members_schemas/` | Owns feature Zod validation and response schemas. | `ManagerMembersEntitySchema.ts`, `ManagerMembersFormSchema.ts`, `ManagerMembersRenewFormSchema.ts`, `ManagerMembersSchema.ts` |
| `manager_members_store/` | Owns module-scoped Zustand UI state only. | `useManagerMembersStore.test.ts`, `useManagerMembersStore.ts`, `useManagerMembersUiStore.test.ts`, `useManagerMembersUiStore.ts` |
| `manager_members_tests/` | Owns module behavior and utility tests. | `ManagerMembersBehavior.test.tsx` |
| `manager_members_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerMembersDerivedTypes.ts`, `ManagerMembersMessageTypes.ts`, `ManagerMembersRenewFormTypes.ts`, `ManagerMembersSnapshotTypes.ts`, `ManagerMembersSortIconTypes.ts`, `ManagerMembersThermalReceiptTypes.ts`, `ManagerMembersTypes.ts` |
| `manager_members_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerMembersDateFormatters.test.ts`, `ManagerMembersDateFormatters.ts`, `ManagerMembersExportUtils.test.ts`, `ManagerMembersExportUtils.ts`, `ManagerMembersFormatters.test.ts`, `ManagerMembersFormatters.ts` |


### State Store Exception
The module intentionally uses two module-scoped Zustand stores because they are independent repair boundaries: `useManagerMembersStore` owns attendance-map/selection state, while `useManagerMembersUiStore` owns modal, profile-tab, message, toast, and receipt UI state. Neither store owns API response data or network loading state.

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_members_features.md`
- `manager_members_forbidden.md`
- `manager_members_theme_contract.md`
- `manager_members_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
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
- `@/app/frontend_manager/manager_infrastructure/ManagerGymIdentity`
- `@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerMoney`
- `@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults`
- `@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`
- `@/lib/whatsapp_formatter`

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
- `react-dom`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchMembers | `/manager/members` | Uses the fetchMembers workflow with typed request/response handling. | `GET /manager/members` | ✅ Implemented |
| fetchMemberById | `/manager/members` | Uses the fetchMemberById workflow with typed request/response handling. | `GET /manager/members/:id` | ✅ Implemented |
| fetchMemberStats | `/manager/members` | Uses the fetchMemberStats workflow with typed request/response handling. | `GET /manager/members/stats` | ✅ Implemented |
| createMember | `/manager/members` | Uses the createMember workflow with typed request/response handling. | `POST /manager/members` | ✅ Implemented |
| updateMember | `/manager/members` | Uses the updateMember workflow with typed request/response handling. | `PATCH /manager/members/:id` | ✅ Implemented |
| deleteMember | `/manager/members` | Uses the deleteMember workflow with typed request/response handling. | `DELETE /manager/members/:id` | ✅ Implemented |
| renewMember | `/manager/members` | Uses the renewMember workflow with typed request/response handling. | `POST /manager/members/:id/renew` | ✅ Implemented |
| exportMembersReport | `/manager/members` | Uses the exportMembersReport workflow with typed request/response handling. | `GET /manager/members/export` | ✅ Implemented |
| fetchMemberTrainers | `/manager/members` | Uses the fetchMemberTrainers workflow with typed request/response handling. | `GET /manager/members/trainers` | ✅ Implemented |
| fetchMemberPlans | `/manager/members` | Uses the fetchMemberPlans workflow with typed request/response handling. | `GET /manager/members/plans` | ✅ Implemented |
| fetchMemberPayments | `/manager/members` | Uses the fetchMemberPayments workflow with typed request/response handling. | `GET /manager/members/:memberId/payments` | ✅ Implemented |
| createMemberPayment | `/manager/members` | Uses the createMemberPayment workflow with typed request/response handling. | `POST /manager/members/:memberId/payments` | ✅ Implemented |
| fetchMemberAttendance | `/manager/members` | Uses the fetchMemberAttendance workflow with typed request/response handling. | `GET /manager/members/:memberId/attendance` | ✅ Implemented |
| fetchMemberDietPlans | `/manager/members` | Uses the fetchMemberDietPlans workflow with typed request/response handling. | `GET /manager/members/diet-plans` | ✅ Implemented |
| assignDietPlan | `/manager/members` | Uses the assignDietPlan workflow with typed request/response handling. | `POST /manager/members/:memberId/diet-plans` | ✅ Implemented |
| fetchMemberWorkouts | `/manager/members` | Uses the fetchMemberWorkouts workflow with typed request/response handling. | `GET /manager/members/workouts` | ✅ Implemented |
| assignWorkout | `/manager/members` | Uses the assignWorkout workflow with typed request/response handling. | `POST /manager/members/:memberId/workouts` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Browse members
1. Search, status, gender, plan, expiry and sort state are represented in URL/UI state.
2. The debounced search and all filters become the server query parameters.
3. MSW applies those parameters to the member fixture and returns page/total.
4. The table renders the response and KPI filters can narrow the view through the same server-backed state.
### Flow 2: Create and manage member
1. Manager opens the RHF + Zod member form.
2. The validated payload is submitted through createMember/updateMember.
3. On success the authoritative Member response updates the member query cache and backend message is displayed.
4. Renewal/payment/assignment actions use their dedicated API operations and confirmation rules.

## Component Tree

- Route: `manager_members/page.tsx`
  - `<ManagerMembersMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_members_store/useManagerMembersStore.ts`, `manager_members_store/useManagerMembersUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'members', params]`; `['manager', 'members', 'plans-snapshot']`; `['manager', 'members', 'stats']`; `['manager', 'members', 'trainers']`; `['manager', 'members', 'payments', memberId]`; `['manager', 'members', 'attendance', memberId]`; `['manager', 'members', 'detail', memberId]`; `['manager', 'members']`; `['manager', 'members', 'payments']`; `['manager', 'members', 'workout-plans']`; `['manager', 'members', 'diet-plans']`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_members/manager_members_mocks/manager_members_mocks_handlers/` and `manager_members/manager_members_mocks/manager_members_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchMembers` | `GET` | `/api/v1/manager/members` | `{ page?, limit?, search?, status?, gender?, plan?, expiryFrom?, expiryTo?, sort?, dir? }` | `{ members: Member[]; total: number; page: number; limit: number }` |
| `fetchMemberById` | `GET` | `/api/v1/manager/members/:id` | `{ id: string }` | `Member` |
| `fetchMemberStats` | `GET` | `/api/v1/manager/members/stats` | `—` | `MemberStats` |
| `createMember` | `POST` | `/api/v1/manager/members` | `Partial<Member>` | `Member` |
| `updateMember` | `PATCH` | `/api/v1/manager/members/:id` | `{ id: string; body: Partial<Member> }` | `Member` |
| `deleteMember` | `DELETE` | `/api/v1/manager/members/:id` | `{ id: string }` | `{ id: string }` |
| `renewMember` | `POST` | `/api/v1/manager/members/:id/renew` | `Record<string, unknown>` | `Member` |
| `exportMembersReport` | `GET` | `/api/v1/manager/members/export` | `{ page?, limit?, filters..., format? }` | `{ members: Member[]; total: number }` |
| `fetchMemberTrainers` | `GET` | `/api/v1/manager/members/trainers` | `—` | `{ staff: { id; name; role }[] }` |
| `fetchMemberPlans` | `GET` | `/api/v1/manager/members/plans` | `—` | `PlanSnapshot[]` |
| `fetchMemberPayments` | `GET` | `/api/v1/manager/members/:memberId/payments` | `{ memberId: string }` | `PaymentSnapshot[]` |
| `createMemberPayment` | `POST` | `/api/v1/manager/members/:memberId/payments` | `Record<string, unknown>` | `PaymentSnapshot` |
| `fetchMemberAttendance` | `GET` | `/api/v1/manager/members/:memberId/attendance` | `{ memberId: string }` | `AttendanceSnapshot[]` |
| `fetchMemberDietPlans` | `GET` | `/api/v1/manager/members/diet-plans` | `—` | `DietPlanSnapshot[]` |
| `assignDietPlan` | `POST` | `/api/v1/manager/members/:memberId/diet-plans` | `{ memberId; dietPlanId }` | `{ success: boolean }` |
| `fetchMemberWorkouts` | `GET` | `/api/v1/manager/members/workouts` | `—` | `WorkoutSnapshot[]` |
| `assignWorkout` | `POST` | `/api/v1/manager/members/:memberId/workouts` | `{ memberId; workoutId }` | `{ success: boolean }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total members | `total` | `/api/v1/manager/members/stats` | `data.total` | No | Yes |
| KPI: Active members | `active` | `/api/v1/manager/members/stats` | `data.active` | No | Yes |
| KPI: Expired members | `expired` | `/api/v1/manager/members/stats` | `data.expired` | No | Yes |
| Table: Member name | `name` | `/api/v1/manager/members` | `data.members[].name` | No | Yes |
| Table: Email | `email` | `/api/v1/manager/members` | `data.members[].email` | No | Yes |
| Table: Phone | `phone` | `/api/v1/manager/members` | `data.members[].phone` | No | Yes |
| Table: Gender | `gender` | `/api/v1/manager/members` | `data.members[].gender` | No | Yes |
| Table: Join date | `joinDate` | `/api/v1/manager/members` | `data.members[].joinDate` | No | Yes |
| Table: Expiry date | `expiryDate` | `/api/v1/manager/members` | `data.members[].expiryDate` | No | Yes |
| Table: Plan name | `plan.name` | `/api/v1/manager/members` | `data.members[].plan.name` | Yes | Yes |
| Table: Paid amount | `paidAmount` | `/api/v1/manager/members` | `data.members[].paidAmount` | No | Yes |
| Table: Pending amount | `pendingAmount` | `/api/v1/manager/members` | `data.members[].pendingAmount` | No | Yes |
| Table: Status | `status` | `/api/v1/manager/members` | `data.members[].status` | No | Yes |
| Profile: Recent payment amount | `recentPayments[].amount` | `/api/v1/manager/members/:id` | `data.recentPayments[].amount` | Yes | Yes |
| Profile: Assigned diet | `dietPlan.name` | `/api/v1/manager/members/:id` | `data.dietPlan.name` | Yes | Yes |
| Profile: Assigned workout | `workoutPlan.name` | `/api/v1/manager/members/:id` | `data.workoutPlan.name` | Yes | Yes |

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
**Forbidden-pattern contract:** See `manager_members_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Member list response shape:** `data.members[]`; KPI data comes from the separate stats endpoint.
- **Search behavior:** use the 300ms debounced value and the same limit constant as pagination.
- **Sorting behavior:** sortable headers send `sort` and `dir` to the server; do not sort only the current page on the client.
- **Sensitive data:** phone/email values follow the module masking/display rules in list views.
- **Critical actions:** delete, suspend, freeze, and payment actions require the appropriate confirmation/financial safeguards.
- **Exports:** do not silently export only the visible page unless the product explicitly defines page-only export.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_members/manager_members_components/ManagerMembersAddPaymentModal.tsx` | Renders a modal to record a new payment for a member. |
| `manager_members/manager_members_components/manager_members_main/ManagerMembersMain.tsx` | Framework entry component for the Members module; delegates feature UI and state orchestration to `ManagerMembersContent`. |
| `manager_members/manager_members_components/manager_members_modal/ManagerMembersMemberProfilePictureUpload.tsx` | Renders the profile picture upload placeholder in the Add Member form. |
| `manager_members/manager_members_components/manager_members_modal/ManagerMembersModal.tsx` | Renders a modal for creating or editing a member. |
| `manager_members/manager_members_components/manager_members_table/ManagerMembersTable.tsx` | Renders the primary tabular list of members with actions, filtering state, and pagination. |
| `manager_members/manager_members_components/manager_members_renew_modal/ManagerMembersRenewModal.tsx` | Renders the Renew Modal section and keeps presentation concerns separate from API/mutation ownership. |
| `manager_members/manager_members_components/manager_members_member_profile/ManagerMembersMemberProfile.tsx` | Renders a detailed view of a selected member's profile. |
| `manager_members/manager_members_components/manager_members_member_profile/ManagerMembersProfileAttendance.tsx` | Renders the member attendance history for the profile and formats attendance dates safely. |
| `manager_members/manager_members_components/manager_members_member_profile/ManagerMembersProfileDiet.tsx` | Renders the member's assigned diet plan and handles the assignment flow. |
| `manager_members/manager_members_components/manager_members_member_profile/ManagerMembersProfileOverview.tsx` | Renders the member profile overview, contact fields, plan summary, and status details. |
| `manager_members/manager_members_components/manager_members_member_profile/ManagerMembersProfilePayments.tsx` | Renders the payment history and transaction records for a specific member profile. |
| `manager_members/manager_members_components/manager_members_member_profile/ManagerMembersProfileWorkout.tsx` | Renders the member's assigned workout plan and handles the assignment flow. |
| `manager_members/manager_members_components/manager_members_kpis/ManagerMembersKPIs.tsx` | Renders the four KPI stat cards (Total, Active, Pending, Expired) for the Members module. |
| `manager_members/manager_members_components/manager_members_toolbar/ManagerMembersToolbar.tsx` | Renders the toolbar for searching, filtering, and initiating the "Add Member" action. |
| `manager_members_hooks/useManagerMembersLogic.ts` | Owns Members URL/query/filter/sort state and composes module-owned server/client logic; it is not a React Context provider. |
| `manager_members_components/manager_members_main/manager_members_content/ManagerMembersContent.tsx` | Composes the Members Content content sections while keeping data/state orchestration outside the view layer. |
| `manager_members_components/manager_members_message_modal/ManagerMembersMessageModal.tsx` | Renders the Members Message Modal interaction surface and delegates validation and mutation state to module-owned form/logic hooks. |
| `manager_members_components/manager_members_sort_icon/ManagerMembersSortIcon.tsx` | Renders the Members Sort Icon presentation primitive for the owning feature using semantic tokens. |
| `manager_members_components/manager_members_thermal_receipt/ManagerMembersThermalReceipt.tsx` | Renders the printable Members Thermal Receipt output using module-owned data and print-safe structure. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_MEMBERS`
- Active locales: `en`, `hi`
- English catalog: `manager_members/manager_members_locales/manager_members_en.json`
- Hindi catalog: `manager_members/manager_members_locales/manager_members_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerMembersMain.tsx`
- Primary query-key registry: `ManagerMembersQueryKeys.ts`
- Primary module constants registry: `ManagerMembersConstants.ts`
- Canonical schema file: `ManagerMembersSchema.ts` in `manager_members_schemas/`
- Module theme contract: `manager_members_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_members_components/manager_members_main/ManagerMembersMain.tsx` | YES |
| API client | `ManagerMembersApi.ts` | YES |
| Schema file | `ManagerMembersSchema.ts` | YES |
| Query-key registry | `ManagerMembersQueryKeys.ts` | YES |
| Constants registry | `ManagerMembersConstants.ts` | YES |
| URL config | `manager_members_url_config.ts` | YES |
| Behavior test | `ManagerMembersBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_members_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_members/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_members/manager_members_mocks/manager_members_mocks_fixtures/` and `manager_members/manager_members_mocks/manager_members_mocks_handlers/`.
- External application infrastructure is limited to documented zero-business/global providers and the host transport/runtime boundary.

### Verification boundary

- Source-level structural checks can be performed from the supplied artifact.
- Production build, real TypeScript project type-check, browser click-through, Tailwind/global CSS verification, dependency/SCA/secret scans, and CI/CODEOWNERS enforcement require the host repository configuration and therefore remain NOT VERIFIED when absent from the supplied ZIP.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

### Idempotency Intent Policy

Form-driven mutations keep the same idempotency key for the same user intent until the mutation succeeds or the intent is abandoned. Pure one-click member actions that do not expose a retry control generate a fresh key per invocation; a repeated invocation is treated as a new user intent.

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
