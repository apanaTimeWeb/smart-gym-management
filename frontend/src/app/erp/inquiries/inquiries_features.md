# Inquiries Module - AI Context Documentation

This document serves as an architectural map for the `inquiries` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
inquiries/
├── error.tsx
├── inquiries.css
├── inquiries_components
│   ├── InquiriesKPIs
│   │   └── InquiriesKPIs.tsx
│   ├── InquiriesMain
│   │   └── InquiriesMain.tsx
│   ├── InquiriesTable
│   │   └── InquiriesTable.tsx
│   ├── InquiriesToolbar
│   │   └── InquiriesToolbar.tsx
│   └── InquiryModal
│       └── InquiryModal.tsx
├── inquiries_context
│   ├── InquiriesContext.tsx
│   └── useInquiriesLogic.ts
├── inquiries_features.md
├── inquiries_types
│   └── inquiries_types.ts
├── inquiries_utils
│   └── InquiriesSharedConstants.ts
├── loading.tsx
└── page.tsx
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `inquiries_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `inquiries_context/InquiriesContext.tsx`.
   - The heavy logic (data fetching, calculations) is extracted into the custom hook `inquiries_context/useInquiriesLogic.ts`.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `inquiries_utils/InquiriesSharedConstants.ts`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `inquiries_types/inquiries_types.ts`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors like `text-gray-800` or `bg-blue-500`.
   - Use CSS variables defined in `inquiries.css` mapping to the global design system (e.g. `var(--text-primary)`, `var(--inquiries-bg)`).

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/erp/inquiries/inquiries_context/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the `use...Logic.ts` file. If adding data, edit the `...SharedConstants.ts` file. Do not hallucinate files outside this module's boundary.
