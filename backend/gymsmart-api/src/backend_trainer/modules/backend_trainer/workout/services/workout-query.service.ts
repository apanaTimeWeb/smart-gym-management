// RESPONSIBILITY: Reads trainer-owned workout plans and reusable exercises with validated pagination, sorting, and filtering.
// FLOW: Workout query controller → query service → trainer-scoped repositories → domain mappers.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { WorkoutRepository } from '@/backend_trainer/modules/backend_trainer/workout/repositories/workout-repository';
import { WorkoutExercisesRepository } from '@/backend_trainer/modules/backend_trainer/workout/repositories/workout-exercises.repository';
import { WorkoutQueryDto } from '@/backend_trainer/modules/backend_trainer/workout/dtos/workout-query.dto';
import { WorkoutMapper } from '@/backend_trainer/modules/backend_trainer/workout/workout.mapper';
import { buildCorePaginationMeta } from '@/backend_trainer/core/utils/core-pagination.utils';
import { WorkoutExerciseMapper } from '@/backend_trainer/modules/backend_trainer/workout/workout-exercise.mapper';

@Injectable()
export class WorkoutQueryService {
  constructor(
    private readonly workouts: WorkoutRepository,
    private readonly exercises: WorkoutExercisesRepository,
  ) {}

  /** Lists trainer-owned workout plans for the requested page and filters. */
  async plans(query: WorkoutQueryDto): Promise<Record<string, unknown>> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    const result = await this.workouts.findMany(trainerId, query);
    return {
      workouts: result.rows.map(WorkoutMapper),
      total: result.total,
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      pagination: buildCorePaginationMeta(result.total, query.page, query.limit),
    };
  }

  /** Returns one trainer-owned workout plan by identifier. */
  async plan(id: string): Promise<ReturnType<typeof WorkoutMapper>> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    return WorkoutMapper(await this.workouts.findByIdOrThrow(trainerId, id));
  }

  /** Lists trainer-owned reusable exercises for the requested page and filters. */
  async exerciseList(query: WorkoutQueryDto): Promise<Record<string, unknown>> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    const result = await this.exercises.findMany(trainerId, query);
    return {
      exercises: result.rows.map(WorkoutExerciseMapper),
      total: result.total,
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      pagination: buildCorePaginationMeta(result.total, query.page, query.limit),
    };
  }

  /** Returns one trainer-owned exercise by identifier. */
  async exercise(id: string): Promise<ReturnType<typeof WorkoutExerciseMapper>> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    return WorkoutExerciseMapper(await this.exercises.findByIdOrThrow(trainerId, id));
  }
}
