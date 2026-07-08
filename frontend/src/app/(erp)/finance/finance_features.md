# Finance Module - AI Context Documentation

This document serves as an architectural map for the `finance` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
finance/
├── error.tsx
├── finance.css
├── finance_components
│   ├── AddPaymentModal
│   │   └── AddPaymentModal.tsx
│   ├── FinanceKPIs
│   │   └── FinanceKPIs.tsx
│   ├── FinanceMain
│   │   └── FinanceMain.tsx
│   ├── FinanceTabs
│   │   └── FinanceTabs.tsx
│   ├── PaymentsTable
│   │   └── PaymentsTable.tsx
│   ├── RevenueByMethod
│   │   └── RevenueByMethod.tsx
│   └── RevenueSummary
│       └── RevenueSummary.tsx
├── finance_context
│   ├── FinanceContext.tsx
│   └── useFinanceLogic.ts
├── finance_features.md
├── finance_types
│   └── finance_types.ts
├── finance_utils
│   └── FinanceSharedConstants.ts
├── loading.tsx
└── page.tsx
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `finance_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `finance_context/FinanceContext.tsx`.
   - The heavy logic (data fetching, calculations) is extracted into the custom hook `finance_context/useFinanceLogic.ts`.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `finance_utils/FinanceSharedConstants.ts`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `finance_types/finance_types.ts`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors like `text-gray-800` or `bg-blue-500`.
   - Use CSS variables defined in `finance.css` mapping to the global design system (e.g. `var(--text-primary)`, `var(--finance-bg)`).

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/(erp)/finance/finance_context/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the `use...Logic.ts` file. If adding data, edit the `...SharedConstants.ts` file. Do not hallucinate files outside this module's boundary.
