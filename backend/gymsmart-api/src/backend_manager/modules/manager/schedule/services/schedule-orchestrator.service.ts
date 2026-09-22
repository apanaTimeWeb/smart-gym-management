// RESPONSIBILITY: Transaction orchestrator for Manager schedule; no domain business rules live here.
// FLOW: command use-case -> ScheduleOrchestratorService -> UnitOfWork -> repository -> audit -> event.

import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/core/audit/core-audit-log.repository';
import { CoreEventRegistry } from '@/core/events/core-event-registry.constants';
import { CoreEventService } from '@/core/events/core-event.service';
import { CoreUnitOfWorkService } from '@/core/database/core-unit-of-work.service';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { ScheduleRepository } from '@/modules/manager/schedule/repositories/schedule-repository';

@Injectable()
export class ScheduleOrchestratorService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly audit: CoreAuditLogRepository, private readonly events: CoreEventService, private readonly repository: ScheduleRepository) {}

  /** @description Creates a schedule record atomically with its audit entry. @param data - Validated payload. @returns Created domain payload. */
  async createSchedule(data: CoreJsonObject): Promise<CoreJsonObject> { return this.runCreate(data); }

  /** @description Updates a schedule record atomically with its audit entry. @param id - Resource UUID. @param data - Validated patch. @returns Updated domain payload. @throws CoreNotFoundException when absent. */
  async updateScheduleById(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runUpdate(id, data); }

  /** @description Soft-deletes a schedule record atomically with its audit entry. @param data - Unused request payload for interface compatibility. @param id - Resource UUID. @returns Soft-deleted domain payload. @throws CoreNotFoundException when absent. */
  async softDeleteScheduleById(id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runDelete(id); }

  /** @description Runs create inside a transaction and emits the feature lifecycle event. @param data - Validated data. @returns Created payload. */
  private async runCreate(data: CoreJsonObject): Promise<CoreJsonObject> { let result: CoreJsonObject = {}; let id=''; await this.uow.run(async(context) => { const row=await this.repository.createSchedule(data,context); result={ id: row.id, ...row.payload }; id=row.id; await this.audit.append(context,'MANAGER.SCHEDULE.CREATED','schedule',id,null,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_SCHEDULE_CREATED,{feature:'schedule',id}); return result; }

  /** @description Runs update inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @param data - Patch data. @returns Updated payload. */
  private async runUpdate(id:string,data:CoreJsonObject):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findScheduleByIdOrThrow(id); const row=await this.repository.updateScheduleById(id,data,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.SCHEDULE.UPDATED','schedule',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_SCHEDULE_UPDATED,{feature:'schedule',id}); return result; }

  /** @description Runs soft delete inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @returns Soft-deleted payload. */
  private async runDelete(id:string):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findScheduleByIdOrThrow(id); const row=await this.repository.softDeleteScheduleById(id,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.SCHEDULE.DELETED','schedule',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_SCHEDULE_DELETED,{feature:'schedule',id}); return result; }
}
