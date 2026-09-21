// RESPONSIBILITY: Translates the TypeORM Admin notifications entity into an ORM-independent domain model and frontend response.
// FLOW: AdminNotificationsEntity → AdminNotificationsMapper → domain/response object.

import { AdminNotificationsDomainModel } from '@/backend_admin/modules/admin/notifications/domain/admin-notifications.domain';
import { AdminNotificationsEntity } from '@/backend_admin/modules/admin/notifications/entities/admin-notifications-entity';

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
