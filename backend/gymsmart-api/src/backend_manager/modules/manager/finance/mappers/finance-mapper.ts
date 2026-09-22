// RESPONSIBILITY: Maps Manager finance ORM entities to ORM-free domain objects.
// FLOW: FinanceEntity -> FinanceMapper -> domain payload -> repository/service.
import { FinanceEntity } from '@/modules/manager/finance/finance.entity';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import type { FinanceDomainData } from '@/modules/manager/finance/finance.interfaces';
export class FinanceMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: FinanceEntity): FinanceDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: FinanceDomainData): CoreJsonObject { return data.payload; }
}
