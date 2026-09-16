# Manager Store — Feature Map

## Module Purpose
Manager Store is the branch inventory and POS workspace. Managers can browse/search/filter products, review orders and store KPIs, create/update/delete products, create orders, and inspect low-stock inventory. Store products, orders and summary data are server state owned by this module. Product and order mutations require validation and authoritative response reconciliation.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `store_api/` | Feature-owned responsibility for the store module. | `ManagerStoreApi.ts; ManagerStoreServerApi.ts` |
| `store_components/` | Feature-owned responsibility for the store module. | `—` |
| `store_context/` | Feature-owned responsibility for the store module. | `ManagerStoreContext.tsx; ManagerUseManagerStoreLogic.ts; ManagerUseManagerStoreOrder.ts; ManagerUseManagerStoreProducts.ts; ManagerUseManagerStoreQueries.ts` |
| `store_fixtures/` | Feature-owned responsibility for the store module. | `ManagerStoreMockData.ts` |
| `store_mocks/` | Feature-owned responsibility for the store module. | `—` |
| `store_types/` | Feature-owned responsibility for the store module. | `ManagerStoreSchema.ts; ManagerStoreTypes.ts` |
| `store_utils/` | Feature-owned responsibility for the store module. | `ManagerStoreSharedConstants.ts` |

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

## Data and State Architecture
TanStack Query owns store server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. React Context is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

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
- **Quantity, price and stock inputs need schema constraints plus min/max/step where applicable:** Quantity, price and stock inputs need schema constraints plus min/max/step where applicable.
- **Product deletion is destructive and requires confirmation:** Product deletion is destructive and requires confirmation.
- **Order creation is financial and must not optimistically invent totals after submission:** Order creation is financial and must not optimistically invent totals after submission.
- **Store summary low-stock records are a server response, not a UI constant:** Store summary low-stock records are a server response, not a UI constant.
- **Pagination and search parameters must be explicitly propagated to the API wrapper:** Pagination and search parameters must be explicitly propagated to the API wrapper.
- **Product/order numeric values use formatCurrency/formatNumber rather than raw concatenation:** Product/order numeric values use formatCurrency/formatNumber rather than raw concatenation.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `store/store_components/ManagerStoreFilters/ManagerStoreFilters.tsx` | Renders the Manager StoreFilters presentation layer for the Manager module. |
| `store/store_components/ManagerStoreKPIs/ManagerStoreKPIs.tsx` | Renders the top KPI stat cards (total products, orders, revenue) for the Store module. |
| `store/store_components/ManagerStoreMain/ManagerStoreMain.tsx` | Entry component for the Store module. Wraps the UI in the context provider and handles page layout. |
| `store/store_components/ManagerStoreOrderTable/ManagerStoreOrderTable.tsx` | Renders the paginated order history table with status badges and customer info. |
| `store/store_components/ManagerStorePosModal/ManagerStorePosModal.tsx` | Point-of-sale modal for processing a new product sale/order in the Store module. |
| `store/store_components/ManagerStoreProductGrid/ManagerStoreProductGrid.tsx` | Renders the product cards grid with stock status, price, and quick-action buttons. |
| `store/store_components/ManagerStoreProductModal/ManagerStoreProductModal.tsx` | Form modal for creating or editing a gym store product in the Store module. |
| `store/store_components/ManagerStoreToolbar/ManagerStoreToolbar.tsx` | Renders the search input, category filter, and Add Product CTA for the Store module. |
| `store/store_context/ManagerStoreContext.tsx` | Provides UI orchestration state to the Store module hierarchy. Async data is managed in useManagerStoreLogic. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
