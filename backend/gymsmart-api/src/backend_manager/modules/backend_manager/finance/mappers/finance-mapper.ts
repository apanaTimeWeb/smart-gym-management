// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { FinanceEntity } from '@/backend_manager/modules/backend_manager/finance/finance.entity';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { FinanceDomainData } from '@/backend_manager/modules/backend_manager/finance/finance.interfaces';

export class FinanceMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: FinanceEntity): FinanceDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: FinanceDomainData): CoreJsonObject { return data.payload; }
}
