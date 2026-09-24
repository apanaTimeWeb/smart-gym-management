// RESPONSIBILITY: Maps Settings ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminSettingsMapper -> domain model -> response DTO.
import type { SuperadminSettingsEntity } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.entity';
import type { SuperadminSettingsDomainModel } from '@/backend_superadmin/superadmin_modules/settings/settings_types/superadmin-settings.interfaces';

/**
 * Primary Intent: Defines SuperadminSettingsMapper as the class-level contract for superadmin-settings.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSettingsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminSettingsEntity): SuperadminSettingsDomainModel { return { ...entity } as SuperadminSettingsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminSettingsEntity[]): SuperadminSettingsDomainModel[] { return entities.map(SuperadminSettingsMapper.toDomain); }
}
