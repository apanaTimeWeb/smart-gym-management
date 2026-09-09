// RESPONSIBILITY: Centralized constants, schemas, and shared utilities for the Workout Library module.
// DATA FLOW: Imported by useWorkoutLogic, TrainerWorkoutToolbar, and Workout form components.
import { z } from 'zod';

/* ── Dropdown / Filter Options (Rule 3B: Backend-Ready Constants) ── */

export const WORKOUT_LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'] as const;

export const EXERCISE_DIFFICULTY_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const EQUIPMENT_OPTIONS = ['Barbell', 'Dumbbell', 'Machine', 'Bodyweight', 'Cables', 'Kettlebell'] as const;

export const WORKOUT_FOCUS_OPTIONS = ['Hypertrophy', 'Strength', 'Bodybuilding', 'Cardio', 'Bodyweight'];

export const EXERCISE_MUSCLE_OPTIONS = ['Quadriceps', 'Chest', 'Back', 'Shoulders', 'Hamstrings', 'Posterior Chain', 'Arms', 'Core'];

export const WORKOUT_TAB_OPTIONS = ['Workout Plans', 'Exercise Library'] as const;

export const EXERCISE_TABLE_HEADERS = ['Exercise', 'Primary Muscle', 'Equipment', 'Difficulty', 'Actions'] as const;


export const WorkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  level: z.string(),
  days: z.coerce.number().min(1, 'Must be a valid number > 0'),
  exercises: z.coerce.number().min(1, 'Must be a valid number > 0'),
  focus: z.string().min(2, 'Focus area is required'),
  duration: z.string().min(2, 'Duration is required'),
  tags: z.string(),
  goal: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  instructions: z.string().optional(),
  assignedMemberId: z.string().optional(),
  workoutExercises: z.array(z.object({
    exerciseId: z.string().optional(),
    name: z.string(),
    sets: z.coerce.number().min(1),
    reps: z.string().or(z.coerce.number().transform(v => String(v))),
    weight: z.string().optional(),
    restTime: z.string().optional(),
    sortOrder: z.coerce.number().default(0), // Required for drag-to-reorder; backend updates all affected sortOrder values
  })).optional()
});
export type WorkoutFormValues = z.infer<typeof WorkoutSchema>;

export const EMPTY_WORKOUT_FORM: WorkoutFormValues = { 
  name: '', 
  level: 'Beginner', 
  days: 0, 
  exercises: 0, 
  focus: '', 
  duration: '', 
  tags: '',
  goal: '',
  startDate: '',
  endDate: '',
  instructions: '',
  assignedMemberId: '',
  workoutExercises: []
};

export const ExerciseSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  muscle: z.string().min(2, 'Primary muscle is required'),
  equipment: z.string(),
  difficulty: z.string(),
  instructions: z.string().optional(),
  videoUrl: z.string().optional()
});
export type ExerciseFormValues = z.infer<typeof ExerciseSchema>;

export const EMPTY_EXERCISE_FORM: ExerciseFormValues = { 
  name: '', 
  muscle: '', 
  equipment: 'Barbell', 
  difficulty: 'Beginner',
  instructions: '',
  videoUrl: ''
};


