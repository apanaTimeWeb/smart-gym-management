// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Usage Meters.
// FLOW: /superadmin/usage-meters -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/usage-meters.

import { Controller, Get, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

import { UsageMetersListService } from '@/backend_superadmin/modules/superadmin/usage-meters/services/usage-meters-list.service';
import { UsageMetersQueryDto } from '@/backend_superadmin/modules/superadmin/usage-meters/dtos/usage-meters-query.dto';

@ApiTags('UsageMeters-Compatibility')
@Controller({ path: 'superadmin/usage-meters', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class UsageMetersCompatibilityController {
  constructor(private readonly listService: UsageMetersListService) {}

  @Get()
  @Version(VERSION_NEUTRAL)
  async fetchUsageMeters(@Query() query: UsageMetersQueryDto) { return await this.listService.findUsageMetersPage(query); }
}
