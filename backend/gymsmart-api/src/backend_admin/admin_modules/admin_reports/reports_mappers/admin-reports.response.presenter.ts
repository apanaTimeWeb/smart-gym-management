// RESPONSIBILITY: Presents ORM-independent AdminReports domain data as the frontend response contract.
// FLOW: Domain object -> AdminReportsResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminReportsDomainModel } from '@/backend_admin/admin_modules/admin_reports/reports_domain/admin-reports.domain'


/**
 * @description Owns frontend response presentation for the AdminReports feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminReportsResponsePresenter {
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
