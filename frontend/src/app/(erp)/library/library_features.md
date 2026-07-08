# Library Module Features & Architecture

## Overview
The Library module (`app/(erp)/library`) manages the gym's catalog of Exercises and Diet Plans. It allows staff to create, edit, and delete both exercises and nutritional plans, which can later be assigned to members.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `library_components/`
- `LibraryMain/LibraryMain.tsx`: The primary Client Component layout wrapper that initiates the `LibraryProvider` and renders the content.
- `LibraryTabs/LibraryTabs.tsx`: Houses the filter tabs ('Exercises' vs 'Diet Plans') and the action buttons for refreshing or adding new items.
- `ExerciseGrid/ExerciseGrid.tsx`: Displays the catalog of exercises as cards with their difficulty, muscle groups, and actions (edit/delete).
- `DietGrid/DietGrid.tsx`: Displays the catalog of diet plans as cards with their macros, goals, and meals list.
- `ExerciseModal/ExerciseModal.tsx`: A self-contained modal form for creating or editing an Exercise.
- `DietModal/DietModal.tsx`: A self-contained modal form for creating or editing a Diet Plan.

### 2. `library_context/`
- `useLibraryLogic.ts`: An isolated custom hook containing the React logic to fetch workouts and diets, and process form submissions.
- `LibraryContext.tsx`: The single source of truth for the Library state. It consumes `useLibraryLogic` and provides the state down the tree, eliminating prop drilling.

### 3. `library_types/`
- `library_types.ts`: Contains TypeScript definitions like `LibraryContextType`.

### 4. `library_utils/`
- `LibrarySharedConstants.ts`: Centralizes static data like `CATEGORIES`, `DIFFICULTIES`, `GOALS`, and the empty state shape of the forms.

### 5. Root Files
- `page.tsx`: A pure Server Component that acts as the entry point and renders `LibraryMain`.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features providing a smooth skeleton loading state and error boundary.
- `library.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--library-bg-card`) ensuring theme independence.
