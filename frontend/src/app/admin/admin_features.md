# Admin Module — Feature Documentation

## Overview
The Admin module provides a high-level, cross-branch analytics and management interface for Gym Administrators. It is intentionally scoped to **read-only branch views, financial oversight, and membership/sales analytics** — all day-to-day operational tasks (member management, staff HR, lead CRM) are delegated to the **Manager** role. It is strictly role-isolated.

---

## Current Directory Structure & Core Features

```
admin/
├── layout.tsx                # Module layout wrapper with AdminLayout (sidebar + header)
├── admin_features.md         # This file — master AI context map
├── admin_forbidden.md        # Module anti-patterns (what NOT to do)
├── admin_theme_contract.md   # CSS variable dependencies
├── admin_components/         # Shared Admin-specific UI (Header, Sidebar, Feedback, etc.)
├── admin_store/              # Zustand global state (branches list, selectedBranchId)
├── admin_utils/              # Shared hooks, constants, types for the Admin module
├── branches/                 # Read-only analytics view of all gym branches (revenue, expenses, students, staff)
├── dashboard/                # KPI summary, charts, recent members, pending payments overview
├── finance/                  # Payments table, revenue summary, add-payment (Admin override only)
├── notifications/            # Read/dismiss notification center for Admin role
├── plans/                    # Membership plan CRUD (Admin can configure plans)
├── sales/                    # Multi-tab Sales & Reports (Overview, Membership, Pending, Store Sales)
└── settings/                 # Branch-level settings and configuration
```

---

## Core Pages & Flows

- **/admin/dashboard**: Top-level KPI cards with time-range filter (Weekly/Monthly/Yearly/Custom). Charts for revenue, recent member joins, pending payments widget.
- **/admin/branches**: Read-only grid of all branch locations. Each card shows Revenue, Expenses, Students, Staff counts. Supports time-range filter.
- **/admin/plans**: Membership plan management — CRUD for plans available to all branches.
- **/admin/sales**: Multi-tab analytics hub:
  - *Overview* — Revenue chart
  - *Membership Report* — Plan-wise revenue breakdown
  - *Pending Payments* — Overdue member list
  - *All Memberships* — Full member list with **interactive KPI filter cards** (Total/Active/Expiring/Expired per Rule 74)
  - *Store Sales* — Cross-branch store order analytics (orders, revenue, item breakdown)
- **/admin/finance**: Full payments ledger with search, pagination, and payment recording.
- **/admin/notifications**: All-notifications page with mark-as-read and delete.
- **/admin/settings**: Branch-level settings.

---

## Deleted Modules (Intentionally Removed - Enforced)
The following were removed to enforce proper role boundaries:
- `/admin/members` → Delegated to **Manager**
- `/admin/audit` → Delegated to **Superadmin**
- `/admin/attendance` → Delegated to **Manager**
- `/admin/hr` → Delegated to **Manager**
- `/admin/inquiries` → Delegated to **Manager**
- `/admin/library` → Delegated to **Manager**
- `/admin/store` → Delegated to **Manager**
- `/admin/workout` → Delegated to **Manager**

---

## State & Data
- **Global State (Zustand)**: `admin_store/useAdminGlobalStore.ts` — holds `branches[]` and `selectedBranchId`.
- **Module State (Context + Hook)**: Each sub-module (`dashboard/`, `finance/`, `sales/`) uses its own isolated `[module]Context.tsx` + `use[Module]Logic.ts` pattern.
- **Centralized Constants**: `admin_utils/AdminSharedConstants.ts` — nav items, notifications placeholders, pagination size.

---

## Architectural Rules Checklist (AI Context)
- [x] **Micro-modularization**: Component files must not exceed 250–350 lines. Break down into sub-components.
- [x] **Prefixing**: ALL shared file names must start with `Admin...` (e.g., `AdminPagination.tsx`).
- [x] **Logic Separation**: Heavy logic must be extracted into `use[ModuleName]Logic.ts` hooks.
- [x] **Theme Contract**: No arbitrary Tailwind pixel/hex values. Use CSS variables from `admin_theme_contract.md`.
- [x] **Data Fetching**: Server Components (`page.tsx`) for initial secure SSR fetch; Client Components for interactivity.
- [x] **Imports**: Absolute imports ONLY (`@/app/admin/...`). **Zero cross-module imports** — importing from `/manager`, `/trainer`, or `/superadmin` is strictly forbidden (Rule 67).
- [x] **Rule 74**: KPI cards above filterable tables MUST be interactive filters with visual active state.
- [x] **Rule 42**: Searchable/paginated lists sync state to URL query parameters.
- [x] **Rule 30**: All tables must have pagination, sorting, and relevant filtering controls.
