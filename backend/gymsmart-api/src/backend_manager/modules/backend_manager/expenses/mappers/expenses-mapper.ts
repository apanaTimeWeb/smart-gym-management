// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ExpensesEntity } from '@/backend_manager/modules/backend_manager/expenses/expenses.entity';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { ExpensesDomainData } from '@/backend_manager/modules/backend_manager/expenses/expenses.interfaces';

export class ExpensesMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ExpensesEntity): ExpensesDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ExpensesDomainData): CoreJsonObject { return data.payload; }
}
