// RESPONSIBILITY: Exposes read-only Admin profile HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminProfileQueryController -> AdminProfileQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminProfileQueryService } from '@/modules/admin/profile/services/admin-profile-query.service';
import { AdminProfileQueryDto } from '@/modules/admin/profile/dtos/admin-profile-query.dto';
import { AdminProfileDto } from '@/modules/admin/profile/dtos/admin-profile-response.dto';

@ApiTags('Admin / profile')
@Controller('admin/adminProfile')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminProfileQueryController {
  constructor(private readonly service: AdminProfileQueryService) {}

  // SLA: STANDARD
  @Get('fetchProfile')
  @ApiOperation({ summary: 'Execute fetchProfile' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminProfileDto })
  async fetchProfile(@Query() query: AdminProfileQueryDto): Promise<AdminProfileDto> {
    return this.service.fetchProfile(query);
  }

}
