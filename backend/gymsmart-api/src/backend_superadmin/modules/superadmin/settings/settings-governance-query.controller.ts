// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SettingsGovernanceService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-governance.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('settingsgovernancequery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SettingsGovernanceQueryController {
  constructor(private readonly governanceService: SettingsGovernanceService) {}


  /** Executes GET /superadmin/settings/governance. */
  @ApiOperation({ summary: 'GET /superadmin/settings/governance' })
  // SLA: FAST
  @Get('superadmin/settings/governance')
  @Get('api/superadmin/settings/governance')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async governance(@Query() query: SuperadminQueryDto): Promise<unknown> { void query; return await this.governanceService.findSettingsGovernance(); }

}