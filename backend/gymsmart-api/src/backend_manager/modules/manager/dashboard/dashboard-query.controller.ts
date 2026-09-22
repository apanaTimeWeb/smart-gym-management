// RESPONSIBILITY: Owns the Manager dashboard query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { DashboardFetchDashboardStatsResponseDto } from '@/backend_manager/modules/manager/dashboard/dtos/dashboard-fetch-dashboard-stats.response.dto';
import { DashboardFetchDashboardStatsService } from '@/backend_manager/modules/manager/dashboard/services/dashboard-fetch-dashboard-stats.service';
import { DashboardQueryDto } from '@/backend_manager/modules/manager/dashboard/dtos/dashboard-query.dto';

@Controller('manager')
@ApiTags('Manager dashboard')
@Roles(CoreRole.MANAGER)
export class DashboardQueryController {
  constructor(private readonly fetchDashboardStatsService: DashboardFetchDashboardStatsService) {}

  // SLA: FAST
  @Get("dashboard/stats")
  @ApiOperation({ summary: 'fetchDashboardStats for Manager dashboard' })
  @ApiResponse({ status: HttpStatus.OK, type: DashboardFetchDashboardStatsResponseDto })
  fetchDashboardStats(@Query() query: DashboardQueryDto): Promise<DashboardFetchDashboardStatsResponseDto> {  return this.fetchDashboardStatsService.fetchDashboardStats(query) as unknown as Promise<DashboardFetchDashboardStatsResponseDto>;  }


}
