// RESPONSIBILITY: Reads trainer-owned workout plans and reusable exercises with validated pagination, sorting, and filtering.
// FLOW: Workout query controller → query service → trainer-scoped repositories → domain mappers.
import { Injectable } from '@nestjs/common';
import type { TrainerWorkoutCollectionResult } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_types/trainer-workout.types';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { TrainerWorkoutRepository } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_repositories/trainer-workout-repository';
import { TrainerWorkoutExercisesRepository } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_repositories/trainer-workout-exercises.repository';
import { TrainerWorkoutQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-query.dto';
import type { WorkoutDomain } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout.domain';
import { buildCorePaginationMeta } from '@/backend_trainer/backend_core/core_utils/core-pagination.utils';
import type { WorkoutExerciseDomain } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-exercise.domain';
/**
 * Intent: Defines the TrainerWorkoutQueryService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerWorkoutQueryService {
  constructor(
    private readonly workouts: TrainerWorkoutRepository,
    private readonly exercises: TrainerWorkoutExercisesRepository,
  ) {}
  /** Lists trainer-owned workout plans for the requested page and filters. */
  /**
 * Intent: Executes the plans operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes plans inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for plans.
 * @returns {Promise<TrainerWorkoutCollectionResult<WorkoutDomain>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async plans(query: TrainerWorkoutQueryDto): Promise<TrainerWorkoutCollectionResult<WorkoutDomain>> {
    const trainerId = CoreRequestContext.getUserIdOrThrow();
    const result = await this.workouts.findMany(trainerId, query);
    return {
      workouts: result.rows,
      total: result.total,
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      pagination: buildCorePaginationMeta(result.total, query.page, query.limit),
    };
  }
  /** Returns one trainer-owned workout plan by identifier. */
  /**
 * Intent: Executes the plan operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes plan inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for plan.
 * @returns {Promise<WorkoutDomain>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async plan(id: string): Promise<WorkoutDomain> {
    const trainerId = CoreRequestContext.getUserIdOrThrow();
    return this.workouts.findByIdOrThrow(trainerId, id);
  }
  /** Lists trainer-owned reusable exercises for the requested page and filters. */
  /**
 * Intent: Executes the exerciseList operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes exerciseList inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for exerciseList.
 * @returns {Promise<TrainerWorkoutCollectionResult<WorkoutExerciseDomain>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async exerciseList(query: TrainerWorkoutQueryDto): Promise<TrainerWorkoutCollectionResult<WorkoutExerciseDomain>> {
    const trainerId = CoreRequestContext.getUserIdOrThrow();
    const result = await this.exercises.findMany(trainerId, query);
    return {
      exercises: result.rows,
      total: result.total,
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      pagination: buildCorePaginationMeta(result.total, query.page, query.limit),
    };
  }
  /** Returns one trainer-owned exercise by identifier. */
  /**
 * Intent: Executes the exercise operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes exercise inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for exercise.
 * @returns {Promise<WorkoutExerciseDomain>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async exercise(id: string): Promise<WorkoutExerciseDomain> {
    const trainerId = CoreRequestContext.getUserIdOrThrow();
    return this.exercises.findByIdOrThrow(trainerId, id);
  }
}
