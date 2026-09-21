// RESPONSIBILITY: Exposes read-only Admin campaigns HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminCampaignsQueryController -> AdminCampaignsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminCampaignsQueryService } from '@/modules/admin/campaigns/services/admin-campaigns-query.service';
import { AdminCampaignsQueryDto } from '@/modules/admin/campaigns/dtos/admin-campaigns-query.dto';
import { AdminCampaignsAudienceDto, AdminCampaignsTemplateDto, AdminCampaignsRecipientsDataDto } from '@/modules/admin/campaigns/dtos/admin-campaigns-response.dto';

@ApiTags('Admin / campaigns')
@Controller('admin/campaigns')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminCampaignsQueryController {
  constructor(private readonly service: AdminCampaignsQueryService) {}

  // SLA: STANDARD
  @Get('audiences')
  @ApiOperation({ summary: 'Execute fetchAudiences' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminCampaignsAudienceDto] })
  async fetchAudiences(@Query() query: AdminCampaignsQueryDto): Promise<AdminCampaignsAudienceDto[]> {
    return this.service.fetchAudiences(query);
  }

  // SLA: STANDARD
  @Get('templates')
  @ApiOperation({ summary: 'Execute fetchTemplates' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminCampaignsTemplateDto] })
  async fetchTemplates(@Query() query: AdminCampaignsQueryDto): Promise<AdminCampaignsTemplateDto[]> {
    return this.service.fetchTemplates(query);
  }

  // SLA: STANDARD
  @Get('recipients')
  @ApiOperation({ summary: 'Execute fetchRecipients' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCampaignsRecipientsDataDto })
  async fetchRecipients(@Query() query: AdminCampaignsQueryDto): Promise<AdminCampaignsRecipientsDataDto> {
    return this.service.fetchRecipients(query);
  }

}
