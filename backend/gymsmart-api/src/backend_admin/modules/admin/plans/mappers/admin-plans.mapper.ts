// RESPONSIBILITY: Translates the TypeORM Admin plans entity into an ORM-independent domain model and frontend response.
// FLOW: AdminPlansEntity → AdminPlansMapper → domain/response object.

import { AdminPlansDomainModel } from '@/backend_admin/modules/admin/plans/domain/admin-plans.domain';
import { AdminPlansEntity } from '@/backend_admin/modules/admin/plans/entities/admin-plans-entity';

export class AdminPlansMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminPlansEntity): AdminPlansDomainModel {
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
  toResponse(domain: AdminPlansDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
