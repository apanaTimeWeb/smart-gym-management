// RESPONSIBILITY: Translates the TypeORM Admin data-export entity into an ORM-independent domain model and frontend response.
// FLOW: AdminDataExportEntity â†’ AdminDataExportMapper â†’ domain/response object.
import { AdminDataExportDomainModel } from '@/backend_admin/admin_modules/admin_data-export/data-export_domain/admin-data-export.domain'

import { AdminDataExportEntity } from '@/backend_admin/admin_modules/admin_data-export/data-export_entities/admin-data-export-entity'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminDataExport.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
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
}
