// RESPONSIBILITY: Translates the TypeORM Admin profile entity into an ORM-independent domain model and frontend response.
// FLOW: AdminProfileEntity â†’ AdminProfileMapper â†’ domain/response object.
import { AdminProfileDomainModel } from '@/backend_admin/admin_modules/admin_profile/profile_domain/admin-profile.domain'

import { AdminProfileEntity } from '@/backend_admin/admin_modules/admin_profile/profile_entities/admin-profile-entity'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminProfile.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminProfileMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminProfileEntity): AdminProfileDomainModel {
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
