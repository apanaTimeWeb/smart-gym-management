// RESPONSIBILITY: Owns GET endpoints for the reports feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { ReportsQueryDto } from '@/modules/superadmin/reports/dtos/reports-query.dto';
import { ReportsListService } from '@/modules/superadmin/reports/services/reports-list.service';
import { ReportsFindService } from '@/modules/superadmin/reports/services/reports-find.service';
import { ReportsDataService } from '@/modules/superadmin/reports/services/reports-data.service';
import { ReportsDataQueryDto } from '@/modules/superadmin/reports/dtos/reports-data-query.dto';

@ApiTags('reports')
@Controller('/superadmin/reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ReportsQueryController {
  constructor(private readonly listService: ReportsListService, private readonly findService: ReportsFindService, private readonly dataService: ReportsDataService) {}
  /** Returns revenue report rows. */
  @Get('revenue')
  async revenue(@Query() query: ReportsDataQueryDto): Promise<ReportsDataService['revenue'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.revenue(query); }

  /** Returns cancellation report rows. */
  @Get('cancellations')
  async cancellations(@Query() query: ReportsDataQueryDto): Promise<ReportsDataService['cancellations'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.cancellations(query); }

  /** Returns tenant health score report rows. */
  @Get('health')
  async health(@Query() query: ReportsDataQueryDto): Promise<ReportsDataService['health'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.health(query); }

  /** Returns one reports record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findReportsById(id); }
}
