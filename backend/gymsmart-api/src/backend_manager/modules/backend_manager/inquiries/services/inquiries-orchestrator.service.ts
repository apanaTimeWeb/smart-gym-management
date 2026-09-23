// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/backend_manager/core/audit/core-audit-log.repository';
import { CoreUnitOfWorkService } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreEventRegistry } from '@/backend_manager/core/events/core-event-registry.constants';
import { CoreEventService } from '@/backend_manager/core/events/core-event.service';
import { CoreContextException } from '@/backend_manager/core/exceptions/core-context.exception';

import { InquiriesRepository } from '@/backend_manager/modules/backend_manager/inquiries/repositories/inquiries-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class InquiriesOrchestratorService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly audit: CoreAuditLogRepository, private readonly events: CoreEventService, private readonly repository: InquiriesRepository) {}

  /** @description Creates a inquiries record atomically with its audit entry. @param data - Validated payload. @returns Created domain payload. */
  async createInquiries(data: CoreJsonObject): Promise<CoreJsonObject> { return this.runCreate(data); }

  /** @description Updates a inquiries record atomically with its audit entry. @param id - Resource UUID. @param data - Validated patch. @returns Updated domain payload. @throws CoreNotFoundException when absent. */
  async updateInquiriesById(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runUpdate(id, data); }

  /** @description Soft-deletes a inquiries record atomically with its audit entry. @param data - Unused request payload for interface compatibility. @param id - Resource UUID. @returns Soft-deleted domain payload. @throws CoreNotFoundException when absent. */
  async softDeleteInquiriesById(id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runDelete(id); }

  /** @description Runs create inside a transaction and emits the feature lifecycle event. @param data - Validated data. @returns Created payload. */
  private async runCreate(data: CoreJsonObject): Promise<CoreJsonObject> { let result: CoreJsonObject = {}; let id=''; await this.uow.run(async(context) => { const row=await this.repository.createInquiries(data,context); result={ id: row.id, ...row.payload }; id=row.id; await this.audit.append(context,'MANAGER.INQUIRIES.CREATED','inquiries',id,null,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_INQUIRIES_CREATED,{feature:'inquiries',id}); return result; }

  /** @description Runs update inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @param data - Patch data. @returns Updated payload. */
  private async runUpdate(id:string,data:CoreJsonObject):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findInquiriesByIdOrThrow(id); const row=await this.repository.updateInquiriesById(id,data,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.INQUIRIES.UPDATED','inquiries',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_INQUIRIES_UPDATED,{feature:'inquiries',id}); return result; }

  /** @description Runs soft delete inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @returns Soft-deleted payload. */
  private async runDelete(id:string):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findInquiriesByIdOrThrow(id); const row=await this.repository.softDeleteInquiriesById(id,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.INQUIRIES.DELETED','inquiries',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_INQUIRIES_DELETED,{feature:'inquiries',id}); return result; }
}
