// RESPONSIBILITY: Translates the TypeORM Admin branches entity into an ORM-independent domain model and frontend response.
// FLOW: AdminBranchesEntity → AdminBranchesMapper → domain/response object.

import { AdminBranchesDomainModel } from '@/modules/admin/branches/domain/admin-branches.domain';
import { AdminBranchesEntity } from '@/modules/admin/branches/entities/admin-branches-entity';

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
