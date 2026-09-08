# Manager Store — Feature Map

## Module Purpose
The Manager Store module manages the gym's retail store — products (supplements, merchandise,
equipment accessories) and orders. It provides product CRUD, inventory tracking, and order
management. Low-stock alerts are shown as warning badges. All prices are stored and
transmitted as paise integers.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for tabs + table |
| `error.tsx` | Error boundary |
| `store_components/ManagerStoreMain.tsx` | Root Client Component, tab switcher (Products / Orders) |
| `store_components/ManagerStoreProductsTable.tsx` | Paginated products table |
| `store_components/ManagerStoreOrdersTable.tsx` | Paginated orders table |
| `store_components/ManagerStoreAddProductModal.tsx` | Add new product form |
| `store_components/ManagerStoreEditProductModal.tsx` | Edit product form |
| `store_context/StoreProvider.tsx` | Fetch state for products + orders |
| `store_types/ManagerStoreTypes.ts` | `Product`, `Order`, `CreateProductDto` types |
| `store_api/ManagerStoreApi.ts` | API wrappers |
| `store_utils/ManagerStoreUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Products List | `/manager/store` | View all products + stock levels | `GET /manager/store/products` | ✅ Live |
| Add Product | `/manager/store` | Create new product | `POST /manager/store/products` | ✅ Live |
| Edit Product | `/manager/store` | Update product details/price/stock | `PATCH /manager/store/products/:id` | ✅ Live |
| Delete Product | `/manager/store` | Remove product | `DELETE /manager/store/products/:id` | ✅ Live |
| Orders List | `/manager/store` | View all store orders | `GET /manager/store/orders` | ✅ Live |

## Data and State Architecture
- Server-state: `StoreProvider` — products list, orders list, active tab
- Zustand stores: `useManagerStoreStore` — modal open/close, selected product
- Context providers: `StoreProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/store` → Products tab loads with inventory table
2. Manager clicks "Add Product" → `ManagerStoreAddProductModal` → submit → `POST` → table refreshes
3. Manager clicks a product row → `ManagerStoreEditProductModal` opens with pre-filled data
4. Manager switches to Orders tab → orders table loads
5. Manager deletes product → `useConfirm()` → `DELETE` → table refreshes

## Component Responsibility Map
- `ManagerStoreMain` — tab switcher + provider. MUST NOT contain table logic.
- `ManagerStoreProductsTable` — pure display. Low-stock badge uses `--warning` token.
- `ManagerStoreAddProductModal` / `ManagerStoreEditProductModal` — own React Hook Form + Zod state.

## Permissions and Security
| Action | Required Role |
|---|---|
| View products / orders | `MANAGER` |
| Add / Edit product | `MANAGER` |
| Delete product | `MANAGER` — requires `useConfirm()` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — tab skeleton + 8-row table skeleton
- **Empty:** "No products in store" with "Add Product" CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Low-stock badge** — products with `stock <= lowStockThreshold` must show a `--warning` badge. Threshold value comes from product data, not hardcoded.
- **Currency formatting** — prices arrive as paise integers. Always use `formatCurrency()` from `@/lib/formatters`.
- **Delete blocked if active orders** — API returns `400` with descriptive `message`. Surface via toast.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in context, form in modals
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 21: Currency formatted via `formatters.ts`
- [x] Rule 71: Delete uses `useConfirm()` double-verification
