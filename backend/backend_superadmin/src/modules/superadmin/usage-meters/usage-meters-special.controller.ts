// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the usage-meters feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { UsageMetersMainService } from '@/modules/superadmin/usage-meters/services/usage-meters-main.service';

@ApiTags('usage-meters-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class UsageMetersSpecialController {
  constructor(private readonly mainService: UsageMetersMainService) {}

  /** Executes GET /superadmin/usage-meters. */
  @ApiOperation({ summary: 'GET /superadmin/usage-meters' })
  @Get('superadmin/usage-meters')
  async main(@Query() query: Record<string, string>): Promise<unknown> { return await this.mainService.findUsageMetersData(); }

}
