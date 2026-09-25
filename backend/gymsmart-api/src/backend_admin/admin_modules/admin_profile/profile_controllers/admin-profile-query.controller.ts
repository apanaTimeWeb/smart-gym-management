// RESPONSIBILITY: Exposes read-only Admin profile HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminProfileQueryController -> AdminProfileQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminProfileQueryDto } from '@/backend_admin/admin_modules/admin_profile/profile_dtos/admin-profile-query.dto'
import { AdminProfileDto } from '@/backend_admin/admin_modules/admin_profile/profile_dtos/admin-profile-response.dto'
import { AdminProfileQueryService } from '@/backend_admin/admin_modules/admin_profile/profile_services/admin-profile-query.service'

@ApiTags('Admin / profile')
@Controller('admin/adminProfile')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminProfileQueryController boundary for the admin_profile backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminProfileQueryController {
  constructor(private readonly service: AdminProfileQueryService) {}

  // SLA: STANDARD
  @Get('fetchProfile')
  @ApiOperation({ summary: 'Execute fetchProfile' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminProfileDto })
  async findProfile(@Query() query: AdminProfileQueryDto): Promise<AdminProfileDto> {
    return this.service.findProfile(query);
  }

}
