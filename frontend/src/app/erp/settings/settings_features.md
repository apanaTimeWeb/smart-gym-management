# Settings Module - AI Context Documentation

This document serves as an architectural map for the `settings` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
settings/
├── error.tsx
├── loading.tsx
├── page.tsx
├── settings.css
├── settings_components
│   ├── SettingsBanner
│   │   └── SettingsBanner.tsx
│   ├── SettingsContent
│   │   └── SettingsContent.tsx
│   ├── SettingsMain
│   │   └── SettingsMain.tsx
│   └── SettingsNav
│       └── SettingsNav.tsx
├── settings_context
│   ├── SettingsContext.tsx
│   └── useSettingsLogic.ts
├── settings_features.md
├── settings_types
│   └── settings_types.ts
└── settings_utils
    └── SettingsSharedConstants.ts
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `settings_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `settings_context/SettingsContext.tsx`.
   - The heavy logic (data fetching, calculations) is extracted into the custom hook `settings_context/useSettingsLogic.ts`.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `settings_utils/SettingsSharedConstants.ts`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `settings_types/settings_types.ts`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors like `text-gray-800` or `bg-blue-500`.
   - Use CSS variables defined in `settings.css` mapping to the global design system (e.g. `var(--text-primary)`, `var(--settings-bg)`).

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/erp/settings/settings_context/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the `use...Logic.ts` file. If adding data, edit the `...SharedConstants.ts` file. Do not hallucinate files outside this module's boundary.
