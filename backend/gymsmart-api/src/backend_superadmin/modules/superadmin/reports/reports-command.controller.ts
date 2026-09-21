// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the reports feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { ReportsCreateService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-create.service';
import { ReportsCreateDto } from '@/backend_superadmin/modules/superadmin/reports/dtos/reports-create.dto';
import { ReportsUpdateService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-update.service';
import { ReportsUpdateDto } from '@/backend_superadmin/modules/superadmin/reports/dtos/reports-update.dto';
import { ReportsDeleteService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-delete.service';

@ApiTags('reports')
@Controller('/superadmin/reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ReportsCommandController {
  constructor(private readonly createService: ReportsCreateService, private readonly updateService: ReportsUpdateService, private readonly deleteService: ReportsDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create reports' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RateLimitGuard)
    async create(@Body() body: ReportsCreateDto): Promise<unknown> { return this.createService.createReports(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update reports' })
  @Patch(':id')
    @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: ReportsUpdateDto): Promise<unknown> { return this.updateService.updateReports(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove reports' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteReports(id); }

}
