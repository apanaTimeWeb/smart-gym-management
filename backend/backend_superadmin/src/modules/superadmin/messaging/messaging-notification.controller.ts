// RESPONSIBILITY: Owns notification read-state and notification retrieval endpoints.
// FLOW: HTTP -> notification service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { MessagingNotificationService } from '@/modules/superadmin/messaging/services/messaging-notification.service';

@ApiTags('messaging-notifications')
@Controller('/superadmin/messaging/notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingNotificationController {
  constructor(private readonly service: MessagingNotificationService) {}
  /** Lists notifications. */
  @Get()
  async list(): Promise<unknown> { return this.service.list(); }
  /** Marks all notifications as read. */
  @Patch('read-all')
  async markAllRead(): Promise<null> { return this.service.markAllRead(); }
  /** Marks one notification as read. */
  @Patch(':id/read')
  async markRead(@Param('id') id: string): Promise<unknown> { return this.service.markRead(id); }
}
