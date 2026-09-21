// RESPONSIBILITY: Owns notification read-state and notification retrieval endpoints.
// FLOW: HTTP -> notification service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { MessagingNotificationService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-notification.service';
import { MessagingNotificationResponseDto } from '@/backend_superadmin/modules/superadmin/messaging/responses/messaging-notification-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('messaging-notifications')
@Controller('/superadmin/messaging/notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingNotificationController {
  constructor(private readonly service: MessagingNotificationService) {}
  /** Lists notifications. */
  @Get()
  @ApiResponse({ type: [MessagingNotificationResponseDto] })
  async list(): Promise<MessagingNotificationResponseDto[]> { return (this.service.list()) as unknown as MessagingNotificationResponseDto[]; }
  /** Marks all notifications as read. */
  @Patch('read-all')
  async markAllRead(): Promise<null> { return this.service.markAllRead(); }
  /** Marks one notification as read. */
  @Patch(':id/read')
  @ApiResponse({ type: MessagingNotificationResponseDto })
  async markRead(@Param('id') id: string): Promise<MessagingNotificationResponseDto> { return (this.service.markRead(id)) as unknown as MessagingNotificationResponseDto; }
}
