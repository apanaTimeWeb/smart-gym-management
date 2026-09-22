// RESPONSIBILITY: Read use-case for GET /api/v1/manager/expenses.
// FLOW: Controller -> ExpensesFetchExpensesService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { ExpensesRepository } from '@/modules/manager/expenses/repositories/expenses-repository';

@Injectable()
export class ExpensesFetchExpensesService {
  constructor(private readonly repository: ExpensesRepository) {}

  /** @description Loads the expenses collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchExpenses(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findExpensesList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { expenses: rows, total: result.meta.total }, meta: result.meta };
  }
}
