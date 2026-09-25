// RESPONSIBILITY: Exposes read-only Admin members HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminMembersQueryController -> AdminMembersQueryService -> repository.
import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminMembersQueryDto } from '@/backend_admin/admin_modules/admin_members/members_dtos/admin-members-query.dto'
import { AdminMembersSummaryDto, AdminMemberDto } from '@/backend_admin/admin_modules/admin_members/members_dtos/admin-members-response.dto'
import { AdminMembersQueryService } from '@/backend_admin/admin_modules/admin_members/members_services/admin-members-query.service'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@ApiTags('Admin / members')
@Controller('admin/members')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminMembersQueryController boundary for the admin_members backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminMembersQueryController {
  constructor(private readonly service: AdminMembersQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute listMembers' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminMemberDto] })
  async findAllMembers(@Query() query: AdminMembersQueryDto): Promise<AdminMemberDto[]> {
    const result = await this.service.findAllMembers(query);
    return result.items;
  }

  // SLA: STANDARD
  @Get('summary')
  @ApiOperation({ summary: 'Execute fetchSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminMembersSummaryDto })
  async findMembersSummary(@Query() query: AdminMembersQueryDto): Promise<AdminMembersSummaryDto> {
    return this.service.findMembersSummary(query);
  }

  // SLA: STANDARD
  @Get('export')
  @ApiOperation({ summary: 'Execute exportMembers' })
  @ApiResponse({ status: HttpStatus.OK, type: String })
  async findMembersExport(@Query() query: AdminMembersQueryDto): Promise<string> {
    return this.service.findMembersExport(query);
  }

  // SLA: STANDARD
  @Get(':id')
  @ApiOperation({ summary: 'Execute findMemberById' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminMemberDto })
  async findMemberById(@Param('id') id: string): Promise<AdminMemberDto> {
    return this.service.findMemberById(id);
  }

}
