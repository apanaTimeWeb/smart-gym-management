// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ExpensesRepository } from '@/backend_manager/modules/backend_manager/expenses/repositories/expenses-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class ExpensesFetchExpenseByIdService {
  constructor(private readonly repository: ExpensesRepository) {}

  /** @description Loads one expenses record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws CoreNotFoundException when the record does not exist. */
  async fetchExpenseById(id: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    void query;
    const row = await this.repository.findExpensesByIdOrThrow(id);
    return { id: row.id, ...row.payload };
  }
}
