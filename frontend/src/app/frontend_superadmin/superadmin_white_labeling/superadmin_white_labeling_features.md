# Superadmin White-labeling — Feature Map

## Module Purpose
The White-labeling feature lets Superadmins inspect tenant domain/branding configuration and change supported domain lifecycle status through a controlled drawer. The module owns list search, status filtering, selected-record state, mutation orchestration, and the feature-owned MSW contract. It is strictly limited to the documented white-labeling domain workflow; it does not own tenant billing, authentication, or unrelated branding logic.


## Routes

- Primary feature route: `/superadmin/white-labeling`
- Route ownership remains inside `superadmin_white_labeling`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminWhiteLabelingDrawer.tsx`, `SuperadminWhiteLabelingEmptyState.tsx`, `SuperadminWhiteLabelingErrorState.tsx`, `SuperadminWhiteLabelingLoadingState.tsx`, `SuperadminWhiteLabelingMain.tsx`, `SuperadminWhiteLabelingStatusBadge.tsx`, `SuperadminWhiteLabelingTable.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `getDomains`, `updateDomainStatus`.
- URL paths remain centralized in `superadmin_white_labeling_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_white_labeling_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_white_labeling_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.

## Dependency Manifest

Documented technologies evidenced by module-owned source:
- Lucide React
- MSW
- Next.js
- React
- TanStack Query
- Vitest
- Zod
- Zustand
- http-status-codes
- next
- next-intl
- sonner

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `getDomains`
- **Update / Action:** `updateDomainStatus`
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_white_labeling`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_white_labeling_features.md, superadmin_white_labeling_forbidden.md, superadmin_white_labeling_theme_contract.md, superadmin_white_labeling_url_config.ts` |
| `superadmin_white_labeling_api/` | Owns module-scoped api artifacts. | `SuperadminWhiteLabelingApi.ts` |
| `superadmin_white_labeling_components/` | Owns module-scoped components artifacts. | `SuperadminWhiteLabelingDrawer.tsx, SuperadminWhiteLabelingEmptyState.tsx, SuperadminWhiteLabelingErrorState.tsx, SuperadminWhiteLabelingLoadingState.tsx, SuperadminWhiteLabelingMain.tsx` (+2 more) |
| `superadmin_white_labeling_constants/` | Owns module-scoped constants artifacts. | `SuperadminWhiteLabelingConstants.ts, SuperadminWhiteLabelingQueryKeys.ts` |
| `superadmin_white_labeling_hooks/` | Owns module-scoped hooks artifacts. | `SuperadminWhiteLabelingUse.test.tsx, SuperadminWhiteLabelingUse.ts` |
| `superadmin_white_labeling_locales/` | Owns module-scoped locales artifacts. | `superadmin_white_labeling_en.json, superadmin_white_labeling_hi.json` |
| `superadmin_white_labeling_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_white_labeling_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminWhiteLabelingSchemas.ts` |
| `superadmin_white_labeling_store/` | Owns module-scoped store artifacts. | `useSuperadminWhiteLabelingStore.test.ts, useSuperadminWhiteLabelingStore.ts` |
| `superadmin_white_labeling_tests/` | Owns module-scoped tests artifacts. | `SuperadminWhiteLabelingContract.test.ts` |
| `superadmin_white_labeling_types/` | Owns module-scoped types artifacts. | `SuperadminWhiteLabelingComponentTypes.ts, SuperadminWhiteLabelingErrorStateTypes.ts, SuperadminWhiteLabelingTypes.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui/Feedback/ConfirmProvider`
- `@/components/ui/Tooltip`
- `@/hooks/useDebouncedValue`
- `@/lib/api`
- `@/lib/formatters`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- None detected.

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| White-label domain list | `/superadmin/white_labeling` | Search and filter tenant domain configurations; inspect status | `SuperadminWhiteLabelingMain`, `SuperadminWhiteLabelingTable`, `SuperadminWhiteLabelingStatusBadge` | `getDomains` | Implemented with module MSW |
| Domain status management | `/superadmin/white_labeling` | Open the selected domain drawer and change supported status with confirmation | `SuperadminWhiteLabelingDrawer` | `updateDomainStatus` | Implemented with mutable module MSW |

## User Flows & Interactions
### Flow 1: Search / Filter Domains
1. User changes Search or Status Filter in `SuperadminWhiteLabelingMain`.
2. UI state is serialized into the documented query parameters.
3. `SuperadminWhiteLabelingUse` derives the query key from the normalized query state.
4. `getDomains` requests the filtered result set.
5. MSW returns the matching fixture subset.
6. The table updates; zero matches render the empty state.

### Flow 2: Update Domain Status
1. User selects a domain row.
2. `SuperadminWhiteLabelingDrawer` opens with that domain.
3. User chooses a supported status.
4. Destructive/critical status changes use the documented confirmation path.
5. `updateDomainStatus` runs through TanStack Query mutation state.
6. On success, the mutation reconciles/invalidate the affected list query and shows the backend response message.
7. The drawer closes only after confirmed success; the updated status is visible in the list.

## Data and State Architecture
- **Server state:** TanStack Query only.
- **UI state:** `superadmin_white_labeling_store/useSuperadminWhiteLabelingStore.ts` for selected domain and local UI state.
- **URL state:** Search/filter values are query-state driven; do not keep the authoritative list filter only in Zustand.
- **Query key:** list query is namespaced to the White-labeling feature and includes normalized filter state.
- **Mock state:** `superadmin_white_labeling_mocks/superadmin_white_labeling_mocks_handlers/SuperadminWhiteLabelingMockHandlers.ts` maintains mutable session/in-memory state for status mutation verification.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `getDomains` | GET | configured White-labeling domains endpoint | normalized search/filter params | domain list + pagination metadata |
| `updateDomainStatus` | PATCH | configured domain-status endpoint | domain identifier + next status | updated domain record |

All responses are runtime-validated at the module API boundary before application consumption.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_white_labeling_components/SuperadminWhiteLabelingDrawer.tsx` | `id`, `domain`, `gymName`, `status`, `sslStatus`, `createdAt`, `logoUrl`, `primaryColor` | `superadmin_white_labeling_api/SuperadminWhiteLabelingApi.ts` | Module-owned fixture/handler |
| `superadmin_white_labeling_components/SuperadminWhiteLabelingTable.tsx` | `id`, `gymName`, `domain`, `status`, `sslStatus`, `createdAt` | `superadmin_white_labeling_api/SuperadminWhiteLabelingApi.ts` | Module-owned fixture/handler |

