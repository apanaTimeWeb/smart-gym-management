// RESPONSIBILITY: Translates the TypeORM Admin profile entity into an ORM-independent domain model and frontend response.
// FLOW: AdminProfileEntity â†’ AdminProfileMapper â†’ domain/response object.

import { AdminProfileDomainModel } from '@/backend_admin/modules/admin/profile/domain/admin-profile.domain';
import { AdminProfileEntity } from '@/backend_admin/modules/admin/profile/entities/admin-profile-entity';

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
