// RESPONSIBILITY: Defines named application contracts for Trainer Workout query and persistence helpers.
// FLOW: DTO/domain input → service/repository boundary → typed workout contract.

import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import type { WorkoutLevel, ExerciseDifficulty } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enums';

export interface TrainerWorkoutCollectionResult<T> {
  workouts?: T[];
  exercises?: T[];
  total: number;
  page: number;
  limit: number;
  sortBy: string;
  sortDirection: string;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface TrainerWorkoutCreatePersistenceInput {
  trainerId: string;
  name: string;
  level: WorkoutLevel;
  days: number;
  exercisesCount: number;
  focus: string;
  duration: string;
  tags: string[];
  goal: string | null;
  startDate: string | null;
  endDate: string | null;
  instructions: string | null;
  assignedMemberId: string | null;
  isActive: boolean;
  workoutExercises: Record<string, unknown>[];
}

export interface TrainerWorkoutExerciseUpdatePersistenceInput {
  name?: string;
  category?: string;
  muscleGroup?: string[];
  equipment?: string;
  difficulty?: ExerciseDifficulty;
  instructions?: string;
  videoUrl?: string;
  imageUrl?: string;
  reps?: string;
  duration?: string;
  description?: string;
}

export interface TrainerWorkoutUpdatePersistenceInput {
  name?: string;
  level?: WorkoutLevel;
  days?: number;
  exercisesCount?: number;
  focus?: string;
  duration?: string;
  tags?: string[];
  goal?: string;
  startDate?: string;
  endDate?: string;
  instructions?: string;
  assignedMemberId?: string;
  workoutExercises?: Record<string, unknown>[];
}

export type TrainerWorkoutTransactionContext = CoreTransactionContext;
