// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '@/backend_manager/manager_modules/notifications/manager-notifications.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerNotificationsFindManagerNotificationsServiceFindManagerNotificationsResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerNotificationsFindManagerNotificationsService {
  constructor(private readonly repository: NotificationsRepository) {}

  /** @description Loads the notifications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findManagerNotifications(query: ManagerCoreJsonObject = {}): Promise<ManagerNotificationsFindManagerNotificationsServiceFindManagerNotificationsResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { notifications: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerNotificationsFindManagerNotificationsService as NotificationsFindManagerNotificationsService };