## Permissions and Security
- Required role: `SUPERADMIN` through the host role/session boundary.
- Status-changing controls are feature-protected and must remain hidden/disabled when the documented capability is unavailable.
- Destructive/critical changes must use `useConfirm()`; never use `window.confirm()`.
- API responses must never expose raw internal errors in the UI.
- There are no sibling business-feature dependencies.

## Loading, Empty, and Error States
| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full route | `loading.tsx` structural skeleton matching toolbar + table | N/A | `error.tsx` route-level branded recovery state with Retry |
| Domain table | `superadmin_white_labeling_components/SuperadminWhiteLabelingLoadingState.tsx` table-shaped skeleton | `superadmin_white_labeling_components/SuperadminWhiteLabelingEmptyState.tsx` explains no matching domains | `superadmin_white_labeling_components/SuperadminWhiteLabelingErrorState.tsx` provides retry |
| Status drawer | mutation-driven disabled/loading controls | N/A | backend-safe inline mutation error |

## Edge Cases and AI Warnings
1. **Never move filter authority back into Zustand only:** the URL/query contract is part of the list interaction and must remain shareable and back/forward compatible.
2. **Never update only the toast:** status mutation success must update or invalidate the list data so the visible row reflects the new status.
3. **Never change the selected domain identity during a refetch:** the drawer must continue to represent the same domain until the user closes it or the selected resource becomes invalid.
4. **Never import branding/billing/tenant business logic from another feature:** duplicate the small amount of feature-specific logic when necessary for isolation.
5. **Never bypass the confirmation flow for restricted status changes:** a critical status action must have an explicit documented terminal state.
6. **Do not introduce browser-native confirmation dialogs:** use the approved design-system confirmation mechanism.
7. **Do not treat browser refresh as persistence:** current module mock state is session/in-memory unless a persistence contract is explicitly documented.

- **Module API boundary:** All `white labeling` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `white labeling` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `white labeling` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `white labeling` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `white labeling` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `page.tsx` | Server route entry only; no client business orchestration. |
| `superadmin_white_labeling_components/SuperadminWhiteLabelingMain.tsx` | Client view/orchestrator for search/filter/table/drawer composition. |
| `superadmin_white_labeling_components/SuperadminWhiteLabelingTable.tsx` | Renders accessible clickable table rows and mobile card-stack representation. |
| `superadmin_white_labeling_components/SuperadminWhiteLabelingStatusBadge.tsx` | Renders feature-owned status mapping using semantic tokens. |
| `superadmin_white_labeling_components/SuperadminWhiteLabelingDrawer.tsx` | Renders selected-domain status-edit workflow and consumes mutation hook state. |
| `superadmin_white_labeling_components/SuperadminWhiteLabelingEmptyState.tsx` | Renders zero-result state and documented contextual action. |
| `superadmin_white_labeling_components/SuperadminWhiteLabelingErrorState.tsx` | Renders feature-level query recovery UI. |
| `superadmin_white_labeling_components/SuperadminWhiteLabelingLoadingState.tsx` | Renders structural loading skeleton. |

## Rule Compliance Checklist
- [x] Feature-owned components/hooks/store/API/types/schemas/mocks/tests/docs are contained in the feature.
- [x] No sibling business imports.
- [x] Absolute `@/` imports only.
- [x] Module URL configuration is used by API/navigation call sites.
- [x] Server/API data is not stored as primary Zustand state.
- [x] API responses are runtime validated.
- [x] Mock mutations update mutable in-memory state.
- [x] Search/filter state participates in the documented URL/query flow.
- [x] Destructive/critical confirmation uses the approved confirm flow.
- [x] Loading/empty/error/retry states are explicitly mapped.
- [x] Table rows provide keyboard/touch-accessible action paths.
- [x] Feature theme contract is documented.

## Verification Notes
Static repository verification is complete for the module-owned source. Browser runtime, full host build, and E2E remain `NOT VERIFIED` because those host-level dependencies are not included in the supplied module-only archive.
