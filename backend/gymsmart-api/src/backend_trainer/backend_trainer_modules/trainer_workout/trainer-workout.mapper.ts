// RESPONSIBILITY: Maps workout ORM state to the exact Trainer frontend workout response contract.
// FLOW: TrainerWorkoutEntity → enum normalization → nullable-field omission → WorkoutDomain.

import type { TrainerWorkoutEntity } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout.entity';
import { TrainerWorkoutEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enum.mapper';
import type { WorkoutDomain } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout.domain';

/** Maps a persisted workout into the frontend-compatible response contract. */
/**
 * @description Executes WorkoutMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for WorkoutMapper.
 * @returns {WorkoutDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function WorkoutMapper(entity: TrainerWorkoutEntity): WorkoutDomain {
  return {
    id: entity.id, name: entity.name, level: TrainerWorkoutEnumMapper.toApiLevel(entity.level), days: entity.days, exercises: entity.exercisesCount, focus: entity.focus, duration: entity.duration, tags: entity.tags, isActive: entity.isActive, workoutExercises: entity.workoutExercises,
    ...(entity.goal !== null ? { goal: entity.goal } : {}),
    ...(entity.startDate !== null ? { startDate: entity.startDate } : {}),
    ...(entity.endDate !== null ? { endDate: entity.endDate } : {}),
    ...(entity.instructions !== null ? { instructions: entity.instructions } : {}),
    ...(entity.assignedMemberId !== null ? { assignedMemberId: entity.assignedMemberId } : {}),
  };
}
