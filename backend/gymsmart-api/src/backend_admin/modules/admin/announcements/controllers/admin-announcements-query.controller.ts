// RESPONSIBILITY: Exposes read-only Admin announcements HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminAnnouncementsQueryController -> AdminAnnouncementsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminAnnouncementsQueryService } from '@/backend_admin/modules/admin/announcements/services/admin-announcements-query.service';
import { AdminAnnouncementsQueryDto } from '@/backend_admin/modules/admin/announcements/dtos/admin-announcements-query.dto';
import { AdminAnnouncementDto, AdminAnnouncementKPIDataDto } from '@/backend_admin/modules/admin/announcements/dtos/admin-announcements-response.dto';

@ApiTags('Admin / announcements')
@Controller('admin/announcements')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminAnnouncementsQueryController {
  constructor(private readonly service: AdminAnnouncementsQueryService) {}

  // SLA: STANDARD
  @Get('fetchAnnouncements')
  @ApiOperation({ summary: 'Execute fetchAnnouncements' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminAnnouncementDto] })
  async fetchAnnouncements(@Query() query: AdminAnnouncementsQueryDto): Promise<AdminAnnouncementDto[]> {
    return this.service.fetchAnnouncements(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementKPIDataDto })
  async fetchKPIs(@Query() query: AdminAnnouncementsQueryDto): Promise<AdminAnnouncementKPIDataDto> {
    return this.service.fetchKPIs(query);
  }

}
