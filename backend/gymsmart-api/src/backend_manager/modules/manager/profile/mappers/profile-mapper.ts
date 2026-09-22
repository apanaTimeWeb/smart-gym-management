// RESPONSIBILITY: Maps Manager profile ORM entities to ORM-free domain objects.
// FLOW: ProfileEntity -> ProfileMapper -> domain payload -> repository/service.
import { ProfileEntity } from '@/backend_manager/modules/manager/profile/profile.entity';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { ProfileDomainData } from '@/backend_manager/modules/manager/profile/profile.interfaces';
export class ProfileMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ProfileEntity): ProfileDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ProfileDomainData): CoreJsonObject { return data.payload; }
}
