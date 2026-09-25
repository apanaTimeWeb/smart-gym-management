// RESPONSIBILITY: Exposes read-only Admin blacklist HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminBlacklistQueryController -> AdminBlacklistQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminBlacklistQueryDto } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_dtos/admin-blacklist-query.dto.js';
import { AdminBlacklistedMemberDto, AdminBlacklistKPIDataDto } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_dtos/admin-blacklist-response.dto.js';
import { AdminBlacklistQueryService } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_services/admin-blacklist-query.service.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@ApiTags('Admin / blacklist')
@Controller('admin/blacklist')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminBlacklistQueryController boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBlacklistQueryController {
  constructor(private readonly service: AdminBlacklistQueryService) {}

  // SLA: STANDARD
  @Get('fetchBlacklist')
  @ApiOperation({ summary: 'Execute fetchBlacklist' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminBlacklistedMemberDto] })
  async findAllBlacklist(@Query() query: AdminBlacklistQueryDto): Promise<AdminCorePaginatedResult<AdminBlacklistedMemberDto>> {
    return this.service.findAllBlacklist(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminBlacklistKPIDataDto })
  async findBlacklistKpis(@Query() query: AdminBlacklistQueryDto): Promise<AdminBlacklistKPIDataDto> {
    return this.service.findBlacklistKpis(query);
  }

}
