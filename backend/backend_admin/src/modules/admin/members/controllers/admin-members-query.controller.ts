// RESPONSIBILITY: Exposes read-only Admin members HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminMembersQueryController -> AdminMembersQueryService -> repository.

import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminMembersQueryService } from '@/modules/admin/members/services/admin-members-query.service';
import { AdminMembersQueryDto } from '@/modules/admin/members/dtos/admin-members-query.dto';
import { AdminMembersListResponseDto, AdminMembersSummaryDto, AdminMemberDto } from '@/modules/admin/members/dtos/admin-members-response.dto';

@ApiTags('Admin / members')
@Controller('admin/members')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminMembersQueryController {
  constructor(private readonly service: AdminMembersQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute listMembers' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminMembersListResponseDto })
  async listMembers(@Query() query: AdminMembersQueryDto): Promise<AdminMembersListResponseDto> {
    return this.service.listMembers(query) as unknown as AdminMembersListResponseDto;
  }

  // SLA: STANDARD
  @Get('summary')
  @ApiOperation({ summary: 'Execute fetchSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminMembersSummaryDto })
  async fetchSummary(@Query() query: AdminMembersQueryDto): Promise<AdminMembersSummaryDto> {
    return this.service.fetchSummary(query) as unknown as AdminMembersSummaryDto;
  }

  // SLA: STANDARD
  @Get('export')
  @ApiOperation({ summary: 'Execute exportMembers' })
  @ApiResponse({ status: HttpStatus.OK, type: String })
  async exportMembers(@Query() query: AdminMembersQueryDto): Promise<string> {
    return this.service.exportMembers(query) as unknown as string;
  }

  // SLA: STANDARD
  @Get(':id')
  @ApiOperation({ summary: 'Execute findMemberById' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminMemberDto })
  async findMemberById(@Param('id') id: string): Promise<AdminMemberDto> {
    return this.service.findMemberById(id) as unknown as AdminMemberDto;
  }

}
