// RESPONSIBILITY: Maps Manager pt ORM entities to ORM-free domain objects.
// FLOW: PtEntity -> PtMapper -> domain payload -> repository/service.
import { PtEntity } from '@/modules/manager/pt/pt.entity';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import type { PtDomainData } from '@/modules/manager/pt/pt.interfaces';
export class PtMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: PtEntity): PtDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: PtDomainData): CoreJsonObject { return data.payload; }
}
