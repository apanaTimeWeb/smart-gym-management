// RESPONSIBILITY: Presents ORM-independent AdminDataExport domain data as the frontend response contract.
// FLOW: Domain object -> AdminDataExportResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminDataExportDomainModel } from '@/backend_admin/admin_modules/admin_data-export/data-export_domain/admin-data-export.domain.js';


/**
 * @description Owns frontend response presentation for the AdminDataExport feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminDataExportResponsePresenter {
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
