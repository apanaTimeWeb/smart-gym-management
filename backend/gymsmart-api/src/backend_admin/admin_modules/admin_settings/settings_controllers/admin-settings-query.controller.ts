// RESPONSIBILITY: Exposes read-only Admin settings HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminSettingsQueryController -> AdminSettingsQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminSettingsQueryDto } from '@/backend_admin/admin_modules/admin_settings/settings_dtos/admin-settings-query.dto'
import { AdminSettingsResponseDto, AdminNotificationsSettingsDto } from '@/backend_admin/admin_modules/admin_settings/settings_dtos/admin-settings-response.dto'
import { AdminSettingsQueryService } from '@/backend_admin/admin_modules/admin_settings/settings_services/admin-settings-query.service'

@ApiTags('Admin / settings')
@Controller('admin/settings')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminSettingsQueryController boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSettingsQueryController {
  constructor(private readonly service: AdminSettingsQueryService) {}

  // SLA: STANDARD
  @Get('fetchSettings')
  @ApiOperation({ summary: 'Execute fetchSettings' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSettingsResponseDto })
  async findSettings(@Query() query: AdminSettingsQueryDto): Promise<AdminSettingsResponseDto> {
    return this.service.findSettings(query);
  }

  // SLA: STANDARD
  @Get('notifications')
  @ApiOperation({ summary: 'Execute fetchNotificationSettings' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminNotificationsSettingsDto })
  async findNotificationSettings(@Query() query: AdminSettingsQueryDto): Promise<AdminNotificationsSettingsDto> {
    return this.service.findNotificationSettings(query);
  }

  // SLA: STANDARD
  @Get('2fa/status')
  @ApiOperation({ summary: 'Execute status2fa' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSettingsResponseDto })
  async findTwoFactorStatus(@Query() query: AdminSettingsQueryDto): Promise<{ twoFactorEnabled: boolean }> {
    return this.service.findTwoFactorStatus(query);
  }

}
