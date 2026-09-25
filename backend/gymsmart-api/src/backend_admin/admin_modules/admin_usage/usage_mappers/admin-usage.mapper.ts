// RESPONSIBILITY: Translates the TypeORM Admin usage entity into an ORM-independent domain model and frontend response.
// FLOW: AdminUsageEntity â†’ AdminUsageMapper â†’ domain/response object.
import { AdminUsageDomainModel } from '@/backend_admin/admin_modules/admin_usage/usage_domain/admin-usage.domain.js';

import { AdminUsageEntity } from '@/backend_admin/admin_modules/admin_usage/usage_entities/admin-usage-entity.js';

/**
 * @description Owns the ORM-to-domain translation boundary for AdminUsage.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminUsageMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminUsageEntity): AdminUsageDomainModel {
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
