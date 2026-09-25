// RESPONSIBILITY: Translates the TypeORM Admin dashboard entity into an ORM-independent domain model and frontend response.
// FLOW: AdminDashboardEntity â†’ AdminDashboardMapper â†’ domain/response object.
import { AdminDashboardDomainModel } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_domain/admin-dashboard.domain'

import { AdminDashboardResponseDto, AdminDashboardKpisResponseDto } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_dtos/admin-dashboard-response.dto'

import { AdminDashboardEntity } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_entities/admin-dashboard-entity'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminDashboard.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
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
}
