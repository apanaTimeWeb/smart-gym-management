// RESPONSIBILITY: Owns GET endpoints for the dashboard feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { DashboardQueryDto } from '@/backend_superadmin/modules/superadmin/dashboard/dtos/dashboard-query.dto';
import { DashboardListService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-list.service';
import { DashboardFindService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-find.service';
import { DashboardResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/responses/dashboard-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('dashboard')
@Controller('/superadmin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class DashboardQueryController {
  constructor(private readonly listService: DashboardListService, private readonly findService: DashboardFindService) {}
  /** Returns one dashboard record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: DashboardResponseDto })
  async findOne(@Param('id') id: string): Promise<DashboardResponseDto> { return await this.findService.findDashboardById(id); }
}
