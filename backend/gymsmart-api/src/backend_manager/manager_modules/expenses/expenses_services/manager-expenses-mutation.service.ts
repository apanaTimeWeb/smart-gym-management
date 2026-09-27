// RESPONSIBILITY: Owns expenses mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerExpensesMutationService → ManagerExpensesRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerExpensesRepository } from '@/backend_manager/manager_modules/expenses/manager-expenses.repository';
import type { ManagerExpensesDomainData } from '@/backend_manager/manager_modules/expenses/expenses_types/manager-expenses.types';

@Injectable()
export class ManagerExpensesMutationService {
  constructor(private readonly repository: ManagerExpensesRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one expenses domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createExpense(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerExpensesDomainData> {
    const row = await this.repository.createExpense(data, context);
    await this.audit.append(context, 'MANAGER.EXPENSES.CREATED', 'expenses', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one expenses domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateExpense(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerExpensesDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.EXPENSES.UPDATED', 'expenses', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one expenses domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteExpense(id: string, context: ManagerCoreTransactionContext): Promise<ManagerExpensesDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.EXPENSES.DELETED', 'expenses', id, before.payload, row.payload);
    return row;
  }

}
