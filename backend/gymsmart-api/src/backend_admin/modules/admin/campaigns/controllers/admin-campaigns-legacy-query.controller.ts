// RESPONSIBILITY: Preserves the exact `/api/admin/campaigns/*` paths published by the current Admin frontend.
// FLOW: Legacy Campaign URL → AdminCampaignsLegacyQueryController → AdminCampaignsQueryService.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminCampaignsQueryService } from '@/backend_admin/modules/admin/campaigns/services/admin-campaigns-query.service';
import { AdminCampaignsQueryDto } from '@/backend_admin/modules/admin/campaigns/dtos/admin-campaigns-query.dto';
import { AdminCampaignsAudienceDto, AdminCampaignsTemplateDto, AdminCampaignsRecipientsDataDto } from '@/backend_admin/modules/admin/campaigns/dtos/admin-campaigns-response.dto';

@ApiTags('Admin / campaigns / compatibility')
@Controller('api/admin/campaigns')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminCampaignsLegacyQueryController {
  constructor(private readonly service: AdminCampaignsQueryService) {}

  // SLA: STANDARD
  @Get('audiences')
  @ApiOperation({ summary: 'Campaign audiences compatibility endpoint' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminCampaignsAudienceDto] })
  fetchAudiences(@Query() query: AdminCampaignsQueryDto): Promise<AdminCampaignsAudienceDto[]> {
    return this.service.fetchAudiences(query);
  }

  // SLA: STANDARD
  @Get('templates')
  @ApiOperation({ summary: 'Campaign templates compatibility endpoint' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminCampaignsTemplateDto] })
  fetchTemplates(@Query() query: AdminCampaignsQueryDto): Promise<AdminCampaignsTemplateDto[]> {
    return this.service.fetchTemplates(query);
  }

  // SLA: STANDARD
  @Get('recipients')
  @ApiOperation({ summary: 'Campaign recipients compatibility endpoint' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCampaignsRecipientsDataDto })
  fetchRecipients(@Query() query: AdminCampaignsQueryDto): Promise<AdminCampaignsRecipientsDataDto> {
    return this.service.fetchRecipients(query);
  }
}
