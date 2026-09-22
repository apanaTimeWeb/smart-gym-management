// RESPONSIBILITY: Write use-case for PATCH /api/v1/manager/workouts/:id.
// FLOW: Controller DTO -> WorkoutUpdateWorkoutService -> WorkoutOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { WorkoutOrchestratorService } from '@/backend_manager/modules/manager/workout/services/workout-orchestrator.service';

@Injectable()
export class WorkoutUpdateWorkoutService {
  constructor(private readonly orchestrator: WorkoutOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateWorkout(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.updateWorkoutById(data, id);
  }
}
