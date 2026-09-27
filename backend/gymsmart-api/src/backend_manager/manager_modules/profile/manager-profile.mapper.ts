// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ProfileEntity } from '@/backend_manager/manager_modules/profile/manager-profile.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ProfileDomainData } from '@/backend_manager/manager_modules/profile/profile_types/manager-profile.types';

export class ManagerProfileMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ProfileEntity): ProfileDomainData { return { id: entity.id, payload: { ...entity.payload, createdAt: entity.createdAt.toISOString(), updatedAt: entity.updatedAt.toISOString() } }; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ProfileDomainData): ManagerCoreJsonObject { return data.payload; }
}

export { ManagerProfileMapper as ProfileMapper };
