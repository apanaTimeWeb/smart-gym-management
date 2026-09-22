// @ts-nocheck
// RESPONSIBILITY: Transaction orchestrator for Manager library; no domain business rules live here.
// FLOW: command use-case -> LibraryOrchestratorService -> UnitOfWork -> repository -> audit -> event.

import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/backend_manager/core/audit/core-audit-log.repository';
import { CoreEventRegistry } from '@/backend_manager/core/events/core-event-registry.constants';
import { CoreEventService } from '@/backend_manager/core/events/core-event.service';
import { CoreUnitOfWorkService } from '@/backend_manager/core/database/core-unit-of-work.service';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { LibraryRepository } from '@/backend_manager/modules/manager/library/repositories/library-repository';

@Injectable()
export class LibraryOrchestratorService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly audit: CoreAuditLogRepository, private readonly events: CoreEventService, private readonly repository: LibraryRepository) {}

  /** @description Creates a library record atomically with its audit entry. @param data - Validated payload. @returns Created domain payload. */
  async createLibrary(data: CoreJsonObject): Promise<CoreJsonObject> { return this.runCreate(data); }

  /** @description Updates a library record atomically with its audit entry. @param id - Resource UUID. @param data - Validated patch. @returns Updated domain payload. @throws CoreNotFoundException when absent. */
  async updateLibraryById(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runUpdate(id, data); }

  /** @description Soft-deletes a library record atomically with its audit entry. @param data - Unused request payload for interface compatibility. @param id - Resource UUID. @returns Soft-deleted domain payload. @throws CoreNotFoundException when absent. */
  async softDeleteLibraryById(id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runDelete(id); }

  /** @description Runs create inside a transaction and emits the feature lifecycle event. @param data - Validated data. @returns Created payload. */
  private async runCreate(data: CoreJsonObject): Promise<CoreJsonObject> { let result: CoreJsonObject = {}; let id=''; await this.uow.run(async(context) => { const row=await this.repository.createLibrary(data,context); result={ id: row.id, ...row.payload }; id=row.id; await this.audit.append(context,'MANAGER.LIBRARY.CREATED','library',id,null,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_LIBRARY_CREATED,{feature:'library',id}); return result; }

  /** @description Runs update inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @param data - Patch data. @returns Updated payload. */
  private async runUpdate(id:string,data:CoreJsonObject):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findLibraryByIdOrThrow(id); const row=await this.repository.updateLibraryById(id,data,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.LIBRARY.UPDATED','library',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_LIBRARY_UPDATED,{feature:'library',id}); return result; }

  /** @description Runs soft delete inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @returns Soft-deleted payload. */
  private async runDelete(id:string):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findLibraryByIdOrThrow(id); const row=await this.repository.softDeleteLibraryById(id,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.LIBRARY.DELETED','library',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_LIBRARY_DELETED,{feature:'library',id}); return result; }
}
