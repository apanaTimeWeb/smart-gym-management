// RESPONSIBILITY: Translates the TypeORM Admin gym-health-alerts entity into an ORM-independent domain model and frontend response.
// FLOW: AdminGymHealthAlertsEntity â†’ AdminGymHealthAlertsMapper â†’ domain/response object.

import { AdminGymHealthAlertsDomainModel } from '@/backend_admin/modules/admin/gym-health-alerts/domain/admin-gym_health_alerts.domain';
import { AdminGymHealthAlertsEntity } from '@/backend_admin/modules/admin/gym-health-alerts/entities/admin-gym_health_alerts-entity';

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

  /** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminGymHealthAlertsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
