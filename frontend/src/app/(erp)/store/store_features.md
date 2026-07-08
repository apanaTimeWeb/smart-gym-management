# Store Module - AI Context Documentation

This document serves as an architectural map for the `store` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
store/
├── error.tsx
├── loading.tsx
├── page.tsx
├── store.css
├── store_components
│   ├── OrderTable
│   │   └── OrderTable.tsx
│   ├── PosModal
│   │   └── PosModal.tsx
│   ├── ProductGrid
│   │   └── ProductGrid.tsx
│   ├── ProductModal
│   │   └── ProductModal.tsx
│   ├── StoreKPIs
│   │   └── StoreKPIs.tsx
│   ├── StoreMain
│   │   └── StoreMain.tsx
│   └── StoreToolbar
│       └── StoreToolbar.tsx
├── store_context
│   ├── StoreContext.tsx
│   └── useStoreLogic.ts
├── store_features.md
├── store_types
│   └── store_types.ts
└── store_utils
    └── StoreSharedConstants.ts
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `store_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `store_context/StoreContext.tsx`.
   - The heavy logic (data fetching, calculations) is extracted into the custom hook `store_context/useStoreLogic.ts`.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `store_utils/StoreSharedConstants.ts`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `store_types/store_types.ts`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors like `text-gray-800` or `bg-blue-500`.
   - Use CSS variables defined in `store.css` mapping to the global design system (e.g. `var(--text-primary)`, `var(--store-bg)`).

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/(erp)/store/store_context/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the `use...Logic.ts` file. If adding data, edit the `...SharedConstants.ts` file. Do not hallucinate files outside this module's boundary.
