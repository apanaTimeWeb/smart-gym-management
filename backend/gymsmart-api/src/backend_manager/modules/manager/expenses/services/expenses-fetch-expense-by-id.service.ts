// RESPONSIBILITY: Read use-case for GET /api/v1/manager/expenses/:id.
// FLOW: Controller -> ExpensesFetchExpenseByIdService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { ExpensesRepository } from '@/modules/manager/expenses/repositories/expenses-repository';

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
