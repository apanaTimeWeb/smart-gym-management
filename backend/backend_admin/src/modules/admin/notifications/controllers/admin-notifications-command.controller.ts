// RESPONSIBILITY: Exposes mutation endpoints for Admin notifications; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminNotificationsCommandController -> AdminNotificationsCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminNotificationsCommandService } from '@/modules/admin/notifications/services/admin-notifications-command.service';
import { AdminNotificationsMutationDto } from '@/modules/admin/notifications/dtos/admin-notifications-mutation.dto';
import { AdminNotificationsIdDto } from '@/modules/admin/notifications/dtos/admin-notifications-id.dto';
import { AdminNotificationDto } from '@/modules/admin/notifications/dtos/admin-notifications-response.dto';

@ApiTags('Admin / notifications')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/notifications')
export class AdminNotificationsCommandController {
  constructor(private readonly service: AdminNotificationsCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Patch(':id/read')
  @ApiOperation({ summary: 'Execute markRead' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminNotificationDto })
  async markAsReadById(@Param('id') id: string): Promise<AdminNotificationDto | null> {
    return this.service.markAsReadById(id);
  }

  // SLA: STANDARD
  @Patch('read-all')
  @ApiOperation({ summary: 'Execute markAllRead' })
  @ApiResponse({ status: HttpStatus.OK })
  async markAllRead(): Promise<void> {
    return this.service.markAllRead();
  }

}
