# Trainer Module — Feature Documentation

## Overview
The Trainer module provides an interface exclusively for gym trainers. It focuses heavily on workout plan creation, progress tracking, member attendance (for personal training clients), and accessing the exercise library. Financial and administrative features are strictly excluded.

---

## Directory Structure & Core Features

```
trainer/
├── attendance/          # Trainer's personal check-ins and client attendance tracking
├── dashboard/           # Trainer's daily schedule, assigned clients, and alerts
├── library/             # Exercise library and document access for creating routines
├── members/             # Read-only access to assigned member profiles and progress
├── trainer_components/  # UI components specific to the trainer module
├── trainer_utils/       # Utilities, hooks, constants, and types for the trainer module
└── workout/             # Core feature: Workout plan assignment and tracking
```

### Core Pages & Flows
- **/trainer/dashboard**: Today's schedule and assigned client list.
- **/trainer/workout**: Creating and assigning custom workout routines to members.
- **/trainer/members**: Tracking assigned members' physical progress and goals.
- **/trainer/library**: Browsing standard exercises to include in routines.

---

## State & Data
- **Centralized Data**: All hardcoded data (exercise categories, difficulty levels) must reside in `trainer_utils/trainer_constants.ts`.
- **Global State**: Managed via Zustand slices within `trainer_store/` (if created) or Context for UI.
- **UI State**: Local `useState` for component-level UI state.

---

## Architectural Rules Checklist (AI Context)
- [x] **Micro-modularization**: Component files must not exceed 250-350 lines. Break down into sub-components.
- [x] **Prefixing**: ALL file names must start with `Trainer...` (e.g., `TrainerWorkoutBuilder.tsx`).
- [x] **Logic Separation**: Heavy logic must be extracted into `use[ComponentName].ts` hooks.
- [x] **Theme Contract**: No arbitrary Tailwind pixel/hex values. Use CSS variables defined in the theme contract.
- [x] **Data Fetching**: Use Server Components for initial secure fetch, Client components for interactivity.
- [x] **Imports**: Absolute imports ONLY (`@/app/trainer/...`). Zero cross-module imports.
