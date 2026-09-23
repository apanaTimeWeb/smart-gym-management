// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminIntegrationsMainService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-main.service';
import { SuperadminIntegrationsResponseDataDto, SuperadminGenerateApiKeyResultDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response-data.dto';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('integrationsadvancedquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminIntegrationsAdvancedQueryController {
  constructor(private readonly mainService: SuperadminIntegrationsMainService) {}


  /** Executes GET /superadmin/integrations. */
  @ApiOperation({ summary: 'GET /superadmin/integrations' })
  // SLA: FAST
  @Get('superadmin/integrations')
  @ApiResponse({ type: SuperadminIntegrationsResponseDataDto })
  async main(@Query() query: SuperadminQueryDto): Promise<SuperadminIntegrationsResponseDataDto> { return (await this.mainService.findIntegrationsData({ query })) as unknown as SuperadminIntegrationsResponseDataDto; }

}