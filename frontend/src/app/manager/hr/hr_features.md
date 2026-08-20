# Hr Module - AI Context Documentation

This document serves as an architectural map for the `hr` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
hr/
├── error.tsx
├── hr.css
├── hr_components
│   ├── HrKPIs
│   │   └── HrKPIs.tsx
│   ├── HrMain
│   │   └── HrMain.tsx
│   ├── HrTabs
│   │   └── HrTabs.tsx
│   ├── PayrollTable
│   │   └── PayrollTable.tsx
│   ├── StaffModal
│   │   └── StaffModal.tsx
│   └── StaffTable
│       └── StaffTable.tsx
├── hr_context
│   ├── HrContext.tsx
│   └── useHrLogic.ts
├── hr_features.md
├── hr_types
│   └── hr_types.ts
├── hr_utils
│   └── HrSharedConstants.ts
├── loading.tsx
└── page.tsx
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `hr_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `hr_context/HrContext.tsx`.
   - The heavy logic (data fetching, calculations) is extracted into the custom hook `hr_context/useHrLogic.ts`.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `hr_utils/HrSharedConstants.ts`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `hr_types/hr_types.ts`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors like `text-gray-800` or `bg-blue-500`.
   - Use CSS variables defined in `hr.css` mapping to the global design system (e.g. `var(--text-primary)`, `var(--hr-bg)`).

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/manager/hr/hr_context/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the `use...Logic.ts` file. If adding data, edit the `...SharedConstants.ts` file. Do not hallucinate files outside this module's boundary.
