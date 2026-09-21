// RESPONSIBILITY: Exposes read-only Admin notifications HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminNotificationsQueryController -> AdminNotificationsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminNotificationsQueryService } from '@/modules/admin/notifications/services/admin-notifications-query.service';
import { AdminNotificationsQueryDto } from '@/modules/admin/notifications/dtos/admin-notifications-query.dto';
import { AdminNotificationListResponseDto } from '@/modules/admin/notifications/dtos/admin-notifications-response.dto';

@ApiTags('Admin / notifications')
@Controller('admin/notifications')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminNotificationsQueryController {
  constructor(private readonly service: AdminNotificationsQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute listNotifications' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminNotificationListResponseDto })
  async listNotifications(@Query() query: AdminNotificationsQueryDto): Promise<AdminNotificationListResponseDto> {
    return this.service.listNotifications(query) as unknown as AdminNotificationListResponseDto;
  }

}
