# Dashboard Module Features & Architecture

## Overview
The Dashboard module (`app/(erp)/dashboard`) provides the main landing page for authenticated administrators, summarizing gym KPIs, recent members, pending payments, and membership distribution. 

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `dashboard_components/`
Contains heavily isolated micro-components. Each file serves exactly one purpose and is highly descriptive:
- `DashboardKPIs/DashboardKPIs.tsx`: Renders the top statistical KPI cards.
- `MembershipDistribution/MembershipDistribution.tsx`: Displays the visual breakdown of plans.
- `PendingPayments/PendingPayments.tsx`: Lists payments nearing expiry.
- `PromoCard/PromoCard.tsx`: Static promotional banner.
- `RecentMembers/RecentMembers.tsx`: Table showing recently joined members.

### 2. `dashboard_context/`
- `DashboardContext.tsx`: The single source of truth for the module's state. It executes `dashboardApi.getStats()` on mount and exposes the `stats`, `loading`, and `error` state via the `useDashboardContext` hook. This eliminates prop drilling across the micro-components.

### 3. `dashboard_utils/`
- `DashboardSharedConstants.ts`: Centralizes backend-ready hardcoded arrays, table headers, and status-to-style mappings. If backend APIs change these lists, update this single file.

### 4. Root Files
- `page.tsx`: The module's entry point. It wraps `DashboardContent` within `DashboardProvider` to initialize the context and layout.
- `loading.tsx`: Native Next.js loading state.
- `error.tsx`: Native Next.js error boundary.
- `dashboard.css`: Contains CSS variables mapped to the global design system (e.g. `--dashboard-bg-card`), making the module entirely theme-independent without relying on inline Tailwind colors.
