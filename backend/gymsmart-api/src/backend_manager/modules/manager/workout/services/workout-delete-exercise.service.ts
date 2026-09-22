// RESPONSIBILITY: Write use-case for DELETE /api/v1/manager/workouts/exercises/:id.
// FLOW: Controller DTO -> WorkoutDeleteExerciseService -> WorkoutOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { WorkoutOrchestratorService } from '@/backend_manager/modules/manager/workout/services/workout-orchestrator.service';

@Injectable()
export class WorkoutDeleteExerciseService {
  constructor(private readonly orchestrator: WorkoutOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteExercise(id?: string): Promise<CoreJsonObject> { return this.orchestrator.softDeleteWorkoutById(id); }
}
