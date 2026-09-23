// RESPONSIBILITY: Owns HTTP transport for the analytics-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminAnalyticsQueryDto } from '@/backend_superadmin/superadmin_modules/analytics/dtos/superadmin-analytics-query.dto';
import { SuperadminAnalyticsListService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-list.service';
import { SuperadminAnalyticsFindService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-find.service';
import { SuperadminAnalyticsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/responses/superadmin-analytics-response.dto';

@ApiTags('analytics')
@Controller('/superadmin/analytics')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminAnalyticsQueryController {
  constructor(private readonly listService: SuperadminAnalyticsListService, private readonly findService: SuperadminAnalyticsFindService) {}
  /** Returns one analytics record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminAnalyticsResponseDto })
  async findOne(@Param('id') id: string): Promise<SuperadminAnalyticsResponseDto> { return await this.findService.findAnalyticsById(id); }
}