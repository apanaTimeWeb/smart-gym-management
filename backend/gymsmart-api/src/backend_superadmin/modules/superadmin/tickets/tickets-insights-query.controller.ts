// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TicketsInsightsService } from '@/backend_superadmin/modules/backend_superadmin/tickets/services/tickets-insights.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('ticketsinsightsquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TicketsInsightsQueryController {
  constructor(private readonly insightsService: TicketsInsightsService) {}


  /** Executes GET /superadmin/tickets/service-insights. */
  @ApiOperation({ summary: 'GET /superadmin/tickets/service-insights' })
  // SLA: FAST
  @Get('superadmin/tickets/service-insights')
  @Get('api/superadmin/tickets/service-insights')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async insights(@Query() query: SuperadminQueryDto): Promise<unknown> { void query; return await this.insightsService.findTicketsServiceInsights(); }

}