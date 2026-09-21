// RESPONSIBILITY: Translates the TypeORM Admin settings entity into an ORM-independent domain model and frontend response.
// FLOW: AdminSettingsEntity â†’ AdminSettingsMapper â†’ domain/response object.

import { AdminSettingsDomainModel } from '@/backend_admin/modules/admin/settings/domain/admin-settings.domain';
import { AdminSettingsEntity } from '@/backend_admin/modules/admin/settings/entities/admin-settings-entity';

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

  /** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminSettingsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
