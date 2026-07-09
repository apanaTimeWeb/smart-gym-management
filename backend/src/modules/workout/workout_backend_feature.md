# Workout Module

## Overview
The Workout module handles the library of exercises/workouts and diet plans that members can follow.

## Folder Structure
- `controllers/`: Handles HTTP requests.
  - `create-workout.controller.ts`: Create a workout.
  - `find-workout.controller.ts`: Fetch workouts.
  - `update-workout.controller.ts`: Update/Remove workout.
  - `create-diet-plan.controller.ts`: Create a diet plan.
  - `find-diet-plan.controller.ts`: Fetch diet plans.
  - `update-diet-plan.controller.ts`: Update/Remove diet plan.
- `services/`: Business logic operations.
- `dto/`: Data Transfer Objects for validation.
- `entities/`: TypeORM entities (`workout.entity.ts`, `diet-plan.entity.ts`).
- `workout.repository.ts`: Database query layer for Workout features.
- `workout.interfaces.ts`: Typings.
- `workout.constants.ts`: Sort orders and messages.
- `workout.exceptions.ts`: Custom exceptions.
