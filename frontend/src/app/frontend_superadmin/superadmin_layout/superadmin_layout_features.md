# Superadmin Layout — Feature Map

## Module Purpose
Role-owned authenticated shell infrastructure for the Superadmin frontend: header, sidebar, theme/session shell, error boundary, responsive table behavior, navigation presentation, and approved global UI plumbing. It contains no domain records or feature business rules.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** None identified in the owned API surface.
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.
- **API Ownership:** No dedicated API facade matching this documentation node was found under the owning feature API folder; behavior is delegated/documented at the parent feature boundary where applicable.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `SuperadminLayout`. | `not-found.tsx, superadmin_layout_features.md, superadmin_layout_forbidden.md, superadmin_layout_theme_contract.md, superadmin_layout_url_config.ts` |
| `superadmin_layout_api/` | Owns module-scoped api artifacts. | `SuperadminLayoutApiFetch.ts` |
| `superadmin_layout_components/` | Owns module-scoped components artifacts. | `SuperadminLayoutPageSuspenseSkeleton.tsx, SuperadminLayoutRoleProviders.tsx, SuperadminLayoutRouteError.tsx, SuperadminLayoutSocketProvider.tsx, SuperadminLayoutThemeProvider.tsx` (+1 more) |
| `superadmin_layout_config/` | Owns module-scoped config artifacts. | `SuperadminLayoutEnvironmentConfig.ts` |
| `superadmin_layout_constants/` | Owns module-scoped constants artifacts. | `SuperadminLayoutConstants.ts, SuperadminLayoutRouteHeaderConfig.ts, SuperadminLayoutSaaSBillingNavigationConstants.test.ts, SuperadminLayoutSaaSBillingNavigationConstants.ts, SuperadminLayoutSidebarNavigationConfig.ts` |
| `superadmin_layout_error_boundary/` | Owns module-scoped error boundary artifacts. | `SuperadminLayoutErrorBoundary.tsx` |
| `superadmin_layout_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminLayoutDialogA11y.test.ts, useSuperadminLayoutDialogA11y.ts, useSuperadminLayoutUnsavedChangesGuard.test.ts, useSuperadminLayoutUnsavedChangesGuard.ts` |
| `superadmin_layout_locales/` | Owns module-scoped locales artifacts. | `superadmin_layout_en.json, superadmin_layout_hi.json` |
| `superadmin_layout_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminLayoutApiResponseSchema.ts` |
| `superadmin_layout_styles/` | Owns module-scoped styles artifacts. | `SuperadminLayoutStyles.css` |
| `superadmin_layout_tests/` | Owns module-scoped tests artifacts. | `` |
| `superadmin_layout_types/` | Owns module-scoped types artifacts. | `SuperadminLayoutProps.ts, SuperadminLayoutInfrastructureTypes.ts` |

## External Dependencies
Only framework/application infrastructure plus dumb UI primitives are permitted. Feature modules must not import business logic from this shell module.

## Feature Inventory
| Surface | Route | Behavior | Status |
|---|---|---|---|
| Superadmin shell | `/superadmin/*` | header/sidebar/theme/session presentation | Source-verified; host runtime pending |

## Data and State Architecture
Role shell state only. Server business data remains owned by feature modules and TanStack Query.

## Permissions and Security
Authentication/session transport is approved application infrastructure. Domain authorization remains backend-authoritative.

## Loading, Empty, and Error States
Shell skeletons and route-level recovery are owned here; business loading/empty/error UI remains feature-owned.

## Edge Cases and AI Warnings
- Never place member, gym, billing, plan, invoice, or other business records in this module.
- Navigation may describe business destinations but must not import feature business components.
- Do not turn the shell into a global business component bucket.

- **Module API boundary:** All `layout` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `layout` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `layout` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `layout` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `layout` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Rule Compliance Checklist
- [x] Role-owned shell only.
- [x] No domain fixtures.
- [x] No feature business components.
- [x] Responsive shell responsibility documented.
- [x] Error boundary responsibility documented.


## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutHeaderProfile.tsx` | `role` | None detected | Module-owned fixture/handler |
| `superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutResponsiveTableProvider.tsx` | `children` | None detected | Module-owned fixture/handler |
| `superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutSidebar.tsx` | `labelKey`, `href`, `icon` | None detected | Module-owned fixture/handler |

## Component Responsibility Map
| Component Area | Responsibility |
|---|---|
| `superadmin_layout_components/superadmin_layout_shell/` | Authenticated Superadmin shell presentation: header, sidebar, breadcrumbs, and shell-level navigation behavior. |
| `superadmin_layout_components/*provider*` | Stable application/session/theme/realtime infrastructure providers; no feature-specific business state. |
| `superadmin_layout_components/*feedback*` | Global route progress, notifications, and error presentation using approved semantic design-system tokens. |
| `superadmin_layout_hooks/` | Shell-only browser/session/UI orchestration; no feature business workflows. |


## Routes

- Primary feature route: `/superadmin`
- Route ownership remains inside `superadmin_layout`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminLayout.tsx`, `SuperadminLayoutHeader.tsx`, `SuperadminLayoutHeaderProfile.tsx`, `SuperadminLayoutNotFound.tsx`, `SuperadminLayoutPageSuspenseSkeleton.tsx`, `SuperadminLayoutResponsiveTableProvider.tsx`, `SuperadminLayoutRoleProviders.tsx`, `SuperadminLayoutRouteError.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: No dedicated module API methods detected in the owning `_api/` folder..
- URL paths remain centralized in `superadmin_layout_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_layout_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_layout_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.
