// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Integrations.
// FLOW: /superadmin/integrations -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/integrations.

import { Controller, Get, Post, Body, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';

import { IntegrationsMainService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-main.service';
import { IntegrationsGenerateKeyService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-generate-key.service';

@ApiTags('Integrations-Compatibility')
@Controller({ version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class IntegrationsCompatibilityController {
  constructor(
    private readonly mainService: IntegrationsMainService,
    private readonly generateKeyService: IntegrationsGenerateKeyService
  ) {}

  @Get('superadmin/integrations')
  @Version(VERSION_NEUTRAL)
  async main(@Query() query: Record<string, string>) { return await this.mainService.findIntegrationsData(); }

  @Post('api/superadmin/integrations/generate-key')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async generateKey(@Body() body: Record<string, unknown>) { return await this.generateKeyService.generateIntegrationKey({ body }); }
}
