# Dashboard Module - AI Context Documentation

This document serves as an architectural map for the `dashboard` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
dashboard/
├── dashboard.css
├── dashboard_components
│   ├── DashboardKPIs
│   │   └── DashboardKPIs.tsx
│   ├── DashboardMain
│   │   └── DashboardMain.tsx
│   ├── MembershipDistribution
│   │   └── MembershipDistribution.tsx
│   ├── PendingPayments
│   │   └── PendingPayments.tsx
│   ├── PromoCard
│   │   └── PromoCard.tsx
│   └── RecentMembers
│       └── RecentMembers.tsx
├── dashboard_context
│   ├── DashboardContext.tsx
│   └── useDashboardLogic.ts
├── dashboard_features.md
├── dashboard_types
│   └── dashboard_types.ts
├── dashboard_utils
│   └── DashboardSharedConstants.ts
├── error.tsx
├── loading.tsx
└── page.tsx
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `dashboard_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `dashboard_context/DashboardContext.tsx`.
   - The heavy logic (data fetching, calculations) is extracted into the custom hook `dashboard_context/useDashboardLogic.ts`.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `dashboard_utils/DashboardSharedConstants.ts`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `dashboard_types/dashboard_types.ts`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors like `text-gray-800` or `bg-blue-500`.
   - Use CSS variables defined in `dashboard.css` mapping to the global design system (e.g. `var(--text-primary)`, `var(--dashboard-bg)`).

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/admin/dashboard/dashboard_context/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the `use...Logic.ts` file. If adding data, edit the `...SharedConstants.ts` file. Do not hallucinate files outside this module's boundary.
