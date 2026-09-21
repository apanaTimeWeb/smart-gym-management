// RESPONSIBILITY: Exposes read-only Admin blacklist HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminBlacklistQueryController -> AdminBlacklistQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminBlacklistQueryService } from '@/modules/admin/blacklist/services/admin-blacklist-query.service';
import { AdminBlacklistQueryDto } from '@/modules/admin/blacklist/dtos/admin-blacklist-query.dto';
import { AdminBlacklistedMemberDto, AdminBlacklistKPIDataDto } from '@/modules/admin/blacklist/dtos/admin-blacklist-response.dto';

@ApiTags('Admin / blacklist')
@Controller('admin/blacklist')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminBlacklistQueryController {
  constructor(private readonly service: AdminBlacklistQueryService) {}

  // SLA: STANDARD
  @Get('fetchBlacklist')
  @ApiOperation({ summary: 'Execute fetchBlacklist' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminBlacklistedMemberDto] })
  async fetchBlacklist(@Query() query: AdminBlacklistQueryDto): Promise<AdminBlacklistedMemberDto[]> {
    return this.service.fetchBlacklist(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminBlacklistKPIDataDto })
  async fetchKPIs(@Query() query: AdminBlacklistQueryDto): Promise<AdminBlacklistKPIDataDto> {
    return this.service.fetchKPIs(query);
  }

}
