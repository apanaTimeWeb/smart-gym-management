# Manager Members — Feature Map

## Module Purpose
Manager Members is the central branch member lifecycle workspace. Managers can search, filter, sort and paginate members, inspect a member profile, create/update/delete members, renew memberships, record payments, assign trainers/diet/workouts, and send member communications. The module owns its member API contract, snapshots, fixtures and handlers. It does not import business logic from other role roots.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `members_api/` | Feature-owned responsibility for the members module. | `ManagerMembersApi.ts; ManagerMembersServerApi.ts; ManagerUseManagerMembersDietPlansQuery.ts; ManagerUseManagerMembersQueries.ts; ManagerUseManagerMembersWorkoutPlansQuery.ts` |
| `members_components/` | Feature-owned responsibility for the members module. | `ManagerAddPaymentModal.tsx` |
| `members_hooks/` | Feature-owned responsibility for the members module. | `ManagerUseManagerMembersLogic.ts; ManagerUseManagerMembersCoreMutations.ts; ManagerUseManagerMembersLogic.test.ts; ManagerUseManagerMembersLogic.ts; ManagerUseManagerMembersMutations.test.ts; ManagerUseManagerMembersMutations.ts; ManagerUseManagerMembersPrintLogic.ts; ManagerUseManagerMembersStatusMutations.ts` |
| `members_fixtures/` | Feature-owned responsibility for the members module. | `ManagerMembersMockData.ts` |
| `members_mocks/` | Feature-owned responsibility for the members module. | `—` |
| `members_store/` | Feature-owned responsibility for the members module. | `ManagerUseManagerMembersStore.ts` |
| `members_types/` | Feature-owned responsibility for the members module. | `ManagerMembers.schema.ts; ManagerMembersSchema.ts; ManagerMembersSnapshotTypes.ts; ManagerMembersTypes.ts` |
| `members_utils/` | Feature-owned responsibility for the members module. | `ManagerMembersExportUtils.ts; ManagerMembersSharedConstants.test.ts; ManagerMembersSharedConstants.ts` |

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
| addMemberPayment | `/manager/members` | Uses the addMemberPayment workflow with typed request/response handling. | `POST /manager/members/:memberId/payments` | ✅ Implemented |
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

## Data and State Architecture
TanStack Query owns members server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. module-local state/query layer is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

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
| `addMemberPayment` | `POST` | `/api/v1/manager/members/:memberId/payments` | `Record<string, unknown>` | `PaymentSnapshot` |
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
- **The member list uses the response shape `data:** The member list uses the response shape `data.members[]`; KPI data comes from the separate stats endpoint.
- **Search must use the 300ms debounced value and the same limit constant as pagination:** Search must use the 300ms debounced value and the same limit constant as pagination.
- **Sortable headers must send `sort` and `dir` to the server; do not sort the current page on the client:** Sortable headers must send `sort` and `dir` to the server; do not sort the current page on the client.
- **Sensitive phone/email values need the module’s masking/display rules for list views:** Sensitive phone/email values need the module’s masking/display rules for list views.
- **Delete/suspend/freeze/payment actions are critical and require the appropriate confirmation/financial safeguards:** Delete/suspend/freeze/payment actions are critical and require the appropriate confirmation/financial safeguards.
- **Exports must not silently export only the currently visible page unless the product explicitly defines a page-only export:** Exports must not silently export only the currently visible page unless the product explicitly defines a page-only export.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `members/members_components/ManagerAddPaymentModal.tsx` | Renders a modal to record a new payment for a member. |
| `members/members_components/ManagerMembersMain/ManagerMembersMain.tsx` | Framework entry component for the Members module; delegates feature UI and state orchestration to `ManagerMembersContent`. |
| `members/members_components/ManagerMembersModal/ManagerMemberProfilePictureUpload.tsx` | Renders the profile picture upload placeholder in the Add Member form. |
| `members/members_components/ManagerMembersModal/ManagerMembersModal.tsx` | Renders a modal for creating or editing a member. |
| `members/members_components/ManagerMembersTable/ManagerMembersTable.tsx` | Renders the primary tabular list of members with actions, filtering state, and pagination. |
| `members/members_components/ManagerRenewModal/ManagerRenewModal.tsx` | Renders the Manager RenewModal presentation layer for the Manager module. |
| `members/members_components/MemberProfile/ManagerMemberProfile.tsx` | Renders a detailed view of a selected member's profile. |
| `members/members_components/MemberProfile/ManagerProfileAttendance.tsx` | Contains logic, types, or component definition for this module. |
| `members/members_components/MemberProfile/ManagerProfileDiet.tsx` | Renders the member's assigned diet plan and handles the assignment flow. |
| `members/members_components/MemberProfile/ManagerProfileOverview.tsx` | Contains logic, types, or component definition for this module. |
| `members/members_components/MemberProfile/ManagerProfilePayments.tsx` | Renders the payment history and transaction records for a specific member profile. |
| `members/members_components/MemberProfile/ManagerProfileWorkout.tsx` | Renders the member's assigned workout plan and handles the assignment flow. |
| `members/members_components/MembersKPIs/ManagerMembersKPIs.tsx` | Renders the four KPI stat cards (Total, Active, Pending, Expired) for the Members module. |
| `members/members_components/MembersToolbar/ManagerMembersToolbar.tsx` | Renders the toolbar for searching, filtering, and initiating the "Add Member" action. |
| `members/members_hooks/ManagerUseManagerMembersLogic.ts` | Provides the Context wrapper for the Members module. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
