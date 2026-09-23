// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IntegrationsMainService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-main.service';
import { SuperadminIntegrationsResponseDataDto, SuperadminGenerateApiKeyResultDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response-data.dto';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('integrationsadvancedquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class IntegrationsAdvancedQueryController {
  constructor(private readonly mainService: IntegrationsMainService) {}


  /** Executes GET /superadmin/integrations. */
  @ApiOperation({ summary: 'GET /superadmin/integrations' })
  // SLA: FAST
  @Get('superadmin/integrations')
  @ApiResponse({ type: SuperadminIntegrationsResponseDataDto })
  async main(@Query() query: SuperadminQueryDto): Promise<SuperadminIntegrationsResponseDataDto> { return (await this.mainService.findIntegrationsData({ query })) as unknown as SuperadminIntegrationsResponseDataDto; }

}