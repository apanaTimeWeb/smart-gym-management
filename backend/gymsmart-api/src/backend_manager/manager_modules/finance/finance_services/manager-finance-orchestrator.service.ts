// RESPONSIBILITY: Owns the finance transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerFinanceMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerFinanceMutationService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerFinanceDomainData } from '@/backend_manager/manager_modules/finance/finance_types/manager-finance.types';

@Injectable()
export class ManagerFinanceOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerFinanceMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createPayment(data: ManagerCoreJsonObject): Promise<ManagerFinanceDomainData> {
    let result: ManagerFinanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createPayment(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_FINANCE_CREATED, { feature: 'finance', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updatePayment(data: ManagerCoreJsonObject, id?: string): Promise<ManagerFinanceDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerFinanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updatePayment(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_FINANCE_UPDATED, { feature: 'finance', id });
    return result;
  }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deletePayment(id?: string): Promise<ManagerFinanceDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerFinanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deletePayment(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_FINANCE_DELETED, { feature: 'finance', id });
    return result;
  }
}

export { ManagerFinanceOrchestratorService as FinanceOrchestratorService };
