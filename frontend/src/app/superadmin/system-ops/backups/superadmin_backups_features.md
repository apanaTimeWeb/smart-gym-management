# Superadmin Backups â€” Feature Map

## Module Purpose
The backups module is responsible for the Superadmin business workflow managing Backups. It enables superadmins to view, monitor, and control the lifecycle and configurations of Backups across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `backups_api/` | Feature-owned responsibility for backups api. | `SuperadminBackupsApi.ts`, `SuperadminBackupsHealthApi.ts` |
| `backups_mocks/` | Feature-owned responsibility for backups mocks. | `(directory present; no direct files)` |
| `backups_tests/` | Feature-owned responsibility for backups tests. | `SuperadminBackupsBasic.test.tsx`, `SuperadminBackupsHealth.test.ts` |
| `backups_types/` | Feature-owned responsibility for backups types. | `SuperadminBackupsRestoreModalTypes.ts`, `SuperadminBackupsScheduleModalTypes.ts`, `SuperadminBackupsScheduleTypes.ts`, `SuperadminBackupsTableTypes.ts`, `SuperadminBackupsTriggerModalTypes.ts`, `SuperadminBackupsTypes.ts`, `SuperadminBackupsV1Types.ts` |
| `backups_utils/` | Feature-owned responsibility for backups utils. | `SuperadminBackupsConstants.ts`, `SuperadminBackupsScheduleConstants.ts`, `SuperadminBackupsStatusBadgeConfig.ts`, `useSuperadminBackupsActions.ts`, `useSuperadminBackupsData.test.ts`, `useSuperadminBackupsData.test.tsx`, `useSuperadminBackupsData.ts`, `useSuperadminBackupsSchedule.ts`, `useSuperadminBackupsV1.ts` |

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
| Superadmin Backups | `/superadmin/system-ops/backups` | create backup; download; restore click; save; submit | `SuperadminBackupsHealthApi.ts`, `SuperadminBackupsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/backups route to load the Backups data context securely via TanStack Query.
2. Interact with the Backups dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Backups status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `system-ops/backups`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `backups_utils/useSuperadminBackupsSchedule.ts`, `backups_utils/useSuperadminBackupsActions.ts`, `backups_utils/useSuperadminBackupsData.ts`, `backups_utils/useSuperadminBackupsV1.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'backups']`, `['superadmin', 'backups', params]`, `['superadmin', 'backups_health']`

## API Contract

- **API files:** `backups_api/SuperadminBackupsHealthApi.ts`, `backups_api/SuperadminBackupsApi.ts`
- **Detected API symbols:** `fetchBackupsHealth` — `backups_api/SuperadminBackupsHealthApi.ts`; `fetchBackups` — `backups_api/SuperadminBackupsApi.ts`; `createBackupSnapshot` — `backups_api/SuperadminBackupsApi.ts`; `restoreBackupSnapshot` — `backups_api/SuperadminBackupsApi.ts`; `fetchBackupDownloadUrl` — `backups_api/SuperadminBackupsApi.ts`; `fetchBackupSchedule` — `backups_api/SuperadminBackupsApi.ts`; `updateBackupSchedule` — `backups_api/SuperadminBackupsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `backups_components/SuperadminBackupsTriggerModal.tsx`, `backups_components/SuperadminBackupsV1GymHealthTable.tsx`, `backups_components/SuperadminBackupsTable.tsx`, `backups_components/SuperadminBackupsScheduleModal.tsx`, `backups_components/SuperadminBackupsV1HealthSummaryCards.tsx`, `backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx`, `backups_components/SuperadminBackupsClient.tsx`, `backups_components/SuperadminBackupsRestoreModal.tsx`, `backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the backups page. Renders the interactive client component. |
| `backups_components/SuperadminBackupsTriggerModal.tsx` | Confirmation view for the global backup trigger; asynchronous mutation is owned by the feature action hook. |
| `backups_components/SuperadminBackupsV1GymHealthTable.tsx` | Renders the Superadmin backups V1 Backup health by gym view. |
| `backups_components/SuperadminBackupsTable.tsx` | Renders the Backups Table component and its associated UI logic. |
| `backups_components/SuperadminBackupsScheduleModal.tsx` | View-only modal for editing the Superadmin backup schedule. Server state and mutation lifecycle are owned by useSuperadminBackupsSchedule. |
| `backups_components/SuperadminBackupsV1HealthSummaryCards.tsx` | Renders the Superadmin backups V1 BackupsHealthSummary summary cards. |
| `backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx` | Renders the Superadmin backups V1 Restore test history view. |
| `backups_components/SuperadminBackupsClient.tsx` | SuperadminBackupsClient.tsx renders the Database Backups page. Purely a view layer — backup data is fetched via useSuperadminBackupsData and rendered from query state. |
| `backups_components/SuperadminBackupsRestoreModal.tsx` | Confirmation view for restoring a backup snapshot; mutation lifecycle is owned by the feature action hook. |
| `backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx` | Renders the empty state UI for the Backups table when no backups exist. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into backups.
- **Destructive Actions**: Any deletion or modification of backups records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for backups do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

