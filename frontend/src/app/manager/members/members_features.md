# Manager Members — Feature Map

## Module Purpose
The Manager Members module manages the full lifecycle of members including registration, profile viewing, membership renewal, payment logging, and soft deletion. It utilizes a URL-backed state for searching and filtering, and relies heavily on TanStack Query for server state management.

## Exact Routes
- `/manager/members`: Main list view, filterable and paginated. Profile, registration, and renewal are handled via modals on this route.

## Actual Feature Behavior
- **Member List**: Paginated, filterable table. Syncs search, status, gender, and plan filters with the URL.
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
- `['manager', 'members', { search, status, gender, plan, sort, dir, page }]`: Fetching the member list.
- `['manager', 'members', 'stats']`: Fetching KPI statistics.
- `['manager', 'trainers']`: Fetching trainers.
- `['manager', 'payments', memberId]`: Fetching member payments.
- `['manager', 'attendance', memberId]`: Fetching member attendance.

## Actual State Model
- **Server State**: Managed by TanStack Query (`useManagerMembersQueries.ts` and `useManagerMembersMutations.ts`).
- **Context State**: `ManagerMembersContext` manages strictly UI transient states (e.g., active modals, selected member, profile tab).
- **URL State**: `useManagerMembersLogic.ts` syncs filters and pagination to the URL.

## Actual Fixture/Data Layer
- `ManagerMembersSharedConstants.ts` contains hardcoded data for lists, statuses, and pricing options.
- The `membersApi` abstraction serves as a bridge, currently returning mock data but fully prepared for backend integration.

## Actual API Files
- `members_api/ManagerMembersApi.ts`: Mocked HTTP client functions for member CRUD.
- `members_api/useManagerMembersQueries.ts`: TanStack Query fetchers.
- `members_context/useManagerMembersMutations.ts`: Wrapper for TanStack Query mutations.
- `members_context/useManagerMembersCoreMutations.ts` & `useManagerMembersStatusMutations.ts`: Core mutation handlers.

## Actual Loading State
- The route uses `loading.tsx` for initial fetch.
- `ManagerMembersTable` displays a `Loader2` spinner when `isLoading` is true.
- Sub-components display localized spinners when `useIsMutating()` is active.

## Actual Empty State
- Handled via `ManagerEmptyState` when the member list is empty, with a CTA to add a new member.

## Actual Error State
- Features `error.tsx` for unhandled exceptions.
- Form submissions use `react-hot-toast` (via context wrapper) to display validation and API errors.

## Actual Security Rules
- Requires Manager role authentication.
- Masked sensitive data: Phone numbers and emails are masked in the main list, visible only inside the explicit profile view.

## Actual Multi-Step Flows
- **Add Member**: Tabbed wizard (Personal -> Membership -> Payment) inside `ManagerMembersModal`. Protected by `useUnsavedChangesGuard`.

## Feature-Specific AI Warnings
1. **Never use `any`**: All mutation returns and query extractions must be strictly typed.
2. **Never break `useUnsavedChangesGuard`**: Complex forms must alert users before unloading.
3. **Never bypass `useConfirm`**: Destructive actions (delete, suspend) must invoke the `confirm()` dialogue.
4. **Never manipulate theme values**: Stick strictly to tokens in `members_theme_contract.md`.
5. **Never handle filters locally**: URL `searchParams` is the absolute source of truth for the member list.
