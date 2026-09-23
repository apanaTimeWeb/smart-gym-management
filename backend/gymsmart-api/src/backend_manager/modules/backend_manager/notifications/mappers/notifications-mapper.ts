// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { NotificationsEntity } from '@/backend_manager/modules/backend_manager/notifications/notifications.entity';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { NotificationsDomainData } from '@/backend_manager/modules/backend_manager/notifications/notifications.interfaces';

export class NotificationsMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: NotificationsEntity): NotificationsDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: NotificationsDomainData): CoreJsonObject { return data.payload; }
}
