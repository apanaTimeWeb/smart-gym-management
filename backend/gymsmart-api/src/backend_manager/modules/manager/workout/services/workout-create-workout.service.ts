// RESPONSIBILITY: Write use-case for POST /api/v1/manager/workouts.
// FLOW: Controller DTO -> WorkoutCreateWorkoutService -> WorkoutOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { WorkoutOrchestratorService } from '@/backend_manager/modules/manager/workout/services/workout-orchestrator.service';

@Injectable()
export class WorkoutCreateWorkoutService {
  constructor(private readonly orchestrator: WorkoutOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createWorkout(data: CoreJsonObject): Promise<CoreJsonObject> {
    return this.orchestrator.createWorkout(data);
  }
}
