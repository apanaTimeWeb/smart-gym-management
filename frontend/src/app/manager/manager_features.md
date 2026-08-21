# Manager Module — Feature Documentation

## Overview
The Manager module is designed for the daily operational management of a gym branch. It restricts destructive system-wide capabilities (like deleting branches or modifying global tenant settings) but allows for full control over day-to-day tasks: member admissions, POS sales, attendance, and basic financial tracking.

---

## Directory Structure & Core Features

```
manager/
├── layout.tsx           # Module layout wrapper
├── manager_features.md  # This file
├── manager_forbidden.md # Module anti-patterns
├── manager_theme_contract.md # Theme CSS variables
├── attendance/          # Member check-ins, barcode/QR scanning, daily logs
├── dashboard/           # Daily operational metrics, expiring memberships, recent sales
├── finance/             # Daily settlements, petty cash, fee collections
├── hr/                  # Basic staff schedule viewing (limited compared to Admin)
├── inquiries/           # Follow-ups, lead pipeline, trial bookings
├── library/             # Access to the exercise/document library
├── manager_components/  # UI components specific to the manager module
├── manager_utils/       # Utilities, hooks, constants, and types for the manager module
├── members/             # Member profiles, upgrades, renewals, and history
├── plans/               # Read-only view of available plans and packages
├── sales/               # Point of Sale (POS), invoices, receipts
├── store/               # Inventory tracking and product sales
└── workout/             # Assigning/viewing workout plans for members
```

### Core Pages & Flows
- **/manager/dashboard**: Focuses on daily action items (pending inquiries, expiring memberships).
- **/manager/members**: Member search, profile viewing, and subscription renewals.
- **/manager/attendance**: Quick check-in interface.
- **/manager/sales**: POS system for selling plans, supplements, or merchandise.

---

## State & Data
- **Centralized Data**: All hardcoded data must reside in `manager_utils/manager_constants.ts`.
- **Global State**: Managed via Zustand slices within `manager_store/` (if created) or Context for UI.
- **UI State**: Local `useState` for component-level UI state.

---

## Architectural Rules Checklist (AI Context)
- [x] **Micro-modularization**: Component files must not exceed 250-350 lines. Break down into sub-components.
- [x] **Prefixing**: ALL file names must start with `Manager...` (e.g., `ManagerSalesTerminal.tsx`).
- [x] **Logic Separation**: Heavy logic must be extracted into `use[ComponentName].ts` hooks.
- [x] **Theme Contract**: No arbitrary Tailwind pixel/hex values. Use CSS variables defined in the theme contract.
- [x] **Data Fetching**: Use Server Components for initial secure fetch, Client components for interactivity.
- [x] **Imports**: Absolute imports ONLY (`@/app/manager/...`). Zero cross-module imports.
