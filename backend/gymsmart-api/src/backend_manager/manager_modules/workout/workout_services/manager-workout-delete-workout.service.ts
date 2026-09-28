// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerWorkoutOrchestratorService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerWorkoutDeleteWorkoutService {
  constructor(private readonly orchestrator: ManagerWorkoutOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteWorkout(id?: string): ReturnType<ManagerWorkoutOrchestratorService['deleteWorkout']> { return this.orchestrator.deleteWorkout(id); }
}

export { ManagerWorkoutDeleteWorkoutService as WorkoutDeleteWorkoutService };
