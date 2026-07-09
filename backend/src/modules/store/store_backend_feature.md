# Store Module

## Overview
The Store module handles products inventory and customer orders (POS system).

## Folder Structure
- `controllers/`: Handles HTTP requests, deeply split by feature.
  - `create-product.controller.ts`: Create product.
  - `find-product.controller.ts`: Fetch products.
  - `update-product.controller.ts`: Update/Remove product.
  - `create-order.controller.ts`: Place an order.
  - `find-order.controller.ts`: List orders.
  - `store-summary.controller.ts`: Fetch store KPI dashboard.
- `services/`: Business logic.
  - `create-order.service.ts`: Handles the transaction logic for decrementing stock and saving order lines.
- `dto/`: Data Transfer Objects for validation.
- `entities/`: TypeORM entities.
- `store.repository.ts`: Database query layer for Store features.
- `store.interfaces.ts`: Typings.
- `store.constants.ts`: Error messages, statuses, etc.
- `store.exceptions.ts`: Custom exceptions.

## Core Business Logic
- **Order Creation Transactions:** `create-order.service.ts` uses TypeORM `DataSource` transactions to ensure stock decrement and order creation are atomic. If stock is insufficient or any error occurs, the entire operation is rolled back, preventing orphaned order records or negative stock.
- **Stock Decrement Logic:** For each `OrderItem` in the order, the corresponding `Product`'s stock is checked. If it is greater than or equal to the requested quantity, the stock is decremented. Otherwise, an exception is thrown.
- **Order & OrderItem Relationship:** An `Order` entity is the parent containing the total amount and metadata. It has a one-to-many relationship with `OrderItem` entities, which track the specific products, quantities, and historical prices at the time of purchase.
