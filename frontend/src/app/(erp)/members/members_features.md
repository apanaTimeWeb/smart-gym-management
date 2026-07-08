# Members Module - AI Context Documentation

This document serves as an architectural map for the `members` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
members/
├── error.tsx
├── loading.tsx
├── members.css
├── members_components
│   ├── MemberModal
│   │   └── MemberModal.tsx
│   ├── MemberProfile
│   │   ├── MemberProfile.tsx
│   │   ├── ProfileAttendance.tsx
│   │   ├── ProfileOverview.tsx
│   │   └── ProfilePayments.tsx
│   ├── MembersKPIs
│   │   └── MembersKPIs.tsx
│   ├── MembersMain
│   │   └── MembersMain.tsx
│   ├── MembersTable
│   │   └── MembersTable.tsx
│   └── MembersToolbar
│       └── MembersToolbar.tsx
├── members_context
│   ├── MembersContext.tsx
│   └── useMembersLogic.ts
├── members_features.md
├── members_types
│   └── members_types.ts
├── members_utils
│   └── MembersSharedConstants.ts
└── page.tsx
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `members_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `members_context/MembersContext.tsx`.
   - The heavy logic (data fetching, calculations) is extracted into the custom hook `members_context/useMembersLogic.ts`.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `members_utils/MembersSharedConstants.ts`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `members_types/members_types.ts`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors like `text-gray-800` or `bg-blue-500`.
   - Use CSS variables defined in `members.css` mapping to the global design system (e.g. `var(--text-primary)`, `var(--members-bg)`).

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/(erp)/members/members_context/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the `use...Logic.ts` file. If adding data, edit the `...SharedConstants.ts` file. Do not hallucinate files outside this module's boundary.
