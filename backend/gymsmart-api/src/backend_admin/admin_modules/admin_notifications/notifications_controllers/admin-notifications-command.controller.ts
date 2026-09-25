// RESPONSIBILITY: Exposes mutation endpoints for Admin notifications; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminNotificationsCommandController -> AdminNotificationsCommandService.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminNotificationsIdDto } from '@/backend_admin/admin_modules/admin_notifications/notifications_dtos/admin-notifications-id.dto.js';
import { AdminNotificationsMutationDto } from '@/backend_admin/admin_modules/admin_notifications/notifications_dtos/admin-notifications-mutation.dto.js';
import { AdminNotificationDto } from '@/backend_admin/admin_modules/admin_notifications/notifications_dtos/admin-notifications-response.dto.js';
import { AdminNotificationsCommandService } from '@/backend_admin/admin_modules/admin_notifications/notifications_services/admin-notifications-command.service.js';

@ApiTags('Admin / notifications')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/notifications')
/**
 * @description Defines the AdminNotificationsCommandController boundary for the admin_notifications backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminNotificationsCommandController {
  constructor(private readonly service: AdminNotificationsCommandService) {}

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/read')
  @ApiOperation({ summary: 'Execute markRead' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminNotificationDto })
  async updateReadById(@Param('id') id: string): Promise<AdminNotificationDto | null> {
    return this.service.updateReadById(id);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('read-all')
  @ApiOperation({ summary: 'Execute markAllRead' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateAllRead(): Promise<void> {
    return this.service.updateAllRead();
  }

}
