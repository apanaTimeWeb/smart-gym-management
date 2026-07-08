# Sales Module - AI Context Documentation

This document serves as an architectural map for the `sales` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
sales/
├── error.tsx
├── loading.tsx
├── page.tsx
├── sales.css
├── sales_components
│   ├── AllMemberships
│   │   └── AllMemberships.tsx
│   ├── MembershipReport
│   │   └── MembershipReport.tsx
│   ├── PendingPayments
│   │   └── PendingPayments.tsx
│   ├── SalesMain
│   │   └── SalesMain.tsx
│   ├── SalesOverview
│   │   └── SalesOverview.tsx
│   ├── SalesTabs
│   │   └── SalesTabs.tsx
│   └── SalesToolbar
│       └── SalesToolbar.tsx
├── sales_context
│   ├── SalesContext.tsx
│   └── useSalesLogic.ts
├── sales_features.md
├── sales_types
│   └── sales_types.ts
└── sales_utils
    └── SalesSharedConstants.ts
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `sales_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `sales_context/SalesContext.tsx`.
   - The heavy logic (data fetching, calculations) is extracted into the custom hook `sales_context/useSalesLogic.ts`.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `sales_utils/SalesSharedConstants.ts`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `sales_types/sales_types.ts`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors like `text-gray-800` or `bg-blue-500`.
   - Use CSS variables defined in `sales.css` mapping to the global design system (e.g. `var(--text-primary)`, `var(--sales-bg)`).

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/(erp)/sales/sales_context/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the `use...Logic.ts` file. If adding data, edit the `...SharedConstants.ts` file. Do not hallucinate files outside this module's boundary.
