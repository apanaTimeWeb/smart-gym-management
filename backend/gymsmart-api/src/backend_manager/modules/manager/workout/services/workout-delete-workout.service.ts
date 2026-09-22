// RESPONSIBILITY: Write use-case for DELETE /api/v1/manager/workouts/:id.
// FLOW: Controller DTO -> WorkoutDeleteWorkoutService -> WorkoutOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { WorkoutOrchestratorService } from '@/modules/manager/workout/services/workout-orchestrator.service';

@Injectable()
export class WorkoutDeleteWorkoutService {
  constructor(private readonly orchestrator: WorkoutOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteWorkout(id?: string): Promise<CoreJsonObject> { return this.orchestrator.softDeleteWorkoutById(id); }
}
