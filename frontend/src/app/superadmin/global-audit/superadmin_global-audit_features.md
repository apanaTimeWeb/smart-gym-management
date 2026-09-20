# Superadmin Global Audit â€” Feature Map

## Module Purpose
The global-audit module is responsible for the Superadmin business workflow managing Global Audit. It enables superadmins to view, monitor, and control the lifecycle and configurations of Global Audit across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `global-audit_api/` | Feature-owned responsibility for global-audit api. | `SuperadminGlobalAuditApi.ts`, `SuperadminGlobalAuditInvestigationApi.ts` |
| `global-audit_mocks/` | Feature-owned responsibility for global-audit mocks. | `(directory present; no direct files)` |
| `global-audit_tests/` | Feature-owned responsibility for global-audit tests. | `SuperadminGlobal-auditBasic.test.tsx`, `SuperadminGlobalAuditInvestigation.test.ts` |
| `global-audit_types/` | Feature-owned responsibility for global-audit types. | `SuperadminGlobalAuditFilterTypes.ts`, `SuperadminGlobalAuditTypes.ts`, `SuperadminGlobalAuditV1Types.ts` |
| `global-audit_utils/` | Feature-owned responsibility for global-audit utils. | `SuperadminGlobalAuditConstants.ts`, `useSuperadminGlobalAuditData.ts`, `useSuperadminGlobalAuditV1.ts` |
| `global_audit_utils/` | Feature-owned responsibility for global audit utils. | `SuperadminGlobalAuditStatusBadgeConfig.ts` |

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
| Superadmin Global Audit | `/superadmin/global-audit` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `SuperadminGlobalAuditInvestigationApi.ts`, `SuperadminGlobalAuditApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/global-audit route to load the Global Audit data context securely via TanStack Query.
2. Interact with the Global Audit dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Global Audit status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `global-audit`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `global-audit_utils/useSuperadminGlobalAuditV1.ts`, `global-audit_utils/useSuperadminGlobalAuditData.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'global_audit_investigation']`, `['superadmin', 'global-audit', queryParams]`

## API Contract

- **API files:** `global-audit_api/SuperadminGlobalAuditInvestigationApi.ts`, `global-audit_api/SuperadminGlobalAuditApi.ts`
- **Detected API symbols:** `fetchGlobalAuditInvestigation` — `global-audit_api/SuperadminGlobalAuditInvestigationApi.ts`; `fetchGlobalLogs` — `global-audit_api/SuperadminGlobalAuditApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `global-audit_components/SuperadminGlobalAuditV1SuspiciousActivityPanel.tsx`, `global-audit_components/SuperadminGlobalAuditClient.tsx`, `global-audit_components/SuperadminGlobalAuditV1BeforeAndAfterChangesPanel.tsx`, `global-audit_components/SuperadminGlobalAuditV1InvestigationSummaryCards.tsx`
- **Approved formatting evidence:** No approved global formatting helper detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** No direct TanStack Query `useMutation` usage detected.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Server component entry point for the Superadmin Global Audit module. |
| `global-audit_components/SuperadminGlobalAuditV1SuspiciousActivityPanel.tsx` | Renders the Superadmin global-audit V1 Suspicious activity view. |
| `global-audit_components/SuperadminGlobalAuditClient.tsx` | Renders the Global Audit Logs dashboard for superadmins to monitor system-wide security events. |
| `global-audit_components/SuperadminGlobalAuditV1BeforeAndAfterChangesPanel.tsx` | Renders the Superadmin global-audit V1 Before & after changes view. |
| `global-audit_components/SuperadminGlobalAuditV1InvestigationSummaryCards.tsx` | Provides working risk/filter selection for the Superadmin audit-investigation insight view. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into global-audit.
- **Destructive Actions**: Any deletion or modification of global-audit records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for global-audit do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

