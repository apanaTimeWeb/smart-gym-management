// RESPONSIBILITY: Exposes isolated, read-only Admin dashboard widget endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminDashboardQueryController -> widget service -> repository -> mapper.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminDashboardQueryDto } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_dtos/admin-dashboard-query.dto'
import { AdminDashboardResponseDto, AdminDashboardKpisResponseDto, AdminDashboardChartsResponseDto, AdminDashboardLeaderboardResponseDto, AdminDashboardAlertsResponseDto } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_dtos/admin-dashboard-response.dto'
import { AdminDashboardQueryService } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_services/admin-dashboard-query.service'

@ApiTags('Admin / dashboard')
@Controller('admin/dashboard')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminDashboardQueryController boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardQueryController {
  constructor(private readonly service: AdminDashboardQueryService) {}

  // SLA: FAST
  @Get('kpis')
  @ApiOperation({ summary: 'Fetch dashboard KPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminDashboardKpisResponseDto })
  async findKpis(@Query() query: AdminDashboardQueryDto): Promise<AdminDashboardKpisResponseDto> {
    return this.service.findKpis(query);
  }

  // SLA: STANDARD
  @Get('charts')
  @ApiOperation({ summary: 'Fetch dashboard chart series' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminDashboardChartsResponseDto })
  async findCharts(@Query() query: AdminDashboardQueryDto): Promise<AdminDashboardChartsResponseDto> {
    return this.service.findCharts(query);
  }

  // SLA: STANDARD
  @Get('leaderboard')
  @ApiOperation({ summary: 'Fetch dashboard branch leaderboard' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminDashboardLeaderboardResponseDto })
  async findLeaderboard(@Query() query: AdminDashboardQueryDto): Promise<AdminDashboardLeaderboardResponseDto> {
    return this.service.findLeaderboard(query);
  }

  // SLA: FAST
  @Get('alerts')
  @ApiOperation({ summary: 'Fetch dashboard alerts and expiring memberships' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminDashboardAlertsResponseDto })
  async findAlerts(@Query() query: AdminDashboardQueryDto): Promise<AdminDashboardAlertsResponseDto> {
    return this.service.findAlerts(query);
  }

  // SLA: STANDARD
  @Get('fetchDashboardStats')
  @ApiOperation({ summary: 'Backward-compatible dashboard contract; new clients should prefer widget endpoints.' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminDashboardResponseDto })
  async findLegacyDashboardStats(@Query() query: AdminDashboardQueryDto): Promise<AdminDashboardResponseDto> {
    return this.service.findLegacyDashboardStats(query);
  }
}
