# Sales Module Features & Architecture

## Overview
The Sales module (`app/(erp)/sales`) is the analytics dashboard of the gym. It provides insights into monthly revenue, new member trends, accounts receivable (pending payments), and a full list of all active/expired memberships.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `sales_components/`
- `SalesMain/SalesMain.tsx`: The primary Client Component layout wrapper that initiates the `SalesProvider` and renders the content.
- `SalesToolbar/SalesToolbar.tsx`: Houses the top action bar with Date Filters, "Filter by Name", and "Export" functionality.
- `SalesTabs/SalesTabs.tsx`: Renders the sub-navigation tabs (Overview, Membership Report, Pending Payments, All Memberships).
- `SalesOverview/SalesOverview.tsx`: Contains the `ReactApexCharts` visualizing monthly revenue (Bar chart) and new members (Area chart).
- `MembershipReport/MembershipReport.tsx`: Renders a table summarizing receivables, received amounts, and refunds, grouped by membership tier.
- `PendingPayments/PendingPayments.tsx`: Displays a list view of members whose payments are overdue.
- `AllMemberships/AllMemberships.tsx`: A comprehensive table tracking the status, dates, and days remaining for all users' subscriptions.

### 2. `sales_context/`
- `useSalesLogic.ts`: An isolated custom hook containing the React logic to manage the active tab and date filter selections.
- `SalesContext.tsx`: The single source of truth for UI state. It consumes `useSalesLogic` and distributes state without prop drilling.

### 3. `sales_types/`
- `sales_types.ts`: Contains TypeScript definitions like `SalesContextType`.

### 4. `sales_utils/`
- `SalesSharedConstants.ts`: Centralizes static types and mock data arrays (`monthlyData`, `membershipReport`, etc.) used across the dashboard.

### 5. Root Files
- `page.tsx`: A pure Server Component that acts as the entry point and renders `SalesMain`.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features providing a smooth skeleton loading state and error boundary.
- `sales.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--sales-bg-card`) ensuring theme independence.
