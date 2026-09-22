// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for White Labeling.
// FLOW: /api/superadmin/white-labeling -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/white-labeling.

import { Body, Controller, Get, Param, Patch, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';

import { WhiteLabelingDomainsService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-domains.service';
import { WhiteLabelingStatusService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-status.service';

@ApiTags('WhiteLabeling-Compatibility')
@Controller({ path: 'api/superadmin/white-labeling', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class WhiteLabelingCompatibilityController {
  constructor(
    private readonly domainsService: WhiteLabelingDomainsService,
    private readonly statusService: WhiteLabelingStatusService
  ) {}

  @Get('domains')
  @Version(VERSION_NEUTRAL)
  async domains(@Query() query: Record<string, string>) { return await this.domainsService.findWhiteLabelingDomains({ query }); }

  @Patch('domains/:id/status')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async status(@Param('id') id: string, @Body() body: Record<string, unknown>) { return await this.statusService.changeWhiteLabelingStatus(id, String(body.status ?? '')); }
}
