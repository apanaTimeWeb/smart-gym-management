// RESPONSIBILITY: Owns HTTP transport for the dashboard-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminDashboardQueryDto } from '@/backend_superadmin/superadmin_modules/dashboard/dtos/superadmin-dashboard-query.dto';
import { SuperadminDashboardListService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-list.service';
import { SuperadminDashboardFindService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-find.service';
import { SuperadminDashboardResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-response.dto';

@ApiTags('dashboard')
@Controller('/superadmin/dashboard')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminDashboardQueryController {
  constructor(private readonly listService: SuperadminDashboardListService, private readonly findService: SuperadminDashboardFindService) {}
  /** Returns one dashboard record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminDashboardResponseDto })
  async findOne(@Param('id') id: string): Promise<SuperadminDashboardResponseDto> { return await this.findService.findDashboardById(id); }
}