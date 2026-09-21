// RESPONSIBILITY: Exposes read-only Admin plans HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminPlansQueryController -> AdminPlansQueryService -> repository.

import { Controller, Get, Post, Body, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminPlansQueryService } from '@/backend_admin/modules/admin/plans/services/admin-plans-query.service';
import { AdminPlansQueryDto } from '@/backend_admin/modules/admin/plans/dtos/admin-plans-query.dto';
import { AdminPlansIdDto } from '@/backend_admin/modules/admin/plans/dtos/admin-plans-id.dto';
import { AdminPlanDto, AdminPlanRevenueRecordDto } from '@/backend_admin/modules/admin/plans/dtos/admin-plans-response.dto';

@ApiTags('Admin / plans')
@Controller('admin/plans')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminPlansQueryController {
  constructor(private readonly service: AdminPlansQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute fetchAllPlans' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminPlanDto] })
  async fetchAllPlans(@Query() query: AdminPlansQueryDto): Promise<AdminPlanDto[]> {
    return this.service.fetchAllPlans(query);
  }

  // SLA: STANDARD
  @Post('fetchPlanById')
  @ApiOperation({ summary: 'Execute fetchPlanById' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlanDto })
  async fetchPlanById(@Query('id') queryId?: string): Promise<AdminPlanDto> {
    return this.service.fetchPlanById(queryId ?? '');
  }

  // SLA: STANDARD
  @Get('revenue')
  @ApiOperation({ summary: 'Execute fetchPlanRevenue' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminPlanRevenueRecordDto] })
  async fetchPlanRevenue(@Query() query: AdminPlansQueryDto): Promise<AdminPlanRevenueRecordDto[]> {
    return this.service.fetchPlanRevenue(query);
  }

}
