// RESPONSIBILITY: Maps Manager referrals ORM entities to ORM-free domain objects.
// FLOW: ReferralsEntity -> ReferralsMapper -> domain payload -> repository/service.
import { ReferralsEntity } from '@/backend_manager/modules/manager/referrals/referrals.entity';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { ReferralsDomainData } from '@/backend_manager/modules/manager/referrals/referrals.interfaces';
export class ReferralsMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ReferralsEntity): ReferralsDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ReferralsDomainData): CoreJsonObject { return data.payload; }
}
