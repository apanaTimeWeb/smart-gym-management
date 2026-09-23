// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { NotificationsFetchManagerNotificationsResponseDto } from '@/backend_manager/modules/backend_manager/notifications/dtos/notifications-fetch-manager-notifications.response.dto';
import { NotificationsFetchNotificationKPIsResponseDto } from '@/backend_manager/modules/backend_manager/notifications/dtos/notifications-fetch-notification-k-p-is.response.dto';
import { NotificationsQueryDto } from '@/backend_manager/modules/backend_manager/notifications/dtos/notifications-query.dto';
import { NotificationsFetchManagerNotificationsService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-fetch-manager-notifications.service';
import { NotificationsFetchNotificationKPIsService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-fetch-notification-k-p-is.service';

@Controller('manager')
@ApiTags('Manager notifications')
@Roles(CoreRole.MANAGER)
export class NotificationsQueryController {
  constructor(private readonly fetchManagerNotificationsService: NotificationsFetchManagerNotificationsService, private readonly fetchNotificationKPIsService: NotificationsFetchNotificationKPIsService) {}

  // SLA: FAST
  @Get("notifications/kpis")
  @ApiOperation({ summary: 'fetchNotificationKPIs for Manager notifications' })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationsFetchNotificationKPIsResponseDto })
  fetchNotificationKPIs(@Query() query: NotificationsQueryDto): ReturnType<NotificationsFetchNotificationKPIsService['fetchNotificationKPIs']> { return this.fetchNotificationKPIsService.fetchNotificationKPIs(query as any); }


  // SLA: STANDARD
  @Get("notifications")
  @ApiOperation({ summary: 'fetchManagerNotifications for Manager notifications' })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationsFetchManagerNotificationsResponseDto })
  fetchManagerNotifications(@Query() query: NotificationsQueryDto): ReturnType<NotificationsFetchManagerNotificationsService['fetchManagerNotifications']> { return this.fetchManagerNotificationsService.fetchManagerNotifications(query as any); }


}
