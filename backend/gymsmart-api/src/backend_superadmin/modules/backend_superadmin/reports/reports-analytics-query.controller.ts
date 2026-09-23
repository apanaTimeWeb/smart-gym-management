// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReportsMainService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-main.service';
import { ReportsComparisonService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-comparison.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('reportsanalyticsquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ReportsAnalyticsQueryController {
  constructor(private readonly mainService: ReportsMainService, private readonly comparisonService: ReportsComparisonService) {}


  /** Executes GET /superadmin/reports. */
  @ApiOperation({ summary: 'GET /superadmin/reports' })
  // SLA: HEAVY
  @Get('superadmin/reports')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async main(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.mainService.findReportsData(query); }


  /** Executes GET /superadmin/reports/comparison. */
  @ApiOperation({ summary: 'GET /superadmin/reports/comparison' })
  // SLA: HEAVY
  @Get('superadmin/reports/comparison')
  @Get('api/superadmin/reports/comparison')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async comparison(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.comparisonService.findReportsComparison(query); }

}