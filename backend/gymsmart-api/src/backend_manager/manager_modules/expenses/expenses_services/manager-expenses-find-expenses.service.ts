// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ExpensesRepository } from '@/backend_manager/manager_modules/expenses/manager-expenses.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerExpensesFindExpensesServiceFindExpensesResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerExpensesFindExpensesService {
  constructor(private readonly repository: ExpensesRepository) {}

  /** @description Loads the expenses collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findExpenses(query: ManagerCoreJsonObject = {}): Promise<ManagerExpensesFindExpensesServiceFindExpensesResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { expenses: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerExpensesFindExpensesService as ExpensesFindExpensesService };
