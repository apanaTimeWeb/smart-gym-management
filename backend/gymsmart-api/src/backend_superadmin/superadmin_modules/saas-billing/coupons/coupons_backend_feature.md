# Coupons Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/saas-billing/coupons feature. It exposes 8 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `coupons_dtos/superadmin-saas-billing-coupons-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `coupons_dtos/superadmin-saas-billing-coupons-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `coupons_dtos/superadmin-saas-billing-coupons-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `coupons_dtos/superadmin-saas-billing-coupons-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `coupons_responses/superadmin-saas-billing-coupons-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `coupons_services/superadmin-saas-billing-coupons-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons_services/superadmin-saas-billing-coupons-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons_services/superadmin-saas-billing-coupons-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons_services/superadmin-saas-billing-coupons-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons_services/superadmin-saas-billing-coupons-redemptions.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons_services/superadmin-saas-billing-coupons-restore.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons_services/superadmin-saas-billing-coupons-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons_services/superadmin-saas-billing-coupons-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons_types/superadmin-saas-billing-coupons.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `coupons_types/superadmin-saas-billing-coupons.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-saas-billing-coupons-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-saas-billing-coupons-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-saas-billing-coupons-redemptions-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-saas-billing-coupons-restore-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-saas-billing-coupons.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-saas-billing-coupons.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-saas-billing-coupons.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-saas-billing-coupons.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-saas-billing-coupons.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-saas-billing-coupons.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-saas-billing-coupons.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory


| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-saas-billing-coupons-command.controller.ts::create` | POST | `/superadmin/saas-billing/coupons` | This endpoint invokes `create` on `superadmin-saas-billing-coupons-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-command.controller.ts::update` | PATCH | `/superadmin/saas-billing/coupons/:id` | This endpoint invokes `update` on `superadmin-saas-billing-coupons-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-command.controller.ts::remove` | DELETE | `/superadmin/saas-billing/coupons/:id` | This endpoint invokes `remove` on `superadmin-saas-billing-coupons-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-command.controller.ts::changeStatus` | PATCH | `/superadmin/saas-billing/coupons/:id/status` | This endpoint invokes `changeStatus` on `superadmin-saas-billing-coupons-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-query.controller.ts::findAll` | GET | `/superadmin/saas-billing/coupons` | This endpoint invokes `findAll` on `superadmin-saas-billing-coupons-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-query.controller.ts::findOne` | GET | `/superadmin/saas-billing/coupons/:id` | This endpoint invokes `findOne` on `superadmin-saas-billing-coupons-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-redemptions-query.controller.ts::redemptions` | GET | `/superadmin/saas-billing/coupons/:id/redemptions` | This endpoint invokes `redemptions` on `superadmin-saas-billing-coupons-redemptions-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-restore-command.controller.ts::restore` | POST | `/superadmin/saas-billing/coupons/:id/restore` | This endpoint invokes `restore` on `superadmin-saas-billing-coupons-restore-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |

## Approved External Dependencies

- **Business Feature Dependencies**: saas-billing
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_pagination
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-saas-billing-coupons.entity → `superadmin_coupons`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: `/superadmin/saas-billing/coupons`, `/superadmin/saas-billing/coupons/:id`, `/superadmin/saas-billing/coupons/:id/restore`, `/superadmin/saas-billing/coupons/:id/status`

## Business Flow / Key Sequences
**Standard mutation:** Controller -> DTO validation -> micro-service -> named repository mutation -> mapper -> ResponseInterceptor.

## File Responsibility Map
- `coupons-query.controller.ts` — GET transport only; MUST NOT mutate persistence.
- `coupons-command.controller.ts` — HTTP mutation transport only; MUST NOT contain business logic.
- `coupons.repository.ts` — DB queries/mutations only; MUST NOT call sibling repositories.
- `coupons-*.service.ts` — one business use case each; MUST NOT call TypeORM directly.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /superadmin/saas-billing/coupons` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/coupons/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/saas-billing/coupons/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/coupons/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/coupons` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/coupons/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/coupons/:id/redemptions` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/coupons/:id/restore` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Soft deletes MUST remain invisible to standard reads — violating Rule 29 can expose deleted records.
- Sort/search inputs MUST be allowlisted — violating Rule 92 enables unsafe query construction.
- Service mutations MUST use named repository methods — violating Rule 99 leaks persistence behavior into business code.

