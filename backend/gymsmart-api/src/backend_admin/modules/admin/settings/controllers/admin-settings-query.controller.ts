// RESPONSIBILITY: Exposes read-only Admin settings HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminSettingsQueryController -> AdminSettingsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminSettingsQueryService } from '@/backend_admin/modules/admin/settings/services/admin-settings-query.service';
import { AdminSettingsQueryDto } from '@/backend_admin/modules/admin/settings/dtos/admin-settings-query.dto';
import { AdminSettingsResponseDto, AdminNotificationsSettingsDto } from '@/backend_admin/modules/admin/settings/dtos/admin-settings-response.dto';

@ApiTags('Admin / settings')
@Controller('admin/settings')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminSettingsQueryController {
  constructor(private readonly service: AdminSettingsQueryService) {}

  // SLA: STANDARD
  @Get('fetchSettings')
  @ApiOperation({ summary: 'Execute fetchSettings' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSettingsResponseDto })
  async fetchSettings(@Query() query: AdminSettingsQueryDto): Promise<AdminSettingsResponseDto> {
    return this.service.fetchSettings(query);
  }

  // SLA: STANDARD
  @Get('notifications')
  @ApiOperation({ summary: 'Execute fetchNotificationSettings' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminNotificationsSettingsDto })
  async fetchNotificationSettings(@Query() query: AdminSettingsQueryDto): Promise<AdminNotificationsSettingsDto> {
    return this.service.fetchNotificationSettings(query);
  }

  // SLA: STANDARD
  @Get('../permissions/fetchPermissions')
  @ApiOperation({ summary: 'Execute fetchRolePermissionReference' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSettingsResponseDto })
  async fetchRolePermissionReference(@Query() query: AdminSettingsQueryDto): Promise<any> {
    return this.service.fetchRolePermissionReference(query);
  }

  // SLA: STANDARD
  @Get('2fa/status')
  @ApiOperation({ summary: 'Execute status2fa' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSettingsResponseDto })
  async status2fa(@Query() query: AdminSettingsQueryDto): Promise<any> {
    return this.service.status2fa(query);
  }

}
