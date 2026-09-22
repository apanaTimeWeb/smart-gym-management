// RESPONSIBILITY: Write use-case for POST /api/v1/manager/expenses.
// FLOW: Controller DTO -> ExpensesCreateExpenseService -> ExpensesOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { ExpensesOrchestratorService } from '@/modules/manager/expenses/services/expenses-orchestrator.service';

@Injectable()
export class ExpensesCreateExpenseService {
  constructor(private readonly orchestrator: ExpensesOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createExpense(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createExpenses(data, id);
  }
}
