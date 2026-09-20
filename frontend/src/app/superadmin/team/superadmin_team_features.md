# Superadmin Team â€” Feature Map

## Module Purpose
The team module is responsible for the Superadmin business workflow managing Team. It enables superadmins to view, monitor, and control the lifecycle and configurations of Team across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `team_api/` | Feature-owned responsibility for team api. | `SuperadminTeamApi.ts` |
| `team_components/` | Feature-owned responsibility for team components. | `SuperadminTeamAlertPreferencesEmptyState.tsx`, `SuperadminTeamClient.tsx`, `SuperadminTeamMembersEmptyState.tsx`, `SuperadminTeamMembersPanel.tsx`, `SuperadminTeamPageHeader.tsx`, `SuperadminTeamRoleGroupsEmptyState.tsx`, `SuperadminTeamRolesAndAlertPreferencesPanel.tsx`, `SuperadminTeamSummaryCards.tsx` |
| `team_mocks/` | Feature-owned responsibility for team mocks. | `(directory present; no direct files)` |
| `team_tests/` | Feature-owned responsibility for team tests. | `SuperadminTeamBasic.test.tsx` |
| `team_types/` | Feature-owned responsibility for team types. | `SuperadminRouteErrorTypes.ts`, `SuperadminTeamTypes.ts` |
| `team_utils/` | Feature-owned responsibility for team utils. | `SuperadminTeamStatusBadgeConfig.ts`, `useSuperadminTeamAlertPreferences.ts`, `useSuperadminTeamPage.test.tsx`, `useSuperadminTeamPage.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Team | `/superadmin/team` | save | `SuperadminTeamApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/team route to load the Team data context securely via TanStack Query.
2. Interact with the Team dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Team status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `team`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `team_utils/useSuperadminTeamAlertPreferences.ts`, `team_utils/useSuperadminTeamPage.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'team']`, `['superadmin', 'team', 'overview']`

## API Contract

- **API files:** `team_api/SuperadminTeamApi.ts`
- **Detected API symbols:** `fetchTeam` — `team_api/SuperadminTeamApi.ts`; `updateTeamAlertPreferences` — `team_api/SuperadminTeamApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `team_components/SuperadminTeamRoleGroupsEmptyState.tsx`, `team_components/SuperadminTeamMembersEmptyState.tsx`, `team_components/SuperadminTeamMembersPanel.tsx`, `team_components/SuperadminTeamAlertPreferencesEmptyState.tsx`, `team_components/SuperadminTeamPageHeader.tsx`, `team_components/SuperadminTeamRolesAndAlertPreferencesPanel.tsx`, `team_components/SuperadminTeamClient.tsx`, `team_components/SuperadminTeamSummaryCards.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `team_components/SuperadminTeamRoleGroupsEmptyState.tsx`, `team_components/SuperadminTeamMembersEmptyState.tsx`, `team_components/SuperadminTeamAlertPreferencesEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Framework route artifact for team. |
| `team_components/SuperadminTeamRoleGroupsEmptyState.tsx` | Renders the dedicated empty state for the Superadmin role groups list. |
| `team_components/SuperadminTeamMembersEmptyState.tsx` | Renders the dedicated empty state for the Superadmin team members list. |
| `team_components/SuperadminTeamMembersPanel.tsx` | Renders the Superadmin team members panel section. |
| `team_components/SuperadminTeamAlertPreferencesEmptyState.tsx` | Renders the dedicated empty state for the Superadmin alert preferences list. |
| `team_components/SuperadminTeamPageHeader.tsx` | Renders the Superadmin team page header section. |
| `team_components/SuperadminTeamRolesAndAlertPreferencesPanel.tsx` | Renders Superadmin roles and editable alert preferences; mutation orchestration stays inside this feature panel. |
| `team_components/SuperadminTeamClient.tsx` | Orchestrates the Superadmin team page and its focused child sections. |
| `team_components/SuperadminTeamSummaryCards.tsx` | Renders the Superadmin team summary cards section. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into team.
- **Destructive Actions**: Any deletion or modification of team records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for team do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

