# Auth Module - AI Context Documentation

This document serves as an architectural map for the root `auth` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
auth/
├── auth_api/
├── auth_features.md
├── auth_forbidden.md
├── auth_theme_contract.md
├── auth_url_config.ts
├── login/
├── logout/
├── refresh/
├── set-cookie/
└── token/
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module handles all authentication sub-routes and APIs. Any UI functionality must be deeply nested within a sub-module (e.g., `login/`) and its respective `[subModuleName]_components/` directory.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context or a module-scoped store within the sub-modules.
   - The heavy logic (data fetching, session state) is extracted into custom hooks.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `[subModuleName]_utils/`. 

4. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors.
   - Use CSS variables defined in global css mapping to the global design system or `auth_theme_contract.md`.

5. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/auth/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the appropriate hook. If adding data, edit the utils file. Do not hallucinate files outside this module's boundary.
