// RESPONSIBILITY: Exposes read-only Admin dashboard HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminDashboardQueryController -> AdminDashboardQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminDashboardQueryService } from '@/modules/admin/dashboard/services/admin-dashboard-query.service';
import { AdminDashboardQueryDto } from '@/modules/admin/dashboard/dtos/admin-dashboard-query.dto';
import { AdminDashboardResponseDto } from '@/modules/admin/dashboard/dtos/admin-dashboard-response.dto';

@ApiTags('Admin / dashboard')
@Controller('admin/dashboard')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminDashboardQueryController {
  constructor(private readonly service: AdminDashboardQueryService) {}

  // SLA: STANDARD
  @Get('fetchDashboardStats')
  @ApiOperation({ summary: 'Execute fetchDashboardStats' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminDashboardResponseDto })
  async fetchDashboardStats(@Query() query: AdminDashboardQueryDto): Promise<unknown> {
    return this.service.fetchDashboardStats(query);
  }

}
