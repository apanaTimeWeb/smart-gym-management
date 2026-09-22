// RESPONSIBILITY: Transaction orchestrator for Manager maintenance; no domain business rules live here.
// FLOW: command use-case -> MaintenanceOrchestratorService -> UnitOfWork -> repository -> audit -> event.

import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/core/audit/core-audit-log.repository';
import { CoreEventRegistry } from '@/core/events/core-event-registry.constants';
import { CoreEventService } from '@/core/events/core-event.service';
import { CoreUnitOfWorkService } from '@/core/database/core-unit-of-work.service';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { MaintenanceRepository } from '@/modules/manager/maintenance/repositories/maintenance-repository';

@Injectable()
export class MaintenanceOrchestratorService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly audit: CoreAuditLogRepository, private readonly events: CoreEventService, private readonly repository: MaintenanceRepository) {}

  /** @description Creates a maintenance record atomically with its audit entry. @param data - Validated payload. @returns Created domain payload. */
  async createMaintenance(data: CoreJsonObject): Promise<CoreJsonObject> { return this.runCreate(data); }

  /** @description Updates a maintenance record atomically with its audit entry. @param id - Resource UUID. @param data - Validated patch. @returns Updated domain payload. @throws CoreNotFoundException when absent. */
  async updateMaintenanceById(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runUpdate(id, data); }

  /** @description Soft-deletes a maintenance record atomically with its audit entry. @param data - Unused request payload for interface compatibility. @param id - Resource UUID. @returns Soft-deleted domain payload. @throws CoreNotFoundException when absent. */
  async softDeleteMaintenanceById(id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runDelete(id); }

  /** @description Runs create inside a transaction and emits the feature lifecycle event. @param data - Validated data. @returns Created payload. */
  private async runCreate(data: CoreJsonObject): Promise<CoreJsonObject> { let result: CoreJsonObject = {}; let id=''; await this.uow.run(async(context) => { const row=await this.repository.createMaintenance(data,context); result={ id: row.id, ...row.payload }; id=row.id; await this.audit.append(context,'MANAGER.MAINTENANCE.CREATED','maintenance',id,null,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_MAINTENANCE_CREATED,{feature:'maintenance',id}); return result; }

  /** @description Runs update inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @param data - Patch data. @returns Updated payload. */
  private async runUpdate(id:string,data:CoreJsonObject):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findMaintenanceByIdOrThrow(id); const row=await this.repository.updateMaintenanceById(id,data,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.MAINTENANCE.UPDATED','maintenance',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_MAINTENANCE_UPDATED,{feature:'maintenance',id}); return result; }

  /** @description Runs soft delete inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @returns Soft-deleted payload. */
  private async runDelete(id:string):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findMaintenanceByIdOrThrow(id); const row=await this.repository.softDeleteMaintenanceById(id,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.MAINTENANCE.DELETED','maintenance',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_MAINTENANCE_DELETED,{feature:'maintenance',id}); return result; }
}
