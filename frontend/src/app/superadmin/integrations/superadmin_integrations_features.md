# Superadmin Integrations â€” Feature Map

## Module Purpose
The integrations module is responsible for the Superadmin business workflow managing Integrations. It enables superadmins to view, monitor, and control the lifecycle and configurations of Integrations across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `integrations_api/` | Feature-owned responsibility for integrations api. | `SuperadminIntegrationsApi.ts` |
| `integrations_components/` | Feature-owned responsibility for integrations components. | `SuperadminIntegrationsClient.tsx`, `SuperadminIntegrationsConnectionHealthPanel.tsx`, `SuperadminIntegrationsConnectionsEmptyState.tsx`, `SuperadminIntegrationsDeveloperAccessEmptyState.tsx`, `SuperadminIntegrationsPageHeader.tsx`, `SuperadminIntegrationsSummaryCards.tsx`, `SuperadminIntegrationsWebhooksAndDeveloperAccessPanel.tsx`, `SuperadminIntegrationsWebhooksEmptyState.tsx` |
| `integrations_mocks/` | Feature-owned responsibility for integrations mocks. | `(directory present; no direct files)` |
| `integrations_tests/` | Feature-owned responsibility for integrations tests. | `SuperadminIntegrationsBasic.test.tsx` |
| `integrations_types/` | Feature-owned responsibility for integrations types. | `SuperadminIntegrationsTypes.ts`, `SuperadminRouteErrorTypes.ts` |
| `integrations_utils/` | Feature-owned responsibility for integrations utils. | `SuperadminIntegrationsStatusBadgeConfig.ts`, `useSuperadminIntegrationsPage.test.tsx`, `useSuperadminIntegrationsPage.ts` |

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
| Superadmin Integrations | `/superadmin/integrations` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `SuperadminIntegrationsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/integrations route to load the Integrations data context securely via TanStack Query.
2. Interact with the Integrations dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Integrations status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `integrations`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `integrations_utils/useSuperadminIntegrationsPage.ts`, `integrations_utils/useSuperadminGenerateApiKey.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'integrations', 'overview']`

## API Contract

- **API files:** `integrations_api/SuperadminIntegrationsApi.ts`
- **Detected API symbols:** `fetchIntegrations` — `integrations_api/SuperadminIntegrationsApi.ts`; `generateSuperadminApiKey` — `integrations_api/SuperadminIntegrationsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `integrations_components/SuperadminIntegrationsDeveloperAccessEmptyState.tsx`, `integrations_components/SuperadminIntegrationsWebhooksEmptyState.tsx`, `integrations_components/SuperadminIntegrationsPageHeader.tsx`, `integrations_components/SuperadminIntegrationsClient.tsx`, `integrations_components/SuperadminIntegrationsWebhooksAndDeveloperAccessPanel.tsx`, `integrations_components/SuperadminGenerateApiKeyModal.tsx`, `integrations_components/SuperadminIntegrationsSummaryCards.tsx`, `integrations_components/SuperadminIntegrationsConnectionsEmptyState.tsx`, `integrations_components/SuperadminIntegrationsConnectionHealthPanel.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `integrations_components/SuperadminIntegrationsDeveloperAccessEmptyState.tsx`, `integrations_components/SuperadminIntegrationsWebhooksEmptyState.tsx`, `integrations_components/SuperadminIntegrationsConnectionsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Framework route artifact for integrations. |
| `integrations_components/SuperadminIntegrationsDeveloperAccessEmptyState.tsx` | Renders the dedicated empty state for the Superadmin developer access list. |
| `integrations_components/SuperadminIntegrationsWebhooksEmptyState.tsx` | Renders the dedicated empty state for the Superadmin webhook deliveries list. |
| `integrations_components/SuperadminIntegrationsPageHeader.tsx` | Renders the Superadmin integrations page header section. |
| `integrations_components/SuperadminIntegrationsClient.tsx` | Orchestrates the Superadmin integrations page and its focused child sections. |
| `integrations_components/SuperadminIntegrationsWebhooksAndDeveloperAccessPanel.tsx` | Renders the Superadmin integrations webhooks and developer access panel section. |
| `integrations_components/SuperadminGenerateApiKeyModal.tsx` | Renders the validated Superadmin API-key generation form and one-time generated-secret result. |
| `integrations_components/SuperadminIntegrationsSummaryCards.tsx` | Renders the Superadmin integrations summary cards section. |
| `integrations_components/SuperadminIntegrationsConnectionsEmptyState.tsx` | Renders the dedicated empty state for the Superadmin connections list. |
| `integrations_components/SuperadminIntegrationsConnectionHealthPanel.tsx` | Renders the Superadmin integrations connection health panel section. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into integrations.
- **Destructive Actions**: Any deletion or modification of integrations records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for integrations do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

