// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the settings feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { SettingsGovernanceResponseDto } from '@/backend_superadmin/modules/superadmin/settings/settings-governance-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { SettingsGovernanceService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-governance.service';

@ApiTags('settings-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SettingsSpecialController {
  constructor(private readonly governanceService: SettingsGovernanceService) {}

  /** Executes GET /superadmin/settings/governance. */
  @ApiOperation({ summary: 'GET /superadmin/settings/governance' })
  @Get('superadmin/settings/governance')
  async governance(@Query() query: Record<string, string>): Promise<unknown> { return await this.governanceService.findSettingsGovernance(); }

}
