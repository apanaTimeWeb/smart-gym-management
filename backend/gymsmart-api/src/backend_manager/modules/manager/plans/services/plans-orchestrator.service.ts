// @ts-nocheck
// RESPONSIBILITY: Transaction orchestrator for Manager plans; no domain business rules live here.
// FLOW: command use-case -> PlansOrchestratorService -> UnitOfWork -> repository -> audit -> event.

import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/backend_manager/core/audit/core-audit-log.repository';
import { CoreEventRegistry } from '@/backend_manager/core/events/core-event-registry.constants';
import { CoreEventService } from '@/backend_manager/core/events/core-event.service';
import { CoreUnitOfWorkService } from '@/backend_manager/core/database/core-unit-of-work.service';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { PlansRepository } from '@/backend_manager/modules/manager/plans/repositories/plans-repository';

@Injectable()
export class PlansOrchestratorService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly audit: CoreAuditLogRepository, private readonly events: CoreEventService, private readonly repository: PlansRepository) {}

  /** @description Creates a plans record atomically with its audit entry. @param data - Validated payload. @returns Created domain payload. */
  async createPlans(data: CoreJsonObject): Promise<CoreJsonObject> { return this.runCreate(data); }

  /** @description Updates a plans record atomically with its audit entry. @param id - Resource UUID. @param data - Validated patch. @returns Updated domain payload. @throws CoreNotFoundException when absent. */
  async updatePlansById(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runUpdate(id, data); }

  /** @description Soft-deletes a plans record atomically with its audit entry. @param data - Unused request payload for interface compatibility. @param id - Resource UUID. @returns Soft-deleted domain payload. @throws CoreNotFoundException when absent. */
  async softDeletePlansById(id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runDelete(id); }

  /** @description Runs create inside a transaction and emits the feature lifecycle event. @param data - Validated data. @returns Created payload. */
  private async runCreate(data: CoreJsonObject): Promise<CoreJsonObject> { let result: CoreJsonObject = {}; let id=''; await this.uow.run(async(context) => { const row=await this.repository.createPlans(data,context); result={ id: row.id, ...row.payload }; id=row.id; await this.audit.append(context,'MANAGER.PLANS.CREATED','plans',id,null,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_PLANS_CREATED,{feature:'plans',id}); return result; }

  /** @description Runs update inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @param data - Patch data. @returns Updated payload. */
  private async runUpdate(id:string,data:CoreJsonObject):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findPlansByIdOrThrow(id); const row=await this.repository.updatePlansById(id,data,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.PLANS.UPDATED','plans',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_PLANS_UPDATED,{feature:'plans',id}); return result; }

  /** @description Runs soft delete inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @returns Soft-deleted payload. */
  private async runDelete(id:string):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findPlansByIdOrThrow(id); const row=await this.repository.softDeletePlansById(id,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.PLANS.DELETED','plans',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_PLANS_DELETED,{feature:'plans',id}); return result; }
}
