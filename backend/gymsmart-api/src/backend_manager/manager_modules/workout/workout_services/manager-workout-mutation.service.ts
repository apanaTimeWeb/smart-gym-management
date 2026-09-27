// RESPONSIBILITY: Owns workout mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerWorkoutMutationService → ManagerWorkoutRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerWorkoutRepository } from '@/backend_manager/manager_modules/workout/manager-workout.repository';
import type { WorkoutDomainData } from '@/backend_manager/manager_modules/workout/workout_types/manager-workout.types';

@Injectable()
export class ManagerWorkoutMutationService {
  constructor(private readonly repository: ManagerWorkoutRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one workout domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createExercise(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<WorkoutDomainData> { return (this.repository as any).createExercise(data, context); }
  async updateExercise(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<WorkoutDomainData> { return (this.repository as any).updateExercise(id, data, context); }
  async deleteExercise(id: string, context: ManagerCoreTransactionContext): Promise<WorkoutDomainData> { return (this.repository as any).deleteExercise(id, context); }

  async createWorkout(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<WorkoutDomainData> {
    const row = await this.repository.createWorkout(data, context);
    await this.audit.append(context, 'MANAGER.WORKOUT.CREATED', 'workout', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one workout domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateWorkout(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<WorkoutDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateWorkout(id, data, context);
    await this.audit.append(context, 'MANAGER.WORKOUT.UPDATED', 'workout', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one workout domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteWorkout(id: string, context: ManagerCoreTransactionContext): Promise<WorkoutDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.deleteWorkout(id, context);
    await this.audit.append(context, 'MANAGER.WORKOUT.DELETED', 'workout', id, before.payload, row.payload);
    return row;
  }

}
