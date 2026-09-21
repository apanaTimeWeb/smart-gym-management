// RESPONSIBILITY: Preserves the exact `/api/admin/campaigns/*` paths published by the current Admin frontend.
// FLOW: Legacy Campaign URL → AdminCampaignsLegacyQueryController → AdminCampaignsQueryService.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminCampaignsQueryService } from '@/modules/admin/campaigns/services/admin-campaigns-query.service';
import { AdminCampaignsQueryDto } from '@/modules/admin/campaigns/dtos/admin-campaigns-query.dto';
import { AdminCampaignsResponseDto } from '@/modules/admin/campaigns/dtos/admin-campaigns-response.dto';

@ApiTags('Admin / campaigns / compatibility')
@Controller('api/admin/campaigns')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminCampaignsLegacyQueryController {
  constructor(private readonly service: AdminCampaignsQueryService) {}

  // SLA: STANDARD
  @Get('audiences')
  @ApiOperation({ summary: 'Campaign audiences compatibility endpoint' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCampaignsResponseDto, isArray: true })
  fetchAudiences(@Query() query: AdminCampaignsQueryDto): Promise<unknown> {
    return this.service.fetchAudiences(query);
  }

  // SLA: STANDARD
  @Get('templates')
  @ApiOperation({ summary: 'Campaign templates compatibility endpoint' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCampaignsResponseDto, isArray: true })
  fetchTemplates(@Query() query: AdminCampaignsQueryDto): Promise<unknown> {
    return this.service.fetchTemplates(query);
  }

  // SLA: STANDARD
  @Get('recipients')
  @ApiOperation({ summary: 'Campaign recipients compatibility endpoint' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCampaignsResponseDto })
  fetchRecipients(@Query() query: AdminCampaignsQueryDto): Promise<unknown> {
    return this.service.fetchRecipients(query);
  }
}
