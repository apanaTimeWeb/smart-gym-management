// RESPONSIBILITY: Exposes mutation endpoints for Admin blacklist; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminBlacklistCommandController -> AdminBlacklistCommandService.
import { Body, Controller, Delete, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminBlacklistIdDto } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_dtos/admin-blacklist-id.dto'
import { AdminBlacklistMutationDto } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_dtos/admin-blacklist-mutation.dto'
import { AdminBlacklistedMemberDto } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_dtos/admin-blacklist-response.dto'
import { AdminBlacklistCommandService } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_services/admin-blacklist-command.service'

@ApiTags('Admin / blacklist')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/blacklist')
/**
 * @description Defines the AdminBlacklistCommandController boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBlacklistCommandController {
  constructor(private readonly service: AdminBlacklistCommandService) {}

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('addToBlacklist')
  @ApiOperation({ summary: 'Execute addToBlacklist' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminBlacklistedMemberDto })
  async createRecord(@Body() dto: AdminBlacklistMutationDto): Promise<AdminBlacklistedMemberDto> {
    return this.service.createRecord(dto);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete('removeFromBlacklist')
  @ApiOperation({ summary: 'Execute removeFromBlacklist' })
  @ApiResponse({ status: HttpStatus.OK })
  async deleteBlacklist(@Body() dto: AdminBlacklistIdDto): Promise<void> {
    return this.service.deleteBlacklist(dto.id) as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('toggleBlacklist')
  @ApiOperation({ summary: 'Execute toggleBlacklist' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminBlacklistedMemberDto })
  async updateActiveById(@Body() dto: AdminBlacklistIdDto): Promise<AdminBlacklistedMemberDto> {
    return this.service.updateActiveById(dto.id);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('propagateToAllBranches')
  @ApiOperation({ summary: 'Execute propagateToAllBranches' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminBlacklistedMemberDto })
  async updatePropagationById(@Body() dto: AdminBlacklistIdDto): Promise<AdminBlacklistedMemberDto> {
    return this.service.updatePropagationById(dto.id);
  }

}
