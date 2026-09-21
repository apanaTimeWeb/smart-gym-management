// RESPONSIBILITY: Translates the TypeORM Admin data-export entity into an ORM-independent domain model and frontend response.
// FLOW: AdminDataExportEntity → AdminDataExportMapper → domain/response object.

import { AdminDataExportDomainModel } from '@/backend_admin/modules/admin/data-export/domain/admin-data_export.domain';
import { AdminDataExportEntity } from '@/backend_admin/modules/admin/data-export/entities/admin-data_export-entity';

export class AdminDataExportMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminDataExportEntity): AdminDataExportDomainModel {
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
  toResponse(domain: AdminDataExportDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
