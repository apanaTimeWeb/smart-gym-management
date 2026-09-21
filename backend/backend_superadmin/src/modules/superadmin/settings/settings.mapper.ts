// RESPONSIBILITY: Maps Settings ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SettingsMapper -> domain model -> response DTO.
import type { PlatformSettingEntity } from '@/modules/superadmin/settings/settings.entity';
import type { SettingsDomainModel } from '@/modules/superadmin/settings/types/settings.interfaces';

export class SettingsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: PlatformSettingEntity): SettingsDomainModel { return { ...entity } as SettingsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: PlatformSettingEntity[]): SettingsDomainModel[] { return entities.map(SettingsMapper.toDomain); }
}
