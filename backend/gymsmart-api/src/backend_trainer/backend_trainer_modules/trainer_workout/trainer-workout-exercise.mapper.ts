// RESPONSIBILITY: Maps exercise ORM state to the Trainer API domain shape without nullable optional fields.
// FLOW: TrainerWorkoutExerciseEntity → enum normalization → nullable-field omission → WorkoutExerciseDomain.

import type { TrainerWorkoutExerciseEntity } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-exercise.entity';
import { TrainerWorkoutEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enum.mapper';
import type { WorkoutExerciseDomain } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-exercise.domain';

/** Maps a persisted reusable exercise into the frontend-compatible response contract. */
/**
 * @description Executes WorkoutExerciseMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for WorkoutExerciseMapper.
 * @returns {WorkoutExerciseDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function WorkoutExerciseMapper(entity: TrainerWorkoutExerciseEntity): WorkoutExerciseDomain {
  return {
    id: entity.id, name: entity.name, difficulty: TrainerWorkoutEnumMapper.toApiDifficulty(entity.difficulty), isActive: entity.isActive,
    ...(entity.category !== null ? { category: entity.category } : {}),
    ...(entity.muscleGroup !== null ? { muscleGroup: entity.muscleGroup } : {}),
    ...(entity.equipment !== null ? { equipment: entity.equipment } : {}),
    ...(entity.instructions !== null ? { instructions: entity.instructions } : {}),
    ...(entity.videoUrl !== null ? { videoUrl: entity.videoUrl } : {}),
    ...(entity.imageUrl !== null ? { imageUrl: entity.imageUrl } : {}),
    ...(entity.sets !== null ? { sets: Number(entity.sets) } : {}),
    ...(entity.reps !== null ? { reps: entity.reps } : {}),
    ...(entity.duration !== null ? { duration: entity.duration } : {}),
    ...(entity.description !== null ? { description: entity.description } : {}),
  };
}
