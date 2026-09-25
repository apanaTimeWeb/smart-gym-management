// RESPONSIBILITY: Presents ORM-independent AdminGymHealthAlerts domain data as the frontend response contract.
// FLOW: Domain object -> AdminGymHealthAlertsResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminGymHealthAlertsDomainModel } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_domain/admin-gym-health-alerts.domain'

import { AdminGymHealthKPIDataDto } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_dtos/admin-gym-health-alerts-response.dto'


/**
 * @description Owns frontend response presentation for the AdminGymHealthAlerts feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminGymHealthAlertsResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminGymHealthAlertsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps gym-health KPI read-model data to its typed frontend DTO. @param domain Read-model domain object. @returns Typed KPI response. */
  toKpiResponse(domain: AdminGymHealthAlertsDomainModel): AdminGymHealthKPIDataDto {
    if (!domain.data || typeof domain.data !== 'object') throw new Error('GYM_HEALTH_ALERTS.RESPONSE.INVALID');
    return Object.assign(new AdminGymHealthKPIDataDto(), domain.data);
  }
}
