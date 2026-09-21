// RESPONSIBILITY: Owns read-side use cases for Admin notifications; no write persistence occurs here.
// FLOW: AdminNotificationsQueryController â†’ AdminNotificationsQueryService â†’ repository â†’ mapper â†’ ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminNotificationsRepository } from '@/backend_admin/modules/admin/notifications/repositories/admin-notifications-repository';
import { AdminNotificationsMapper } from '@/backend_admin/modules/admin/notifications/mappers/admin-notifications.mapper';
import { AdminNotificationsQueryDto } from '@/backend_admin/modules/admin/notifications/dtos/admin-notifications-query.dto';
import { AdminNotificationDto } from '@/backend_admin/modules/admin/notifications/dtos/admin-notifications-response.dto';

@Injectable()
export class AdminNotificationsQueryService {
  constructor(
    private readonly repository: AdminNotificationsRepository,
    private readonly mapper: AdminNotificationsMapper,
  ) {}


  /** @description Executes listNotifications for the Admin notifications feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async listNotifications(query: AdminNotificationsQueryDto): Promise<AdminNotificationDto[]> {
    const result = await this.repository.findAll(query); 
    return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity))) as unknown as AdminNotificationDto[];
  }
}
