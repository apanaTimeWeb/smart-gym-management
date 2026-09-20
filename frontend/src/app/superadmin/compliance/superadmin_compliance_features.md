# Superadmin Compliance â€” Feature Map

## Module Purpose
The compliance module is responsible for the Superadmin business workflow managing Compliance. It enables superadmins to view, monitor, and control the lifecycle and configurations of Compliance across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `compliance_api/` | Feature-owned responsibility for compliance api. | `SuperadminComplianceApi.ts` |
| `compliance_components/` | Feature-owned responsibility for compliance components. | `SuperadminComplianceClient.tsx`, `SuperadminComplianceDocumentsEmptyState.tsx`, `SuperadminComplianceDocumentsPanel.tsx`, `SuperadminCompliancePageHeader.tsx`, `SuperadminComplianceReadinessPanel.tsx`, `SuperadminComplianceRegionalCoverageEmptyState.tsx`, `SuperadminComplianceRegionalCoveragePanel.tsx`, `SuperadminComplianceSummaryCards.tsx` |
| `compliance_mocks/` | Feature-owned responsibility for compliance mocks. | `(directory present; no direct files)` |
| `compliance_tests/` | Feature-owned responsibility for compliance tests. | `SuperadminComplianceBasic.test.tsx` |
| `compliance_types/` | Feature-owned responsibility for compliance types. | `SuperadminComplianceTypes.ts`, `SuperadminRouteErrorTypes.ts` |
| `compliance_utils/` | Feature-owned responsibility for compliance utils. | `SuperadminComplianceStatusBadgeConfig.ts`, `useSuperadminCompliancePage.test.tsx`, `useSuperadminCompliancePage.ts` |

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
| Superadmin Compliance | `/superadmin/compliance` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `SuperadminComplianceApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/compliance route to load the Compliance data context securely via TanStack Query.
2. Interact with the Compliance dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Compliance status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `compliance`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `compliance_utils/useSuperadminCompliancePage.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'compliance', 'overview']`

## API Contract

- **API files:** `compliance_api/SuperadminComplianceApi.ts`
- **Detected API symbols:** `fetchComplianceOverview` — `compliance_api/SuperadminComplianceApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `compliance_components/SuperadminComplianceReadinessPanel.tsx`, `compliance_components/SuperadminComplianceDocumentsPanel.tsx`, `compliance_components/SuperadminComplianceRegionalCoverageEmptyState.tsx`, `compliance_components/SuperadminComplianceSummaryCards.tsx`, `compliance_components/SuperadminComplianceDocumentsEmptyState.tsx`, `compliance_components/SuperadminCompliancePageHeader.tsx`, `compliance_components/SuperadminComplianceClient.tsx`, `compliance_components/SuperadminComplianceRegionalCoveragePanel.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
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
- **Empty-state components:** `compliance_components/SuperadminComplianceRegionalCoverageEmptyState.tsx`, `compliance_components/SuperadminComplianceDocumentsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Framework route artifact for compliance. |
| `compliance_components/SuperadminComplianceReadinessPanel.tsx` | Renders the Superadmin compliance readiness panel section. |
| `compliance_components/SuperadminComplianceDocumentsPanel.tsx` | Renders the Superadmin compliance documents panel section. |
| `compliance_components/SuperadminComplianceRegionalCoverageEmptyState.tsx` | Renders the dedicated empty state for the Superadmin regional coverage list. |
| `compliance_components/SuperadminComplianceSummaryCards.tsx` | Renders the Superadmin compliance summary cards section. |
| `compliance_components/SuperadminComplianceDocumentsEmptyState.tsx` | Renders the dedicated empty state for the Superadmin compliance documents list. |
| `compliance_components/SuperadminCompliancePageHeader.tsx` | Renders the Superadmin compliance page header section. |
| `compliance_components/SuperadminComplianceClient.tsx` | Orchestrates the Superadmin compliance page and its focused child sections. |
| `compliance_components/SuperadminComplianceRegionalCoveragePanel.tsx` | Renders the Superadmin compliance regional coverage panel section. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into compliance.
- **Destructive Actions**: Any deletion or modification of compliance records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for compliance do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

