// RESPONSIBILITY: Exposes mutation endpoints for Admin usage; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminUsageCommandController -> AdminUsageCommandService.
import { Body, Controller, Delete, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminUsageIdDto } from '@/backend_admin/admin_modules/admin_usage/usage_dtos/admin-usage-id.dto'
import { AdminUsageMutationDto } from '@/backend_admin/admin_modules/admin_usage/usage_dtos/admin-usage-mutation.dto'
import { AdminUsageUpgradeRequestDto } from '@/backend_admin/admin_modules/admin_usage/usage_dtos/admin-usage-response.dto'
import { AdminUsageOrchestratorService } from '@/backend_admin/admin_modules/admin_usage/usage_services/admin-usage-orchestrator.service'

@ApiTags('Admin / usage')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/usage')
/**
 * @description Defines the AdminUsageCommandController boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminUsageCommandController {
  constructor(private readonly orchestrator: AdminUsageOrchestratorService) {}

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('upgrade-request')
  @ApiOperation({ summary: 'Execute createUpgradeRequest' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminUsageUpgradeRequestDto })
  async createUpgradeRequest(@Body() dto: AdminUsageMutationDto): Promise<unknown> {
    return this.orchestrator.createUpgradeRequest(dto);
  }

}
