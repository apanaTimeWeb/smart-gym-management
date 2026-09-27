// RESPONSIBILITY: Owns the library transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerLibraryMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerLibraryMutationService } from '@/backend_manager/manager_modules/library/library_services/manager-library-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { LibraryDomainData } from '@/backend_manager/manager_modules/library/library_types/manager-library.types';

@Injectable()
export class ManagerLibraryOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerLibraryMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createExercise(data: ManagerCoreJsonObject): Promise<LibraryDomainData> {
    let result: LibraryDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createExercise(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_LIBRARY_CREATED, { feature: 'library', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateExercise(data: ManagerCoreJsonObject, id?: string): Promise<LibraryDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: LibraryDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateExercise(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_LIBRARY_UPDATED, { feature: 'library', id });
    return result;
  }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteExercise(id?: string): Promise<LibraryDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: LibraryDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteExercise(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_LIBRARY_DELETED, { feature: 'library', id });
    return result;
  }
  /** @description Executes diet plan creation in a UnitOfWork. @param data - Validated payload. @returns Created diet plan. */
  async createDietPlan(data: ManagerCoreJsonObject): Promise<LibraryDomainData> {
    let result: LibraryDomainData | undefined;
    await this.uow.run(async (context) => { result = await (this.mutation as any).createDietPlan(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_LIBRARY_CREATED, { feature: 'library', id: result.id, action: 'DIET_PLAN_CREATED' });
    return result;
  }

  /** @description Executes a diet plan update in a UnitOfWork. @param data - Validated patch. @param id - Diet plan UUID. @returns Updated diet plan. */
  async updateDietPlan(data: ManagerCoreJsonObject, id?: string): Promise<LibraryDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: LibraryDomainData | undefined;
    await this.uow.run(async (context) => { result = await (this.mutation as any).updateDietPlan(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_LIBRARY_UPDATED, { feature: 'library', id, action: 'DIET_PLAN_UPDATED' });
    return result;
  }

  /** @description Executes a diet plan soft delete in a UnitOfWork. @param id - Diet plan UUID. @returns Deleted diet plan. */
  async deleteDietPlan(id?: string): Promise<LibraryDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: LibraryDomainData | undefined;
    await this.uow.run(async (context) => { result = await (this.mutation as any).deleteDietPlan(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_LIBRARY_DELETED, { feature: 'library', id, action: 'DIET_PLAN_DELETED' });
    return result;
  }

}

export { ManagerLibraryOrchestratorService as LibraryOrchestratorService };
