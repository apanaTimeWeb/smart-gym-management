// RESPONSIBILITY: Translates the TypeORM Admin gym-health-alerts entity into an ORM-independent domain model and frontend response.
// FLOW: AdminGymHealthAlertsEntity â†’ AdminGymHealthAlertsMapper â†’ domain/response object.
import { AdminGymHealthAlertsDomainModel } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_domain/admin-gym-health-alerts.domain'

import { AdminGymHealthAlertsEntity } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_entities/admin-gym-health-alerts-entity'

import { AdminGymHealthKPIDataDto } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_dtos/admin-gym-health-alerts-response.dto'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminGymHealthAlerts.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminGymHealthAlertsMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminGymHealthAlertsEntity): AdminGymHealthAlertsDomainModel {
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
