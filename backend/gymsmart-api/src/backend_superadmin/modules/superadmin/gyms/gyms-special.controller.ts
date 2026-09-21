// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the gyms feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { GymsBusinessControlsService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-business-controls.service';
import { GymsBusinessControlsBulkActionDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-business-controls-bulk-action.dto';
import { GymsBusinessControlsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/gyms-business-controls-response.dto';
import { GymDetailBusinessOverviewResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/gym-detail-business-overview-response.dto';
import { GymsBulkActionService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-bulk-action.service';
import { GymsDetailBusinessOverviewService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-detail-business-overview.service';
import { GymsOperationalService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-operational.service';
import { GymsOwnerEmailDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-owner-email.dto';

@ApiTags('gyms-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GymsSpecialController {
  constructor(private readonly businessControlsService: GymsBusinessControlsService, private readonly bulkActionService: GymsBulkActionService, private readonly detailBusinessOverviewService: GymsDetailBusinessOverviewService, private readonly operationalService: GymsOperationalService) {}

  /** Executes GET /superadmin/gyms/business-controls. */
  @ApiOperation({ summary: 'GET /superadmin/gyms/business-controls' })
  @Get('superadmin/gyms/business-controls')
  async businessControls(@Query() query: Record<string, string>): Promise<GymsBusinessControlsResponseDto> { return await this.businessControlsService.findGymsBusinessControls({ query }) as GymsBusinessControlsResponseDto; }

  /** Executes POST /superadmin/gyms/business-controls. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/gyms/business-controls' })
  @Post('superadmin/gyms/business-controls')
  async bulkAction(@Body() body: GymsBusinessControlsBulkActionDto): Promise<GymsBusinessControlsResponseDto> { return await this.bulkActionService.applyGymsBulkAction(body) as GymsBusinessControlsResponseDto; }


  /** Returns live Gym aggregate statistics. */
  @ApiOperation({ summary: 'GET /superadmin/gyms/stats' })
  @Get('superadmin/gyms/stats')
  async stats(): Promise<{ totalActive: number; totalSuspended: number; mrrContribution: number }> { return this.operationalService.stats(); }

  /** Sends an owner-message command after verifying the Gym exists. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/gyms/:id/email' })
  @Post('superadmin/gyms/:id/email')
  async emailOwner(@Param('id') id: string, @Body() body: GymsOwnerEmailDto): Promise<null> { return this.operationalService.emailOwner(id, body.subject, body.message); }

  /** Issues a short-lived, signed impersonation artifact for the tenant boundary. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/gyms/:id/impersonate' })
  @Post('superadmin/gyms/:id/impersonate')
  async impersonate(@Param('id') id: string): Promise<{ token: string }> { return this.operationalService.impersonate(id); }

  /** Executes GET /superadmin/gym-detail/business-overview. */
  @ApiOperation({ summary: 'GET /superadmin/gym-detail/business-overview' })
  @Get('superadmin/gym-detail/business-overview')
  async detailBusinessOverview(@Query() query: Record<string, string>): Promise<GymDetailBusinessOverviewResponseDto> { return await this.detailBusinessOverviewService.findGymsDetailBusinessOverview({ query }) as GymDetailBusinessOverviewResponseDto; }

}
