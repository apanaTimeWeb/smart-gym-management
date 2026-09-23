// RESPONSIBILITY: Owns HTTP transport for the dashboard-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { DashboardCreateService } from '@/backend_superadmin/modules/backend_superadmin/dashboard/services/dashboard-create.service';
import { DashboardCreateDto } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dtos/dashboard-create.dto';
import { DashboardUpdateService } from '@/backend_superadmin/modules/backend_superadmin/dashboard/services/dashboard-update.service';
import { DashboardUpdateDto } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dtos/dashboard-update.dto';
import { DashboardDeleteService } from '@/backend_superadmin/modules/backend_superadmin/dashboard/services/dashboard-delete.service';
import { DashboardResponseDto } from '@/backend_superadmin/modules/backend_superadmin/dashboard/responses/dashboard-response.dto';

@ApiTags('dashboard')
@Controller('/superadmin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class DashboardCommandController {
  constructor(private readonly createService: DashboardCreateService, private readonly updateService: DashboardUpdateService, private readonly deleteService: DashboardDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create dashboard' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RateLimitGuard)
  @ApiResponse({ type: DashboardResponseDto })
    async create(@Body() body: DashboardCreateDto): Promise<DashboardResponseDto> { return this.createService.createDashboard(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update dashboard' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
    @UseGuards(RateLimitGuard)
  @ApiResponse({ type: DashboardResponseDto })
    async update(@Param('id') id: string, @Body() body: DashboardUpdateDto): Promise<DashboardResponseDto> { return this.updateService.updateDashboard(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove dashboard' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteDashboard(id); }

}