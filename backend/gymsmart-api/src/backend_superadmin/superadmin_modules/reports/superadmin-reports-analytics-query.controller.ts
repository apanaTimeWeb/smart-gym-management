// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminReportsMainService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-main.service';
import { SuperadminReportsComparisonService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-comparison.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('reportsanalyticsquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminReportsAnalyticsQueryController {
  constructor(private readonly mainService: SuperadminReportsMainService, private readonly comparisonService: SuperadminReportsComparisonService) {}


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