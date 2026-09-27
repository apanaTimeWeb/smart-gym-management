// RESPONSIBILITY: Owns the expenses transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerExpensesMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerExpensesMutationService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerExpensesDomainData } from '@/backend_manager/manager_modules/expenses/expenses_types/manager-expenses.types';

@Injectable()
export class ManagerExpensesOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerExpensesMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createExpense(data: ManagerCoreJsonObject): Promise<ManagerExpensesDomainData> {
    let result: ManagerExpensesDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createExpense(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_EXPENSES_CREATED, { feature: 'expenses', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateExpense(data: ManagerCoreJsonObject, id?: string): Promise<ManagerExpensesDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerExpensesDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateExpense(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_EXPENSES_UPDATED, { feature: 'expenses', id });
    return result;
  }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteExpense(id?: string): Promise<ManagerExpensesDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerExpensesDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteExpense(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_EXPENSES_DELETED, { feature: 'expenses', id });
    return result;
  }
}

export { ManagerExpensesOrchestratorService as ExpensesOrchestratorService };
