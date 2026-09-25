// RESPONSIBILITY: Presents ORM-independent AdminBranches domain data as the frontend response contract.
// FLOW: Domain object -> AdminBranchesResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminBranchesDomainModel } from '@/backend_admin/admin_modules/admin_branches/branches_domain/admin-branches.domain'


/**
 * @description Owns frontend response presentation for the AdminBranches feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminBranchesResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminBranchesDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
