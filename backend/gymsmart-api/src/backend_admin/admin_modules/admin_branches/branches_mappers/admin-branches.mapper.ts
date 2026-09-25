// RESPONSIBILITY: Translates the TypeORM Admin branches entity into an ORM-independent domain model and frontend response.
// FLOW: AdminBranchesEntity â†’ AdminBranchesMapper â†’ domain/response object.
import { AdminBranchesDomainModel } from '@/backend_admin/admin_modules/admin_branches/branches_domain/admin-branches.domain.js';

import { AdminBranchesEntity } from '@/backend_admin/admin_modules/admin_branches/branches_entities/admin-branches-entity.js';

/**
 * @description Owns the ORM-to-domain translation boundary for AdminBranches.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminBranchesMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminBranchesEntity): AdminBranchesDomainModel {
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
