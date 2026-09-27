// RESPONSIBILITY: Owns the pt transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerPtMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerPtMutationService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PtDomainData } from '@/backend_manager/manager_modules/pt/pt_types/manager-pt.types';

@Injectable()
export class ManagerPtOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerPtMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createAssignment(data: ManagerCoreJsonObject): Promise<PtDomainData> {
    let result: PtDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createAssignment(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_PT_CREATED, { feature: 'pt', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateAssignment(data: ManagerCoreJsonObject, id?: string): Promise<PtDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: PtDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateAssignment(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_PT_UPDATED, { feature: 'pt', id });
    return result;
  }

  /** @description Completes one PT session inside a UnitOfWork and emits a committed event. @param data - Completion payload. @param id - Assignment UUID. @returns Updated assignment. */
  async completeSession(data: ManagerCoreJsonObject, id?: string): Promise<PtDomainData> { if(!id) throw new ManagerCoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); let result:PtDomainData|undefined; await this.uow.run(async context=>{result=await this.mutation.completeSession(id,data,context);}); if(!result) throw new ManagerCoreContextException('Mutation completed without a result.','CORE.TRANSACTION.NO_RESULT'); this.events.emit(ManagerCoreEventRegistry.MANAGER_PT_UPDATED,{feature:'pt',id,action:'SESSION_COMPLETED'}); return result; }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteAssignment(id?: string): Promise<PtDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: PtDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteAssignment(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_PT_DELETED, { feature: 'pt', id });
    return result;
  }
}

export { ManagerPtOrchestratorService as PtOrchestratorService };
