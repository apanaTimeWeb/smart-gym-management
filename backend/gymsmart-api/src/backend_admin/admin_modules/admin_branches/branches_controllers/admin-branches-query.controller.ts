// RESPONSIBILITY: Exposes read-only Admin branches HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminBranchesQueryController -> AdminBranchesQueryService -> repository.
import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminBranchesQueryDto } from '@/backend_admin/admin_modules/admin_branches/branches_dtos/admin-branches-query.dto'
import { AdminBranchDto } from '@/backend_admin/admin_modules/admin_branches/branches_dtos/admin-branches-response.dto'
import { AdminBranchesQueryService } from '@/backend_admin/admin_modules/admin_branches/branches_services/admin-branches-query.service'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@ApiTags('Admin / branches')
@Controller('admin/branches')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminBranchesQueryController boundary for the admin_branches backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBranchesQueryController {
  constructor(private readonly service: AdminBranchesQueryService) {}

  // SLA: STANDARD
  @Get('fetchBranches')
  @ApiOperation({ summary: 'Execute fetchBranches' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminBranchDto] })
  async findAllBranches(@Query() query: AdminBranchesQueryDto): Promise<AdminCorePaginatedResult<AdminBranchDto>> {
    return this.service.findAllBranches(query);
  }

  // SLA: STANDARD
  @Get(':id')
  @ApiOperation({ summary: 'Execute findById' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminBranchDto })
  async findById(@Param('id') id: string): Promise<AdminBranchDto | null> {
    return this.service.findById(id);
  }

}
