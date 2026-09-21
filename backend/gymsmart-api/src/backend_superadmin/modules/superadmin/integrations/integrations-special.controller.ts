// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the integrations feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { IntegrationsMainService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-main.service';
import { IntegrationsGenerateKeyService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-generate-key.service';
import { SuperadminIntegrationsResponseDataDto, SuperadminGenerateApiKeyResultDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response-data.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('integrations-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class IntegrationsSpecialController {
  constructor(private readonly mainService: IntegrationsMainService, private readonly generateKeyService: IntegrationsGenerateKeyService) {}

  /** Executes GET /superadmin/integrations. */
  @ApiOperation({ summary: 'GET /superadmin/integrations' })
  @Get('superadmin/integrations')
  @ApiResponse({ type: SuperadminIntegrationsResponseDataDto })
  async main(@Query() query: Record<string, string>): Promise<SuperadminIntegrationsResponseDataDto> { return (await this.mainService.findIntegrationsData()) as unknown as SuperadminIntegrationsResponseDataDto; }

  /** Executes POST /superadmin/integrations/keys. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/integrations/keys' })
  @Post('superadmin/integrations/keys')
  @ApiResponse({ type: SuperadminGenerateApiKeyResultDto })
  async generateKey(@Body() body: Record<string, unknown>): Promise<SuperadminGenerateApiKeyResultDto> { return (await this.generateKeyService.generateIntegrationKey({ body })) as unknown as SuperadminGenerateApiKeyResultDto; }

}
