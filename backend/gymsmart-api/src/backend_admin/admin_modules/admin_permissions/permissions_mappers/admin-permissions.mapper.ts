// RESPONSIBILITY: Translates the TypeORM Admin permissions entity into an ORM-independent domain model and frontend response.
// FLOW: AdminPermissionsEntity â†’ AdminPermissionsMapper â†’ domain/response object.
import { AdminPermissionsDomainModel } from '@/backend_admin/admin_modules/admin_permissions/permissions_domain/admin-permissions.domain.js';

import { AdminPermissionsEntity } from '@/backend_admin/admin_modules/admin_permissions/permissions_entities/admin-permissions-entity.js';

/**
 * @description Owns the ORM-to-domain translation boundary for AdminPermissions.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminPermissionsMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminPermissionsEntity): AdminPermissionsDomainModel {
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
