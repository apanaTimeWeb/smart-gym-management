// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerNotificationsMarkAllNotificationsReadRequestDto } from '@/backend_manager/manager_modules/notifications/notifications_dtos/manager-notifications-mark-all-notifications-read.request.dto';
import { ManagerNotificationsDeleteNotificationService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-delete-notification.service';
import { ManagerNotificationsMarkAllNotificationsReadService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-mark-all-notifications-read.service';
import { ManagerNotificationsMarkNotificationReadService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-mark-notification-read.service';

@Controller('manager')
@ApiTags('Manager notifications')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerNotificationsCommandController {
  constructor(private readonly markNotificationReadService: ManagerNotificationsMarkNotificationReadService, private readonly markAllNotificationsReadService: ManagerNotificationsMarkAllNotificationsReadService, private readonly deleteNotificationService: ManagerNotificationsDeleteNotificationService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("notifications/read-all")
  @ApiOperation({ summary: 'updateAllNotificationsRead for Manager notifications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'null', nullable: true } })
  updateAllNotificationsRead(@Body() _dto: ManagerNotificationsMarkAllNotificationsReadRequestDto): ReturnType<ManagerNotificationsMarkAllNotificationsReadService['updateAllNotificationsRead']> { return this.markAllNotificationsReadService.updateAllNotificationsRead(); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("notifications/:id/read")
  @ApiOperation({ summary: 'updateNotificationRead for Manager notifications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'null', nullable: true } })
  @ManagerCoreAuthorizeResourceParam('id')
  updateNotificationRead(@Param('id') id: string): ReturnType<ManagerNotificationsMarkNotificationReadService['updateNotificationRead']> { return this.markNotificationReadService.updateNotificationRead(id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("notifications/:id")
  @ApiOperation({ summary: 'deleteNotification for Manager notifications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'null', nullable: true } })
  @ManagerCoreAuthorizeResourceParam('id')
  deleteNotification(@Param('id') id: string): ReturnType<ManagerNotificationsDeleteNotificationService['deleteNotification']> {  return this.deleteNotificationService.deleteNotification(id); }


}

export { ManagerNotificationsCommandController as NotificationsCommandController };
