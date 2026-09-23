// RESPONSIBILITY: Owns HTTP transport for the reports-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminReportsQueryDto } from '@/backend_superadmin/superadmin_modules/reports/dtos/superadmin-reports-query.dto';
import { SuperadminReportsListService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-list.service';
import { SuperadminReportsFindService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-find.service';
import { SuperadminReportsDataService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-data.service';
import { SuperadminReportsDataQueryDto } from '@/backend_superadmin/superadmin_modules/reports/dtos/superadmin-reports-data-query.dto';

@ApiTags('reports')
@Controller('/superadmin/reports')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminReportsQueryController {
  constructor(private readonly listService: SuperadminReportsListService, private readonly findService: SuperadminReportsFindService, private readonly dataService: SuperadminReportsDataService) {}
  /** Returns revenue report rows. */
  // SLA: FAST
  @Get('revenue')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async revenue(@Query() query: SuperadminReportsDataQueryDto): Promise<SuperadminReportsDataService['revenue'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.revenue(query); }

  /** Returns cancellation report rows. */
  // SLA: FAST
  @Get('cancellations')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async cancellations(@Query() query: SuperadminReportsDataQueryDto): Promise<SuperadminReportsDataService['cancellations'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.cancellations(query); }

  /** Returns tenant health score report rows. */
  // SLA: FAST
  @Get('health')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async health(@Query() query: SuperadminReportsDataQueryDto): Promise<SuperadminReportsDataService['health'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.health(query); }

  /** Returns one reports record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findReportsById(id); }
}