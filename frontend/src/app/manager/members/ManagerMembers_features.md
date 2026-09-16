# Manager Members — Feature Map

## Module Purpose
The Manager Members module manages the full lifecycle of members including registration, profile viewing, membership renewal, payment logging, diet/workout assignment, and soft deletion. It uses URL-backed state for searching and filtering, and relies on TanStack Query as the **exclusive** server-state source of truth. All API calls go through MSW during development and testing.

## Exact Routes
- `/manager/members`: Main list view, filterable and paginated. Profile, registration, and renewal are handled via modals on this route.

## Actual Feature Behavior
- **Member List**: Paginated, filterable table. Syncs search, status, gender, plan, sort, and page filters with the URL.
- **Registration**: Multi-tab modal form (`ManagerMembersModal`) for new members. Protected by `useUnsavedChangesGuard`.
- **Profile View**: Drawer component (`ManagerMemberProfile`) displaying overview, attendance, payments, workout, and diet plans.
- **Renewal**: Form modal (`ManagerRenewModal`) handling plan extensions.
- **Payments**: Form modal (`ManagerPaymentModal`) for logging individual payments.
- **Status Mutations**: Actions to freeze, suspend, and assign trainers/diets/workouts, fully backed by TanStack Query mutations.

## Actual Component Files
- `page.tsx`: Server Component — auth guard and layout shell.
- `loading.tsx`: Uses `Loader2` for global loading, but specific components have internal loading states.
- `error.tsx`: Section-level error boundary.
- `members_components/ManagerMembersMain.tsx`: Orchestration component integrating URL states and context.
- `members_components/ManagerMembersTable/ManagerMembersTable.tsx`: Dumb presentation table with row selection and sortable headers.
- `members_components/ManagerMembersToolbar.tsx`: Search and filter controls.
- `members_components/ManagerMembersModal/*`: Add/Edit member forms, split by responsibility.
- `members_components/ManagerRenewModal/ManagerRenewModal.tsx`: Membership renewal form.
- `members_components/MemberProfile/ManagerMemberProfile.tsx`: Profile drawer.

## Actual Query Keys
- `['manager', 'members', params]`: Fetching the paginated member list.
- `['manager', 'members', 'stats']`: Fetching KPI statistics.
- `['manager', 'members', 'plans-snapshot']`: Fetching available plans for the member form.
- `['manager', 'members', 'trainers']`: Fetching available trainers.
- `['manager', 'members', 'payments', memberId]`: Fetching member payment history.
- `['manager', 'members', 'attendance', memberId]`: Fetching member attendance records.

## Actual State Model
- **Server State**: Managed exclusively by TanStack Query (`ManagerUseManagerMembersQueries.ts` and `ManagerUseManagerMembersMutations.ts`).
- **Context State**: `ManagerMembersContext` manages strictly UI transient states (e.g., active modals, selected member, profile tab).
- **URL State**: `ManagerUseManagerMembersLogic.ts` syncs filters and pagination to the URL.

## MSW Mock Layer
- **Handler file**: `src/mocks/members_mocks/handlers/ManagerMembersMockHandlers.ts`
- All member CRUD, payments, attendance, diet, and workout assignment endpoints are intercepted by MSW during dev/test.
- `membersApi` calls `apiFetch` → MSW intercepts → typed response returned.
- **No fixture files are directly imported by `membersApi`**. Mock data lives only in `members_fixtures/ManagerMembersMockData.ts` and is consumed exclusively by MSW handlers.

## Snapshot Types (Feature-Local DTOs)
Cross-feature field shapes are defined in `members_types/ManagerMembersSnapshotTypes.ts`:
- `PlanSnapshot`: Minimal plan fields (id, name, prices)
- `PaymentSnapshot`: id, amount, paidAt, method, status, invoiceNumber
- `DietPlanSnapshot`: Typed with strongly-typed `meals[]` array
- `WorkoutSnapshot`: Typed with strongly-typed `days[]` array containing `exercises[]`
- `AttendanceSnapshot`: id, date, checkIn, type

## Actual API Files
- `members_api/ManagerMembersApi.ts`: HTTP client functions using `apiFetch` with Zod validation for all endpoints.
- `members_api/ManagerUseManagerMembersQueries.ts`: TanStack Query fetchers with explicit generic return types.
- `members_context/ManagerUseManagerMembersCoreMutations.ts` & `ManagerUseManagerMembersStatusMutations.ts`: Core mutation handlers.

## Actual Loading State
- The route uses `loading.tsx` for initial fetch.
- `ManagerMembersTable` displays a `Loader2` spinner when `isLoading` is true.
- Sub-components display localized spinners when `useIsMutating()` is active.

## Actual Empty State
- Handled via `ManagerEmptyState` when the member list is empty, with a CTA to add a new member.

## Actual Error State
- Features `error.tsx` for unhandled exceptions.
- Form submissions use `react-hot-toast` (via context wrapper) to display validation and API errors.
- All toast messages come from `res.message` (API-provided), never hardcoded strings.

## Actual Security Rules
- Requires Manager role authentication.
- Masked sensitive data: Phone numbers and emails are masked in the main list, visible only inside the explicit profile view.

## Actual Multi-Step Flows
- **Add Member**: Tabbed wizard (Personal → Membership → Payment) inside `ManagerMembersModal`. Protected by `useUnsavedChangesGuard`.

## Feature-Specific AI Warnings
1. **Never use `any`**: All mutation returns and query extractions must be strictly typed. Use snapshot types from `ManagerMembersSnapshotTypes.ts`.
2. **Never use mock data files in API layer**: `ManagerMembersMockData.ts` is only for MSW handlers. Never import it from `ManagerMembersApi.ts`.
3. **Never break `useUnsavedChangesGuard`**: Complex forms must alert users before unloading.
4. **Never bypass `useConfirm`**: Destructive actions (delete, suspend) must invoke the `confirm()` dialogue.
5. **Never manipulate theme values**: Stick strictly to tokens in `ManagerMembers_theme_contract.md`.
6. **Never handle filters locally**: URL `searchParams` is the absolute source of truth for the member list.
7. **Never generate IDs on frontend**: Invoice numbers, payment IDs, etc., are backend-owned. Consume from `res.data`.
