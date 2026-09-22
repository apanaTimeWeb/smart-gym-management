// RESPONSIBILITY: Read use-case for GET /api/v1/manager/workout/assignments.
// FLOW: Controller -> WorkoutFetchAssignmentsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { WorkoutRepository } from '@/modules/manager/workout/repositories/workout-repository';

@Injectable()
export class WorkoutFetchAssignmentsService {
  constructor(private readonly repository: WorkoutRepository) {}

  /** @description Loads the workout collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchAssignments(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findWorkoutList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return rows as unknown as CoreJsonObject;
  }
}
