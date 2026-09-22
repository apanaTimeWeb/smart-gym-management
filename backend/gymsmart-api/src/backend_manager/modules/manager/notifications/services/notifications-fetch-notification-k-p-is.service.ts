// RESPONSIBILITY: Read use-case for GET /api/v1/manager/notifications/kpis.
// FLOW: Controller -> NotificationsFetchNotificationKPIsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { NotificationsRepository } from '@/modules/manager/notifications/repositories/notifications-repository';

@Injectable()
export class NotificationsFetchNotificationKPIsService {
  constructor(private readonly repository: NotificationsRepository) {}

  /** @description Loads the notifications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchNotificationKPIs(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findNotificationsList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: rows[0]?.payload ?? {}, meta: result.meta };
  }
}
