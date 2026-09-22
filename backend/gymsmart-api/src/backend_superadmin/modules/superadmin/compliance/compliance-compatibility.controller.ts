// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Compliance.
// FLOW: /superadmin/compliance -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/compliance.

import { Controller, Get, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

import { ComplianceMainService } from '@/backend_superadmin/modules/superadmin/compliance/services/compliance-main.service';

@ApiTags('Compliance-Compatibility')
@Controller({ version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ComplianceCompatibilityController {
  constructor(private readonly mainService: ComplianceMainService) {}

  @Get('superadmin/compliance')
  @Version(VERSION_NEUTRAL)
  async main(@Query() query: Record<string, string>) { return await this.mainService.findComplianceData(); }
}
