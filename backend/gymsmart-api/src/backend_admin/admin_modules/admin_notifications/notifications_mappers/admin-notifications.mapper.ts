// RESPONSIBILITY: Translates the TypeORM Admin notifications entity into an ORM-independent domain model and frontend response.
// FLOW: AdminNotificationsEntity â†’ AdminNotificationsMapper â†’ domain/response object.
import { AdminNotificationsDomainModel } from '@/backend_admin/admin_modules/admin_notifications/notifications_domain/admin-notifications.domain'

import { AdminNotificationsEntity } from '@/backend_admin/admin_modules/admin_notifications/notifications_entities/admin-notifications-entity'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminNotifications.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminNotificationsMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminNotificationsEntity): AdminNotificationsDomainModel {
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
