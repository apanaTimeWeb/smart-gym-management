# Notifications Module - AI Context Documentation

This document serves as an architectural map for the `notifications` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
notifications/
├── error.tsx
├── loading.tsx
├── notifications_api
├── notifications_components
│   ├── AdminNotificationsClient.tsx
│   └── AdminNotificationsClient.test.tsx
├── notifications_context
├── notifications_features.md
├── notifications_forbidden.md
├── notifications_types
├── notifications_url_config.ts
├── notifications_utils
└── page.tsx
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `notifications_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `notifications_context/` or a module-scoped store.
   - The heavy logic (data fetching, calculations) is extracted into custom hooks.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `notifications_utils/`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `notifications_types/`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors.
   - Use CSS variables defined in global css mapping to the global design system.

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/admin/notifications/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the appropriate hook. If adding data, edit the utils file. Do not hallucinate files outside this module's boundary.
