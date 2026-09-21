// RESPONSIBILITY: Translates the TypeORM Admin permissions entity into an ORM-independent domain model and frontend response.
// FLOW: AdminPermissionsEntity → AdminPermissionsMapper → domain/response object.

import { AdminPermissionsDomainModel } from '@/backend_admin/modules/admin/permissions/domain/admin-permissions.domain';
import { AdminPermissionsEntity } from '@/backend_admin/modules/admin/permissions/entities/admin-permissions-entity';

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

  /** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminPermissionsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
