// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerNotificationsFetchManagerNotificationsResponseDto } from '@/backend_manager/manager_modules/notifications/notifications_responses/manager-notifications-fetch-manager-notifications.response.dto';
import { ManagerNotificationsFetchNotificationKPIsResponseDto } from '@/backend_manager/manager_modules/notifications/notifications_responses/manager-notifications-fetch-notification-k-p-is.response.dto';
import { ManagerNotificationsQueryDto } from '@/backend_manager/manager_modules/notifications/notifications_dtos/manager-notifications-query.dto';
import { ManagerNotificationsFindManagerNotificationsService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-find-manager-notifications.service';
import { ManagerNotificationsFindNotificationKPIsService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-find-notification-k-p-is.service';

@Controller('manager')
@ApiTags('Manager notifications')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerNotificationsQueryController {
  constructor(private readonly fetchManagerNotificationsService: ManagerNotificationsFindManagerNotificationsService, private readonly fetchNotificationKPIsService: ManagerNotificationsFindNotificationKPIsService) {}

  // SLA: FAST
  @Get("notifications/kpis")
  @ApiOperation({ summary: 'findNotificationKPIs for Manager notifications' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerNotificationsFetchNotificationKPIsResponseDto })
  findNotificationKPIs(@Query() query: ManagerNotificationsQueryDto): ReturnType<ManagerNotificationsFindNotificationKPIsService['findNotificationKPIs']> { return this.fetchNotificationKPIsService.findNotificationKPIs(query); }


  // SLA: STANDARD
  @Get("notifications")
  @ApiOperation({ summary: 'findManagerNotifications for Manager notifications' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerNotificationsFetchManagerNotificationsResponseDto })
  findManagerNotifications(@Query() query: ManagerNotificationsQueryDto): ReturnType<ManagerNotificationsFindManagerNotificationsService['findManagerNotifications']> { return this.fetchManagerNotificationsService.findManagerNotifications(query); }


}

export { ManagerNotificationsQueryController as NotificationsQueryController };
