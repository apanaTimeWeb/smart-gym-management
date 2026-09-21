// RESPONSIBILITY: Translates the TypeORM Admin reports entity into an ORM-independent domain model and frontend response.
// FLOW: AdminReportsEntity → AdminReportsMapper → domain/response object.

import { AdminReportsDomainModel } from '@/modules/admin/reports/domain/admin-reports.domain';
import { AdminReportsEntity } from '@/modules/admin/reports/entities/admin-reports-entity';

export class AdminReportsMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminReportsEntity): AdminReportsDomainModel {
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
  toResponse(domain: AdminReportsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
