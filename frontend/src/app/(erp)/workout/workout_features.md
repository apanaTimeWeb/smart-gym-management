# Workout Module - AI Context Documentation

This document serves as an architectural map for the `workout` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
workout/
├── error.tsx
├── loading.tsx
├── page.tsx
├── workout.css
├── workout_components
│   ├── ExerciseModal
│   │   └── ExerciseModal.tsx
│   ├── ExerciseTable
│   │   └── ExerciseTable.tsx
│   ├── WorkoutBanner
│   │   └── WorkoutBanner.tsx
│   ├── WorkoutMain
│   │   └── WorkoutMain.tsx
│   ├── WorkoutModal
│   │   └── WorkoutModal.tsx
│   ├── WorkoutPlansGrid
│   │   └── WorkoutPlansGrid.tsx
│   └── WorkoutToolbar
│       └── WorkoutToolbar.tsx
├── workout_context
│   ├── useWorkoutLogic.ts
│   └── WorkoutContext.tsx
├── workout_features.md
├── workout_types
│   └── workout_types.ts
└── workout_utils
    └── WorkoutSharedConstants.ts
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `workout_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `workout_context/WorkoutContext.tsx`.
   - The heavy logic (data fetching, calculations) is extracted into the custom hook `workout_context/useWorkoutLogic.ts`.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `workout_utils/WorkoutSharedConstants.ts`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `workout_types/workout_types.ts`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors like `text-gray-800` or `bg-blue-500`.
   - Use CSS variables defined in `workout.css` mapping to the global design system (e.g. `var(--text-primary)`, `var(--workout-bg)`).

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/(erp)/workout/workout_context/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the `use...Logic.ts` file. If adding data, edit the `...SharedConstants.ts` file. Do not hallucinate files outside this module's boundary.
