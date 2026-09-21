// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the plans feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { PlansBusinessControlsResponseDto } from '@/modules/superadmin/saas-billing/plans/plans-business-controls-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { PlansBusinessControlsService } from '@/modules/superadmin/saas-billing/plans/services/plans-business-controls.service';

@ApiTags('plans-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class PlansSpecialController {
  constructor(private readonly businessControlsService: PlansBusinessControlsService) {}

  /** Executes GET /superadmin/saas-billing/plans/business-controls. */
  @ApiOperation({ summary: 'GET /superadmin/saas-billing/plans/business-controls' })
  @Get('superadmin/saas-billing/plans/business-controls')
  async businessControls(@Query() query: Record<string, string>): Promise<unknown> { return await this.businessControlsService.findPlansBusinessControls({ query }); }

}
