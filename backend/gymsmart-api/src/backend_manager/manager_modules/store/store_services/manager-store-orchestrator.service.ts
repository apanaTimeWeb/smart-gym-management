// RESPONSIBILITY: Owns the store transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerStoreMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerStoreMutationService } from '@/backend_manager/manager_modules/store/store_services/manager-store-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { StoreDomainData } from '@/backend_manager/manager_modules/store/store_types/manager-store.types';

@Injectable()
export class ManagerStoreOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerStoreMutationService) {}

  async createProduct(data: ManagerCoreJsonObject): Promise<StoreDomainData> {
    let result: StoreDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createProduct(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_STORE_CREATED, { feature: 'store', id: result.id });
    return result;
  }

  async updateProduct(data: ManagerCoreJsonObject, id?: string): Promise<StoreDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: StoreDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateProduct(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_STORE_UPDATED, { feature: 'store', id });
    return result;
  }

  async deleteProduct(id?: string): Promise<StoreDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: StoreDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteProduct(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_STORE_DELETED, { feature: 'store', id });
    return result;
  }

  async createOrder(data: ManagerCoreJsonObject): Promise<StoreDomainData> {
    let result: StoreDomainData | undefined;
    await this.uow.run(async (context) => { result = await (this.mutation as any).createOrder(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_STORE_CREATED, { feature: 'store', id: result.id, action: 'ORDER_CREATED' });
    return result;
  }
}

export { ManagerStoreOrchestratorService as StoreOrchestratorService };