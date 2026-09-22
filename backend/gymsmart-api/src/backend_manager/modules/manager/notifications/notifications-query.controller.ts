// RESPONSIBILITY: Owns the Manager notifications query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { NotificationsFetchManagerNotificationsResponseDto } from '@/modules/manager/notifications/dtos/notifications-fetch-manager-notifications.response.dto';
import { NotificationsFetchManagerNotificationsService } from '@/modules/manager/notifications/services/notifications-fetch-manager-notifications.service';
import { NotificationsFetchNotificationKPIsResponseDto } from '@/modules/manager/notifications/dtos/notifications-fetch-notification-k-p-is.response.dto';
import { NotificationsFetchNotificationKPIsService } from '@/modules/manager/notifications/services/notifications-fetch-notification-k-p-is.service';
import { NotificationsQueryDto } from '@/modules/manager/notifications/dtos/notifications-query.dto';

@Controller('manager')
@ApiTags('Manager notifications')
@Roles(CoreRole.MANAGER)
export class NotificationsQueryController {
  constructor(private readonly fetchManagerNotificationsService: NotificationsFetchManagerNotificationsService, private readonly fetchNotificationKPIsService: NotificationsFetchNotificationKPIsService) {}

  // SLA: FAST
  @Get("notifications/kpis")
  @ApiOperation({ summary: 'fetchNotificationKPIs for Manager notifications' })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationsFetchNotificationKPIsResponseDto })
  fetchNotificationKPIs(@Query() query: NotificationsQueryDto): Promise<NotificationsFetchNotificationKPIsResponseDto> {  return this.fetchNotificationKPIsService.fetchNotificationKPIs(query) as Promise<NotificationsFetchNotificationKPIsResponseDto>;  }


  // SLA: STANDARD
  @Get("notifications")
  @ApiOperation({ summary: 'fetchManagerNotifications for Manager notifications' })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationsFetchManagerNotificationsResponseDto })
  fetchManagerNotifications(@Query() query: NotificationsQueryDto): Promise<NotificationsFetchManagerNotificationsResponseDto> {  return this.fetchManagerNotificationsService.fetchManagerNotifications(query) as Promise<NotificationsFetchManagerNotificationsResponseDto>;  }


}
