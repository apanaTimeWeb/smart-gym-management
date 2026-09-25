// RESPONSIBILITY: Presents ORM-independent AdminPermissions domain data as the frontend response contract.
// FLOW: Domain object -> AdminPermissionsResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminPermissionsDomainModel } from '@/backend_admin/admin_modules/admin_permissions/permissions_domain/admin-permissions.domain'


/**
 * @description Owns frontend response presentation for the AdminPermissions feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminPermissionsResponsePresenter {
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
