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
import { AdminPlansResponseDto } from '@/modules/admin/plans/dtos/admin-plans-response.dto';

@ApiTags('Admin / plans')
@Controller('admin/plans')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminPlansQueryController {
  constructor(private readonly service: AdminPlansQueryService) {}

  // SLA: STANDARD
  @Get('fetchAllPlans')
  @ApiOperation({ summary: 'Execute fetchAllPlans' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlansResponseDto })
  async fetchAllPlans(@Query() query: AdminPlansQueryDto): Promise<unknown> {
    return this.service.fetchAllPlans(query);
  }

  // SLA: STANDARD
  @Get('fetchPlanById')
  @ApiOperation({ summary: 'Execute fetchPlanById' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlansResponseDto })
  async fetchPlanById(@Body() body: AdminPlansIdDto, @Query('id') queryId?: string): Promise<unknown> {
    return this.service.fetchPlanById(body.id ?? queryId ?? '');
  }

  // SLA: STANDARD
  @Get('fetchPlanRevenue')
  @ApiOperation({ summary: 'Execute fetchPlanRevenue' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlansResponseDto })
  async fetchPlanRevenue(@Query() query: AdminPlansQueryDto): Promise<unknown> {
    return this.service.fetchPlanRevenue(query);
  }

}
