# Finance Module - Backend Feature Documentation

## Overview
The Finance Module manages the Gym's financial transactions, member payments, and the dynamic dashboard revenue charts. It ensures accurate ledgering of payments and strict tracking of `paidAmount` and `pendingAmount` across members.

## Folder Structure & File Responsibilities

### `controllers/`
- **`payment.controller.ts`**: Handles the `POST /api/finance/payments` and `GET` requests for pulling payment logs.
- **`finance-summary.controller.ts`**: Manages `GET /api/finance/summary` which provides the heavily aggregated revenue data needed for the admin dashboard (e.g., Monthly Revenue, Revenue by Method, etc.).

### `services/`
- **`payment.service.ts`**: Validates the payload against `CreatePaymentDto` and ensures the member exists before attempting to process the payment.
- **`finance-summary.service.ts`**: A dedicated read-only aggregation layer. 
- **`finance.repository.ts`**: A highly advanced TypeORM wrapper. This file implements complex `QueryBuilder` syntax (`SUM`, `GROUP BY`) to aggregate revenue dynamically without fetching raw arrays into NodeJS memory, protecting the server from crashes under high load. It also uses TypeORM's `queryRunner` to safely conduct cross-table transactions between `Payment` and `Member`.

### `dto/`
- **`create-payment.dto.ts`**: Enforces strict boundaries (e.g. `amount` must be greater than 0, `method` must be defined).

### Module Root
- **`entities/payment.entity.ts`**: The TypeORM schema for a Payment. Primary Key `id` is a `uuid` string. The `memberId` foreign key relies on `uuid`.
- **`finance.constants.ts`**: Unified response messages for API success blocks.
- **`finance.exceptions.ts`**: Domain-specific errors, explicitly `MemberNotFoundForPaymentException` and `PaymentProcessingException`.

## Core Logic & Workflows

1. **Transactional Database Processing**: When a payment is processed (`processPayment` in `finance.repository.ts`), we use TypeORM's `QueryRunner` to begin a transaction. We insert the `Payment` record and atomically subtract the payment `amount` from the `Member.pendingAmount`, while adding it to `Member.paidAmount`. If the update fails mid-way, the transaction rolls back, guaranteeing zero financial discrepancies.
2. **Dynamic Chart Aggregation**: The `getSummary` endpoint computes dynamic arrays (like `revenueByMethod` and `monthlyData`) by directly commanding the SQL engine to `GROUP BY payment.method` and `SUM(payment.amount)`. This is infinitely faster than using JavaScript `.reduce()`.
