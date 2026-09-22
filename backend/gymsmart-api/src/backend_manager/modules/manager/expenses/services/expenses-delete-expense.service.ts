// RESPONSIBILITY: Write use-case for DELETE /api/v1/manager/expenses/:id.
// FLOW: Controller DTO -> ExpensesDeleteExpenseService -> ExpensesOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { ExpensesOrchestratorService } from '@/modules/manager/expenses/services/expenses-orchestrator.service';

@Injectable()
export class ExpensesDeleteExpenseService {
  constructor(private readonly orchestrator: ExpensesOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteExpense(id?: string): Promise<CoreJsonObject> { return this.orchestrator.softDeleteExpensesById(id); }
}
