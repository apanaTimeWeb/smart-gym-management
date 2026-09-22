// RESPONSIBILITY: Maps Manager settings ORM entities to ORM-free domain objects.
// FLOW: SettingsEntity -> SettingsMapper -> domain payload -> repository/service.
import { SettingsEntity } from '@/backend_manager/modules/manager/settings/settings.entity';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { SettingsDomainData } from '@/backend_manager/modules/manager/settings/settings.interfaces';
export class SettingsMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: SettingsEntity): SettingsDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: SettingsDomainData): CoreJsonObject { return data.payload; }
}
