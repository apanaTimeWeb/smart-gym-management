// RESPONSIBILITY: Centralized constants, schemas, and shared utilities for the Workout Library module.
// DATA FLOW: Imported by useWorkoutLogic, TrainerWorkoutToolbar, and Workout form components.

/* ── Dropdown / Filter Options (Rule 3B: Backend-Ready Constants) ── */

export const WORKOUT_LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'] as const;

export const EXERCISE_DIFFICULTY_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const EQUIPMENT_OPTIONS = ['Barbell', 'Dumbbell', 'Machine', 'Bodyweight', 'Cables', 'Kettlebell'] as const;

export const WORKOUT_FOCUS_OPTIONS = ['Hypertrophy', 'Strength', 'Bodybuilding', 'Cardio', 'Bodyweight'];

export const EXERCISE_MUSCLE_OPTIONS = ['Quadriceps', 'Chest', 'Back', 'Shoulders', 'Hamstrings', 'Posterior Chain', 'Arms', 'Core'];

export const WORKOUT_TAB_OPTIONS = ['Workout Plans', 'Exercise Library'] as const;

export const EXERCISE_TABLE_HEADERS = ['Exercise', 'Primary Muscle', 'Equipment', 'Difficulty', 'Actions'] as const;






export const TRAINER_WORKOUT_DIFFICULTY_STYLES = {
  Beginner: 'bg-success-bg text-success',
  Intermediate: 'bg-warning-bg text-warning',
  Advanced: 'bg-danger-bg text-danger',
} as const;
