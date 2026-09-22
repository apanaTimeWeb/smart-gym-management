// RESPONSIBILITY: Maps Manager sales ORM entities to ORM-free domain objects.
// FLOW: SalesEntity -> SalesMapper -> domain payload -> repository/service.
import { SalesEntity } from '@/modules/manager/sales/sales.entity';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import type { SalesDomainData } from '@/modules/manager/sales/sales.interfaces';
export class SalesMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: SalesEntity): SalesDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: SalesDomainData): CoreJsonObject { return data.payload; }
}
