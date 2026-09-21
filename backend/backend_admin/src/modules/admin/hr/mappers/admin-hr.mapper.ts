// RESPONSIBILITY: Translates the TypeORM Admin hr entity into an ORM-independent domain model and frontend response.
// FLOW: AdminHrEntity → AdminHrMapper → domain/response object.

import { AdminHrDomainModel } from '@/modules/admin/hr/domain/admin-hr.domain';
import { AdminHrEntity } from '@/modules/admin/hr/entities/admin-hr-entity';

export class AdminHrMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminHrEntity): AdminHrDomainModel {
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
  toResponse(domain: AdminHrDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
