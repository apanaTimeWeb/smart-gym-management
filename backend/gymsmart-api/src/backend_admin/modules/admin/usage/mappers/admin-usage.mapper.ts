// RESPONSIBILITY: Translates the TypeORM Admin usage entity into an ORM-independent domain model and frontend response.
// FLOW: AdminUsageEntity â†’ AdminUsageMapper â†’ domain/response object.

import { AdminUsageDomainModel } from '@/backend_admin/modules/admin/usage/domain/admin-usage.domain';
import { AdminUsageEntity } from '@/backend_admin/modules/admin/usage/entities/admin-usage-entity';

export class AdminUsageMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminUsageEntity): AdminUsageDomainModel {
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
  toResponse(domain: AdminUsageDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
