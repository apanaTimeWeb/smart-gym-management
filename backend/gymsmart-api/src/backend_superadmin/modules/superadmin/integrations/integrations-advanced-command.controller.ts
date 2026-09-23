// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IntegrationsGenerateKeyDto } from '@/backend_superadmin/modules/superadmin/integrations/dtos/integrations-generate-key.dto';
import { IntegrationsGenerateKeyService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-generate-key.service';
import { SuperadminIntegrationsResponseDataDto, SuperadminGenerateApiKeyResultDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response-data.dto';

@ApiTags('integrationsadvancedcommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class IntegrationsAdvancedCommandController {
  constructor(private readonly generateKeyService: IntegrationsGenerateKeyService) {}


  /** Executes POST /superadmin/integrations/keys. */
  @ApiOperation({ summary: 'POST /superadmin/integrations/keys' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/integrations/keys')
  @Post('api/superadmin/integrations/generate-key')
  @ApiResponse({ type: SuperadminGenerateApiKeyResultDto })
  async generateKey(@Body() body: IntegrationsGenerateKeyDto): Promise<SuperadminGenerateApiKeyResultDto> { return this.generateKeyService.generateIntegrationKey(body); }

}