# Manager Store — Feature Map

## Module Purpose
Manager Store is the branch inventory and POS workspace. Managers can browse/search/filter products, review orders and store KPIs, create/update/delete products, create orders, and inspect low-stock inventory. Store products, orders and summary data are server state owned by this module. Product and order mutations require validation and authoritative response reconciliation.

Module root: `frontend_manager/manager_store/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `date-fns`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-dom`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | query |
| Read | Exposed | ManagerStoreApi: fetchProducts, fetchOrders, fetchStoreSummary. |
| Update | Exposed | ManagerStoreApi |
| Delete | Exposed | ManagerStoreApi |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_store_api/` | Owns feature API clients and request/response transport contracts. | `ManagerStoreApi.ts` |
| `manager_store_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_store_components/manager_store_filters/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStoreFilters.tsx` |
| `manager_store_components/manager_store_kpis/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStoreKPIs.tsx` |
| `manager_store_components/manager_store_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStoreMain.tsx` |
| `manager_store_components/manager_store_main/manager_store_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStoreContent.tsx` |
| `manager_store_components/manager_store_order_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStoreOrderTable.tsx` |
| `manager_store_components/manager_store_pos_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStorePosModal.tsx` |
| `manager_store_components/manager_store_product_grid/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStoreProductGrid.tsx` |
| `manager_store_components/manager_store_product_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStoreProductModal.tsx` |
| `manager_store_components/manager_store_thermal_receipt/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStoreThermalReceipt.module.css`, `ManagerStoreThermalReceipt.tsx` |
| `manager_store_components/manager_store_toolbar/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStoreToolbar.tsx` |
| `manager_store_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerStoreConstants.ts`, `ManagerStoreQueryKeys.ts`, `ManagerStoreSharedConstants.test.ts`, `ManagerStoreSharedConstants.ts` |
| `manager_store_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerStoreLogic.test.ts`, `useManagerStoreLogic.ts`, `useManagerStoreOrder.test.ts`, `useManagerStoreOrder.ts`, `useManagerStoreProductForm.test.ts`, `useManagerStoreProductForm.ts`, `useManagerStoreProducts.test.ts`, `useManagerStoreProducts.ts` (+2 more) |
| `manager_store_locales/` | Owns module English and Hindi translation catalogs. | `manager_store_en.json`, `manager_store_hi.json` |
| `manager_store_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_store_mocks/manager_store_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStoreMockData.ts` |
| `manager_store_mocks/manager_store_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerStoreMockHandlers.ts` |
| `manager_store_schemas/` | Owns feature Zod validation and response schemas. | `ManagerStoreProductFormSchema.ts`, `ManagerStoreSchema.ts` |
| `manager_store_store/` | Owns module-scoped Zustand UI state only. | `useManagerStoreUiStore.test.ts`, `useManagerStoreUiStore.ts` |
| `manager_store_tests/` | Owns module behavior and utility tests. | `ManagerStoreBehavior.test.tsx` |
| `manager_store_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerStoreProductFormTypes.ts`, `ManagerStoreThermalReceiptTypes.ts`, `ManagerStoreTypes.ts` |
| `manager_store_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerStoreFormatters.test.ts`, `ManagerStoreFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_store_features.md`
- `manager_store_forbidden.md`
- `manager_store_theme_contract.md`
- `manager_store_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/components/ui/manager_toast/ManagerToast`
- `@/components/ui/manager_confirm_modal/ManagerConfirmModalTypes`
- `@/components/ui/manager_toast/ManagerToastTypes`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerGymIdentity`
- `@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerMoney`
- `@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults`
- `@/app/frontend_manager/manager_infrastructure/ManagerToastService`
- `@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`
- `@/lib/useDateRangeSuffix`
- `@/lib/whatsapp_formatter`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@hookform`
- `@tanstack`
- `@testing-library/react`
- `@testing-library/user-event`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-dom`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchProducts | `/manager/store` | Uses the fetchProducts workflow with typed request/response handling. | `GET /manager/store/products` | ✅ Implemented |
| createProduct | `/manager/store` | Uses the createProduct workflow with typed request/response handling. | `POST /manager/store/products` | ✅ Implemented |
| updateProduct | `/manager/store` | Uses the updateProduct workflow with typed request/response handling. | `PATCH /manager/store/products/:id` | ✅ Implemented |
| deleteProduct | `/manager/store` | Uses the deleteProduct workflow with typed request/response handling. | `DELETE /manager/store/products/:id` | ✅ Implemented |
| fetchOrders | `/manager/store` | Uses the fetchOrders workflow with typed request/response handling. | `GET /manager/store/orders` | ✅ Implemented |
| createOrder | `/manager/store` | Uses the createOrder workflow with typed request/response handling. | `POST /manager/store/orders` | ✅ Implemented |
| fetchStoreSummary | `/manager/store` | Uses the fetchStoreSummary workflow with typed request/response handling. | `GET /manager/store/summary` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Manage inventory
1. Manager searches and filters the product catalog.
2. fetchProducts(params) sends server-side search/category/stock/pagination/sort state.
3. MSW filters/sorts/paginates module fixtures and returns totals.
4. The product grid renders the response and mutations reconcile the Query cache.
### Flow 2: Create order
1. Manager selects products in the POS flow.
2. Quantities and prices are validated before submit.
3. createOrder(payload) sends the order to the module API.
4. The authoritative Order response updates orders/summary state and the backend message is displayed.

