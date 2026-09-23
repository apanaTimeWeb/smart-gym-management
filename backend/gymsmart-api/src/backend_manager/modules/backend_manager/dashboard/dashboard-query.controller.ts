// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { DashboardFetchDashboardStatsResponseDto } from '@/backend_manager/modules/backend_manager/dashboard/dtos/dashboard-fetch-dashboard-stats.response.dto';
import { DashboardQueryDto } from '@/backend_manager/modules/backend_manager/dashboard/dtos/dashboard-query.dto';
import { DashboardFetchDashboardStatsService } from '@/backend_manager/modules/backend_manager/dashboard/services/dashboard-fetch-dashboard-stats.service';

@Controller('manager')
@ApiTags('Manager dashboard')
@Roles(CoreRole.MANAGER)
export class DashboardQueryController {
  constructor(private readonly fetchDashboardStatsService: DashboardFetchDashboardStatsService) {}

  // SLA: FAST
  @Get("dashboard/stats")
  @ApiOperation({ summary: 'fetchDashboardStats for Manager dashboard' })
  @ApiResponse({ status: HttpStatus.OK, type: DashboardFetchDashboardStatsResponseDto })
  fetchDashboardStats(@Query() query: DashboardQueryDto): ReturnType<DashboardFetchDashboardStatsService['fetchDashboardStats']> { return this.fetchDashboardStatsService.fetchDashboardStats(query as any); }


}
