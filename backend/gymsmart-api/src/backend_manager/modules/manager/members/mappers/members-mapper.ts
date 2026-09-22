// RESPONSIBILITY: Maps Manager members ORM entities to ORM-free domain objects.
// FLOW: MembersEntity -> MembersMapper -> domain payload -> repository/service.
import { MembersEntity } from '@/modules/manager/members/members.entity';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import type { MembersDomainData } from '@/modules/manager/members/members.interfaces';
export class MembersMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: MembersEntity): MembersDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: MembersDomainData): CoreJsonObject { return data.payload; }
}
