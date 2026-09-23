// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { WorkoutRepository } from '@/backend_manager/modules/backend_manager/workout/repositories/workout-repository';

import type { CoreJsonObject, CoreJsonValue } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class WorkoutFetchAssignmentsService {
  constructor(private readonly repository: WorkoutRepository) {}

  /** @description Loads the workout collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchAssignments(query: CoreJsonObject = {}): Promise<CoreJsonValue[]> {
    const result = await this.repository.findWorkoutList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { assignments: rows, } as any;
  }
}
