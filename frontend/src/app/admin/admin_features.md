# Admin Module — Feature Documentation

## Overview
The Admin module provides comprehensive gym management tools for a single branch or multiple branches within a tenant's domain. It handles operations like HR, finance, attendance tracking, member management, and sales. It is strictly role-isolated for Administrators.

---

## Directory Structure & Core Features

```
admin/
├── admin_components/      # UI components specific to the admin module
├── admin_store/           # Zustand state stores for the admin module
├── admin_utils/           # Utilities, hooks, constants, and types for the admin module
├── attendance/            # Manages member and staff attendance records
├── audit/                 # Audit logs and system activity tracking
├── branches/              # Branch management and switching logic
├── dashboard/             # Admin KPI dashboard and summary statistics
├── finance/               # Financial operations: collections, expenses, subscriptions
├── hr/                    # Human resources: staff management, payroll, shifts
├── inquiries/             # CRM: Handling new leads, inquiries, and follow-ups
├── members/               # Core member database, profiles, and operations
├── plans/                 # Membership plan and package configurations
├── sales/                 # Sales tracking and POS-related features
├── settings/              # Branch-level settings and configuration
└── store/                 # Inventory or physical store management (if applicable)
```

### Core Pages & Flows
- **/admin/dashboard**: Top-level overview with KPI cards and charts.
- **/admin/members**: Full member database with searchable data tables.
- **/admin/finance**: Income/Expense tracking and subscription renewals.
- **/admin/attendance**: Real-time attendance logging and reporting.
- **/admin/inquiries**: Lead pipeline and conversion tracking.

---

## State & Data
- **Centralized Data**: All hardcoded data (dropdown options, preset lists) must reside in `admin_utils/admin_constants.ts`.
- **Global State**: Managed via Zustand slices within `admin_store/`.
- **UI State**: Local `useState` for component-level UI state. Context used strictly for synchronous global UI states (e.g., sidebar toggles).

---

## Architectural Rules Checklist (AI Context)
- [x] **Micro-modularization**: Component files must not exceed 250-350 lines. Break down into sub-components.
- [x] **Prefixing**: ALL file names must start with `Admin...` (e.g., `AdminMembersTable.tsx`).
- [x] **Logic Separation**: Heavy logic must be extracted into `use[ComponentName].ts` hooks.
- [x] **Theme Contract**: No arbitrary Tailwind pixel/hex values. Use CSS variables defined in the theme contract.
- [x] **Data Fetching**: Use Server Components for initial secure fetch, Client components for interactivity.
- [x] **Imports**: Absolute imports ONLY (`@/app/admin/...`). Zero cross-module imports (e.g., importing from `/manager` is forbidden).
