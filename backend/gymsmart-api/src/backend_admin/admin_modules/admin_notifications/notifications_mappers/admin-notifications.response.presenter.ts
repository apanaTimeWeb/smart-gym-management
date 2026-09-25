// RESPONSIBILITY: Presents ORM-independent AdminNotifications domain data as the frontend response contract.
// FLOW: Domain object -> AdminNotificationsResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminNotificationsDomainModel } from '@/backend_admin/admin_modules/admin_notifications/notifications_domain/admin-notifications.domain'


/**
 * @description Owns frontend response presentation for the AdminNotifications feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminNotificationsResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminNotificationsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
