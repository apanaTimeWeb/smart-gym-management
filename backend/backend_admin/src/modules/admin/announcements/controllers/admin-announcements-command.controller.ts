// RESPONSIBILITY: Exposes mutation endpoints for Admin announcements; contains HTTP concerns only.
// FLOW: HTTP mutation → AdminAnnouncementsCommandController → AdminAnnouncementsCommandService.

import { BadRequestException, Body, Controller, Delete, Headers, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminAnnouncementsCommandService } from '@/modules/admin/announcements/services/admin-announcements-command.service';
import { AdminAnnouncementsMutationDto } from '@/modules/admin/announcements/dtos/admin-announcements-mutation.dto';
import { AdminAnnouncementsIdDto } from '@/modules/admin/announcements/dtos/admin-announcements-id.dto';
import { AdminAnnouncementDto } from '@/modules/admin/announcements/dtos/admin-announcements-response.dto';

@ApiTags('Admin / announcements')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/announcements')
export class AdminAnnouncementsCommandController {
  constructor(private readonly service: AdminAnnouncementsCommandService, private readonly idempotency: CoreIdempotencyService) {}

  /** @description Creates an announcement through the frontend-compatible alias. @returns Created announcement. */
  @Post()
  @ApiOperation({ summary: 'Create announcement' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async createAlias(@Body() dto: AdminAnnouncementsMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminAnnouncementDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createRecord(dto));
  }

  /** @description Creates an announcement using the legacy frontend action path. @returns Created announcement. */
  @Post('createAnnouncement')
  @ApiOperation({ summary: 'Execute createAnnouncement' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async createRecord(@Body() dto: AdminAnnouncementsMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminAnnouncementDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createRecord(dto));
  }

  /** @description Updates an announcement using the frontend action path. @returns Updated announcement. */
  @Post('updateAnnouncement')
  @ApiOperation({ summary: 'Execute updateAnnouncement' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async updateById(@Body() dto: AdminAnnouncementsMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminAnnouncementDto> {
    const id = dto.id;
    if (!id) throw new BadRequestException('Entity id is required.');
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.updateById(id, dto));
  }

  /** @description Updates an announcement by UUID. @returns Updated announcement. */
  @Patch(':id')
  @ApiOperation({ summary: 'Update announcement by UUID' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async updateRest(@Param('id') id: string, @Body() dto: AdminAnnouncementsMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminAnnouncementDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.updateById(id, dto));
  }

  /** @description Soft-deletes an announcement by frontend action path. @returns Mutation result. */
  @Delete('deleteAnnouncement')
  @ApiOperation({ summary: 'Execute deleteAnnouncement' })
  @ApiResponse({ status: HttpStatus.OK })
  async markAsDeleted(@Body() dto: AdminAnnouncementsIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.markAsDeleted(dto.id));
  }

  /** @description Soft-deletes an announcement by UUID. @returns Mutation result. */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete announcement using soft delete' })
  @ApiResponse({ status: HttpStatus.OK })
  async deleteRest(@Param('id') id: string, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.markAsDeleted(id));
  }

  /** @description Toggles pinned state through the frontend action path. @returns Updated announcement. */
  @Post('togglePin')
  @ApiOperation({ summary: 'Execute togglePin' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async togglePinById(@Body() dto: AdminAnnouncementsIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminAnnouncementDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.togglePinById(dto.id));
  }

  /** @description Toggles pinned state by UUID. @returns Updated announcement. */
  @Patch(':id/pin')
  @ApiOperation({ summary: 'Toggle announcement pin state' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAnnouncementDto })
  async togglePinRest(@Param('id') id: string, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminAnnouncementDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.togglePinById(id));
  }
}
