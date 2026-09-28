// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ExpensesRepository } from '@/backend_manager/manager_modules/expenses/manager-expenses.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerExpensesFindExpenseByIdServiceFindExpenseByIdResult {
  id: unknown;
}

@Injectable()
export class ManagerExpensesFindExpenseByIdService {
  constructor(private readonly repository: ExpensesRepository) {}

  /** @description Loads one expenses record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws ManagerCoreNotFoundException when the record does not exist. */
  async findExpenseById(id: string, query: ManagerCoreJsonObject = {}): Promise<ManagerExpensesFindExpenseByIdServiceFindExpenseByIdResult> {
    void query;
    const row = await this.repository.findByIdOrThrow(id);
    return { id: row.id, ...row.payload };
  }
}

export { ManagerExpensesFindExpenseByIdService as ExpensesFindExpenseByIdService };
