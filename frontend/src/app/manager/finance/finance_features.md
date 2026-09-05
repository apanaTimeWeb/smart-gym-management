# Finance Module - AI Context Documentation

This document serves as an architectural map for the `finance` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
finance/
├── error.tsx
├── finance_api
├── finance_components
├── finance_context
├── finance_features.md
├── finance_forbidden.md
├── finance_types
├── finance_utils
├── loading.tsx
├── ManagerFinanceUrlConfig.ts
└── page.tsx
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `finance_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `finance_context/` or a module-scoped store.
   - The heavy logic (data fetching, calculations) is extracted into custom hooks.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `finance_utils/`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `finance_types/`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors.
   - Use CSS variables defined in global css mapping to the global design system.

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/manager/finance/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the appropriate hook. If adding data, edit the utils file. Do not hallucinate files outside this module's boundary.
