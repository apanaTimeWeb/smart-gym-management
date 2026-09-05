# Expenses Module - AI Context Documentation

This document serves as an architectural map for the `expenses` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
expenses/
├── error.tsx
├── expenses_api
├── expenses_components
├── expenses_context
├── expenses_features.md
├── expenses_forbidden.md
├── expenses_store
├── expenses_types
├── expenses_utils
├── loading.tsx
├── ManagerExpensesUrlConfig.ts
└── page.tsx
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `expenses_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `expenses_context/` or module-scoped store in `expenses_store/`.
   - The heavy logic (data fetching, calculations) is extracted into the custom hooks.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `expenses_utils/`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `expenses_types/`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors.
   - Use CSS variables defined in global css mapping to the global design system.

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/manager/expenses/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the appropriate hook. If adding data, edit the utils file. Do not hallucinate files outside this module's boundary.