## Component Tree

- Route: `manager_store/page.tsx`
  - `<ManagerStoreMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_store_store/useManagerStoreUiStore.ts`, `manager_store_store/useManagerStoreUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'store', 'products']`; `['manager', 'store', 'orders']`; `['manager', 'store', 'summary']`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_store/manager_store_mocks/manager_store_mocks_handlers/` and `manager_store/manager_store_mocks/manager_store_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchProducts` | `GET` | `/api/v1/manager/store/products` | `{ page?, limit?, search?, category?, stock?, sortOrder? }` | `{ products: Product[]; total: number }` |
| `createProduct` | `POST` | `/api/v1/manager/store/products` | `Partial<Product>` | `Product` |
| `updateProduct` | `PATCH` | `/api/v1/manager/store/products/:id` | `{ id: string; body: Partial<Product> }` | `Product` |
| `deleteProduct` | `DELETE` | `/api/v1/manager/store/products/:id` | `{ id: string }` | `{ id: string }` |
| `fetchOrders` | `GET` | `/api/v1/manager/store/orders` | `{ page?, limit?, search?, startDate?, endDate? }` | `{ orders: Order[]; total: number }` |
| `createOrder` | `POST` | `/api/v1/manager/store/orders` | `{ items; method; notes?; customerName?; total?; status? }` | `Order` |
| `fetchStoreSummary` | `GET` | `/api/v1/manager/store/summary` | `—` | `StoreSummary` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total products | `totalProducts` | `/api/v1/manager/store/summary` | `data.totalProducts` | No | Yes |
| KPI: Total orders | `totalOrders` | `/api/v1/manager/store/summary` | `data.totalOrders` | No | Yes |
| KPI: Store revenue | `totalRevenue` | `/api/v1/manager/store/summary` | `data.totalRevenue` | No | Yes |
| KPI: Low stock products | `lowStockProducts[]` | `/api/v1/manager/store/summary` | `data.lowStockProducts[]` | No | Yes |
| Product: Name | `name` | `/api/v1/manager/store/products` | `data.products[].name` | No | Yes |
| Product: Category | `category` | `/api/v1/manager/store/products` | `data.products[].category` | No | Yes |
| Product: Price | `price` | `/api/v1/manager/store/products` | `data.products[].price` | No | Yes |
| Product: Stock | `stock` | `/api/v1/manager/store/products` | `data.products[].stock` | No | Yes |
| Product: Unit | `unit` | `/api/v1/manager/store/products` | `data.products[].unit` | Yes | Yes |
| Product: SKU | `sku` | `/api/v1/manager/store/products` | `data.products[].sku` | Yes | Yes |
| Order: ID | `id` | `/api/v1/manager/store/orders` | `data.orders[].id` | No | Yes |
| Order: Total | `total` | `/api/v1/manager/store/orders` | `data.orders[].total` | No | Yes |
| Order: Method | `method` | `/api/v1/manager/store/orders` | `data.orders[].method` | No | Yes |
| Order: Status | `status` | `/api/v1/manager/store/orders` | `data.orders[].status` | No | Yes |
| Order: Created at | `createdAt` | `/api/v1/manager/store/orders` | `data.orders[].createdAt` | No | Yes |
| Order: Items | `items[]` | `/api/v1/manager/store/orders` | `data.orders[].items[]` | Yes | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **UI guard:** `ManagerPermissionGate` provides the Manager workspace capability boundary; module-specific permissions remain documented at the feature level when applicable.
- **Critical actions:** destructive/financial actions use explicit confirmation and server-authoritative responses.
- **Sensitive data:** list views use masking/display rules appropriate to the data type.
- **Cross-role isolation:** no business imports from other role roots or unrelated business modules.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-matching skeleton.
- Data sections use dedicated inline skeletons while TanStack Query is pending.
- Entity lists provide module-specific empty-state UI where the entity is user-browsable.
- Module `error.tsx` provides a safe retry fallback and does not expose raw backend/stack-trace text.

## Edge Cases and AI Warnings
**Forbidden-pattern contract:** See `manager_store_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Quantity, price and stock inputs need schema constraints plus min/max/step where applicable:** Quantity, price and stock inputs need schema constraints plus min/max/step where applicable.
- **Product deletion is destructive and requires confirmation:** Product deletion is destructive and requires confirmation.
- **Order creation is financial and must not optimistically invent totals after submission:** Order creation is financial and must not optimistically invent totals after submission.
- **Store summary low-stock records are a server response, not a UI constant:** Store summary low-stock records are a server response, not a UI constant.
- **Pagination and search parameters must be explicitly propagated to the API wrapper:** Pagination and search parameters must be explicitly propagated to the API wrapper.
- **Product/order numeric values use formatCurrencyFromMinorUnits/formatNumber rather than raw concatenation:** Product/order numeric values use formatCurrencyFromMinorUnits/formatNumber rather than raw concatenation.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_store/manager_store_components/manager_store_filters/ManagerStoreFilters.tsx` | Renders the Store Filters section and keeps presentation concerns separate from API/mutation ownership. |
| `manager_store/manager_store_components/manager_store_kpis/ManagerStoreKPIs.tsx` | Renders the top KPI stat cards (total products, orders, revenue) for the Store module. |
| `manager_store/manager_store_components/manager_store_main/ManagerStoreMain.tsx` | Framework entry component for the Store module; delegates feature behavior and UI composition to `ManagerStoreContent`. |
| `manager_store/manager_store_components/manager_store_order_table/ManagerStoreOrderTable.tsx` | Renders the paginated order history table with status badges and customer info. |
| `manager_store/manager_store_components/manager_store_pos_modal/ManagerStorePosModal.tsx` | Point-of-sale modal for processing a new product sale/order in the Store module. |
| `manager_store/manager_store_components/manager_store_product_grid/ManagerStoreProductGrid.tsx` | Renders the product cards grid with stock status, price, and quick-action buttons. |
| `manager_store/manager_store_components/manager_store_product_modal/ManagerStoreProductModal.tsx` | Form modal for creating or editing a gym store product in the Store module. |
| `manager_store/manager_store_components/manager_store_toolbar/ManagerStoreToolbar.tsx` | Renders the search input, category filter, and Add Product CTA for the Store module. |
| `manager_store/manager_store_hooks/useManagerStoreLogic.ts` | Provides UI orchestration state to the Store module hierarchy. Async data is managed in useManagerStoreLogic. |
| `manager_store_components/manager_store_main/manager_store_content/ManagerStoreContent.tsx` | Composes the Store Content content sections while keeping data/state orchestration outside the view layer. |
| `manager_store_components/manager_store_thermal_receipt/ManagerStoreThermalReceipt.tsx` | Renders the printable Store Thermal Receipt output using module-owned data and print-safe structure. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_STORE`
- Active locales: `en`, `hi`
- English catalog: `manager_store/manager_store_locales/manager_store_en.json`
- Hindi catalog: `manager_store/manager_store_locales/manager_store_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerStoreMain.tsx`
- Primary query-key registry: `ManagerStoreQueryKeys.ts`
- Primary module constants registry: `ManagerStoreConstants.ts`
- Canonical schema file: `ManagerStoreSchema.ts` in `manager_store_schemas/`
- Module theme contract: `manager_store_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_store_components/manager_store_main/ManagerStoreMain.tsx` | YES |
| API client | `ManagerStoreApi.ts` | YES |
| Schema file | `ManagerStoreSchema.ts` | YES |
| Query-key registry | `ManagerStoreQueryKeys.ts` | YES |
| Constants registry | `ManagerStoreConstants.ts` | YES |
| URL config | `manager_store_url_config.ts` | YES |
| Behavior test | `ManagerStoreBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_store_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_store/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_store/manager_store_mocks/manager_store_mocks_fixtures/` and `manager_store/manager_store_mocks/manager_store_mocks_handlers/`.
- External application infrastructure is limited to documented zero-business/global providers and the host transport/runtime boundary.

