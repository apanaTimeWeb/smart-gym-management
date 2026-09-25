// RESPONSIBILITY: Exposes read-only Admin campaigns HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminCampaignsQueryController -> AdminCampaignsQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminCampaignsQueryDto } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_dtos/admin-campaigns-query.dto'
import { AdminCampaignsAudienceDto, AdminCampaignsTemplateDto, AdminCampaignsRecipientsDataDto } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_dtos/admin-campaigns-response.dto'
import { AdminCampaignsQueryService } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_services/admin-campaigns-query.service'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@ApiTags('Admin / campaigns')
@Controller('admin/campaigns')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminCampaignsQueryController boundary for the admin_campaigns backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCampaignsQueryController {
  constructor(private readonly service: AdminCampaignsQueryService) {}

  // SLA: STANDARD
  @Get('audiences')
  @ApiOperation({ summary: 'Execute fetchAudiences' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminCampaignsAudienceDto] })
  async findAllAudiences(@Query() query: AdminCampaignsQueryDto): Promise<AdminCorePaginatedResult<AdminCampaignsAudienceDto>> {
    return this.service.findAllAudiences(query);
  }

  // SLA: STANDARD
  @Get('templates')
  @ApiOperation({ summary: 'Execute fetchTemplates' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminCampaignsTemplateDto] })
  async findAllTemplates(@Query() query: AdminCampaignsQueryDto): Promise<AdminCorePaginatedResult<AdminCampaignsTemplateDto>> {
    return this.service.findAllTemplates(query);
  }

  // SLA: STANDARD
  @Get('recipients')
  @ApiOperation({ summary: 'Execute fetchRecipients' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCampaignsRecipientsDataDto })
  async findAllRecipients(@Query() query: AdminCampaignsQueryDto): Promise<AdminCampaignsRecipientsDataDto> {
    return this.service.findAllRecipients(query);
  }

}
