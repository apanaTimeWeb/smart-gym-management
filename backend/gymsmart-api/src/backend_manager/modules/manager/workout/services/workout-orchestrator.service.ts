// RESPONSIBILITY: Transaction orchestrator for Manager workout; no domain business rules live here.
// FLOW: command use-case -> WorkoutOrchestratorService -> UnitOfWork -> repository -> audit -> event.

import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/core/audit/core-audit-log.repository';
import { CoreEventRegistry } from '@/core/events/core-event-registry.constants';
import { CoreEventService } from '@/core/events/core-event.service';
import { CoreUnitOfWorkService } from '@/core/database/core-unit-of-work.service';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { WorkoutRepository } from '@/modules/manager/workout/repositories/workout-repository';

@Injectable()
export class WorkoutOrchestratorService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly audit: CoreAuditLogRepository, private readonly events: CoreEventService, private readonly repository: WorkoutRepository) {}

  /** @description Creates a workout record atomically with its audit entry. @param data - Validated payload. @returns Created domain payload. */
  async createWorkout(data: CoreJsonObject): Promise<CoreJsonObject> { return this.runCreate(data); }

  /** @description Updates a workout record atomically with its audit entry. @param id - Resource UUID. @param data - Validated patch. @returns Updated domain payload. @throws CoreNotFoundException when absent. */
  async updateWorkoutById(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runUpdate(id, data); }

  /** @description Soft-deletes a workout record atomically with its audit entry. @param data - Unused request payload for interface compatibility. @param id - Resource UUID. @returns Soft-deleted domain payload. @throws CoreNotFoundException when absent. */
  async softDeleteWorkoutById(id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runDelete(id); }

  /** @description Runs create inside a transaction and emits the feature lifecycle event. @param data - Validated data. @returns Created payload. */
  private async runCreate(data: CoreJsonObject): Promise<CoreJsonObject> { let result: CoreJsonObject = {}; let id=''; await this.uow.run(async(context) => { const row=await this.repository.createWorkout(data,context); result={ id: row.id, ...row.payload }; id=row.id; await this.audit.append(context,'MANAGER.WORKOUT.CREATED','workout',id,null,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_WORKOUT_CREATED,{feature:'workout',id}); return result; }

  /** @description Runs update inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @param data - Patch data. @returns Updated payload. */
  private async runUpdate(id:string,data:CoreJsonObject):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findWorkoutByIdOrThrow(id); const row=await this.repository.updateWorkoutById(id,data,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.WORKOUT.UPDATED','workout',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_WORKOUT_UPDATED,{feature:'workout',id}); return result; }

  /** @description Runs soft delete inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @returns Soft-deleted payload. */
  private async runDelete(id:string):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findWorkoutByIdOrThrow(id); const row=await this.repository.softDeleteWorkoutById(id,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.WORKOUT.DELETED','workout',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_WORKOUT_DELETED,{feature:'workout',id}); return result; }
}
