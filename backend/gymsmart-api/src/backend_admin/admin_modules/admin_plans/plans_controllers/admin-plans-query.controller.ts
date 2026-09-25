// RESPONSIBILITY: Exposes read-only Admin plans HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminPlansQueryController -> AdminPlansQueryService -> repository.
import { Body, Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminPlansIdDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-id.dto.js';
import { AdminPlansQueryDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-query.dto.js';
import { AdminPlanDto, AdminPlanRevenueRecordDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-response.dto.js';
import { AdminPlansQueryService } from '@/backend_admin/admin_modules/admin_plans/plans_services/admin-plans-query.service.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@ApiTags('Admin / plans')
@Controller('admin/plans')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminPlansQueryController boundary for the admin_plans backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPlansQueryController {
  constructor(private readonly service: AdminPlansQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute fetchAllPlans' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminPlanDto] })
  async findAllPlans(@Query() query: AdminPlansQueryDto): Promise<AdminCorePaginatedResult<AdminPlanDto>> {
    return this.service.findAllPlans(query);
  }

  // SLA: STANDARD
  @Get('fetchAllPlans')
  @ApiOperation({ summary: 'Execute frontend fetchAllPlans contract' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminPlanDto] })
  async fetchAllPlansAlias(@Query() query: AdminPlansQueryDto): Promise<AdminCorePaginatedResult<AdminPlanDto>> {
    return this.service.findAllPlans(query);
  }

  // SLA: STANDARD
  @Get('fetchPlanById')
  @ApiOperation({ summary: 'Execute fetchPlanById' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlanDto })
  async findPlanById(@Query('id') queryId: string | undefined, @Body() body: AdminPlansIdDto): Promise<AdminPlanDto> {
    return this.service.findPlanById(queryId ?? body.id ?? '');
  }

  // SLA: STANDARD
  @Get('fetchPlanRevenue')
  @ApiOperation({ summary: 'Execute frontend fetchPlanRevenue contract' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminPlanRevenueRecordDto] })
  async fetchPlanRevenueAlias(@Query() query: AdminPlansQueryDto): Promise<AdminPlanRevenueRecordDto[]> {
    return this.service.findPlanRevenue(query);
  }

  // SLA: STANDARD
  @Get('revenue')
  @ApiOperation({ summary: 'Execute fetchPlanRevenue' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminPlanRevenueRecordDto] })
  async findPlanRevenue(@Query() query: AdminPlansQueryDto): Promise<AdminPlanRevenueRecordDto[]> {
    return this.service.findPlanRevenue(query);
  }

}
