# Manager Store — Feature Map

## Module Purpose
The Manager Store module is responsible for managing Point of Sale (POS) operations, including products, inventory management, and order history. It uses URL state for sorting and filtering, and routes all API calls through MSW during development/testing.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for layout |
| `error.tsx` | Route-level error boundary |
| `store_components/ManagerStoreMain.tsx` | Main orchestrator component |
| `store_components/ManagerStoreProductGrid.tsx` | Display products with stock indicators |
| `store_components/ManagerStoreOrderTable.tsx` | List of past orders with receipt generation |
| `store_components/ManagerStorePosModal.tsx` | Add-to-cart and checkout flow |
| `store_context/ManagerUseManagerStoreLogic.ts` | URL and local state orchestration |
| `store_context/ManagerUseManagerStoreQueries.ts` | Data fetching and local filtering |
| `store_context/ManagerUseManagerStoreProducts.ts` | Product mutation operations |
| `store_context/ManagerUseManagerStoreOrder.ts` | Order placement logic |
| `store_api/ManagerStoreApi.ts` | HTTP client using `apiFetch` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Products Grid | `/manager/store` | Display products | `GET /manager/store/products` | ✅ Live |
| POS Checkout | `/manager/store` | Process new orders | `POST /manager/store/orders` | ✅ Live |
| Order History | `/manager/store` | List past orders | `GET /manager/store/orders` | ✅ Live |

## Data and State Architecture
- **Server-state:** Fetched via `storeApi` inside `ManagerUseManagerStoreQueries.ts`. No client-generated Order IDs or Product IDs — backend/MSW owns all IDs.
- **Client-state (Sync):** URL query parameters (`?tab=`, `?page=`, `?search=`, `?categoryFilter=`, `?stockFilter=`).
- **Context providers:** `ManagerStoreContext` for shared state.

## MSW Mock Layer
- **Handler file**: `src/mocks/store_mocks/handlers/ManagerStoreMockHandlers.ts`
- All products, orders, and summary endpoints are intercepted by MSW.
- `ManagerStoreApi.ts` uses `apiFetch` exclusively — **no direct mock data imports**.
- Mock data lives only in `store_fixtures/ManagerStoreMockData.ts` and is referenced only by MSW handlers.

## Query Keys
- `['manager', 'store', 'products', params]`: Product list.
- `['manager', 'store', 'orders', params]`: Order history.
- `['manager', 'store', 'summary']`: Revenue summary stats.

## Loading, Empty, Error States
- **Loading:** Route-level `loading.tsx` and custom pulse skeletons in components.
- **Empty:** "No products found" and "No orders found" states.
- **Error:** Route-level `error.tsx`. Toast errors from `res.message` only (never hardcoded).

## Edge Cases / AI Warnings
- **No Frontend ID Generation**: Order IDs and Product IDs must come from the backend/MSW response. Never use `Date.now()` or `crypto.randomUUID()` to generate them on the frontend.
- **WhatsApp Integration:** Generates predefined text strings. Ensure all prices passed to the text generator are formatted using `@/lib/formatters`.
- **URL sync:** Filters sync directly to URL via `ManagerUseManagerStoreLogic.ts`. Never filter/paginate client-side for list views.
- **Any Types:** Completely forbidden. All store types are in `store_types/ManagerStoreTypes.ts`.
- **Null Safety:** Always use optional chaining (`ordersRes.data?.orders`) when accessing API response data.
