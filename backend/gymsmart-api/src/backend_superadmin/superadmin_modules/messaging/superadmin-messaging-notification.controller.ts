// RESPONSIBILITY: Owns HTTP transport for the messaging-notification.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminMessagingNotificationService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-notification.service';
import { SuperadminMessagingNotificationResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/responses/superadmin-messaging-notification-response.dto';


@ApiTags('messaging-notifications')
@Controller('/superadmin/messaging/notifications')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMessagingNotificationController {
  constructor(private readonly service: SuperadminMessagingNotificationService) {}
  /** Lists notifications. */
  // SLA: FAST
  @Get()
  @ApiResponse({ type: [SuperadminMessagingNotificationResponseDto] })
  async list(): Promise<SuperadminMessagingNotificationResponseDto[]> { return (this.service.list()) as unknown as SuperadminMessagingNotificationResponseDto[]; }
  /** Marks all notifications as read. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('read-all')
  async markAllRead(): Promise<null> { return this.service.markAllRead(); }
  /** Marks one notification as read. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/read')
  @ApiResponse({ type: SuperadminMessagingNotificationResponseDto })
  async markRead(@Param('id') id: string): Promise<SuperadminMessagingNotificationResponseDto> { return (this.service.markRead(id)) as unknown as SuperadminMessagingNotificationResponseDto; }
}