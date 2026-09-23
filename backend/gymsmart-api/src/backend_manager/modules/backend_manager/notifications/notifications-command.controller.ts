// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { NotificationsMarkAllNotificationsReadRequestDto } from '@/backend_manager/modules/backend_manager/notifications/dtos/notifications-mark-all-notifications-read.request.dto';
import { NotificationsDeleteNotificationService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-delete-notification.service';
import { NotificationsMarkAllNotificationsReadService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-mark-all-notifications-read.service';
import { NotificationsMarkNotificationReadService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-mark-notification-read.service';

@Controller('manager')
@ApiTags('Manager notifications')
@Roles(CoreRole.MANAGER)
export class NotificationsCommandController {
  constructor(private readonly markNotificationReadService: NotificationsMarkNotificationReadService, private readonly markAllNotificationsReadService: NotificationsMarkAllNotificationsReadService, private readonly deleteNotificationService: NotificationsDeleteNotificationService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("notifications/read-all")
  @ApiOperation({ summary: 'markAllNotificationsRead for Manager notifications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'null', nullable: true } })
  markAllNotificationsRead(@Body() _dto: NotificationsMarkAllNotificationsReadRequestDto): ReturnType<NotificationsMarkAllNotificationsReadService['markAllNotificationsRead']> { return this.markAllNotificationsReadService.markAllNotificationsRead(); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("notifications/:id/read")
  @ApiOperation({ summary: 'markNotificationRead for Manager notifications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'null', nullable: true } })
  markNotificationRead(@Param('id') id: string): ReturnType<NotificationsMarkNotificationReadService['markNotificationRead']> { return this.markNotificationReadService.markNotificationRead(id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("notifications/:id")
  @ApiOperation({ summary: 'deleteNotification for Manager notifications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'null', nullable: true } })
  deleteNotification(@Param('id') id: string): ReturnType<NotificationsDeleteNotificationService['deleteNotification']> {  return this.deleteNotificationService.deleteNotification(id); }


}
