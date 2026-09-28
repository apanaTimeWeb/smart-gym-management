// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ExpensesOrchestratorService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerExpensesUpdateExpenseService {
  constructor(private readonly orchestrator: ExpensesOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateExpense(data: ManagerCoreJsonObject, id?: string): ReturnType<ExpensesOrchestratorService['updateExpense']> {
    return this.orchestrator.updateExpense(data, id);
  }
}

export { ManagerExpensesUpdateExpenseService as ExpensesUpdateExpenseService };
