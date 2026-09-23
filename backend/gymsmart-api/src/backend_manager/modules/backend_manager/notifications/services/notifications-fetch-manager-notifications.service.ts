// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '@/backend_manager/modules/backend_manager/notifications/repositories/notifications-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class NotificationsFetchManagerNotificationsService {
  constructor(private readonly repository: NotificationsRepository) {}

  /** @description Loads the notifications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchManagerNotifications(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findNotificationsList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { notifications: rows, total: result.meta.total }, meta: result.meta  } as any;
  }
}
