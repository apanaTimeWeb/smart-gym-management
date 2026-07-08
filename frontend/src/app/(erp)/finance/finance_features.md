# Finance Module Features & Architecture

## Overview
The Finance module (`app/(erp)/finance`) provides the main hub for tracking gym revenue, recording payments, and monitoring the financial health of the gym.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `finance_components/`
Contains heavily isolated micro-components. Each file serves exactly one purpose and is highly descriptive:
- `FinanceKPIs/FinanceKPIs.tsx`: Renders the top statistical financial cards.
- `RevenueByMethod/RevenueByMethod.tsx`: Renders the breakdown of revenue by payment methods (UPI, Cash, Card, etc.).
- `FinanceTabs/FinanceTabs.tsx`: Orchestrates the tab switching logic between the detailed Payments Table and the Revenue Summary chart.
- `PaymentsTable/PaymentsTable.tsx`: Displays the detailed list of past payments (loaded conditionally under the "Payments" tab).
- `RevenueSummary/RevenueSummary.tsx`: Displays a visual bar chart of monthly revenue (loaded conditionally under the "Summary" tab).
- `AddPaymentModal/AddPaymentModal.tsx`: A form modal to record a new payment. Contains its own local form state.

### 2. `finance_context/`
- `FinanceContext.tsx`: The single source of truth for the module's core data. It orchestrates the API calls (`financeApi.getPayments` and `financeApi.getSummary`) and provides the `payments`, `summary`, and UI states (`loading`, `showModal`, `toast`) via the `useFinanceContext` hook.

### 3. `finance_utils/`
- `FinanceSharedConstants.ts`: Centralizes backend-ready hardcoded arrays such as `FINANCE_PAYMENT_METHODS`, `PAYMENTS_TABLE_HEADERS`, and status-to-style mappings for consistency.

### 4. Root Files
- `page.tsx`: Wraps `FinanceContent` inside the `FinanceProvider`.
- `loading.tsx`: Native Next.js loading state.
- `error.tsx`: Native Next.js error boundary.
- `finance.css`: Defines module-level CSS variables mapped to the global design system, removing inline Tailwind colors and ensuring a completely theme-independent module.
