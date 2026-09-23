// RESPONSIBILITY: Maps Settings ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminSettingsMapper -> domain model -> response DTO.
import type { SuperadminSettingsEntity } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.entity';
import type { SuperadminSettingsDomainModel } from '@/backend_superadmin/superadmin_modules/settings/types/superadmin-settings.interfaces';

export class SuperadminSettingsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminSettingsEntity): SuperadminSettingsDomainModel { return { ...entity } as SuperadminSettingsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminSettingsEntity[]): SuperadminSettingsDomainModel[] { return entities.map(SuperadminSettingsMapper.toDomain); }
}
