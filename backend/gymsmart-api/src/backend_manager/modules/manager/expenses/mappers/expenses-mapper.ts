// RESPONSIBILITY: Maps Manager expenses ORM entities to ORM-free domain objects.
// FLOW: ExpensesEntity -> ExpensesMapper -> domain payload -> repository/service.
import { ExpensesEntity } from '@/modules/manager/expenses/expenses.entity';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import type { ExpensesDomainData } from '@/modules/manager/expenses/expenses.interfaces';
export class ExpensesMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ExpensesEntity): ExpensesDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ExpensesDomainData): CoreJsonObject { return data.payload; }
}
