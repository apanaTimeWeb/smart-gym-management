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

@ApiTags('reports')
@Controller('/superadmin/reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ReportsQueryController {
  constructor(private readonly listService: ReportsListService, private readonly findService: ReportsFindService) {}
  /** Returns one reports record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findReportsById(id); }
}
