# Workout Module Features & Architecture

## Overview
The Workout module (`app/(erp)/workout`) serves as a comprehensive database for the gym's exercise library and pre-defined workout programs. Staff can create and edit exercises (categorized by muscle and equipment) and group them into complete workout plans (e.g. "Push Pull Legs") with tags, levels, and durations.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `workout_components/`
- `WorkoutMain/WorkoutMain.tsx`: The primary Client Component layout wrapper that initiates the `WorkoutProvider` and renders the content.
- `WorkoutBanner/WorkoutBanner.tsx`: A static gradient hero banner displaying a dynamic count of the total programs and exercises.
- `WorkoutToolbar/WorkoutToolbar.tsx`: Houses the tab navigation ('Workout Plans' vs 'Exercise Library'), the real-time search input, and the dynamic 'Add' button.
- `WorkoutPlansGrid/WorkoutPlansGrid.tsx`: Displays the catalog of workout programs as cards showing their tags, duration, level, and actions.
- `ExerciseTable/ExerciseTable.tsx`: Displays a list of individual exercises, their targeted muscles, required equipment, and difficulty levels.
- `WorkoutModal/WorkoutModal.tsx`: A self-contained modal form for creating or editing a full workout plan.
- `ExerciseModal/ExerciseModal.tsx`: A self-contained modal form for creating or editing a single exercise.

### 2. `workout_context/`
- `useWorkoutLogic.ts`: An isolated custom hook containing the React logic to manage tabs, search filters, and handle CRUD operations.
- `WorkoutContext.tsx`: Centralizes UI state by consuming `useWorkoutLogic` and passing it down the tree, eliminating prop drilling.

### 3. `workout_types/`
- `workout_types.ts`: Contains TypeScript definitions like `WorkoutContextType`.

### 4. `workout_utils/`
- `WorkoutSharedConstants.ts`: Centralizes static Types (`Workout`, `Exercise`), the initial mock data arrays (`INITIAL_WORKOUTS`, `INITIAL_EXERCISES`), and the empty forms schemas.

### 5. Root Files
- `page.tsx`: A pure Server Component that acts as the entry point and renders `WorkoutMain`.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features providing a smooth skeleton loading state and error boundary.
- `workout.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--workout-bg-card`) ensuring theme independence.
