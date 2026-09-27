// RESPONSIBILITY: Owns Manager dashboard query HTTP endpoints only; no dashboard mutations are handled here.
// FLOW: HTTP GET -> role/tenant guards -> validated ManagerDashboardQueryDto -> widget service -> canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { ManagerDashboardQueryDto } from '@/backend_manager/manager_modules/dashboard/dashboard_dtos/manager-dashboard-query.dto';
import { ManagerDashboardFetchDashboardKpisResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-fetch-dashboard-kpis.response.dto';
import { ManagerDashboardFetchDashboardChartsResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-fetch-dashboard-charts.response.dto';
import { ManagerDashboardFetchDashboardRecentMembersResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-fetch-dashboard-recent-members.response.dto';
import { ManagerDashboardFetchDashboardPendingPaymentsResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-fetch-dashboard-pending-payments.response.dto';
import { ManagerDashboardFetchDashboardExpiringMembershipsResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-fetch-dashboard-expiring-memberships.response.dto';
import { ManagerDashboardFindDashboardKpisService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-kpis.service';
import { ManagerDashboardFindDashboardChartsService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-charts.service';
import { ManagerDashboardFindDashboardRecentMembersService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-recent-members.service';
import { ManagerDashboardFindDashboardPendingPaymentsService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-pending-payments.service';
import { ManagerDashboardFindDashboardExpiringMembershipsService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-expiring-memberships.service';

@Controller('manager/dashboard')
@ApiTags('Manager dashboard')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerDashboardQueryController {
  constructor(
    private readonly kpisService: ManagerDashboardFindDashboardKpisService,
    private readonly chartsService: ManagerDashboardFindDashboardChartsService,
    private readonly recentMembersService: ManagerDashboardFindDashboardRecentMembersService,
    private readonly pendingPaymentsService: ManagerDashboardFindDashboardPendingPaymentsService,
    private readonly expiringMembershipsService: ManagerDashboardFindDashboardExpiringMembershipsService,
  ) {}

  // SLA: FAST
  @Get('kpis')
  @ApiOperation({ summary: 'Fetch dashboard KPI widget' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerDashboardFetchDashboardKpisResponseDto })
  findDashboardKpis(): ReturnType<ManagerDashboardFindDashboardKpisService['findDashboardKpis']> { return this.kpisService.findDashboardKpis(); }

  // SLA: FAST
  @Get('charts')
  @ApiOperation({ summary: 'Fetch dashboard chart widgets' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerDashboardFetchDashboardChartsResponseDto })
  findDashboardCharts(): ReturnType<ManagerDashboardFindDashboardChartsService['findDashboardCharts']> { return this.chartsService.findDashboardCharts(); }

  // SLA: STANDARD
  @Get('recent-members')
  @ApiOperation({ summary: 'Fetch dashboard recent-members widget' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerDashboardFetchDashboardRecentMembersResponseDto })
  findDashboardRecentMembers(@Query() query: ManagerDashboardQueryDto): ReturnType<ManagerDashboardFindDashboardRecentMembersService['findDashboardRecentMembers']> { return this.recentMembersService.findDashboardRecentMembers(query); }

  // SLA: STANDARD
  @Get('pending-payments')
  @ApiOperation({ summary: 'Fetch dashboard pending-payments widget' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerDashboardFetchDashboardPendingPaymentsResponseDto })
  findDashboardPendingPayments(@Query() query: ManagerDashboardQueryDto): ReturnType<ManagerDashboardFindDashboardPendingPaymentsService['findDashboardPendingPayments']> { return this.pendingPaymentsService.findDashboardPendingPayments(query); }

  // SLA: STANDARD
  @Get('expiring-memberships')
  @ApiOperation({ summary: 'Fetch dashboard expiring-memberships widget' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerDashboardFetchDashboardExpiringMembershipsResponseDto })
  findDashboardExpiringMemberships(@Query() query: ManagerDashboardQueryDto): ReturnType<ManagerDashboardFindDashboardExpiringMembershipsService['findDashboardExpiringMemberships']> { return this.expiringMembershipsService.findDashboardExpiringMemberships(query); }
}

export { ManagerDashboardQueryController as DashboardQueryController };