### Verification boundary

- Source-level structural checks can be performed from the supplied artifact.
- Production build, real TypeScript project type-check, browser click-through, Tailwind/global CSS verification, dependency/SCA/secret scans, and CI/CODEOWNERS enforcement require the host repository configuration and therefore remain NOT VERIFIED when absent from the supplied ZIP.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

## Routes
- Canonical route file: `page.tsx` in this feature module.
- Route-specific loading/error/not-found files, where present, remain physically owned by this module.

## API Contract Summary
- Canonical module API files live under the module-owned `_api` folder.
- API paths are defined by the module-owned `*_url_config.ts`; mutation methods require the documented idempotency-key contract.

## State Map
- Server state → TanStack Query.
- Shared UI/client state → module-scoped Zustand.
- Component-private state → local React state.
- Shareable list filters/search/pagination → URL state where applicable.

## External Dependencies
- Only approved global application infrastructure/UI primitives and documented third-party packages may cross the feature boundary.
- No sibling feature business implementation is an external dependency.

## Known Forbidden Patterns
- See the module-owned `*_forbidden.md` for the complete forbidden-pattern contract.
- Business logic must remain inside this feature module; global UI remains zero-business.

## Testing and Verification
- Module tests live under the module-owned test folders and alongside custom hooks/utilities as required.
- MSW fixtures/handlers are module-owned.
- Playwright E2E lives under the role-isolated `playwright_e2e/frontend_manager_e2e/<module>/` tree.
