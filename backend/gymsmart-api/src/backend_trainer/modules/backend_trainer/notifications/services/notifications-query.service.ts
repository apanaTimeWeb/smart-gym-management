// RESPONSIBILITY: Builds Trainer notification list and preference response contracts.
// FLOW: NotificationsQueryController → NotificationsQueryService → NotificationsRepository → mapper/domain.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { buildCorePaginationMeta } from '@/backend_trainer/core/utils/core-pagination.utils';
import type { PaginationMeta } from '@/backend_trainer/core/types/core-api-response.types';
import { NotificationsRepository } from '@/backend_trainer/modules/backend_trainer/notifications/repositories/notifications-repository';
import { NotificationsQueryDto } from '@/backend_trainer/modules/backend_trainer/notifications/dtos/notifications-query.dto';
import { NotificationsNotificationMapper } from '@/backend_trainer/modules/backend_trainer/notifications/notifications-notification.mapper';

@Injectable()
export class NotificationsQueryService {
  constructor(private readonly repo: NotificationsRepository) {}

  /** Returns paginated trainer notifications with the exact frontend response fields. */
  async findMany(query: NotificationsQueryDto): Promise<{ notifications: ReturnType<typeof NotificationsNotificationMapper>[]; total: number; unreadCount: number; page: number; limit: number; pagination: PaginationMeta }> {
    const result = await this.repo.findMany(CoreRequestContext.get().userId ?? '', query);
    return { notifications: result.rows.map(NotificationsNotificationMapper), total: result.total, unreadCount: result.unreadCount, page: query.page, limit: query.limit, pagination: buildCorePaginationMeta(result.total, query.page, query.limit) };
  }

  /** Returns trainer notification preferences without leaking the ORM entity. */
  async preferences(): Promise<Record<string, boolean>> {
    const row = await this.repo.getPreferences(CoreRequestContext.get().userId ?? '');
    return { email: row.email, push: row.push, sms: row.sms, sessionReminders: row.sessionReminders, memberUpdates: row.memberUpdates };
  }
}
