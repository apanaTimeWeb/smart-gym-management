// RESPONSIBILITY: Translates the TypeORM Admin blacklist entity into an ORM-independent domain model and frontend response.
// FLOW: AdminBlacklistEntity â†’ AdminBlacklistMapper â†’ domain/response object.
import { AdminBlacklistDomainModel } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_domain/admin-blacklist.domain'

import { AdminBlacklistEntity } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_entities/admin-blacklist-entity'

import { AdminBlacklistKPIDataDto } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_dtos/admin-blacklist-response.dto'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminBlacklist.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminBlacklistMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminBlacklistEntity): AdminBlacklistDomainModel {
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
