// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsageMetersMainService } from '@/backend_superadmin/modules/backend_superadmin/usage-meters/services/usage-meters-main.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('usagemetersanalyticsquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class UsageMetersAnalyticsQueryController {
  constructor(private readonly mainService: UsageMetersMainService) {}


  /** Executes GET /superadmin/usage-meters. */
  @ApiOperation({ summary: 'GET /superadmin/usage-meters' })
  // SLA: FAST
  @Get('superadmin/usage-meters')
  @Get('api/superadmin/usage-meters')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async main(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.mainService.findUsageMetersData({ query }); }

}