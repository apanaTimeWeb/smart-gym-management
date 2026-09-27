// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerWorkoutRepository } from '@/backend_manager/manager_modules/workout/manager-workout.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

type WorkoutAssignmentRow = { id: string; [key: string]: unknown };
export type WorkoutAssignmentsResult = { assignments: WorkoutAssignmentRow[] };

@Injectable()
export class ManagerWorkoutFindAssignmentsService {
  constructor(private readonly repository: ManagerWorkoutRepository) {}

  /** @description Loads the workout collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findAssignments(query: ManagerCoreJsonObject = {}): Promise<WorkoutAssignmentsResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { assignments: rows, };
  }
}

export { ManagerWorkoutFindAssignmentsService as WorkoutFindAssignmentsService };
