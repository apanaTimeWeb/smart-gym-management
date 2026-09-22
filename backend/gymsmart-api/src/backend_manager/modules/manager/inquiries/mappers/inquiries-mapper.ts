// RESPONSIBILITY: Maps Manager inquiries ORM entities to ORM-free domain objects.
// FLOW: InquiriesEntity -> InquiriesMapper -> domain payload -> repository/service.
import { InquiriesEntity } from '@/modules/manager/inquiries/inquiries.entity';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import type { InquiriesDomainData } from '@/modules/manager/inquiries/inquiries.interfaces';
export class InquiriesMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: InquiriesEntity): InquiriesDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: InquiriesDomainData): CoreJsonObject { return data.payload; }
}
