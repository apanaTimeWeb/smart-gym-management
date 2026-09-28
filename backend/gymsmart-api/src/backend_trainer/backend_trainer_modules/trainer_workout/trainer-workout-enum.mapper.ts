// RESPONSIBILITY: Translates workout enum values between canonical persistence values and the frozen frontend labels.
// FLOW: HTTP payload/ORM enum → TrainerWorkoutEnumMapper → frontend/API contract.

import { CoreDomainBadRequestException } from '@/backend_trainer/backend_core/core_errors/core-domain-bad-request.exception';
import { ExerciseDifficulty, WorkoutLevel } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enums';


/**
 * Intent: Defines the TrainerWorkoutEnumMapper boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerWorkoutEnumMapper {
  /** Converts a frontend workout level label into the canonical enum value. */
  static toLevel(value: unknown): WorkoutLevel {
    const map: Record<string, WorkoutLevel> = { Beginner: WorkoutLevel.BEGINNER, BEGINNER: WorkoutLevel.BEGINNER, Intermediate: WorkoutLevel.INTERMEDIATE, INTERMEDIATE: WorkoutLevel.INTERMEDIATE, Advanced: WorkoutLevel.ADVANCED, ADVANCED: WorkoutLevel.ADVANCED };
    const result = typeof value === 'string' ? map[value] : undefined;
    if (!result) throw new CoreDomainBadRequestException('WORKOUT.ENUM.LEVEL_INVALID');
    return result;
  }

  /** Converts a frontend exercise difficulty label into the canonical enum value. */
  static toDifficulty(value: unknown): ExerciseDifficulty {
    const map: Record<string, ExerciseDifficulty> = { Beginner: ExerciseDifficulty.BEGINNER, BEGINNER: ExerciseDifficulty.BEGINNER, Intermediate: ExerciseDifficulty.INTERMEDIATE, INTERMEDIATE: ExerciseDifficulty.INTERMEDIATE, Advanced: ExerciseDifficulty.ADVANCED, ADVANCED: ExerciseDifficulty.ADVANCED };
    const result = typeof value === 'string' ? map[value] : undefined;
    if (!result) throw new CoreDomainBadRequestException('WORKOUT.ENUM.DIFFICULTY_INVALID');
    return result;
  }

  /** Converts a canonical workout level into the frozen frontend label. */
  static toApiLevel(value: WorkoutLevel): string { return value === WorkoutLevel.BEGINNER ? 'Beginner' : value === WorkoutLevel.INTERMEDIATE ? 'Intermediate' : 'Advanced'; }

  /** Converts a canonical exercise difficulty into the frozen frontend label. */
  static toApiDifficulty(value: ExerciseDifficulty): string { return value === ExerciseDifficulty.BEGINNER ? 'Beginner' : value === ExerciseDifficulty.INTERMEDIATE ? 'Intermediate' : 'Advanced'; }
}
