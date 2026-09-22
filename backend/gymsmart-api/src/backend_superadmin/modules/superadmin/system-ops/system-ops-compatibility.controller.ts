// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for System Ops.
// FLOW: /api/superadmin/system-ops/summary -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/system-ops/summary.

import { Controller, Get, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

import { SystemOpsSummaryService } from '@/backend_superadmin/modules/superadmin/system-ops/services/system-ops-summary.service';

@ApiTags('SystemOps-Compatibility')
@Controller({ version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SystemOpsCompatibilityController {
  constructor(private readonly summaryService: SystemOpsSummaryService) {}

  @Get('api/superadmin/system-ops/summary')
  @Version(VERSION_NEUTRAL)
  async findSystemOpsSummary() { return this.summaryService.findSystemOpsSummary(); }
}
