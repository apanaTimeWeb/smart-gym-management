// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminSettingsGovernanceService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-governance.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('settingsgovernancequery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSettingsGovernanceQueryController {
  constructor(private readonly governanceService: SuperadminSettingsGovernanceService) {}


  /** Executes GET /superadmin/settings/governance. */
  @ApiOperation({ summary: 'GET /superadmin/settings/governance' })
  // SLA: FAST
  @Get('superadmin/settings/governance')
  @Get('api/superadmin/settings/governance')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async governance(@Query() query: SuperadminQueryDto): Promise<unknown> { void query; return await this.governanceService.findSettingsGovernance(); }

}