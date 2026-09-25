// RESPONSIBILITY: Exposes mutation endpoints for Admin gym-health-alerts; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminGymHealthAlertsCommandController -> AdminGymHealthAlertsCommandService.
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminGymHealthAlertsIdDto } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_dtos/admin-gym-health-alerts-id.dto.js';
import { AdminGymHealthAlertsMutationDto } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_dtos/admin-gym-health-alerts-mutation.dto.js';
import { AdminGymHealthAlertsCommandService } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_services/admin-gym-health-alerts-command.service.js';

@ApiTags('Admin / gym-health-alerts')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/gym-health-alerts')
/**
 * @description Defines the AdminGymHealthAlertsCommandController boundary for the admin_gym-health-alerts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGymHealthAlertsCommandController {
  constructor(private readonly service: AdminGymHealthAlertsCommandService) {}

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('resolveAlert')
  @ApiOperation({ summary: 'Execute resolveAlert' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateResolveAlertById(@Body() dto: AdminGymHealthAlertsIdDto): Promise<void> {
    return this.service.updateResolveAlertById(dto.id);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('dismissAlert')
  @ApiOperation({ summary: 'Execute dismissAlert' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateDismissAlertById(@Body() dto: AdminGymHealthAlertsIdDto): Promise<void> {
    return this.service.updateDismissAlertById(dto.id);
  }

}
