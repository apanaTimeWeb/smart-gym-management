// RESPONSIBILITY: Owns HTTP transport for the reports-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ReportsQueryDto } from '@/backend_superadmin/modules/backend_superadmin/reports/dtos/reports-query.dto';
import { ReportsListService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-list.service';
import { ReportsFindService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-find.service';
import { ReportsDataService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-data.service';
import { ReportsDataQueryDto } from '@/backend_superadmin/modules/backend_superadmin/reports/dtos/reports-data-query.dto';

@ApiTags('reports')
@Controller('/superadmin/reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ReportsQueryController {
  constructor(private readonly listService: ReportsListService, private readonly findService: ReportsFindService, private readonly dataService: ReportsDataService) {}
  /** Returns revenue report rows. */
  // SLA: FAST
  @Get('revenue')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async revenue(@Query() query: ReportsDataQueryDto): Promise<ReportsDataService['revenue'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.revenue(query); }

  /** Returns cancellation report rows. */
  // SLA: FAST
  @Get('cancellations')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async cancellations(@Query() query: ReportsDataQueryDto): Promise<ReportsDataService['cancellations'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.cancellations(query); }

  /** Returns tenant health score report rows. */
  // SLA: FAST
  @Get('health')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async health(@Query() query: ReportsDataQueryDto): Promise<ReportsDataService['health'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.health(query); }

  /** Returns one reports record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findReportsById(id); }
}