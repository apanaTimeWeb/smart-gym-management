// RESPONSIBILITY: Transaction orchestrator for Manager store; no domain business rules live here.
// FLOW: command use-case -> StoreOrchestratorService -> UnitOfWork -> repository -> audit -> event.

import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/core/audit/core-audit-log.repository';
import { CoreEventRegistry } from '@/core/events/core-event-registry.constants';
import { CoreEventService } from '@/core/events/core-event.service';
import { CoreUnitOfWorkService } from '@/core/database/core-unit-of-work.service';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { StoreRepository } from '@/modules/manager/store/repositories/store-repository';

@Injectable()
export class StoreOrchestratorService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly audit: CoreAuditLogRepository, private readonly events: CoreEventService, private readonly repository: StoreRepository) {}

  /** @description Creates a store record atomically with its audit entry. @param data - Validated payload. @returns Created domain payload. */
  async createStore(data: CoreJsonObject): Promise<CoreJsonObject> { return this.runCreate(data); }

  /** @description Updates a store record atomically with its audit entry. @param id - Resource UUID. @param data - Validated patch. @returns Updated domain payload. @throws CoreNotFoundException when absent. */
  async updateStoreById(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runUpdate(id, data); }

  /** @description Soft-deletes a store record atomically with its audit entry. @param data - Unused request payload for interface compatibility. @param id - Resource UUID. @returns Soft-deleted domain payload. @throws CoreNotFoundException when absent. */
  async softDeleteStoreById(id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runDelete(id); }

  /** @description Runs create inside a transaction and emits the feature lifecycle event. @param data - Validated data. @returns Created payload. */
  private async runCreate(data: CoreJsonObject): Promise<CoreJsonObject> { let result: CoreJsonObject = {}; let id=''; await this.uow.run(async(context) => { const row=await this.repository.createStore(data,context); result={ id: row.id, ...row.payload }; id=row.id; await this.audit.append(context,'MANAGER.STORE.CREATED','store',id,null,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_STORE_CREATED,{feature:'store',id}); return result; }

  /** @description Runs update inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @param data - Patch data. @returns Updated payload. */
  private async runUpdate(id:string,data:CoreJsonObject):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findStoreByIdOrThrow(id); const row=await this.repository.updateStoreById(id,data,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.STORE.UPDATED','store',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_STORE_UPDATED,{feature:'store',id}); return result; }

  /** @description Runs soft delete inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @returns Soft-deleted payload. */
  private async runDelete(id:string):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findStoreByIdOrThrow(id); const row=await this.repository.softDeleteStoreById(id,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.STORE.DELETED','store',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_STORE_DELETED,{feature:'store',id}); return result; }
}
