// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { NotificationsManagerNotificationItemResponseDto } from '@/backend_manager/manager_modules/notifications/notifications_responses/manager-notifications-manager-notification-item.response.dto';

export class ManagerNotificationsFetchManagerNotificationsResponseDto {
  @ApiProperty({ type: [NotificationsManagerNotificationItemResponseDto] })
  notifications?: Array<NotificationsManagerNotificationItemResponseDto>;

}

export { ManagerNotificationsFetchManagerNotificationsResponseDto as NotificationsFetchManagerNotificationsResponseDto };
