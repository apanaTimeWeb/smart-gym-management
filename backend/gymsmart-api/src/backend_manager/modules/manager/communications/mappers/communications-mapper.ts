// RESPONSIBILITY: Maps Manager communications ORM entities to ORM-free domain objects.
// FLOW: CommunicationsEntity -> CommunicationsMapper -> domain payload -> repository/service.
import { CommunicationsEntity } from '@/modules/manager/communications/communications.entity';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import type { CommunicationsDomainData } from '@/modules/manager/communications/communications.interfaces';
export class CommunicationsMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: CommunicationsEntity): CommunicationsDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: CommunicationsDomainData): CoreJsonObject { return data.payload; }
}
