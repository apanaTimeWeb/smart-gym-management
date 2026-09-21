// RESPONSIBILITY: Translates the TypeORM Admin blacklist entity into an ORM-independent domain model and frontend response.
// FLOW: AdminBlacklistEntity â†’ AdminBlacklistMapper â†’ domain/response object.

import { AdminBlacklistDomainModel } from '@/backend_admin/modules/admin/blacklist/domain/admin-blacklist.domain';
import { AdminBlacklistEntity } from '@/backend_admin/modules/admin/blacklist/entities/admin-blacklist-entity';

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

  /** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminBlacklistDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
