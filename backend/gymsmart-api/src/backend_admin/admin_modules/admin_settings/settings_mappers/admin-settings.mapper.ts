// RESPONSIBILITY: Translates the TypeORM Admin settings entity into an ORM-independent domain model and frontend response.
// FLOW: AdminSettingsEntity â†’ AdminSettingsMapper â†’ domain/response object.
import { AdminSettingsDomainModel } from '@/backend_admin/admin_modules/admin_settings/settings_domain/admin-settings.domain.js';

import { AdminNotificationsSettingsDto, AdminTwoFactorStatusDto } from '@/backend_admin/admin_modules/admin_settings/settings_dtos/admin-settings-response.dto.js';

import { AdminSettingsEntity } from '@/backend_admin/admin_modules/admin_settings/settings_entities/admin-settings-entity.js';

/**
 * @description Owns the ORM-to-domain translation boundary for AdminSettings.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminSettingsMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminSettingsEntity): AdminSettingsDomainModel {
    return {
      id: entity.id,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      name: entity.name,
      status: entity.status,
      data: { ...entity.payload },
    };
  }
}
