// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ReferralsEntity } from '@/backend_manager/modules/backend_manager/referrals/referrals.entity';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { ReferralsDomainData } from '@/backend_manager/modules/backend_manager/referrals/referrals.interfaces';

export class ReferralsMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ReferralsEntity): ReferralsDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ReferralsDomainData): CoreJsonObject { return data.payload; }
}
