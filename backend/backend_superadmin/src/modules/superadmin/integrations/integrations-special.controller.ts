// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the integrations feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { IntegrationsMainService } from '@/modules/superadmin/integrations/services/integrations-main.service';
import { IntegrationsGenerateKeyService } from '@/modules/superadmin/integrations/services/integrations-generate-key.service';

@ApiTags('integrations-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class IntegrationsSpecialController {
  constructor(private readonly mainService: IntegrationsMainService, private readonly generateKeyService: IntegrationsGenerateKeyService) {}

  /** Executes GET /superadmin/integrations. */
  @ApiOperation({ summary: 'GET /superadmin/integrations' })
  @Get('superadmin/integrations')
  async main(@Query() query: Record<string, string>): Promise<unknown> { return await this.mainService.findIntegrationsData(); }

  /** Executes POST /superadmin/integrations/keys. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/integrations/keys' })
  @Post('superadmin/integrations/keys')
  async generateKey(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.generateKeyService.generateIntegrationKey({ body }); }

}
