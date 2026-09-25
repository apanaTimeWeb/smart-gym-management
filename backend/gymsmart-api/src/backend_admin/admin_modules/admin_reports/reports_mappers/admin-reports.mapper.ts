// RESPONSIBILITY: Translates the TypeORM Admin reports entity into an ORM-independent domain model and frontend response.
// FLOW: AdminReportsEntity â†’ AdminReportsMapper â†’ domain/response object.
import { AdminReportsDomainModel } from '@/backend_admin/admin_modules/admin_reports/reports_domain/admin-reports.domain'

import { AdminReportsEntity } from '@/backend_admin/admin_modules/admin_reports/reports_entities/admin-reports-entity'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminReports.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
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
}
