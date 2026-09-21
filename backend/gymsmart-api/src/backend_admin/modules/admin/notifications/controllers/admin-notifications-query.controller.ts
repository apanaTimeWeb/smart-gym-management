// RESPONSIBILITY: Exposes read-only Admin notifications HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminNotificationsQueryController -> AdminNotificationsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminNotificationsQueryService } from '@/backend_admin/modules/admin/notifications/services/admin-notifications-query.service';
import { AdminNotificationDto } from '@/backend_admin/modules/admin/notifications/dtos/admin-notifications-response.dto';
import { AdminNotificationsQueryDto } from '@/backend_admin/modules/admin/notifications/dtos/admin-notifications-query.dto';

@ApiTags('Admin / notifications')
@Controller('admin/notifications')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminNotificationsQueryController {
  constructor(private readonly service: AdminNotificationsQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute listNotifications' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminNotificationDto] })
  async listNotifications(@Query() query: AdminNotificationsQueryDto): Promise<AdminNotificationDto[]> {
    return this.service.listNotifications(query);
  }

}