## Frozen API Contract

<!-- Exact source: frontend saas-billing/coupons/superadmin_coupons_features.md -->

﻿# Superadmin Coupons â€” Feature Map

## Module Purpose
The coupons module is responsible for the Superadmin business workflow managing Coupons. It enables superadmins to view, monitor, and control the lifecycle and configurations of Coupons across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `coupons_api/` | Feature-owned responsibility for coupons api. | `SuperadminCouponsApi.ts` |
| `coupons_components/` | Feature-owned responsibility for coupons components. | `SuperadminCouponEditModal.tsx`, `SuperadminCouponModal.tsx`, `SuperadminCouponsClient.tsx`, `SuperadminCouponsRedemptionDrawer.tsx` |
| `coupons_mocks/` | Feature-owned responsibility for coupons mocks. | `(directory present; no direct files)` |
| `coupons_tests/` | Feature-owned responsibility for coupons tests. | `SuperadminCouponsBasic.test.tsx` |
| `coupons_types/` | Feature-owned responsibility for coupons types. | `SuperadminCouponEditModalTypes.ts`, `SuperadminCouponModalTypes.ts`, `SuperadminCouponsEmptyStateTypes.ts`, `SuperadminCouponsHeaderTypes.ts`, `SuperadminCouponsRedemptionDrawerTypes.ts`, `SuperadminCouponsStatsBarTypes.ts`, `SuperadminCouponsStatusBadgeTypes.ts`, `SuperadminCouponsTableRowTypes.ts`, `SuperadminCouponsTableTypes.ts`, `SuperadminCouponsTypes.ts` |
| `coupons_utils/` | Feature-owned responsibility for coupons utils. | `SuperadminCouponsConstants.ts`, `SuperadminCouponsDateUtils.ts`, `useSuperadminCouponRedemptions.ts`, `useSuperadminCoupons.test.ts`, `useSuperadminCoupons.ts`, `useSuperadminCouponsMutation.ts`, `useSuperadminCouponsMutations.ts` |

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
| Superadmin Coupons | `/superadmin/saas-billing/coupons` | create coupon; delete coupon; open history; share whats app; submit; toggle restore; toggle status; update coupon | `SuperadminCouponsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/saas-billing/coupons route to load the Coupons data context securely via TanStack Query.
2. Interact with the Coupons dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Coupons status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `saas-billing/coupons`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `coupons_utils/useSuperadminCouponsMutation.ts`, `coupons_utils/useSuperadminCouponsMutations.ts`, `coupons_utils/useSuperadminCouponRedemptions.ts`, `coupons_utils/useSuperadminCoupons.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'coupons', 'redemptions', couponId]`

## API Contract

- **API files:** `coupons_api/SuperadminCouponsApi.ts`
- **Detected API symbols:** `fetchCoupons` — `coupons_api/SuperadminCouponsApi.ts`; `createCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `updateCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `deleteCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `restoreCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `updateCouponStatus` — `coupons_api/SuperadminCouponsApi.ts`; `fetchRedemptions` — `coupons_api/SuperadminCouponsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `coupons_components/SuperadminCouponModal.tsx`, `coupons_components/SuperadminCouponEditModal.tsx`, `coupons_components/SuperadminCouponsRedemptionDrawer.tsx`, `coupons_components/SuperadminCouponsDateFilterDropdown.tsx`, `coupons_components/SuperadminCouponsClient.tsx`, `coupons_components/SuperadminCouponsStatsBar/SuperadminCouponsStatsBar.tsx`, `coupons_components/SuperadminCouponsEmptyState/SuperadminCouponsEmptyState.tsx`, `coupons_components/SuperadminCouponsStatusBadge/SuperadminCouponsStatusBadge.tsx`, `coupons_components/SuperadminCouponsHeader/SuperadminCouponsHeader.tsx`, `coupons_components/SuperadminCouponsTable/SuperadminCouponsTableRow.tsx`, `coupons_components/SuperadminCouponsTable/SuperadminCouponsTable.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 2

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `coupons_components/SuperadminCouponsEmptyState/SuperadminCouponsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the coupons page. Renders the interactive client component. |
| `coupons_components/SuperadminCouponModal.tsx` | Renders the Create Coupon modal form. Receives form state via props from useCouponsPage. No API calls. |
| `coupons_components/SuperadminCouponEditModal.tsx` | Renders the Edit Coupon modal form. Manages its own local form state via React Hook Form. No API calls — delegates save to onSubmit prop. |
| `coupons_components/SuperadminCouponsRedemptionDrawer.tsx` | Renders the coupon redemption history drawer using the feature-owned redemption query. |
| `coupons_components/SuperadminCouponsDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports). |
| `coupons_components/SuperadminCouponsClient.tsx` | Root orchestrator for the Coupons page. Composes isolated sub-components and passes state from useSuperadminCoupons. No business logic here. |
| `coupons_components/SuperadminCouponsStatsBar/SuperadminCouponsStatsBar.tsx` | Renders the KPI stat cards (Active Coupons, Total Redeemed) for the Coupons page. Purely presentational â€” receives data via props. |
| `coupons_components/SuperadminCouponsEmptyState/SuperadminCouponsEmptyState.tsx` | Renders the empty state UI for the Coupons table when no coupons exist. Shows icon, message, and CTA to create first coupon. |
| `coupons_components/SuperadminCouponsStatusBadge/SuperadminCouponsStatusBadge.tsx` | Renders the status badge pill for a single coupon. Purely presentational — maps CouponStatus to design system colors. |
| `coupons_components/SuperadminCouponsHeader/SuperadminCouponsHeader.tsx` | Renders the page title, search input, and "Create Coupon" CTA button for the Coupons page. Receives all state via props â€” no API calls. |
| `coupons_components/SuperadminCouponsTable/SuperadminCouponsTableRow.tsx` | Renders a single row in the Coupons data table. Handles row-level action buttons with stopPropagation. Purely presentational. |
| `coupons_components/SuperadminCouponsTable/SuperadminCouponsTable.tsx` | Renders the Coupons data table shell (header row + rows). Delegates each row to CouponsTableRow. No API calls. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into coupons.
- **Destructive Actions**: Any deletion or modification of coupons records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for coupons do not expose cross-tenant sensitive data.

### Request Shape
No frontend-derived request shape is assigned to this module root; the module is an infrastructure/container boundary.

### Response Shape
No frontend-derived response shape is assigned to this module root; the module is an infrastructure/container boundary.

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `coupons_components/SuperadminCouponModal.tsx`, `coupons_components/SuperadminCouponEditModal.tsx`, `coupons_components/SuperadminCouponsRedemptionDrawer.tsx`, `coupons_components/SuperadminCouponsDateFilterDropdown.tsx`, `coupons_components/SuperadminCouponsClient.tsx`, `coupons_components/SuperadminCouponsStatsBar/SuperadminCouponsStatsBar.tsx`, `coupons_components/SuperadminCouponsEmptyState/SuperadminCouponsEmptyState.tsx`, `coupons_components/SuperadminCouponsStatusBadge/SuperadminCouponsStatusBadge.tsx`, `coupons_components/SuperadminCouponsHeader/SuperadminCouponsHeader.tsx`, `coupons_components/SuperadminCouponsTable/SuperadminCouponsTableRow.tsx`, `coupons_components/SuperadminCouponsTable/SuperadminCouponsTable.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 2

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.


### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## Rule Compliance Checklist


- [ ] Rule 7: TypeORM is the sole ORM and is used behind repositories.
- [ ] Rule 19: This feature doc updates with feature changes.
- [ ] Rule 28: Responses use the canonical envelope.
- [ ] Rule 29: Soft deletes only.
- [ ] Rule 31: Idempotency on applicable critical mutations.
- [ ] Rule 48: Separate query/command controllers.
- [ ] Rule 56: `findByIdOrThrow()` for fail-fast reads.
- [ ] Rule 62: Explicit service/repository return types.
- [ ] Rule 82A: Response DTO must remain complete against frontend UI data requirements.
- [ ] Rule 83: RBAC at controller layer.
- [ ] Rule 85: Guard clauses and low conditional nesting.
- [ ] Rule 89: ORM entities do not cross into business logic.
- [ ] Rule 92: Query fields validated by allowlists.
- [ ] Rule 99: Named repository mutation methods only.
- [ ] Rule 100: Explicit named DB constraints in migrations.
- [ ] Rule 101: Tests must prove observable behavior.

