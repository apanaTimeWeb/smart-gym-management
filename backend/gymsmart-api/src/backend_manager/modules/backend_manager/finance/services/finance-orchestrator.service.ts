// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/backend_manager/core/audit/core-audit-log.repository';
import { CoreUnitOfWorkService } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreEventRegistry } from '@/backend_manager/core/events/core-event-registry.constants';
import { CoreEventService } from '@/backend_manager/core/events/core-event.service';
import { CoreContextException } from '@/backend_manager/core/exceptions/core-context.exception';

import { FinanceRepository } from '@/backend_manager/modules/backend_manager/finance/repositories/finance-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class FinanceOrchestratorService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly audit: CoreAuditLogRepository, private readonly events: CoreEventService, private readonly repository: FinanceRepository) {}

  /** @description Creates a finance record atomically with its audit entry. @param data - Validated payload. @returns Created domain payload. */
  async createFinance(data: CoreJsonObject): Promise<CoreJsonObject> { return this.runCreate(data); }

  /** @description Updates a finance record atomically with its audit entry. @param id - Resource UUID. @param data - Validated patch. @returns Updated domain payload. @throws CoreNotFoundException when absent. */
  async updateFinanceById(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runUpdate(id, data); }

  /** @description Soft-deletes a finance record atomically with its audit entry. @param data - Unused request payload for interface compatibility. @param id - Resource UUID. @returns Soft-deleted domain payload. @throws CoreNotFoundException when absent. */
  async softDeleteFinanceById(id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runDelete(id); }

  /** @description Runs create inside a transaction and emits the feature lifecycle event. @param data - Validated data. @returns Created payload. */
  private async runCreate(data: CoreJsonObject): Promise<CoreJsonObject> { let result: CoreJsonObject = {}; let id=''; await this.uow.run(async(context) => { const row=await this.repository.createFinance(data,context); result={ id: row.id, ...row.payload }; id=row.id; await this.audit.append(context,'MANAGER.FINANCE.CREATED','finance',id,null,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_FINANCE_CREATED,{feature:'finance',id}); return result; }

  /** @description Runs update inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @param data - Patch data. @returns Updated payload. */
  private async runUpdate(id:string,data:CoreJsonObject):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findFinanceByIdOrThrow(id); const row=await this.repository.updateFinanceById(id,data,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.FINANCE.UPDATED','finance',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_FINANCE_UPDATED,{feature:'finance',id}); return result; }

  /** @description Runs soft delete inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @returns Soft-deleted payload. */
  private async runDelete(id:string):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findFinanceByIdOrThrow(id); const row=await this.repository.softDeleteFinanceById(id,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.FINANCE.DELETED','finance',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_FINANCE_DELETED,{feature:'finance',id}); return result; }
}
