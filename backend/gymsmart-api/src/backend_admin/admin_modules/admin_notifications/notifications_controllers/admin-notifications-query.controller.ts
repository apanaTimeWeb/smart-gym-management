// RESPONSIBILITY: Exposes read-only Admin notifications HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminNotificationsQueryController -> AdminNotificationsQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminNotificationsQueryDto } from '@/backend_admin/admin_modules/admin_notifications/notifications_dtos/admin-notifications-query.dto.js';
import { AdminNotificationDto } from '@/backend_admin/admin_modules/admin_notifications/notifications_dtos/admin-notifications-response.dto.js';
import { AdminNotificationsQueryService } from '@/backend_admin/admin_modules/admin_notifications/notifications_services/admin-notifications-query.service.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@ApiTags('Admin / notifications')
@Controller('admin/notifications')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminNotificationsQueryController boundary for the admin_notifications backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminNotificationsQueryController {
  constructor(private readonly service: AdminNotificationsQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute listNotifications' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminNotificationDto] })
  async findAllNotifications(@Query() query: AdminNotificationsQueryDto): Promise<AdminCorePaginatedResult<AdminNotificationDto>> {
    return this.service.findAllNotifications(query);
  }

}
