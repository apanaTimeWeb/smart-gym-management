// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminTicketsInsightsService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-insights.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('ticketsinsightsquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminTicketsInsightsQueryController {
  constructor(private readonly insightsService: SuperadminTicketsInsightsService) {}


  /** Executes GET /superadmin/tickets/service-insights. */
  @ApiOperation({ summary: 'GET /superadmin/tickets/service-insights' })
  // SLA: FAST
  @Get('superadmin/tickets/service-insights')
  @Get('api/superadmin/tickets/service-insights')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async insights(@Query() query: SuperadminQueryDto): Promise<unknown> { void query; return await this.insightsService.findTicketsServiceInsights(); }

}