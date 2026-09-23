// RESPONSIBILITY: Owns HTTP transport for the dashboard-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminDashboardCreateService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-create.service';
import { SuperadminDashboardCreateDto } from '@/backend_superadmin/superadmin_modules/dashboard/dtos/superadmin-dashboard-create.dto';
import { SuperadminDashboardUpdateService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-update.service';
import { SuperadminDashboardUpdateDto } from '@/backend_superadmin/superadmin_modules/dashboard/dtos/superadmin-dashboard-update.dto';
import { SuperadminDashboardDeleteService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-delete.service';
import { SuperadminDashboardResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-response.dto';

@ApiTags('dashboard')
@Controller('/superadmin/dashboard')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminDashboardCommandController {
  constructor(private readonly createService: SuperadminDashboardCreateService, private readonly updateService: SuperadminDashboardUpdateService, private readonly deleteService: SuperadminDashboardDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create dashboard' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminDashboardResponseDto })
    async create(@Body() body: SuperadminDashboardCreateDto): Promise<SuperadminDashboardResponseDto> { return this.createService.createDashboard(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update dashboard' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminDashboardResponseDto })
    async update(@Param('id') id: string, @Body() body: SuperadminDashboardUpdateDto): Promise<SuperadminDashboardResponseDto> { return this.updateService.updateDashboard(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove dashboard' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteDashboard(id); }

}