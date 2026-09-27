// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ExpensesEntity } from '@/backend_manager/manager_modules/expenses/manager-expenses.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ExpensesDomainData } from '@/backend_manager/manager_modules/expenses/expenses_types/manager-expenses.types';

export class ManagerExpensesMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ExpensesEntity): ExpensesDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.amount = ManagerExpensesMapper.fromMinor(entity.amountMinor);
    payload.taxAmount = ManagerExpensesMapper.fromMinor(entity.taxAmountMinor);
    return { id: entity.id, payload } as ExpensesDomainData;
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ExpensesDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerExpensesMapper as ExpensesMapper };
