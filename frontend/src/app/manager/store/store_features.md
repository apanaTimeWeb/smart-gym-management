# Manager Store — Feature Map

## Module Purpose
The Manager Store module is responsible for managing Point of Sale (POS) operations, including products, inventory, and order history. It uses URL state for sorting and filtering, and processes transactions locally.

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
| `store_context/useManagerStoreLogic.ts` | URL and local state logic |
| `store_api/ManagerStoreApi.ts` | API calls |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Products Grid | `/manager/store` | Display products | `GET /manager/store/products` | ✅ Live |
| POS Checkout | `/manager/store` | Process new orders | `POST /manager/store/orders` | ✅ Live |
| Order History | `/manager/store` | List past orders | `GET /manager/store/orders` | ✅ Live |

## Data and State Architecture
- **Server-state:** Handled locally with hardcoded fixtures for now. (No TanStack Query yet, uses `storeApi` wrapped in custom hook).
- **Client-state (Sync):** URL query parameters (`?tab=`, `?page=`, `?search=`, `?categoryFilter=`).
- **Context providers:** `ManagerStoreContext` for shared state.

## Loading, Empty, Error States
- **Loading:** Route-level `loading.tsx` and custom pulse skeletons in components.
- **Empty:** "No products found" and "No orders found" states.
- **Error:** Route-level `error.tsx`.

## Edge Cases / AI Warnings
- **WhatsApp Integration:** Generates predefined text strings. Ensure all prices passed to the text generator are formatted using `@/lib/formatters`.
- **URL sync:** Filters sync directly to URL via `useManagerStoreLogic.ts`.
- **Any Types:** Completely forbidden. `confirm` must be properly typed.
