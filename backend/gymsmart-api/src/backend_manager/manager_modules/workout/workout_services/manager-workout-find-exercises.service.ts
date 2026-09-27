// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerWorkoutRepository } from '@/backend_manager/manager_modules/workout/manager-workout.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerWorkoutFindExercisesServiceFindExercisesResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerWorkoutFindExercisesService {
  constructor(private readonly repository: ManagerWorkoutRepository) {}

  /** @description Loads the workout collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findExercises(query: ManagerCoreJsonObject = {}): Promise<ManagerWorkoutFindExercisesServiceFindExercisesResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row: any) => ({ id: row.id, ...row.payload }));
    return { data: { exercises: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerWorkoutFindExercisesService as WorkoutFindExercisesService };
