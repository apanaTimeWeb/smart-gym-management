// RESPONSIBILITY: Exposes read-only Admin hr HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminHrQueryController -> AdminHrQueryService -> repository.

import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminHrQueryService } from '@/modules/admin/hr/services/admin-hr-query.service';
import { AdminHrQueryDto } from '@/modules/admin/hr/dtos/admin-hr-query.dto';
import { AdminHrResponseDto } from '@/modules/admin/hr/dtos/admin-hr-response.dto';

@ApiTags('Admin / hr')
@Controller('admin/hr')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminHrQueryController {
  constructor(private readonly service: AdminHrQueryService) {}

  // SLA: STANDARD
  @Get('staff')
  @ApiOperation({ summary: 'Execute fetchStaff' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrResponseDto })
  async fetchStaff(@Query() query: AdminHrQueryDto): Promise<unknown> {
    return this.service.fetchStaff(query);
  }

  // SLA: STANDARD
  @Get('staff/:id')
  @ApiOperation({ summary: 'Execute fetchStaffById' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrResponseDto })
  async fetchStaffById(@Param('id') id: string): Promise<unknown> {
    return this.service.fetchStaffById(id);
  }

  // SLA: STANDARD
  @Get('payrolls')
  @ApiOperation({ summary: 'Execute fetchPayrolls' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrResponseDto })
  async fetchPayrolls(@Query() query: AdminHrQueryDto): Promise<unknown> {
    return this.service.fetchPayrolls(query);
  }

  // SLA: STANDARD
  @Get('summary')
  @ApiOperation({ summary: 'Execute fetchSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrResponseDto })
  async fetchSummary(@Query() query: AdminHrQueryDto): Promise<unknown> {
    return this.service.fetchSummary(query);
  }

  // SLA: STANDARD
  @Get('staff/:id/ledger')
  @ApiOperation({ summary: 'Execute fetchLedger' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrResponseDto })
  async fetchLedger(@Query() query: AdminHrQueryDto): Promise<unknown> {
    return this.service.fetchLedger(query);
  }

  // SLA: STANDARD
  @Get('performance')
  @ApiOperation({ summary: 'Execute fetchPerformance' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrResponseDto })
  async fetchPerformance(@Query() query: AdminHrQueryDto): Promise<unknown> {
    return this.service.fetchPerformance(query);
  }

}
