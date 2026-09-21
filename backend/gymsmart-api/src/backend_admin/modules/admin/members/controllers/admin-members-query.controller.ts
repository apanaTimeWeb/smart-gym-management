// RESPONSIBILITY: Exposes read-only Admin members HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminMembersQueryController -> AdminMembersQueryService -> repository.

import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminMembersQueryService } from '@/backend_admin/modules/admin/members/services/admin-members-query.service';
import { AdminMembersQueryDto } from '@/backend_admin/modules/admin/members/dtos/admin-members-query.dto';
import { AdminMembersSummaryDto, AdminMemberDto } from '@/backend_admin/modules/admin/members/dtos/admin-members-response.dto';

@ApiTags('Admin / members')
@Controller('admin/members')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminMembersQueryController {
  constructor(private readonly service: AdminMembersQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute listMembers' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminMemberDto] })
  async listMembers(@Query() query: AdminMembersQueryDto): Promise<AdminMemberDto[]> {
    return this.service.listMembers(query);
  }

  // SLA: STANDARD
  @Get('summary')
  @ApiOperation({ summary: 'Execute fetchSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminMembersSummaryDto })
  async fetchSummary(@Query() query: AdminMembersQueryDto): Promise<AdminMembersSummaryDto> {
    return this.service.fetchSummary(query);
  }

  // SLA: STANDARD
  @Get('export')
  @ApiOperation({ summary: 'Execute exportMembers' })
  @ApiResponse({ status: HttpStatus.OK, type: String })
  async exportMembers(@Query() query: AdminMembersQueryDto): Promise<string> {
    return this.service.exportMembers(query);
  }

  // SLA: STANDARD
  @Get(':id')
  @ApiOperation({ summary: 'Execute findMemberById' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminMemberDto })
  async findMemberById(@Param('id') id: string): Promise<AdminMemberDto> {
    return this.service.findMemberById(id);
  }

}
