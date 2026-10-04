# Superadmin Global Audit Investigation â€” Feature Map

## Module Purpose
superadmin_global_audit_investigation_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/global_audit``. Authenticated Superadmin users can view the module surface; use the documented filters and controls; open supported detail/edit surfaces. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_global_audit_api/SuperadminGlobalAuditInvestigationApi.ts`, `superadmin_global_audit_api/SuperadminGlobalAuditApi.ts``.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchGlobalAuditInvestigation`
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_global_audit`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_global_audit_features.md, superadmin_global_audit_forbidden.md, superadmin_global_audit_theme_contract.md, superadmin_global_audit_url_config.ts` |
| `superadmin_global_audit_api/` | Owns module-scoped api artifacts. | `SuperadminGlobalAuditApi.ts, SuperadminGlobalAuditExportApi.ts, SuperadminGlobalAuditInvestigationApi.ts` |
| `superadmin_global_audit_components/` | Owns module-scoped components artifacts. | `SuperadminGlobalAuditMain.tsx, SuperadminGlobalAuditSeverityBadge.tsx` |
| `superadmin_global_audit_constants/` | Owns module-scoped constants artifacts. | `SuperadminGlobalAuditConstants.test.ts, SuperadminGlobalAuditConstants.ts, SuperadminGlobalAuditQueryKeys.ts, SuperadminGlobalAuditStatusBadgeConfig.test.ts, SuperadminGlobalAuditStatusBadgeConfig.ts` |
| `superadmin_global_audit_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_global_audit_investigation_features.md, superadmin_global_audit_investigation_forbidden.md, superadmin_global_audit_investigation_theme_contract.md` |
| `superadmin_global_audit_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminGlobalAuditData.test.tsx, useSuperadminGlobalAuditData.ts, useSuperadminGlobalAuditExportMutation.test.ts, useSuperadminGlobalAuditExportMutation.ts, useSuperadminGlobalAuditMain.test.ts` (+3 more) |
| `superadmin_global_audit_locales/` | Owns module-scoped locales artifacts. | `superadmin_global_audit_en.json, superadmin_global_audit_hi.json` |
| `superadmin_global_audit_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_global_audit_tests/` | Owns module-scoped tests artifacts. | `SuperadminGlobalAuditBasic.test.tsx, SuperadminGlobalAuditInvestigation.test.ts` |
| `superadmin_global_audit_utils/` | Owns module-scoped utils artifacts. | `SuperadminGlobalAuditExportUtils.test.ts, SuperadminGlobalAuditExportUtils.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/frontend_superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Global Audit Investigation | `/superadmin/global_audit` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `superadmin_global_audit_api/SuperadminGlobalAuditInvestigationApi.ts`, `superadmin_global_audit_api/SuperadminGlobalAuditApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/global_audit_investigation route to load the Global_audit_investigation data context securely via TanStack Query.
2. Interact with the Global_audit_investigation dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Global_audit_investigation status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `superadmin_global_audit`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `superadmin_global_audit_constants/SuperadminGlobalAuditQueryKeys.ts`

## API Contract

- **API files:** `superadmin_global_audit_api/SuperadminGlobalAuditInvestigationApi.ts`, `superadmin_global_audit_api/SuperadminGlobalAuditApi.ts`
- **Detected API symbols:** `fetchGlobalAuditInvestigation` — `superadmin_global_audit_api/SuperadminGlobalAuditInvestigationApi.ts`; `fetchGlobalLogs` — `superadmin_global_audit_api/SuperadminGlobalAuditApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_global_audit_components/SuperadminGlobalAuditMain.tsx` | `isPending`, `queryError`, `refetch`, `isFetching`, `requestExport`, `isExporting`, `search`, `setSearch` | `superadmin_global_audit_api/SuperadminGlobalAuditApi.ts`, `superadmin_global_audit_api/SuperadminGlobalAuditExportApi.ts`, `superadmin_global_audit_api/SuperadminGlobalAuditInvestigationApi.ts` | Module-owned fixture/handler |

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
| `superadmin_global_audit_components/SuperadminGlobalAuditMain.tsx` | Renders the Global Audit Logs dashboard for superadmins to monitor system-wide security events. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into superadmin_global_audit_investigation.
- **Destructive Actions**: Any deletion or modification of superadmin_global_audit_investigation records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for superadmin_global_audit_investigation do not expose cross-tenant sensitive data.

- **Module API boundary:** All `global audit` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `global audit` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `global audit` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `global audit` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `global audit` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## V15 Repair Supersession

The investigation V1 implementation was an orphaned, unmounted stack in the supplied role package and was removed during the V15 repair. This document is retained as historical evidence only and is not an active route/component/API contract.
