// RESPONSIBILITY: Exposes read-only Admin branches HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminBranchesQueryController -> AdminBranchesQueryService -> repository.

import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminBranchesQueryService } from '@/backend_admin/modules/admin/branches/services/admin-branches-query.service';
import { AdminBranchesQueryDto } from '@/backend_admin/modules/admin/branches/dtos/admin-branches-query.dto';
import { AdminBranchDto } from '@/backend_admin/modules/admin/branches/dtos/admin-branches-response.dto';

@ApiTags('Admin / branches')
@Controller('admin/branches')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminBranchesQueryController {
  constructor(private readonly service: AdminBranchesQueryService) {}

  // SLA: STANDARD
  @Get('fetchBranches')
  @ApiOperation({ summary: 'Execute fetchBranches' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminBranchDto] })
  async fetchBranches(@Query() query: AdminBranchesQueryDto): Promise<AdminBranchDto[]> {
    return this.service.fetchBranches(query);
  }

  // SLA: STANDARD
  @Get(':id')
  @ApiOperation({ summary: 'Execute findById' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminBranchDto })
  async findById(@Param('id') id: string): Promise<AdminBranchDto | null> {
    return this.service.findById(id);
  }

}
