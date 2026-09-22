// @ts-nocheck
// RESPONSIBILITY: Transaction orchestrator for Manager dashboard; no domain business rules live here.
// FLOW: command use-case -> DashboardOrchestratorService -> UnitOfWork -> repository -> audit -> event.

import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/backend_manager/core/audit/core-audit-log.repository';
import { CoreEventRegistry } from '@/backend_manager/core/events/core-event-registry.constants';
import { CoreEventService } from '@/backend_manager/core/events/core-event.service';
import { CoreUnitOfWorkService } from '@/backend_manager/core/database/core-unit-of-work.service';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { DashboardRepository } from '@/backend_manager/modules/manager/dashboard/repositories/dashboard-repository';

@Injectable()
export class DashboardOrchestratorService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly audit: CoreAuditLogRepository, private readonly events: CoreEventService, private readonly repository: DashboardRepository) {}

  /** @description Creates a dashboard record atomically with its audit entry. @param data - Validated payload. @returns Created domain payload. */
  async createDashboard(data: CoreJsonObject): Promise<CoreJsonObject> { return this.runCreate(data); }

  /** @description Updates a dashboard record atomically with its audit entry. @param id - Resource UUID. @param data - Validated patch. @returns Updated domain payload. @throws CoreNotFoundException when absent. */
  async updateDashboardById(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runUpdate(id, data); }

  /** @description Soft-deletes a dashboard record atomically with its audit entry. @param data - Unused request payload for interface compatibility. @param id - Resource UUID. @returns Soft-deleted domain payload. @throws CoreNotFoundException when absent. */
  async softDeleteDashboardById(id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runDelete(id); }

  /** @description Runs create inside a transaction and emits the feature lifecycle event. @param data - Validated data. @returns Created payload. */
  private async runCreate(data: CoreJsonObject): Promise<CoreJsonObject> { let result: CoreJsonObject = {}; let id=''; await this.uow.run(async(context) => { const row=await this.repository.createDashboard(data,context); result={ id: row.id, ...row.payload }; id=row.id; await this.audit.append(context,'MANAGER.DASHBOARD.CREATED','dashboard',id,null,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_DASHBOARD_CREATED,{feature:'dashboard',id}); return result; }

  /** @description Runs update inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @param data - Patch data. @returns Updated payload. */
  private async runUpdate(id:string,data:CoreJsonObject):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findDashboardByIdOrThrow(id); const row=await this.repository.updateDashboardById(id,data,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.DASHBOARD.UPDATED','dashboard',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_DASHBOARD_UPDATED,{feature:'dashboard',id}); return result; }

  /** @description Runs soft delete inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @returns Soft-deleted payload. */
  private async runDelete(id:string):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findDashboardByIdOrThrow(id); const row=await this.repository.softDeleteDashboardById(id,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.DASHBOARD.DELETED','dashboard',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_DASHBOARD_DELETED,{feature:'dashboard',id}); return result; }
}
