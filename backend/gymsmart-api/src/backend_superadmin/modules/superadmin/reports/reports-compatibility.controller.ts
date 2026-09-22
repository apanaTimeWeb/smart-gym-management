// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Reports.
// FLOW: /superadmin/reports -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/reports.

import { Controller, Get, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

import { ReportsDataService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-data.service';
import { ReportsComparisonService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-comparison.service';
import { ReportsDataQueryDto } from '@/backend_superadmin/modules/superadmin/reports/dtos/reports-data-query.dto';

@ApiTags('Reports-Compatibility')
@Controller({ version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ReportsCompatibilityController {
  constructor(
    private readonly dataService: ReportsDataService,
    private readonly comparisonService: ReportsComparisonService
  ) {}

  @Get('superadmin/reports/revenue')
  @Version(VERSION_NEUTRAL)
  async revenue(@Query() query: ReportsDataQueryDto) { return this.dataService.revenue(query); }

  @Get('superadmin/reports/cancellations')
  @Version(VERSION_NEUTRAL)
  async cancellations(@Query() query: ReportsDataQueryDto) { return this.dataService.cancellations(query); }

  @Get('superadmin/reports/health')
  @Version(VERSION_NEUTRAL)
  async health(@Query() query: ReportsDataQueryDto) { return this.dataService.health(query); }

  @Get('api/superadmin/reports/comparison')
  @Version(VERSION_NEUTRAL)
  async comparison(@Query() query: Record<string, string>) { return await this.comparisonService.findReportsComparison(query); }
}
