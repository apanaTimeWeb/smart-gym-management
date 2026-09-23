// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GymsBusinessControlsService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-business-controls.service';
import { GymsBusinessControlsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/gyms-business-controls-response.dto';
import { GymsDetailBusinessOverviewResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/gyms-detail-business-overview-response.dto';
import { GymsDetailBusinessOverviewService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-detail-business-overview.service';
import { GymsOperationalService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-operational.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('gymsadministrationquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GymsAdministrationQueryController {
  constructor(private readonly businessControlsService: GymsBusinessControlsService, private readonly detailBusinessOverviewService: GymsDetailBusinessOverviewService, private readonly operationalService: GymsOperationalService) {}


  /** Executes GET /superadmin/gyms/business-controls. */
  @ApiOperation({ summary: 'GET /superadmin/gyms/business-controls' })
  // SLA: FAST
  @Get('superadmin/gyms/business-controls')
  @Get('api/superadmin/gyms/business-controls')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async businessControls(@Query() query: SuperadminQueryDto): Promise<GymsBusinessControlsResponseDto> { return await this.businessControlsService.findGymsBusinessControls({ query }) as unknown as GymsBusinessControlsResponseDto; }



  /** Returns live Gym aggregate statistics. */
  @ApiOperation({ summary: 'GET /superadmin/gyms/stats' })
  // SLA: FAST
  @Get('superadmin/gyms/stats')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async stats(): Promise<{ totalActive: number; totalSuspended: number; mrrContribution: number }> { return this.operationalService.stats(); }


  /** Executes GET /superadmin/gym-detail/business-overview. */
  @ApiOperation({ summary: 'GET /superadmin/gym-detail/business-overview' })
  // SLA: FAST
  @Get('superadmin/gym-detail/business-overview')
  @Get('api/superadmin/gym-detail/business-overview')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async detailBusinessOverview(@Query() query: SuperadminQueryDto): Promise<GymsDetailBusinessOverviewResponseDto> { return await this.detailBusinessOverviewService.findGymsDetailBusinessOverview({ query }) as unknown as GymsDetailBusinessOverviewResponseDto; }

}