// RESPONSIBILITY: Exposes mutation endpoints for Admin announcements; contains HTTP concerns only.
// FLOW: HTTP mutation â†’ AdminAnnouncementsCommandController â†’ AdminAnnouncementsCommandService.
import { BadRequestException, Body, Controller, Delete, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminAnnouncementsIdDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-id.dto.js';
import { AdminAnnouncementsMutationDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-mutation.dto.js';
import { AdminAnnouncementDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-response.dto.js';
import { AdminAnnouncementsCommandService } from '@/backend_admin/admin_modules/admin_announcements/announcements_services/admin-announcements-command.service.js';

@ApiTags('Admin / announcements')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/announcements')
/**
 * @description Defines the AdminAnnouncementsCommandController boundary for the admin_announcements backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAnnouncementsCommandController {
  constructor(private readonly service: AdminAnnouncementsCommandService) {}

  /** @description Creates an announcement through the frontend-compatible alias. @returns Created announcement. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiOperation({ summary: 'Create announcement' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async createAlias(@Body() dto: AdminAnnouncementsMutationDto): Promise<AdminAnnouncementDto> {
    return this.service.createRecord(dto);
  }

  /** @description Creates an announcement using the legacy frontend action path. @returns Created announcement. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('createAnnouncement')
  @ApiOperation({ summary: 'Execute createAnnouncement' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async createRecord(@Body() dto: AdminAnnouncementsMutationDto): Promise<AdminAnnouncementDto> {
    return this.service.createRecord(dto);
  }

  /** @description Updates an announcement using the frontend action path. @returns Updated announcement. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('updateAnnouncement')
  @ApiOperation({ summary: 'Execute updateAnnouncement' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async updateById(@Body() dto: AdminAnnouncementsMutationDto): Promise<AdminAnnouncementDto> {
    const id = dto.id;
    if (!id) throw new BadRequestException({ message: 'Entity id is required.', errorCode: 'ADMIN.ANNOUNCEMENTS.INVALID_REQUEST' });
    return this.service.updateById(id, dto);
  }

  /** @description Updates an announcement by UUID. @returns Updated announcement. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiOperation({ summary: 'Update announcement by UUID' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async updateRest(@Param('id') id: string, @Body() dto: AdminAnnouncementsMutationDto): Promise<AdminAnnouncementDto> {
    return this.service.updateById(id, dto);
  }

  /** @description Soft-deletes an announcement by frontend action path. @returns Mutation result. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete('deleteAnnouncement')
  @ApiOperation({ summary: 'Execute deleteAnnouncement' })
  @ApiResponse({ status: HttpStatus.OK })
  async deleteAnnouncement(@Body() dto: AdminAnnouncementsIdDto): Promise<void> {
    return this.service.deleteAnnouncement(dto.id) as any;
  }

  /** @description Soft-deletes an announcement by UUID. @returns Mutation result. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiOperation({ summary: 'Delete announcement using soft delete' })
  @ApiResponse({ status: HttpStatus.OK })
  async deleteRest(@Param('id') id: string): Promise<void> {
    return this.service.deleteAnnouncement(id) as any;
  }

  /** @description Toggles pinned state through the frontend action path. @returns Updated announcement. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('togglePin')
  @ApiOperation({ summary: 'Execute togglePin' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async updatePinById(@Body() dto: AdminAnnouncementsIdDto): Promise<AdminAnnouncementDto> {
    return this.service.updatePinById(dto.id);
  }

  /** @description Toggles pinned state by UUID. @returns Updated announcement. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/pin')
  @ApiOperation({ summary: 'Toggle announcement pin state' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async togglePinRest(@Param('id') id: string): Promise<AdminAnnouncementDto> {
    return this.service.updatePinById(id);
  }
}
