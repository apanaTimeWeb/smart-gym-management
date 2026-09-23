// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminIntegrationsGenerateKeyDto } from '@/backend_superadmin/superadmin_modules/integrations/dtos/superadmin-integrations-generate-key.dto';
import { SuperadminIntegrationsGenerateKeyService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-generate-key.service';
import { SuperadminIntegrationsResponseDataDto, SuperadminGenerateApiKeyResultDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response-data.dto';

@ApiTags('integrationsadvancedcommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminIntegrationsAdvancedCommandController {
  constructor(private readonly generateKeyService: SuperadminIntegrationsGenerateKeyService) {}


  /** Executes POST /superadmin/integrations/keys. */
  @ApiOperation({ summary: 'POST /superadmin/integrations/keys' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/integrations/keys')
  @Post('api/superadmin/integrations/generate-key')
  @ApiResponse({ type: SuperadminGenerateApiKeyResultDto })
  async generateKey(@Body() body: SuperadminIntegrationsGenerateKeyDto): Promise<SuperadminGenerateApiKeyResultDto> { return this.generateKeyService.generateIntegrationKey(body); }

}