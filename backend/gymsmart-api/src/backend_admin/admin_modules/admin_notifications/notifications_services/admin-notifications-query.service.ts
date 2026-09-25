// RESPONSIBILITY: Owns read-side use cases for Admin notifications; no write persistence occurs here.
// FLOW: AdminNotificationsQueryController â†’ AdminNotificationsQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';

import { AdminNotificationsQueryDto } from '@/backend_admin/admin_modules/admin_notifications/notifications_dtos/admin-notifications-query.dto.js';
import { AdminNotificationDto } from '@/backend_admin/admin_modules/admin_notifications/notifications_dtos/admin-notifications-response.dto.js';
import { AdminNotificationsResponsePresenter } from '@/backend_admin/admin_modules/admin_notifications/notifications_mappers/admin-notifications.response.presenter.js';
import { AdminNotificationsRepository } from '@/backend_admin/admin_modules/admin_notifications/notifications_repositories/admin-notifications-repository.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@Injectable()
/**
 * @description Defines the AdminNotificationsQueryService boundary for the admin_notifications backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminNotificationsQueryService {
  constructor(
    private readonly repository: AdminNotificationsRepository,
    private readonly presenter: AdminNotificationsResponsePresenter,
  ) {}

  /** @description Executes listNotifications for the Admin notifications feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllNotifications(query: AdminNotificationsQueryDto): Promise<AdminCorePaginatedResult<AdminNotificationDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))) as any, meta: result.meta };
  }
}
