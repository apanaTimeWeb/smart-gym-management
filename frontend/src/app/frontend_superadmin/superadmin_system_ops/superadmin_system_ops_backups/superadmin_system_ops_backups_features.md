# Superadmin Backups — Feature Map

## Module Purpose
The backups module is responsible for the Superadmin business workflow managing Backups. It enables superadmins to view, monitor, and control the lifecycle and configurations of Backups across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_system_ops_backups_api/` | Feature-owned responsibility for backups api. | `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts` |
| `superadmin_system_ops_backups_mocks/` | Feature-owned responsibility for backups mocks. | `(directory present; no direct files)` |
| `superadmin_system_ops_backups_tests/` | Feature-owned responsibility for backups tests. | `superadmin_system_ops_backups_tests/SuperadminSystemOpsBackupsBasic.test.tsx`, `superadmin_system_ops_backups_tests/SuperadminSystemOpsBackupsHealth.test.ts` |
| `superadmin_system_ops_backups_types/` | Feature-owned responsibility for backups types. | `superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsRestoreModalTypes.ts`, `superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsScheduleModalTypes.ts`, `superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsScheduleTypes.ts`, `superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsTableTypes.ts`, `superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsTriggerModalTypes.ts`, `superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsTypes.ts`, `superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsV1Types.ts` |
| `superadmin_system_ops_backups_utils/` | Feature-owned responsibility for backups utils. | `superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsConstants.ts`, `superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsScheduleConstants.ts`, `superadmin_system_ops_backups_utils/SuperadminSystemOpsBackupsStatusBadgeConfig.ts`, `superadmin_system_ops_backups_utils/useSuperadminSystemOpsBackupsActions.ts`, `superadmin_system_ops_backups_utils/useSuperadminSystemOpsBackupsData.test.ts`, `superadmin_system_ops_backups_utils/useSuperadminSystemOpsBackupsData.test.tsx`, `superadmin_system_ops_backups_utils/useSuperadminSystemOpsBackupsData.ts`, `superadmin_system_ops_backups_utils/useSuperadminSystemOpsBackupsSchedule.ts`, `superadmin_system_ops_backups_utils/useSuperadminSystemOpsBackupsV1.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui` — role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` — only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Backups | `/superadmin/system-ops/backups` | create backup; download; restore click; save; submit | `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/backups route to load the Backups data context securely via TanStack Query.
2. Interact with the Backups dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Backups status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `HOST ROUTE WRAPPER (outside supplied bundle)`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `system-ops/backups`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `superadmin_system_ops_backups_utils/useSuperadminSystemOpsBackupsSchedule.ts`, `superadmin_system_ops_backups_utils/useSuperadminSystemOpsBackupsActions.ts`, `superadmin_system_ops_backups_utils/useSuperadminSystemOpsBackupsData.ts`, `superadmin_system_ops_backups_utils/useSuperadminSystemOpsBackupsV1.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'backups']`, `['superadmin', 'backups', params]`, `['superadmin', 'backups_health']`

## API Contract

- **API files:** `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`
- **Detected API symbols:** `fetchBackupsHealth` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`; `fetchBackups` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`; `createBackupSnapshot` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`; `restoreBackupSnapshot` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`; `fetchBackupDownloadUrl` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`; `fetchBackupSchedule` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`; `updateBackupSchedule` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `HOST ROUTE WRAPPER (outside supplied bundle)`, `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsTriggerModal.tsx`, `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1GymHealthTable.tsx`, `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsTable.tsx`, `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsScheduleModal.tsx`, `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1HealthSummaryCards.tsx`, `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1RestoreTestHistoryPanel.tsx`, `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsMain.tsx`, `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsRestoreModal.tsx`, `superadmin_system_ops_backups_components/superadmin_system_ops_backups_empty_state/SuperadminSystemOpsBackupsEmptyState.tsx`
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

- **`HOST ROUTE WRAPPER (outside supplied bundle)`:** `HOST ROUTE WRAPPER (outside supplied bundle)`
- **`HOST ROUTE WRAPPER (outside supplied bundle)`:** `HOST ROUTE WRAPPER (outside supplied bundle)`
- **Empty-state components:** `superadmin_system_ops_backups_components/superadmin_system_ops_backups_empty_state/SuperadminSystemOpsBackupsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `HOST ROUTE WRAPPER (outside supplied bundle)` | Pure Server Component for the backups page. Renders the interactive client component. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsTriggerModal.tsx` | Confirmation view for the global backup trigger; asynchronous mutation is owned by the feature action hook. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1GymHealthTable.tsx` | Renders the Superadmin backups V1 Backup health by gym view. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsTable.tsx` | Renders the Backups Table component and its associated UI logic. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsScheduleModal.tsx` | View-only modal for editing the Superadmin backup schedule. Server state and mutation lifecycle are owned by useSuperadminSystemOpsBackupsSchedule. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1HealthSummaryCards.tsx` | Renders the Superadmin backups V1 BackupsHealthSummary summary cards. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1RestoreTestHistoryPanel.tsx` | Renders the Superadmin backups V1 Restore test history view. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsMain.tsx` | SuperadminSystemOpsBackupsMain.tsx renders the Database Backups page. Purely a view layer — backup data is fetched via useSuperadminSystemOpsBackupsData and rendered from query state. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsRestoreModal.tsx` | Confirmation view for restoring a backup snapshot; mutation lifecycle is owned by the feature action hook. |
| `superadmin_system_ops_backups_components/superadmin_system_ops_backups_empty_state/SuperadminSystemOpsBackupsEmptyState.tsx` | Renders the empty state UI for the Backups table when no backups exist. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into backups.
- **Destructive Actions**: Any deletion or modification of backups records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for backups do not expose cross-tenant sensitive data.


## Canonical Current Source Structure (v5-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_system_ops_backups_api/`
- `superadmin_system_ops_backups_components/`
- `superadmin_system_ops_backups_constants/`
- `superadmin_system_ops_backups_locales/`
- `superadmin_system_ops_backups_mocks/`
- `superadmin_system_ops_backups_query_keys/`
- `superadmin_system_ops_backups_schemas/`
- `superadmin_system_ops_backups_tests/`
- `superadmin_system_ops_backups_types/`
- `superadmin_system_ops_backups_url_config.ts`
- `superadmin_system_ops_backups_utils/`

### Current root files
- `superadmin_backups_features.md`
- `superadmin_backups_forbidden.md`
- `superadmin_backups_health_features.md`
- `superadmin_backups_health_forbidden.md`
- `superadmin_backups_health_repair_map.md`
- `superadmin_backups_health_theme_contract.md`
- `superadmin_backups_repair_map.md`
- `superadmin_backups_theme_contract.md`


## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification — unavailable in source-only package.



## V4-FIX Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v5-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.
