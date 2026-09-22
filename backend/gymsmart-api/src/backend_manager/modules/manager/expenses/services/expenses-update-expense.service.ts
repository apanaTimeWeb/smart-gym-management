// RESPONSIBILITY: Write use-case for PATCH /api/v1/manager/expenses/:id.
// FLOW: Controller DTO -> ExpensesUpdateExpenseService -> ExpensesOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { ExpensesOrchestratorService } from '@/backend_manager/modules/manager/expenses/services/expenses-orchestrator.service';

@Injectable()
export class ExpensesUpdateExpenseService {
  constructor(private readonly orchestrator: ExpensesOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateExpense(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.updateExpensesById(data, id);
  }
}
