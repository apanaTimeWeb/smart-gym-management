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

## Complex Workflows
- **Order Creation**: `create-order.service.ts` uses TypeORM `DataSource` transaction to ensure stock decrement and order creation are atomic.
