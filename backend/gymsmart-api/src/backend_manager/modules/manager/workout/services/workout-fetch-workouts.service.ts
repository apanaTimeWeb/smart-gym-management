// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/workouts.
// FLOW: Controller -> WorkoutFetchWorkoutsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { WorkoutRepository } from '@/backend_manager/modules/manager/workout/repositories/workout-repository';

@Injectable()
export class WorkoutFetchWorkoutsService {
  constructor(private readonly repository: WorkoutRepository) {}

  /** @description Loads the workout collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchWorkouts(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findWorkoutList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { workouts: rows, total: result.meta.total }, meta: result.meta };
  }
}
