// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { SettingsEntity } from '@/backend_manager/manager_modules/settings/manager-settings.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { SettingsDomainData } from '@/backend_manager/manager_modules/settings/settings_types/manager-settings.types';

export class ManagerSettingsMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: SettingsEntity): SettingsDomainData { return { id: entity.id, payload: { ...entity.payload, createdAt: entity.createdAt.toISOString(), updatedAt: entity.updatedAt.toISOString() } }; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: SettingsDomainData): ManagerCoreJsonObject { return data.payload; }
}

export { ManagerSettingsMapper as SettingsMapper };
