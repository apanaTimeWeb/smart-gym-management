// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { NotificationsEntity } from '@/backend_manager/manager_modules/notifications/manager-notifications.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { NotificationsDomainData } from '@/backend_manager/manager_modules/notifications/notifications_types/manager-notifications.types';

export class ManagerNotificationsMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: NotificationsEntity): NotificationsDomainData { return { id: entity.id, payload: { ...entity.payload, createdAt: entity.createdAt.toISOString(), updatedAt: entity.updatedAt.toISOString() } }; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: NotificationsDomainData): ManagerCoreJsonObject { return data.payload; }
}

export { ManagerNotificationsMapper as NotificationsMapper };
