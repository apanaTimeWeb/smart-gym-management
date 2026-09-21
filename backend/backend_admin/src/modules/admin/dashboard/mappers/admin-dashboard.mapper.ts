// RESPONSIBILITY: Translates the TypeORM Admin dashboard entity into an ORM-independent domain model and frontend response.
// FLOW: AdminDashboardEntity → AdminDashboardMapper → domain/response object.

import { AdminDashboardDomainModel } from '@/modules/admin/dashboard/domain/admin-dashboard.domain';
import { AdminDashboardEntity } from '@/modules/admin/dashboard/entities/admin-dashboard-entity';

export class AdminDashboardMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminDashboardEntity): AdminDashboardDomainModel {
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
  toResponse(domain: AdminDashboardDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
