// RESPONSIBILITY: Maps Settings ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SettingsMapper -> domain model -> response DTO.
import type { SettingsEntity } from '@/backend_superadmin/modules/backend_superadmin/settings/settings.entity';
import type { SettingsDomainModel } from '@/backend_superadmin/modules/backend_superadmin/settings/types/settings.interfaces';

export class SettingsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SettingsEntity): SettingsDomainModel { return { ...entity } as SettingsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SettingsEntity[]): SettingsDomainModel[] { return entities.map(SettingsMapper.toDomain); }
}
