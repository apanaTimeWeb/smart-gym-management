// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminUsageMetersMainService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-main.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('usagemetersanalyticsquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminUsageMetersAnalyticsQueryController {
  constructor(private readonly mainService: SuperadminUsageMetersMainService) {}


  /** Executes GET /superadmin/usage-meters. */
  @ApiOperation({ summary: 'GET /superadmin/usage-meters' })
  // SLA: FAST
  @Get('superadmin/usage-meters')
  @Get('api/superadmin/usage-meters')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async main(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.mainService.findUsageMetersData({ query }); }

}