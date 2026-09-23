// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ExpensesOrchestratorService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-orchestrator.service';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class ExpensesCreateExpenseService {
  constructor(private readonly orchestrator: ExpensesOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createExpense(data: CoreJsonObject): Promise<CoreJsonObject> {
    return this.orchestrator.createExpenses(data);
  }
}
