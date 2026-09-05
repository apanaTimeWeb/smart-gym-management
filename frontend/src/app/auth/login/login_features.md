# Login Module - AI Context Documentation

This document serves as an architectural map for the `auth/login` sub-module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
login/
├── error.tsx
├── loading.tsx
├── login_components/
├── login_constants/
├── login_features.md
├── login_forbidden.md
├── login_types/
└── page.tsx
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `login_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context or a module-scoped store.
   - The heavy logic (data fetching, calculations) is extracted into custom hooks.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `login_constants/`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `login_types/`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors.
   - Use CSS variables defined in global css mapping to the global design system.

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/auth/login/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the appropriate hook. If adding data, edit the utils file. Do not hallucinate files outside this module's boundary.
