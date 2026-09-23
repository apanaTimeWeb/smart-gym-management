// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminGymsBusinessControlsService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-business-controls.service';
import { SuperadminGymsBusinessControlsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-business-controls-response.dto';
import { SuperadminGymsDetailBusinessOverviewResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-detail-business-overview-response.dto';
import { SuperadminGymsDetailBusinessOverviewService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-detail-business-overview.service';
import { SuperadminGymsOperationalService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-operational.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('gymsadministrationquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsAdministrationQueryController {
  constructor(private readonly businessControlsService: SuperadminGymsBusinessControlsService, private readonly detailBusinessOverviewService: SuperadminGymsDetailBusinessOverviewService, private readonly operationalService: SuperadminGymsOperationalService) {}


  /** Executes GET /superadmin/gyms/business-controls. */
  @ApiOperation({ summary: 'GET /superadmin/gyms/business-controls' })
  // SLA: FAST
  @Get('superadmin/gyms/business-controls')
  @Get('api/superadmin/gyms/business-controls')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async businessControls(@Query() query: SuperadminQueryDto): Promise<SuperadminGymsBusinessControlsResponseDto> { return await this.businessControlsService.findGymsBusinessControls({ query }) as unknown as SuperadminGymsBusinessControlsResponseDto; }



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
  async detailBusinessOverview(@Query() query: SuperadminQueryDto): Promise<SuperadminGymsDetailBusinessOverviewResponseDto> { return await this.detailBusinessOverviewService.findGymsDetailBusinessOverview({ query }) as unknown as SuperadminGymsDetailBusinessOverviewResponseDto; }

}