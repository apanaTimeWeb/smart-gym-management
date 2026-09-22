// RESPONSIBILITY: Read use-case for GET /api/v1/manager/expenses/stats.
// FLOW: Controller -> ExpensesFetchExpenseStatsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { ExpensesRepository } from '@/modules/manager/expenses/repositories/expenses-repository';

@Injectable()
export class ExpensesFetchExpenseStatsService {
  constructor(private readonly repository: ExpensesRepository) {}

  /** @description Loads the expenses collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchExpenseStats(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findExpensesList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: rows[0]?.payload ?? {}, meta: result.meta };
  }
}
