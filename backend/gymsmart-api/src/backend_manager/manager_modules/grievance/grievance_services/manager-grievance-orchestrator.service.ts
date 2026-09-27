// RESPONSIBILITY: Owns the grievance transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerGrievanceMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerGrievanceMutationService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerGrievanceDomainData } from '@/backend_manager/manager_modules/grievance/grievance_types/manager-grievance.types';

@Injectable()
export class ManagerGrievanceOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerGrievanceMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createGrievance(data: ManagerCoreJsonObject): Promise<ManagerGrievanceDomainData> {
    let result: ManagerGrievanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createGrievance(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_GRIEVANCE_CREATED, { feature: 'grievance', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateGrievance(data: ManagerCoreJsonObject, id?: string): Promise<ManagerGrievanceDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerGrievanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateGrievance(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_GRIEVANCE_UPDATED, { feature: 'grievance', id });
    return result;
  }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteGrievance(id?: string): Promise<ManagerGrievanceDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerGrievanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteGrievance(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_GRIEVANCE_DELETED, { feature: 'grievance', id });
    return result;
  }
}

export { ManagerGrievanceOrchestratorService as GrievanceOrchestratorService };
