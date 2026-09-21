// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the usage-meters feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { UsageMetersMainService } from '@/backend_superadmin/modules/superadmin/usage-meters/services/usage-meters-main.service';

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
