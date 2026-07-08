# Store Module Features & Architecture

## Overview
The Store module (`app/(erp)/store`) is the gym's Point of Sale (POS) and inventory management system. It allows staff to manage products (supplements, equipment, merch), track inventory levels (with low-stock alerts), place orders via the POS modal, and generate thermal receipts.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `store_components/`
- `StoreKPIs/StoreKPIs.tsx`: Renders the top summary cards (Total Products, Orders, Revenue) and the dynamic low-stock alert banner.
- `StoreToolbar/StoreToolbar.tsx`: Houses the tab navigation ('Products' vs 'Orders') and the action buttons for refreshing, adding products, or opening the POS.
- `ProductGrid/ProductGrid.tsx`: Displays the catalog of products as cards with their price, stock level, and edit/delete actions.
- `OrderTable/OrderTable.tsx`: Renders the history of placed orders with the ability to re-print receipts.
- `ProductModal/ProductModal.tsx`: A self-contained modal form for creating or editing a product.
- `PosModal/PosModal.tsx`: The complex Point of Sale modal. It manages the active cart, allows adding/removing items, calculates totals, handles checkout, and triggers the receipt print flow.

### 2. `store_context/`
- `StoreContext.tsx`: The heavy-lifter of the module. It centralizes all state (products, orders, summary, modal visibility, active cart, and print data) and manages all API calls to `storeApi`. This eliminates prop drilling completely.

### 3. `store_utils/`
- `StoreSharedConstants.ts`: Centralizes static data like `CATEGORIES`, `PAYMENT_METHODS`, the currency formatter function, and the empty product form schema.

### 4. Root Files
- `page.tsx`: Initializes the `StoreProvider` and acts as the structural wrapper, cleanly rendering the modular components based on the active tab state.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features providing a smooth skeleton loading state and error boundary.
- `store.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--store-bg-card`) ensuring theme independence.
