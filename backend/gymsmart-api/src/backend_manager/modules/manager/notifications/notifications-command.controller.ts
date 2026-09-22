// @ts-nocheck
// RESPONSIBILITY: Owns the Manager notifications command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { NotificationsDeleteNotificationResponseDto } from '@/backend_manager/modules/manager/notifications/dtos/notifications-delete-notification.response.dto';
import { NotificationsDeleteNotificationService } from '@/backend_manager/modules/manager/notifications/services/notifications-delete-notification.service';
import { NotificationsMarkAllNotificationsReadRequestDto } from '@/backend_manager/modules/manager/notifications/dtos/notifications-mark-all-notifications-read.request.dto';
import { NotificationsMarkAllNotificationsReadResponseDto } from '@/backend_manager/modules/manager/notifications/dtos/notifications-mark-all-notifications-read.response.dto';
import { NotificationsMarkAllNotificationsReadService } from '@/backend_manager/modules/manager/notifications/services/notifications-mark-all-notifications-read.service';
import { NotificationsMarkNotificationReadRequestDto } from '@/backend_manager/modules/manager/notifications/dtos/notifications-mark-notification-read.request.dto';
import { NotificationsMarkNotificationReadResponseDto } from '@/backend_manager/modules/manager/notifications/dtos/notifications-mark-notification-read.response.dto';
import { NotificationsMarkNotificationReadService } from '@/backend_manager/modules/manager/notifications/services/notifications-mark-notification-read.service';
import { NotificationsQueryDto } from '@/backend_manager/modules/manager/notifications/dtos/notifications-query.dto';

@Controller('manager')
@ApiTags('Manager notifications')
@Roles(CoreRole.MANAGER)
export class NotificationsCommandController {
  constructor(private readonly markNotificationReadService: NotificationsMarkNotificationReadService, private readonly markAllNotificationsReadService: NotificationsMarkAllNotificationsReadService, private readonly deleteNotificationService: NotificationsDeleteNotificationService) {}

  // SLA: STANDARD
  @Patch("notifications/read-all")
  @ApiOperation({ summary: 'markAllNotificationsRead for Manager notifications' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationsMarkAllNotificationsReadResponseDto })
  markAllNotificationsRead(@Body() _dto: NotificationsMarkAllNotificationsReadRequestDto): Promise<NotificationsMarkAllNotificationsReadResponseDto> {  return this.markAllNotificationsReadService.markAllNotificationsRead(dto) as unknown as Promise<NotificationsMarkAllNotificationsReadResponseDto>;  }


  // SLA: STANDARD
  @Patch("notifications/:id/read")
  @ApiOperation({ summary: 'markNotificationRead for Manager notifications' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationsMarkNotificationReadResponseDto })
  markNotificationRead(@Param('id') id: string, @Body() _dto: NotificationsMarkNotificationReadRequestDto): Promise<NotificationsMarkNotificationReadResponseDto> {  return this.markNotificationReadService.markNotificationRead(dto, id) as unknown as Promise<NotificationsMarkNotificationReadResponseDto>;  }


  // SLA: STANDARD
  @Delete("notifications/:id")
  @ApiOperation({ summary: 'deleteNotification for Manager notifications' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationsDeleteNotificationResponseDto })
  deleteNotification(@Param('id') id: string): Promise<NotificationsDeleteNotificationResponseDto> {  return this.deleteNotificationService.deleteNotification(id); }


}
