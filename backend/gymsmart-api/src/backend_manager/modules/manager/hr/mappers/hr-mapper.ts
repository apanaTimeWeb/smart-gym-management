// RESPONSIBILITY: Maps Manager hr ORM entities to ORM-free domain objects.
// FLOW: HrEntity -> HrMapper -> domain payload -> repository/service.
import { HrEntity } from '@/backend_manager/modules/manager/hr/hr.entity';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { HrDomainData } from '@/backend_manager/modules/manager/hr/hr.interfaces';
export class HrMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: HrEntity): HrDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: HrDomainData): CoreJsonObject { return data.payload; }
}
