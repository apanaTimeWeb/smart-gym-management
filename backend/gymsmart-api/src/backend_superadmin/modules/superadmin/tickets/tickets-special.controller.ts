// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the tickets feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { TicketsServiceInsightsResponseDto } from '@/backend_superadmin/modules/superadmin/tickets/tickets-service-insights-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { TicketsInsightsService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-insights.service';

@ApiTags('tickets-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TicketsSpecialController {
  constructor(private readonly insightsService: TicketsInsightsService) {}

  /** Executes GET /superadmin/tickets/service-insights. */
  @ApiOperation({ summary: 'GET /superadmin/tickets/service-insights' })
  @Get('superadmin/tickets/service-insights')
  async insights(@Query() query: Record<string, string>): Promise<unknown> { return await this.insightsService.findTicketsServiceInsights(); }

}
