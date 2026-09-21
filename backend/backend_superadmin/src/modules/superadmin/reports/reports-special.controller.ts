// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the reports feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { ReportsComparisonResponseDto } from '@/modules/superadmin/reports/reports-comparison-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { ReportsMainService } from '@/modules/superadmin/reports/services/reports-main.service';
import { ReportsComparisonService } from '@/modules/superadmin/reports/services/reports-comparison.service';

@ApiTags('reports-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ReportsSpecialController {
  constructor(private readonly mainService: ReportsMainService, private readonly comparisonService: ReportsComparisonService) {}

  /** Executes GET /superadmin/reports. */
  @ApiOperation({ summary: 'GET /superadmin/reports' })
  @Get('superadmin/reports')
  async main(@Query() query: Record<string, string>): Promise<unknown> { return await this.mainService.findReportsData(query); }

  /** Executes GET /superadmin/reports/comparison. */
  @ApiOperation({ summary: 'GET /superadmin/reports/comparison' })
  @Get('superadmin/reports/comparison')
  async comparison(@Query() query: Record<string, string>): Promise<unknown> { return await this.comparisonService.findReportsComparison(query); }

}
