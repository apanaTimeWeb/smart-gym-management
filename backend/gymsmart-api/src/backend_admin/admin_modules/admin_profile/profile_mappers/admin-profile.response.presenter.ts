// RESPONSIBILITY: Presents ORM-independent AdminProfile domain data as the frontend response contract.
// FLOW: Domain object -> AdminProfileResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminProfileDomainModel } from '@/backend_admin/admin_modules/admin_profile/profile_domain/admin-profile.domain.js';


/**
 * @description Owns frontend response presentation for the AdminProfile feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminProfileResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminProfileDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
