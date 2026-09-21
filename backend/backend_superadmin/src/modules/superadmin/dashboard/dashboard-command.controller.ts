// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the dashboard feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { DashboardCreateService } from '@/modules/superadmin/dashboard/services/dashboard-create.service';
import { DashboardCreateDto } from '@/modules/superadmin/dashboard/dtos/dashboard-create.dto';
import { DashboardUpdateService } from '@/modules/superadmin/dashboard/services/dashboard-update.service';
import { DashboardUpdateDto } from '@/modules/superadmin/dashboard/dtos/dashboard-update.dto';
import { DashboardDeleteService } from '@/modules/superadmin/dashboard/services/dashboard-delete.service';

@ApiTags('dashboard')
@Controller('/superadmin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class DashboardCommandController {
  constructor(private readonly createService: DashboardCreateService, private readonly updateService: DashboardUpdateService, private readonly deleteService: DashboardDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create dashboard' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RateLimitGuard)
    async create(@Body() body: DashboardCreateDto): Promise<unknown> { return this.createService.createDashboard(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update dashboard' })
  @Patch(':id')
    @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: DashboardUpdateDto): Promise<unknown> { return this.updateService.updateDashboard(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove dashboard' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteDashboard(id); }

}
