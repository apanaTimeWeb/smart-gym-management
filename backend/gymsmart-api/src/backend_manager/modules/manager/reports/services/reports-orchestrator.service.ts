// RESPONSIBILITY: Transaction orchestrator for Manager reports; no domain business rules live here.
// FLOW: command use-case -> ReportsOrchestratorService -> UnitOfWork -> repository -> audit -> event.

import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/core/audit/core-audit-log.repository';
import { CoreEventRegistry } from '@/core/events/core-event-registry.constants';
import { CoreEventService } from '@/core/events/core-event.service';
import { CoreUnitOfWorkService } from '@/core/database/core-unit-of-work.service';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { ReportsRepository } from '@/modules/manager/reports/repositories/reports-repository';

@Injectable()
export class ReportsOrchestratorService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly audit: CoreAuditLogRepository, private readonly events: CoreEventService, private readonly repository: ReportsRepository) {}

  /** @description Creates a reports record atomically with its audit entry. @param data - Validated payload. @returns Created domain payload. */
  async createReports(data: CoreJsonObject): Promise<CoreJsonObject> { return this.runCreate(data); }

  /** @description Updates a reports record atomically with its audit entry. @param id - Resource UUID. @param data - Validated patch. @returns Updated domain payload. @throws CoreNotFoundException when absent. */
  async updateReportsById(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runUpdate(id, data); }

  /** @description Soft-deletes a reports record atomically with its audit entry. @param data - Unused request payload for interface compatibility. @param id - Resource UUID. @returns Soft-deleted domain payload. @throws CoreNotFoundException when absent. */
  async softDeleteReportsById(id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runDelete(id); }

  /** @description Runs create inside a transaction and emits the feature lifecycle event. @param data - Validated data. @returns Created payload. */
  private async runCreate(data: CoreJsonObject): Promise<CoreJsonObject> { let result: CoreJsonObject = {}; let id=''; await this.uow.run(async(context) => { const row=await this.repository.createReports(data,context); result={ id: row.id, ...row.payload }; id=row.id; await this.audit.append(context,'MANAGER.REPORTS.CREATED','reports',id,null,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_REPORTS_CREATED,{feature:'reports',id}); return result; }

  /** @description Runs update inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @param data - Patch data. @returns Updated payload. */
  private async runUpdate(id:string,data:CoreJsonObject):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findReportsByIdOrThrow(id); const row=await this.repository.updateReportsById(id,data,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.REPORTS.UPDATED','reports',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_REPORTS_UPDATED,{feature:'reports',id}); return result; }

  /** @description Runs soft delete inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @returns Soft-deleted payload. */
  private async runDelete(id:string):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findReportsByIdOrThrow(id); const row=await this.repository.softDeleteReportsById(id,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.REPORTS.DELETED','reports',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_REPORTS_DELETED,{feature:'reports',id}); return result; }
}
