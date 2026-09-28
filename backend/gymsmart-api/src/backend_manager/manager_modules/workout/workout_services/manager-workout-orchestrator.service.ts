// RESPONSIBILITY: Owns the workout transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerWorkoutMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerWorkoutMutationService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerWorkoutDomainData } from '@/backend_manager/manager_modules/workout/workout_types/manager-workout.types';

@Injectable()
export class ManagerWorkoutOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerWorkoutMutationService) {}

  async createWorkout(data: ManagerCoreJsonObject): Promise<ManagerWorkoutDomainData> {
    let result: ManagerWorkoutDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createWorkout(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_WORKOUT_CREATED, { feature: 'workout', id: result.id });
    return result;
  }

  async updateWorkout(data: ManagerCoreJsonObject, id?: string): Promise<ManagerWorkoutDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerWorkoutDomainData | undefined;
    await this.uow.run(async (context) => { result = await (this.mutation as any).updateWorkout(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_WORKOUT_UPDATED, { feature: 'workout', id });
    return result;
  }

  async deleteWorkout(id?: string): Promise<ManagerWorkoutDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerWorkoutDomainData | undefined;
    await this.uow.run(async (context) => { result = await (this.mutation as any).deleteWorkout(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_WORKOUT_DELETED, { feature: 'workout', id });
    return result;
  }

  async createExercise(data: ManagerCoreJsonObject): Promise<ManagerWorkoutDomainData> {
    let result: ManagerWorkoutDomainData | undefined;
    await this.uow.run(async (context) => { result = await (this.mutation as any).createExercise(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_WORKOUT_CREATED, { feature: 'workout', id: result.id, action: 'EXERCISE_CREATED' });
    return result;
  }

  async updateExercise(data: ManagerCoreJsonObject, id?: string): Promise<ManagerWorkoutDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerWorkoutDomainData | undefined;
    await this.uow.run(async (context) => { result = await (this.mutation as any).updateExercise(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_WORKOUT_UPDATED, { feature: 'workout', id, action: 'EXERCISE_UPDATED' });
    return result;
  }

  async deleteExercise(id?: string): Promise<ManagerWorkoutDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerWorkoutDomainData | undefined;
    await this.uow.run(async (context) => { result = await (this.mutation as any).deleteExercise(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_WORKOUT_DELETED, { feature: 'workout', id, action: 'EXERCISE_DELETED' });
    return result;
  }
}
export { ManagerWorkoutOrchestratorService as WorkoutOrchestratorService };