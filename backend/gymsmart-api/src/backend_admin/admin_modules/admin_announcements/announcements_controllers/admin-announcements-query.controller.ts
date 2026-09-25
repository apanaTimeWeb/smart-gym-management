// RESPONSIBILITY: Exposes read-only Admin announcements HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminAnnouncementsQueryController -> AdminAnnouncementsQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminAnnouncementsQueryDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-query.dto'
import { AdminAnnouncementDto, AdminAnnouncementKPIDataDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-response.dto'
import { AdminAnnouncementsQueryService } from '@/backend_admin/admin_modules/admin_announcements/announcements_services/admin-announcements-query.service'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@ApiTags('Admin / announcements')
@Controller('admin/announcements')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminAnnouncementsQueryController boundary for the admin_announcements backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAnnouncementsQueryController {
  constructor(private readonly service: AdminAnnouncementsQueryService) {}

  // SLA: STANDARD
  @Get('fetchAnnouncements')
  @ApiOperation({ summary: 'Execute fetchAnnouncements' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminAnnouncementDto] })
  async findAllAnnouncements(@Query() query: AdminAnnouncementsQueryDto): Promise<AdminCorePaginatedResult<AdminAnnouncementDto>> {
    return this.service.findAllAnnouncements(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementKPIDataDto })
  async findAnnouncementKpis(@Query() query: AdminAnnouncementsQueryDto): Promise<AdminAnnouncementKPIDataDto> {
    return this.service.findAnnouncementKpis(query);
  }

}
