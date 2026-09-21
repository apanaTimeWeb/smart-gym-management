// RESPONSIBILITY: Owns GET endpoints for the analytics feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { AnalyticsQueryDto } from '@/backend_superadmin/modules/superadmin/analytics/dtos/analytics-query.dto';
import { AnalyticsListService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-list.service';
import { AnalyticsFindService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-find.service';
import { AnalyticsResponseDto } from '@/backend_superadmin/modules/superadmin/analytics/responses/analytics-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('analytics')
@Controller('/superadmin/analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AnalyticsQueryController {
  constructor(private readonly listService: AnalyticsListService, private readonly findService: AnalyticsFindService) {}
  /** Returns one analytics record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: AnalyticsResponseDto })
  async findOne(@Param('id') id: string): Promise<AnalyticsResponseDto> { return await this.findService.findAnalyticsById(id); }
}
