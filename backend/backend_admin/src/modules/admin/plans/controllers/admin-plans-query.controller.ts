// RESPONSIBILITY: Exposes read-only Admin plans HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminPlansQueryController -> AdminPlansQueryService -> repository.

import { Body, Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminPlansQueryService } from '@/modules/admin/plans/services/admin-plans-query.service';
import { AdminPlansQueryDto } from '@/modules/admin/plans/dtos/admin-plans-query.dto';
import { AdminPlansIdDto } from '@/modules/admin/plans/dtos/admin-plans-id.dto';
import { AdminPlanListResponseDto, AdminPlanDto, AdminPlanRevenueListResponseDto } from '@/modules/admin/plans/dtos/admin-plans-response.dto';

@ApiTags('Admin / plans')
@Controller('admin/plans')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminPlansQueryController {
  constructor(private readonly service: AdminPlansQueryService) {}

  // SLA: STANDARD
  @Get('fetchAllPlans')
  @ApiOperation({ summary: 'Execute fetchAllPlans' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlanListResponseDto })
  async fetchAllPlans(@Query() query: AdminPlansQueryDto): Promise<AdminPlanListResponseDto> {
    return this.service.fetchAllPlans(query) as unknown as AdminPlanListResponseDto;
  }

  // SLA: STANDARD
  @Get('fetchPlanById')
  @ApiOperation({ summary: 'Execute fetchPlanById' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlanDto })
  async fetchPlanById(@Body() body: AdminPlansIdDto, @Query('id') queryId?: string): Promise<AdminPlanDto> {
    return this.service.fetchPlanById(body.id ?? queryId ?? '') as unknown as AdminPlanDto;
  }

  // SLA: STANDARD
  @Get('fetchPlanRevenue')
  @ApiOperation({ summary: 'Execute fetchPlanRevenue' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlanRevenueListResponseDto })
  async fetchPlanRevenue(@Query() query: AdminPlansQueryDto): Promise<AdminPlanRevenueListResponseDto> {
    return this.service.fetchPlanRevenue(query) as unknown as AdminPlanRevenueListResponseDto;
  }

}
